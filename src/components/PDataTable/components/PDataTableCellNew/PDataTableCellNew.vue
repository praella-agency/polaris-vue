<template>
  <th v-if="header" data-polaris-header-cell="true" :class="className" :width="width" scope="col"
      :aria-sort="sortLabel">
    <template v-if="sortable">
      <button :class="headerClassName" @click="handleSortChange">
        <span class="Polaris-DataTable__Icon">
          <PIcon :source="source"/>
        </span>
        {{ content }}
      </button>
    </template>
    <template v-else>
      {{ content }}
    </template>
  </th>
  <th v-else-if="firstColumn" scope="row" :class="className">
    <slot :name="`item.${headerValue}`" :item="headerValue">
      {{ value }}
    </slot>
  </th>
  <td v-else :class="className">
    <slot :name="`item.${headerValue}`" :item="headerValue">
      {{ value }}
    </slot>
  </td>
</template>

<script lang="tsx">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { classNames, variationName } from '@/utilities/css';
  import { PIcon } from '@/components/PIcon';

  type SortDirection = 'ascending' | 'descending' | 'none';
  type VerticalAlign = 'top' | 'bottom' | 'middle' | 'baseline';

  interface Sort {
    value: string;
    direction: SortDirection;
  }

  @Component({
    components: {
      PIcon,
    },
  })
  export default class PDataTableCellNew extends Vue {
    @Prop(Boolean) public header!: boolean;
    @Prop() public content!: string | number;
    @Prop() public value!: any;
    @Prop([String, Number]) public width!: string | number;
    @Prop(Object) public sort!: Sort;
    @Prop({type: Boolean, default: true}) public sortable!: boolean;
    @Prop({type: String, default: 'ascending'}) public defaultSortDirection!: SortDirection;
    @Prop(String) public contentType!: string;
    @Prop(Boolean) public firstColumn!: boolean;
    @Prop(Boolean) public truncate!: boolean;
    @Prop({type: String, default: 'top'}) public verticalAlign!: VerticalAlign;
    @Prop(Boolean) public total!: boolean;
    @Prop(Boolean) public totalInFooter!: boolean;
    @Prop(String) public headerValue!: string;

    public get className() {
      return classNames(
        'Polaris-DataTable__Cell',
        this.firstColumn && 'Polaris-DataTable__Cell--firstColumn',
        this.firstColumn && this.truncate && 'Polaris-DataTable__Cell--truncated',
        this.header && 'Polaris-DataTable__Cell--header',
        this.total && 'Polaris-DataTable__Cell--total',
        this.totalInFooter && 'Polaris-DataTable--cellTotalFooter',
        this.numeric && 'Polaris-DataTable__Cell--numeric',
        this.sorted && 'Polaris-DataTable__Cell--sorted ',
        this.sortable && 'Polaris-DataTable__Cell--sortable',
        this.verticalAlign && `Polaris-DataTable__Cell--${variationName('verticalAlign', this.verticalAlign)}`,
      );
    }

    public get headerClassName() {
      return classNames(
        'Polaris-DataTable__Heading',
        this.contentType === 'text' && 'Polaris-DataTable__Heading--left',
      );
    }

    public get direction() {
      return this.sorted && this.sort.direction ? this.sort.direction : this.defaultSortDirection;
    }

    public get source() {
      return this.direction === 'descending' ? 'CaretDownMinor' : 'CaretUpMinor';
    }

    public get numeric() {
      return this.contentType === 'numeric';
    }

    public get sorted() {
      return this.sort && this.sort.value === this.value;
    }

    public get sortLabel() {
      return this.sort && this.sort.value === this.value ? this.sort.direction : '';
    }

    public handleSortChange() {
      const direction = this.sort.direction === 'ascending' ? 'descending' : 'ascending';
      this.$emit('sort-changed', this.value, direction);
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
