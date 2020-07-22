<template>
  <div :class="className">
    <slot/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames, variationName } from '@/utilities/css';

@Component
export default class PLayoutSection extends Vue {
  @Prop(Boolean) public secondary!: boolean;
  @Prop(Boolean) public fullWidth!: boolean;
  @Prop(Boolean) public oneHalf!: boolean;
  @Prop(Boolean) public oneThird!: boolean;

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
