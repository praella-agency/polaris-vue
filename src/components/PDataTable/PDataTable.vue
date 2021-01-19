<template>
  <div>
    <PFilter v-if="$slots.hasOwnProperty('filter')" v-bind="$attrs" :resourceTitle="searchPlaceholder" @remove-tag="onRemoveFilter" @input="onFilterInputChanged">
      <slot name="filter"></slot>
    </PFilter>
    <div class="Polaris-DataTable">
      <div class="Polaris-DataTable__ScrollContainer">
        <table class="Polaris-DataTable__Table">
          <thead>
          <slot name="head" v-if="$slots.hasOwnProperty('head')"></slot>
          <template v-else>
            <tr>
              <PDataTableCell
                  v-for="(heading, index) in headings"
                  :key="`heading-cell-${index}`"
                  header
                  :content="heading"
                  :contentType="columnContentTypes[index]"
                  :firstColumn="index === 0"
                  :truncate="truncate"
                  :verticalAlign="verticalAlign"/>
            </tr>
            <tr v-if="!showTotalsInFooter">
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
            </tr>
          </template>
          </thead>
          <tbody>
          <slot name="body" v-if="$slots.hasOwnProperty('body')"></slot>
          <tr v-else
              class="Polaris-DataTable__TableRow"
              v-for="(row, rIndex) in rows"
              :key="`row-${rIndex}`">
            <PDataTableCell
                v-for="(content, cIndex) in row"
                :key="`cell-${cIndex}-row-${rIndex}`"
                :content="content"
                :contentType="columnContentTypes[cIndex]"
                :firstColumn="cIndex === 0"
                :truncate="truncate"
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
import {PPagination, PPaginationDescriptor} from '@/components/PPagination';

type TableData = string | number;
type ColumnContentType = 'text' | 'numeric';
type SortDirection = 'ascending' | 'descending' | 'none';
type VerticalAlign = 'top' | 'bottom' | 'middle' | 'baseline';

@Component({
  components: { PDataTableCell, PPagination },
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
   * Total fields
   */
  @Prop({ type: Array, default: () => [] }) public totals!: TableData[];

  /**
   * Display totals on footer
   */
  @Prop(Boolean) public showTotalsInFooter!: boolean;

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
   * Pagination object
   */
  @Prop(Object) public pagination!: PPaginationDescriptor;

  public onRemoveFilter(tag) {

      this.$emit('filter-removed', tag);
  }

  public onFilterInputChanged(value) {

      this.$emit('input-filter-changed', value);
  }
}
</script>

<style scoped>
  .Polaris-DataTable__Pagination {
    text-align: center;
    padding: 1.6rem;
  }
</style>
