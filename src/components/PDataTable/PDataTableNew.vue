<template>
  <div>
    <PFilter v-if="$slots.hasOwnProperty('filter') || hasFilter" v-bind="$attrs" :resourceName="resource"
             :hideQueryField="hasFilter" @remove-tag="onRemoveFilter" @input="onFilterInputChanged">
      <!-- @slot Filter content -->
      <slot name="filter" v-if="$slots.hasOwnProperty('filter')"></slot>
    </PFilter>
    <div class="Polaris-DataTable" v-if="rows.length > 0 || $slots.hasOwnProperty('body')">
      <div class="Polaris-DataTable__ScrollContainer">
        <table class="Polaris-DataTable__Table">
          <thead ref="thead">
            <!-- @slot Header content -->
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
                      :value="index === 0 ? 'Totals' : total"
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

          <tbody ref="tbody">
          <template v-if="loading">
            <tr class="Polaris-ResourceList__SpinnerContainer" :style="{'padding-top': `${topPadding}px`}">
              <PSpinner :size="!$slots.hasOwnProperty('body') && rows.length < 2 ? 'small' : 'large'"/>
            </tr>
            <tr class="Polaris-ResourceList__LoadingOverlay"></tr>
          </template>

            <!-- @slot Body content -->
            <slot name="body">
              <template v-if="!hasOldRows">
                <template v-for="row in rows">
                  <!-- @slot Slot to replace the default rendering of a row -->
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
                            <!-- @slot Slot to customize a specific column -->
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

          <tfoot v-if="showTotalsInFooter">
            <tr>
              <PDataTableCellNew
                  v-for="(total, index) in totals"
                  :key="`total-cell-${index}`"
                  total
                  :total-in-footer="showTotalsInFooter"
                  :value="index === 0 ? 'Totals' : total"
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
  import { Component, Vue, Prop } from 'vue-property-decorator';

  import PDataTableCellNew from './PDataTableCellNew.vue';
  import PDataTableCell from './PDataTableCell.vue';
  import { PPagination, PPaginationDescriptor } from '@/components/PPagination';
  import { PFilter } from '@/components/PFilter';
  import { PSpinner } from '@/components/PSpinner';
  import { ComplexAction, LinkAction } from '@/types';
  import { PEmptyState } from '@/components/PEmptyState';

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
    content: string,
    /** Header value */
    value: string,
    /** Value type */
    type: string,
    /** Sortable values */
    sortable?: boolean,
    /** Header width */
    width?: string,
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
    components: {PDataTableCellNew, PPagination, PFilter, PSpinner, PEmptyState, PDataTableCell},
  })
  export default class PDataTableNew extends Vue {

    /**
     * Type of a column
     * @values text | numeric
     */
    @Prop({type: Array, default: () => [], required: true}) public columnContentTypes!: ColumnContentType[];

    /**
     * The direction to sort the table rows on first click or keypress
     * of a sortable column heading
     * @values ascending | descending | none
     */
    @Prop({type: String, default: 'ascending'}) public defaultSortDirection!: SortDirection;

    /**
     * Table data
     */
    @Prop({type: [String, Number]}) public footerContent!: TableData;

    /**
     * Heading list
     */
    @Prop({type: Array, default: () => []}) public headings!: Headings[];

    /**
     * Table rows
     */
    @Prop({type: Array, default: () => [[]]}) public rows!: TableData[][];

    /**
     * Display totals on footer
     * @values true | false
     */
    @Prop({type: Boolean, default: false}) public showTotalsInFooter!: boolean;

    /**
     * Total fields
     */
    @Prop({type: Array, default: () => []}) public totals!: TableData[];

    /**
     * Custom totals row heading
     */
    @Prop({type: Object, default: () => ({})}) public totalsName!: object;

    /**
     * truncate cell data
     * @values true | false
     */
    @Prop({type: Boolean, default: false}) public truncate!: boolean;

    /**
     * Vertical align of cell
     */
    @Prop({type: String, default: 'top'}) public verticalAlign!: VerticalAlign;

    /**
     * Define sort column and direction
     * @values {value: 'columnName', direction: 'sortDirection'}
     */
    @Prop({type: Object, default: () => ({})}) public sort!: Sort;

    /**
     * Display only search filter
     * @values true | false
     */
    @Prop({type: Boolean, default: false}) public hasFilter!: boolean;

    /**
     * Search Placeholder
     * @deprecation
     */
    @Prop({type: String, default: null}) public searchPlaceholder!: string;

    /**
     * Data table has pagination
     * @values true | false
     */
    @Prop({type: Boolean, default: false}) public hasPagination!: boolean;

    /**
     * Data table is loading
     * @values true | false
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
      default: 'https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png'
    }) public emptyStateImage!: string;

    //============Deprecated Props============
    /**
     * Handle action events for the button.
     * @deprecated
     */
    @Prop({ type: Array, default: () => [] }) public actions!: ComplexAction[];

    /**
     * Data ids
     * @deprecated
     */
    @Prop({ type: Array, default: () => [] }) public ids!: number[];

    private handleDeprecations() {
      if (this.searchPlaceholder != null) {
        console.error('Deprecation Notice: `searchPlaceholder` will be removed in version 3.0.0, use `resourceName` instead. ' +
            'Please check resourceName syntax here: https://polaris-vue.hulkapps.com/?path=/docs/lists-tables-filter--filter');
      }
      if(this.actions.length > 0) {
        console.error('Deprecation Notice: `actions` will be removed in version 3.0.0, use `headings` with extra object. ' +
            'Please check new example of DataTable: https://polaris-vue.hulkapps.com/?path=/docs/lists-tables-data-table-slot--row-slot');
      }
      if(this.ids.length > 0) {
        console.error('Deprecation Notice: `ids` will be removed in version 3.0.0. ' +
            'Please check new example of DataTable: https://polaris-vue.hulkapps.com/?path=/docs/lists-tables-data-table-slot--row-slot');
      }
    }

    public get hasOldRows() {
      return this.rows.length > 0 && this.rows[0].constructor === Array;
    }

    //============Deprecated Props END============

    public topPadding = 8;

    public get hasActions() {
      return this.actions && this.actions.length > 0;
    }

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

    public get resource() {
      if (this.searchPlaceholder != null) {
        return {
          singular: this.searchPlaceholder,
          plural: this.searchPlaceholder,
        }
      } else {
        return this.$attrs.resourceName;
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
