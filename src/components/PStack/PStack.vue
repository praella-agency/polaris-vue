<template>
  <div :class="className">
    <!-- @slot Stack content -->
    <slot/>
  </div>
</template>
<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames, variationName } from '@/utilities/css';

/**
 * @requires PStackItem
 */
import PStackItem from './PStackItem.vue';

type Spacing = 'extraTight' | 'tight' | 'loose' | 'extraLoose' | 'none';
type Alignment = 'leading' | 'trailing' | 'center' | 'fill' | 'baseline';
type Distribution = 'equalSpacing' | 'leading' | 'trailing' | 'center' | 'fill' | 'fillEvenly';


/**
 * <br/>
 * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
 *  sans-serif;">Use to lay out a horizontal row of components or to achieve no-fuss vertical centering. A stack is made
 *  of flexible items that wrap each of the stack’s children. Options provide control of the wrapping, spacing, and
 *  relative size of the items in the stack.</h4>
 */
@Component({
  components: {PStackItem},
})
export default class PStack extends Vue {
  /**
   * Set it true of you need items in vertical
   * @values true | false
   */
  @Prop(Boolean) public vertical!: boolean;
  /**
   * Set it true for Word-Wrap
   * @values true | false
   */
  @Prop({ type: Boolean, default: true }) public wrap!: boolean;
  /**
   * Space between two items -
   * @values extraTight | tight | loose | extraLoose | none
   */
  @Prop({type: String, default: null}) public spacing!: Spacing;
  /**
   * Distribution of free space among items
   * @values equalSpacing | leading | trailing | center | fill | fillEvenly
   */
  @Prop({type: String, default: null}) public distribution!: Distribution;
  /**
   * Alignment of items
   * @values leading | trailing | center | fill | baseline
   */
  @Prop({type: String, default: null}) public alignment!: Alignment;

  public get className() {
    return classNames(
      'Polaris-Stack',
      this.vertical && 'Polaris-Stack--vertical',
      this.spacing && `Polaris-Stack--${variationName('spacing', this.spacing)}`,
      this.distribution && `Polaris-Stack--${variationName('distribution', this.distribution)}`,
      this.alignment && `Polaris-Stack--${variationName('alignment', this.alignment)}`,
      !this.wrap && 'Polaris-Stack--noWrap',
    );
  }
}
</script>
