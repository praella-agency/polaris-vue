<template>
  <div>
    <PFilter v-if="$slots.hasOwnProperty('filter') || hasFilter" v-bind="$attrs" :resourceTitle="searchPlaceholder" @remove-tag="onRemoveFilter" @input="onFilterInputChanged">
      <slot name="filter" v-if="$slots.hasOwnProperty('filter')"></slot>
    </PFilter>
    <div class="Polaris-DataTable">
      <div class="Polaris-DataTable__ScrollContainer">
        <table class="Polaris-DataTable__Table">
          <thead ref="thead">
          <slot name="head" v-if="$slots.hasOwnProperty('head')"></slot>
          <template v-else>
            <tr>
              <PDataTableCell
                  @sort-changed="handleSortChange"
                  v-for="(heading, index) in headings"
                  :key="`heading-cell-${index}`"
                  header
                  :content="heading.content"
                  :value="heading.value"
                  :width="heading.width"
                  :sort="sort"
                  :sortable="heading.sortable"
                  :defaultSortDirection="defaultSortDirection"
                  :contentType="heading.type ? heading.type : columnContentTypes[index]"
                  :firstColumn="index === 0"
                  :truncate="truncate"
                  :verticalAlign="verticalAlign"/>

              <PDataTableCell
                  v-if="hasActions"
                  header
                  content="Actions"
                  :sortable="false"
                  contentType="text"
                  :firstColumn="false"
                  :truncate="false"
                  :verticalAlign="verticalAlign"/>
            </tr>
            <tr v-if="!showTotalsInFooter">
              <PDataTableCell
                  v-for="(total, index) in totals"
                  :key="`total-cell-${index}`"
                  total
                  :content="index === 0 ? 'Totals' : total"
                  :contentType="total !== '' && index > 0 ? 'numeric': columnContentTypes[index]"
                  :firstColumn="index === 0"
                  :truncate="truncate"
                  :verticalAlign="verticalAlign"/>

              <PDataTableCell
                  total
                  v-if="totals.length && hasActions"
                  :totalInFooter="showTotalsInFooter"
                  :verticalAlign="verticalAlign"/>
            </tr>
          </template>
          </thead>
          <tbody ref="tbody">
          <template v-if="loading">
            <tr class="Polaris-ResourceList__SpinnerContainer" :style="{'padding-top': `${topPadding}px`}">
              <PSpinner :size="!$slots.hasOwnProperty('body') && rows.length < 2 ? 'small' : 'large'" />
            </tr>
            <tr class="Polaris-ResourceList__LoadingOverlay"></tr>
          </template>
          <slot name="body" v-if="$slots.hasOwnProperty('body')"></slot>
          <tr v-else
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
                :verticalAlign="verticalAlign"/>

            <PDataTableCell
                v-if="hasActions"
                :actions="actions"
                :value="ids[rIndex]"
                :verticalAlign="verticalAlign"/>

          </tr>
          </tbody>
          <tfoot v-if="showTotalsInFooter">
          <tr>
            <PDataTableCell
                v-for="(total, index) in totals"
                :key="`total-cell-${index}`"
                total
                :totalInFooter="showTotalsInFooter"
                :content="index === 0 ? 'Totals' : total"
                :contentType="total !== '' && index > 0 ? 'numeric': columnContentTypes[index]"
                :firstColumn="index === 0"
                :truncate="truncate"
                :verticalAlign="verticalAlign"/>
            <PDataTableCell
                total
                v-if="totals.length && hasActions"
                :totalInFooter="showTotalsInFooter"
                :verticalAlign="verticalAlign"/>
          </tr>
          </tfoot>
        </table>
      </div>
      <div class="Polaris-DataTable__Pagination" v-if="hasPagination">
        <PPagination v-bind="pagination" />
      </div>
      <div v-if="footerContent" class="Polaris-DataTable__Footer">{{ footerContent }}</div>
    </div>
  </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { classNames, variationName } from '@/utilities/css';

    import PDataTableCell from './PDataTableCell.vue';
    import { PPagination, PPaginationDescriptor } from '@/components/PPagination';
    import { PFilter } from '@/components/PFilter';
    import { PSpinner } from '@/components/PSpinner';
    import { ComplexAction, LinkAction } from '@/types';

    type Status = 'success' | 'info' | 'attention' | 'warning' | 'new' | 'critical';
    type Progress = 'incomplete' | 'partiallyComplete' | 'complete';
    type Size = 'medium' | 'small';

    interface Badge {
        content?: string;
        status?: Status;
        progress?: Progress;
        size?: Size;
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
        components: { PDataTableCell, PPagination, PFilter, PSpinner },
    })

    export default class PDataTable extends Vue {

        /**
         * Type of a column
         * @values text, numeric
         */
        @Prop({ type: Array, default: () => [] }) public columnContentTypes!: ColumnContentType[];

        /**
         * Heading list
         */
        @Prop({ type: Array, default: () => [] }) public headings!: string[];

        /**
         * Heading list
         */
        @Prop({ type: Array, default: () => [] }) public headings2!: string[];

        /**
         * Total fields
         */
        @Prop({ type: Array, default: () => [] }) public totals!: TableData[];

        /**
         * Display totals on footer
         */
        @Prop(Boolean) public showTotalsInFooter!: boolean;

        /**
         * Display only search filter
         */
        @Prop(Boolean) public hasFilter!: boolean;

        /**
         * Table rows
         */
        @Prop({ type: Array, default: () => [[]] }) public rows!: TableData[][];

        /**
         * truncate cell data
         */
        @Prop({ type: Boolean, default: false }) public truncate!: boolean;

        /**
         * Vertical align of cell
         */
        @Prop({ type: String, default: 'top' }) public verticalAlign!: VerticalAlign;

        @Prop(Object) public sort!: Sort;

        @Prop({ type: String, default: 'ascending' }) public defaultSortDirection!: SortDirection;

        /**
         * Footer data
         */
        @Prop() public footerContent!: TableData;

        /**
         * Footer data
         */
        @Prop(String) public searchPlaceholder!: string;

        /**
         * Data table has pagination
         */
        @Prop(Boolean) public hasPagination!: boolean;

        /**
         * Data table is loading
         */
        @Prop(Boolean) public loading!: boolean;

        /**
         * Pagination object
         */
        @Prop(Object) public pagination!: PPaginationDescriptor;

        @Prop(Array) public actions!: ComplexAction[];

        @Prop(Array) public ids!: number[];

        public topPadding = 8;

        public get hasActions() {

            return this.actions && this.actions.length > 0;
        }

        public mounted() {

          let loadingPosition = 0;

          if (typeof window !== 'undefined') {

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

            this.$emit('filter-removed', tag);
        }

        public onFilterInputChanged(value) {

            this.$emit('input-filter-changed', value);
        }

        public handleSortChange(value, direction) {

            this.$emit('sort-changed', value, direction);
        }
    }
</script>

<style scoped>
  .Polaris-DataTable__Pagination {
    text-align: center;
    padding: 1.6rem;
  }
</style>
