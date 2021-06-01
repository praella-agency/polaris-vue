<template>
  <div :class="className"></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames, variationName } from '@/utilities/css';

type Size = 'small' | 'medium' | 'large' | 'extraLarge';

@Component
export default class PSkeletonDisplayText extends Vue {
  /**
   * Size of Skeleton
   * @values small | medium | large | extraLarge
   */
  @Prop({ type: String, default: 'medium' }) public size!: Size;

  public get className() {
    return classNames(
      'Polaris-SkeletonDisplayText__DisplayText',
      this.size && `Polaris-SkeletonDisplayText--${variationName('size', this.size)}`,
    );
  }
}
</script>
