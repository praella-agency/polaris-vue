<template>
  <div>
    <PFilter v-if="$slots.hasOwnProperty('filter') || hasFilter" v-bind="$attrs" :resourceName="resource"
             @remove-tag="onRemoveFilter" @input="onFilterInputChanged">
      <!-- @slot Slot to add a custom Filter content -->
      <slot name="filter" v-if="$slots.hasOwnProperty('filter')"></slot>
    </PFilter>
    <div class="Polaris-DataTable" v-if="rows.length > 0 || $slots.hasOwnProperty('body')">
      <div class="Polaris-DataTable__ScrollContainer">
        <table class="Polaris-DataTable__Table">
          <thead ref="thead">
          <!-- @slot Slot to add a custom Header content -->
          <slot name="head">
            <template>
              <tr>
                <PDataTableCellNew
                    v-for="(heading, hIndex) in headings"
                    :key="`heading-cell-${hIndex}`"
                    header
                    :content="heading.content"
                    :value="heading.value"
                    :width="heading.width"
                    :sort="sort"
                    :sortable="heading.sortable"
                    :default-sort-direction="defaultSortDirection"
                    :content-type="heading.type ? heading.type : columnContentTypes[hIndex]"
                    :first-column="hIndex === 0"
                    :truncate="truncate"
                    :verticalAlign="verticalAlign"
                    @sort-changed="handleSortChange"
                />

                <!-- @deprecated Remove in version 3.0.0 - START -->
                <PDataTableCell
                    v-if="hasActions"
                    header
                    content="Actions"
                    :sortable="false"
                    contentType="text"
                    :firstColumn="false"
                    :truncate="false"
                    :verticalAlign="verticalAlign"/>
                <!-- @deprecated Remove in version 3.0.0 - END -->

              </tr>


              <tr v-if="!showTotalsInFooter">
                <PDataTableCellNew
                    v-for="(total, index) in totals"
                    :key="`total-cell-${index}`"
                    total
                    :value="index === 0 ? totalsRowHeading : total"
                    :content-type="total !== '' && index > 0 ? 'numeric': columnContentTypes[index]"
                    :first-column="index === 0"
                    :truncate="truncate"
                    :vertical-align="verticalAlign"
                    :sortable="false"
                />

                <!-- @deprecated Remove in version 3.0.0 - START -->
                <PDataTableCell
                    total
                    v-if="totals.length && hasActions"
                    :totalInFooter="showTotalsInFooter"
                    :verticalAlign="verticalAlign"/>
                <!-- @deprecated Remove in version 3.0.0 - END -->

              </tr>
            </template>
          </slot>
          </thead>

          <!-- @slot Slot to overwrite tbody element.<br />**Warning:** Using this slot will not allow rows populated from package, you must have to utilize **body** slot as well.
           -->
          <slot name="tbody">
            <tbody ref="tbody">
            <template v-if="loading">
              <tr class="Polaris-ResourceList__SpinnerContainer" :style="{'padding-top': `${topPadding}px`}">
                <PSpinner :size="!$slots.hasOwnProperty('body') && rows.length < 2 ? 'small' : 'large'"/>
              </tr>
              <tr class="Polaris-ResourceList__LoadingOverlay"/>
            </template>

            <!-- @slot Slot to add a custom Body content -->
            <slot name="body">
              <template v-if="!hasOldRows">
                <template v-for="row in rows">
                  <!-- @slot Slot to replace the default rendering of a row. This slot provides row values.

                  Access values with `slot-props` attribute -->
                  <slot name="item" :item="row">
                    <tr class="Polaris-DataTable__TableRow">
                      <template v-for="(heading, hIndex) in headings">
                        <PDataTableCellNew
                            :value="row[heading.value]"
                            :header-value="heading.value"
                            :first-column="hIndex === 0"
                            :content-type="headings[hIndex].type ? headings[hIndex].type : columnContentTypes[hIndex]"
                            :truncate="truncate"
                            :vertical-align="verticalAlign"
                            :sortable="false">
                          <template v-slot:[`item.${heading.value}`]="slotProps">
                            <!-- @slot Slot to customize a specific column. This slot provides row values.

                            Access values with `slot-props` attribute. -->
                            <slot :name="`item.${heading.value}`" :item="row"/>
                          </template>
                        </PDataTableCellNew>
                      </template>
                    </tr>
                  </slot>
                </template>
              </template>
              <!-- @deprecated Remove in version 3.0.0 - START -->
              <template v-else>
                <tr
                    class="Polaris-DataTable__TableRow"
                    v-for="(row, rIndex) in rows"
                    :key="`row-${rIndex}`">
                  <PDataTableCell
                      v-for="(data, cIndex) in row"
                      :key="`cell-${cIndex}-row-${rIndex}`"
                      :content="typeof data !== 'object' ? data : data.content"
                      :action="data.url || data.to || data.onAction ? data : null"
                      :toggle="typeof data.status == 'boolean' && data.onAction ? data : null"
                      :badge="typeof data === 'object' && !(data.url || data.to) && !data.onAction ? data : null"
                      :contentType="headings[cIndex].type ? headings[cIndex].type : columnContentTypes[cIndex]"
                      :firstColumn="cIndex === 0"
                      :truncate="truncate"
                      :verticalAlign="verticalAlign"
                  />
                  <PDataTableCell
                      v-if="hasActions"
                      :actions="actions"
                      :value="ids[rIndex]"
                      :verticalAlign="verticalAlign"
                  />
                </tr>
              </template>
              <!-- @deprecated Remove in version 3.0.0 - END -->

            </slot>
            </tbody>
          </slot>
          <tfoot v-if="showTotalsInFooter">
          <tr>
            <PDataTableCellNew
                v-for="(total, index) in totals"
                :key="`total-cell-${index}`"
                total
                :total-in-footer="showTotalsInFooter"
                :value="index === 0 ? totalsRowHeading : total"
                :content-type="total !== '' && index > 0 ? 'numeric': columnContentTypes[index]"
                :first-column="index === 0"
                :truncate="truncate"
                :vertical-align="verticalAlign"
                :sortable="false"
            />

            <!-- @deprecated Remove in version 3.0.0 - START -->
            <PDataTableCell
                total
                v-if="totals.length && hasActions"
                :totalInFooter="showTotalsInFooter"
                :verticalAlign="verticalAlign"/>
            <!-- @deprecated Remove in version 3.0.0 - END -->
          </tr>
          </tfoot>
        </table>
      </div>

      <div v-if="footerContent" class="Polaris-DataTable__Footer">
        <!-- @slot Slot to add a custom Footer content -->
        <slot name="footer">
          {{ footerContent }}
        </slot>
      </div>
      <div class="Polaris-DataTable__Pagination" v-if="hasPagination">
        <PPagination v-bind="pagination"/>
      </div>
    </div>
    <div v-else>
      <!-- @slot Slot to display when no record available -->
      <slot name="emptyState">
        <PEmptyState
            :heading="emptyStateTitle"
            :image="emptyStateImage"
        >
        </PEmptyState>
      </slot>
    </div>
  </div>
