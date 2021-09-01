<script lang="tsx">
import {Component, Vue, Prop} from 'vue-property-decorator';
import {classNames, variationName} from '@/utilities/css';
import ComponentHelpers from '../../ComponentHelpers';
import {PButtonGroupItem} from '@/components/PButtonGroup';

type Spacing = 'extraTight' | 'tight' | 'loose';

/**
 * <br/>
 * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
 *  sans-serif;">Button group displays multiple related actions stacked or in a horizontal row to help with arrangement
 *  and spacing.</h4>
 */
@Component
export default class PButtonGroup extends Vue {

  /**
   * Remove top left and right border radius
   * @values true | false
   */
  @Prop({type: Boolean, default: false}) public segmented!: boolean;

  /**
   * Buttons will stretch/shrink to occupy the full width
   * @values true | false
   */
  @Prop({type: Boolean, default: false}) public fullWidth!: boolean;

  /**
   * Remove top left and right border radius
   * @values true | false
   */
  @Prop({type: Boolean, default: false}) public connectedTop!: boolean;

  /**
   * Remove top left and right border radius
   * @values loose, tight, extraTight
   */
  @Prop({type: String, default: null}) public spacing!: Spacing;

  public get className() {
    return classNames(
        'Polaris-ButtonGroup',
        this.segmented && 'Polaris-ButtonGroup--segmented',
        this.fullWidth && 'Polaris-ButtonGroup--fullWidth',
        this.connectedTop && 'Polaris-ButtonGroup--connectedTop',
        this.spacing && `Polaris-ButtonGroup--${this.spacing}`,
    );
  }

  public render(createElement: any) {
    return createElement('div', {
          class: this.className,
          attrs: {
            'data-buttongroup-segmented': this.segmented,
            'data-buttongroup-full-width': this.fullWidth,
            'data-buttongroup-connected-top': this.connectedTop,
          },

        },
        ComponentHelpers.wrapNodesWithComponent(createElement,
            this.$slots.default || [], PButtonGroupItem),
    );
  }
}
</script>
