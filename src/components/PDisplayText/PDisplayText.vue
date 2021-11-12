<template>
  <component :is="element" :class="className">
    <!-- @slot Content to display -->
    <slot/>
  </component>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames, variationName } from '@/utilities/css';

type Size = 'small' | 'medium' | 'large' | 'extraLarge';
type HeadingTagName = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

/**
 * <br/>
 * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
 *  sans-serif;">Display styles make a bold visual statement. Use them to create impact when the main goal is visual
 *  storytelling. For example, use display text to convince or reassure merchants such as in marketing content or to
 *  capture attention during onboarding.</h4>
 */
@Component
export default class PDisplayText extends Vue {
  /**
   * Size of the text
   * @values small | medium | large | extraLarge
   */
  @Prop({ type: String, default: 'medium' }) public size!: Size;

  /**
   * Element of text
   * @values h1...h6 | p | span
   */
  @Prop({ type: String, default: 'p' }) public element!: HeadingTagName;

  public get className() {
    return classNames(
      'Polaris-DisplayText',
      this.size && `Polaris-DisplayText--${variationName('size', this.size)}`,
    );
  }
}
</script>
