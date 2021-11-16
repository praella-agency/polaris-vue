<template>
  <th v-if="firstColumn" scope="row" :class="className">
    <slot/>
  </th>
  <td v-else :class="className">
    <slot/>
  </td>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { classNames, variationName } from '@/utilities/css';

  type VerticalAlign = 'top' | 'bottom' | 'middle' | 'baseline';

  @Component
  export default class PDataTableCol extends Vue {
    /**
     * First Column of a table
     */
    @Prop({type: Boolean, default: false}) public firstColumn!: boolean;

    /**
     * Truncate content in first column instead of wrapping
     */
    @Prop({type: Boolean, default: false}) public truncate!: boolean;

    /**
     * Numeric column of a table
     */
    @Prop({type: Boolean, default: false}) public numeric!: boolean;

    /**
     * Vertical alignment of content in the cells
     */
    @Prop({type: String, default: 'top'}) public verticalAlign!: VerticalAlign;

    public get className() {
      return classNames(
        'Polaris-DataTable__Cell',
        this.firstColumn && 'Polaris-DataTable__Cell--firstColumn',
        this.firstColumn && this.truncate && 'Polaris-DataTable__Cell--truncated',
        this.numeric && 'Polaris-DataTable__Cell--numeric',
        this.verticalAlign && `Polaris-DataTable__Cell--${variationName('verticalAlign', this.verticalAlign)}`,
      );
    }
  }
</script>

<style scoped>
  th:last-child {
    text-align: right;
  }

  td:last-child {
    text-align: right;
  }

  td:last-child > * {
    float: right;
  }
</style>