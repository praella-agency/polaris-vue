<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames } from '@/utilities/css';

import { PButton } from '@/components/PButton';

@Component
export default class PButtonGroup extends Vue {
  @Prop(Boolean) public segmented!: boolean;
  @Prop(Boolean) public fullWidth!: boolean;
  @Prop(Boolean) public connectedTop!: boolean;

  public render(h: any) {
    return (
      <div class={this.className}>
        {(this.$slots.default || []).map((item: any) => {
          return (
            <div class='Polaris-ButtonGroup__Item'>
              {item}
            </div>
          );
        })}
      </div>
    );
  }

  public get className() {
    return classNames(
      'Polaris-ButtonGroup',
      this.segmented && 'Polaris-ButtonGroup--segmented',
      this.fullWidth && 'Polaris-ButtonGroup--fullWidth',
      this.connectedTop && 'Polaris-ButtonGroup--connectedTop',
    );
  }
}
</script>
