<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames, variationName } from '@/utilities/css';

type SortDirection = 'ascending' | 'descending' | 'none';
type VerticalAlign = 'top' | 'bottom' | 'middle' | 'baseline';

@Component
export default class PDataTableCell extends Vue {
  @Prop() public content!: string | number;
  @Prop(String) public contentType!: string;
  @Prop(Boolean) public firstColumn!: boolean;
  @Prop(Boolean) public truncate!: boolean;
  @Prop(Boolean) public header!: boolean;
  @Prop(Boolean) public total!: boolean;
  @Prop(Boolean) public totalInFooter!: boolean;
  @Prop({ type: String, default: 'top' }) public verticalAlign!: VerticalAlign;

  public render(h: any) {
    const headingMarkup = this.header ? (
      <th
        data-polaris-header-cell='true'
        class={this.className}
        scope='col'>
        {this.content}
      </th>
    ) : (
      <th class={this.className} scope='row'>
        {this.content}
      </th>
    );

    const cellMarkup =
      this.header || this.firstColumn ? (
        headingMarkup
      ) : (
        <td class={this.className}>{this.content}</td>
      );

    return cellMarkup;
  }

  public get className() {
    return classNames(
      'Polaris-DataTable__Cell',
      this.firstColumn && 'Polaris-DataTable__Cell--firstColumn',
      this.firstColumn && this.truncate && 'Polaris-DataTable__Cell--truncated',
      this.header && 'Polaris-DataTable__Cell--header',
      this.total && 'Polaris-DataTable__Cell--total',
      this.totalInFooter && 'Polaris-DataTable--cellTotalFooter',
      this.numeric && 'Polaris-DataTable__Cell--numeric',
      this.verticalAlign && `Polaris-DataTable__Cell--${variationName('verticalAlign', this.verticalAlign)}`,
    );
  }

  public get numeric() {
    return this.contentType === 'numeric';
  }
}
</script>