</template>


<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';

import PDataTableCellNew from './PDataTableCellNew.vue';
import PDataTableCell from './PDataTableCell.vue';
import {PPagination, PPaginationDescriptor} from '@/components/PPagination';
import {PFilter} from '@/components/PFilter';
import {PSpinner} from '@/components/PSpinner';
import {ComplexAction, LinkAction} from '@/types';
import {PEmptyState} from '@/components/PEmptyState';

type Status = 'success' | 'info' | 'attention' | 'warning' | 'new' | 'critical';
type Progress = 'incomplete' | 'partiallyComplete' | 'complete';
type Size = 'medium' | 'small';

interface Badge {
  content?: string;
  status?: Status;
  progress?: Progress;
  size?: Size;
}

interface Headings {
  /** Header title */
  content: string;
  /** Header value */
  value: string;
  /** Value type */
  type: string;
  /** Sortable values */
  sortable?: boolean;
  /** Header Column width */
  width?: string;
}

interface TotalsName {
  /** Singular label */
  singular: string;
  /** Plural label */
  plural: string;
}

type TableData = string | number | LinkAction | ComplexAction | Badge;
type ColumnContentType = 'text' | 'numeric';
type SortDirection = 'ascending' | 'descending' | 'none';
type VerticalAlign = 'top' | 'bottom' | 'middle' | 'baseline';

