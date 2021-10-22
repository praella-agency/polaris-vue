<template>
  <div :class="className"></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames, variationName } from '@/utilities/css';

type Size = 'small' | 'medium' | 'large' | 'extraLarge';

/**
 * <br/>
 * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
 *  sans-serif;">Skeleton display text is used to provide a low fidelity representation of content before it appears on
 *  the page, and improves load times perceived by merchants. Can be used for content in or outside of a card.</h4>
 */
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
