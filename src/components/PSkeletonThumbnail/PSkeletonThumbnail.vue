<template>
  <div :class="className"></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames, variationName } from '@/utilities/css';

type Size = 'small' | 'medium' | 'large';

@Component
export default class PSkeletonThumbnail extends Vue {
  /**
   * Size of Skeleton
   * @values 'small' | 'medium' | 'large'
   */
  @Prop({ type: String, default: 'medium' }) public size!: Size;

  public get className() {
    return classNames(
      'Polaris-SkeletonThumbnail',
      this.size && `Polaris-SkeletonThumbnail--${variationName('size', this.size)}`,
    );
  }
}
</script>
