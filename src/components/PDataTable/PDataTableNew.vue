<template>
  <div>
    <PFilter v-if="$slots.hasOwnProperty('filter') || hasFilter" v-bind="$attrs" :resourceTitle="searchPlaceholder"
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
                    :content-type="heading.type ? heading.type : columnContentTypes[hIndex]"
                    :sortable="heading.sortable"
                    :sort="sort"
                    :default-sort-direction="defaultSortDirection"
                    :first-column="hIndex === 0"
                    :truncate="truncate"
                    :verticalAlign="verticalAlign"
                    @sort-changed="handleSortChange"
                />
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
            <template
                v-for="row in rows"
            >
              <!-- @slot Slot to replace the default rendering of a row -->
              <slot name="item" :item="row">

                <tr
                    class="Polaris-DataTable__TableRow"
                >

                  <template
                      v-for="(heading, hIndex) in headings"
                  >

                    <PDataTableCellNew
                        :value="row[heading.value]"
                        :header-value="heading.value"
                        :first-column="hIndex === 0"
                        :content-type="headings[hIndex].type ? headings[hIndex].type : columnContentTypes[hIndex]"
                        :truncate="truncate"
                        :vertical-align="verticalAlign"
                        :sortable="false"
                    >
                      <template v-slot:[`item.${heading.value}`]="slotProps">
                        <!-- @slot Slot to customize a specific column -->
                        <slot :name="`item.${heading.value}`" :item="row"/>
                      </template>
                    </PDataTableCellNew>
                  </template>

                </tr>

              </slot>
            </template>
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
            image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png">
        </PEmptyState>
      </slot>
    </div>
  </div>
</template>


<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';

  import PDataTableCellNew from './PDataTableCellNew.vue';
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

  interface Headers {
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
    components: {PDataTableCellNew, PPagination, PFilter, PSpinner, PEmptyState},
  })
  export default class PDataTableNew extends Vue {

    /**
     * Type of a column
     * @values text | numeric
     */
    @Prop({type: Array, default: () => [], required: true}) public columnContentTypes!: ColumnContentType[];

    /**
     * Heading list
     */
    @Prop({type: Array, default: () => []}) public headings!: Headers[];

    // /**
    //  * Heading list 2
    //  */
    // @Prop({ type: Array, default: () => [] }) public headings2!: string[];

    /**
     * Total fields
     */
    @Prop({type: Array, default: () => []}) public totals!: TableData[];

    /**
     * Display totals on footer
     * @values true | false
     */
    @Prop({type: Boolean, default: false}) public showTotalsInFooter!: boolean;

    /**
     * Display only search filter
     * @values true | false
     */
    @Prop({type: Boolean, default: false}) public hasFilter!: boolean;

    /**
     * Table rows
     */
    @Prop({type: Array, default: () => [[]]}) public rows!: TableData[][];

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
     * Search Placeholder
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
     * Handle action events for the button.
     */
    @Prop({type: Array, default: () => []}) public actions!: ComplexAction[];

    /**
     * Data ids
     */
    @Prop({type: Array, default: () => []}) public ids!: number[];

    /**
     * Display empty state if record not found!
     */
    @Prop({type: String, default: 'No record found!'}) public emptyStateTitle!: string;

    /**
     * Custom totals row heading
     */
    @Prop({type: Object, default: () => ({})}) public totalsName!: object;

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
