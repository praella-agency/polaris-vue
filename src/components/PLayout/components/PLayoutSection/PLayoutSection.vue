<template>
  <div :class="className">
    <!-- @slot Default -->
    <slot/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames } from '@/utilities/css';

@Component
export default class PLayoutSection extends Vue {
  /**
   * Set it true to make it secondary.
   * @values true | false
   */
  @Prop({type: Boolean, default: false}) public secondary!: boolean;
  /**
   * Set it true to make it full width.
   * @values true | false
   */
  @Prop({type: Boolean, default: false}) public fullWidth!: boolean;
  /**
   * Set it true to make it one half.
   * @values true | false
   */
  @Prop({type: Boolean, default: false}) public oneHalf!: boolean;
  /**
   * Set it true to make it one third.
   * @values true | false
   */
  @Prop({type: Boolean, default: false}) public oneThird!: boolean;

  public get className() {
    return classNames(
      'Polaris-Layout__Section',
      this.secondary && 'Polaris-Layout__Section--secondary',
      this.fullWidth && 'Polaris-Layout__Section--fullWidth',
      this.oneHalf && 'Polaris-Layout__Section--oneHalf',
      this.oneThird && 'Polaris-Layout__Section--oneThird',
    );
  }
}
</script>