interface Sort {
  value: string;
  direction: SortDirection;
}

@Component({
  components: {
    PDataTableCellNew, PPagination, PFilter, PSpinner, PEmptyState, PDataTableCell
  },
})
export default class PDataTable extends Vue {

  public get hasOldRows() {
    return this.rows.length > 0 && this.rows[0].constructor === Array;
  }

  public get hasActions() {
    return this.actions && this.actions.length > 0;
  }

  public get resource() {
    if (this.searchPlaceholder != null) {
      return {
        singular: this.searchPlaceholder,
        plural: this.searchPlaceholder,
      };
    } else {
      return this.$attrs.resourceName;
    }
  }

  private get totalsRowHeading() {
    const totalsLabel = Object.keys(this.totalsName).length > 0 ? this.totalsName : {
      singular: 'Total',
      plural: 'Totals',
    };

    return this.totals.length > 0 &&
    this.totals.filter((total) => total !== '' || typeof (total !== 'number')).length > 1 ?
        totalsLabel.plural :
        totalsLabel.singular;
  }

  /**
   * List of data types, which determines content alignment for each column. Data types are "text," which aligns left,
   * or "numeric," which aligns right.
   * @values text | numeric
   */
  @Prop({type: Array, default: () => []}) public columnContentTypes!: ColumnContentType[];

  /**
   * The direction to sort the table rows on first click or keypress
   * of a sortable column heading
   * @values ascending | descending | none
   */
  @Prop({type: String, default: 'ascending'}) public defaultSortDirection!: SortDirection;

  /**
   * Content centered in the full width cell of the table footer row
   */
  @Prop([String, Number]) public footerContent!: TableData;

  /**
   * List of column headings
   */
  @Prop({type: Array, default: () => [], required: true}) public headings!: Headings[];

  /**
   * Lists of data points which map to table body rows
   */
  @Prop({type: Array, default: () => [[]], required: true}) public rows!: TableData[][];

  /**
   * Placement of totals row within table
   */
  @Prop({type: Boolean, default: false}) public showTotalsInFooter!: boolean;

  /**
   * List of numeric column totals, highlighted in the table’s header below column headings. Use empty strings as
   * placeholders for columns with no total.
   */
  @Prop({type: Array, default: () => []}) public totals!: TableData[];

  /**
   * Custom totals row heading
   */
  @Prop({type: Object, default: () => ({})}) public totalsName!: TotalsName;

  /**
   * Truncate content in first column instead of wrapping
   */
  @Prop({type: Boolean, default: false}) public truncate!: boolean;

  /**
   * Vertical alignment of content in the cells
   */
  @Prop({type: String, default: 'top'}) public verticalAlign!: VerticalAlign;

  /**
   * Callback fired on click or keypress of a sortable column heading
   */
  @Prop({type: Object, default: () => ({})}) public sort!: Sort;

  /**
   * Display only search filter
   */
  @Prop({type: Boolean, default: false}) public hasFilter!: boolean;

  /**
   * Data table has pagination
   */
  @Prop({type: Boolean, default: false}) public hasPagination!: boolean;

  /**
   * Data table is loading
   */
  @Prop({type: Boolean, default: false}) public loading!: boolean;

  /**
   * Pagination object
   */
  @Prop({type: Object, default: () => ({})}) public pagination!: PPaginationDescriptor;

