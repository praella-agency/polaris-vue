<script lang="tsx">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { classNames } from '@/utilities/css';

  @Component

  export default class PButtonGroup extends Vue {
    @Prop(Boolean) public segmented!: boolean;
    @Prop(Boolean) public fullWidth!: boolean;
    @Prop(Boolean) public connectedTop!: boolean;

    public get className() {
      return classNames(
              'Polaris-ButtonGroup',
              this.segmented && 'Polaris-ButtonGroup--segmented',
              this.fullWidth && 'Polaris-ButtonGroup--fullWidth',
              this.connectedTop && 'Polaris-ButtonGroup--connectedTop',
      );
    }

    public render(h: any) {

        return (
            <div class={this.className}
                 data-buttongroup-segmented={this.segmented}
                 data-buttongroup-full-width={this.fullWidth}
                 data-buttongroup-connected-top={this.connectedTop}>
                {(this.$slots.default || []).map((item: any) => (
                    <div class='Polaris-ButtonGroup__Item'>
                        {item}
                    </div>
                ))}
            </div>
        );
    }
  }
</script>
