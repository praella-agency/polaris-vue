<template>
  <div class="Polaris-DataTable">
    <div class="Polaris-DataTable__ScrollContainer">
      <table class="Polaris-DataTable__Table">
        <thead>
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
        </thead>
        <tbody>
          <tr
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
    <div v-if="footerContent" class="Polaris-DataTable__Footer">{{ footerContent }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames, variationName } from '@/utilities/css';

import PDataTableCell from './PDataTableCell.vue';

type TableData = string | number;
type ColumnContentType = 'text' | 'numeric';
type SortDirection = 'ascending' | 'descending' | 'none';
type VerticalAlign = 'top' | 'bottom' | 'middle' | 'baseline';

@Component({
  components: { PDataTableCell },
})
export default class PDataTable extends Vue {
  @Prop({ type: Array, default: () => [] }) public columnContentTypes!: ColumnContentType[];
  @Prop({ type: Array, default: () => [] }) public headings!: string[];
  @Prop({ type: Array, default: () => [] }) public totals!: TableData[];
  @Prop(Boolean) public showTotalsInFooter!: boolean;
  @Prop({ type: Array, default: () => [[]] }) public rows!: TableData[][];
  @Prop({ type: Boolean, default: false }) public truncate!: boolean;
  @Prop({ type: String, default: 'top' }) public verticalAlign!: VerticalAlign;
  @Prop() public footerContent!: TableData;
}
</script>