  /**
   * Display empty state if record not found!
   */
  @Prop({type: String, default: 'No record found!'}) public emptyStateTitle!: string;

  /**
   * Display empty state image if record not found!
   */
  @Prop({
    type: String,
    default: 'https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png',
  }) public emptyStateImage!: string;

  // ============Deprecated Props============
  /**
   * Handle action events for the button.
   *
   * **Deprecation:-** `actions` will be removed in version 3.0.0,
   * use `headings` with extra object.
   * @deprecated
   */
  @Prop({type: Array, default: () => []}) public actions!: ComplexAction[];

  /**
   * Data ids
   *
   * **Deprecation:-** `ids` will be removed in version 3.0.0,
   * @deprecated
   */
  @Prop({type: Array, default: () => []}) public ids!: number[];

  /**
   * Search Placeholder
   *
   * **Deprecation:-** `searchPlaceholder` will be removed in version 3.0.0, use `resourceName` instead.
   * @deprecated
   */
  @Prop({type: String, default: null}) public searchPlaceholder!: string;

  // ============Deprecated Props END============

  public topPadding = 8;

  public mounted() {
    let loadingPosition = 0;

    if (typeof window !== 'undefined' && this.$refs.hasOwnProperty('tbody')) {
      const overlay = (this.$refs.tbody as Element).getBoundingClientRect();
      const viewportHeight = Math.max(document.documentElement ?
          document.documentElement.clientHeight : 0, window.innerHeight || 0);
      const overflow = viewportHeight - overlay.height;
      const spinnerHeight = this.rows.length === 1 ? 28 : 45;
      loadingPosition = overflow > 0 ? (overlay.height - spinnerHeight) / 2 :
          (viewportHeight - overlay.top - spinnerHeight) / 2;
      loadingPosition = loadingPosition + (this.$refs.thead as Element).getBoundingClientRect().height;
      this.topPadding = loadingPosition > 0 ? loadingPosition : this.topPadding;
    }

    this.handleDeprecations();
  }

  public onRemoveFilter(tag) {
    /**
     * Removes filter tag
     * @property {String} tag
     */
    this.$emit('filter-removed', tag);
  }

  public onFilterInputChanged(value) {
    /**
     * Works on keypress
     * @property {String} input-value
     */
    this.$emit('input-filter-changed', value);
  }

  public handleSortChange(value, direction) {
    /**
     * Handle sorting on columns
     * @property {Object} {value: 'columnName', direction:'sortDirection'}
     */
    this.$emit('sort-changed', value, direction);
  }

  private handleDeprecations() {
    if (this.searchPlaceholder != null) {
      // tslint:disable-next-line:no-console
      console.error('Deprecation Notice: `searchPlaceholder` will be removed in version 3.0.0, use `resourceName` instead. ' +
          'Please check resourceName syntax here: https://polaris-vue.hulkapps.com/?path=/docs/lists-tables-filter--filter');
    }
    if (this.actions.length > 0) {
      // tslint:disable-next-line:no-console
      console.error('Deprecation Notice: `actions` will be removed in version 3.0.0, use `headings` with extra object. '
          + 'Please check new example of' +
          ' DataTable: https://polaris-vue.hulkapps.com/?path=/docs/lists-tables-data-table-slot--row-slot');
    }
    if (this.ids.length > 0) {
      // tslint:disable-next-line:no-console
      console.error('Deprecation Notice: `ids` will be removed in version 3.0.0. ' +
          'Please check new example of' +
          ' DataTable: https://polaris-vue.hulkapps.com/?path=/docs/lists-tables-data-table-slot--row-slot');
    }
  }
}
</script>

<style scoped>
.Polaris-DataTable__Pagination {
  text-align: center;
  padding: 1.6rem;
  border-top: 0.1rem solid #e1e3e5;
  border-bottom-left-radius: 0.4rem;
  border-bottom-right-radius: 0.4rem;
}
</style>
