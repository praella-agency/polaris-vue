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
  @Prop(String) public spacing!: Spacing;
  /**
   * Distribution of free space among items
   * @values equalSpacing | leading | trailing | center | fill | fillEvenly
   */
  @Prop(String) public distribution!: Distribution;
  /**
   * Alignment of items
   * @values leading | trailing | center | fill | baseline
   */
  @Prop(String) public alignment!: Alignment;

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
