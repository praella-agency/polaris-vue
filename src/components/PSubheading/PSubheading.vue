<template>
  <component :is="element" :class="className">
    <!-- @slot Text to display in subheading -->
    <slot/>
  </component>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

type HeadingTagName = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';

/**
 * <br/>
 * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
 *  sans-serif;">Subheadings are used for the title of any sub-sections in top-level page sections.</h4>
 */
@Component
export default class PSubheading extends Vue {
  /**
   * Element for heading
   * @values h1 | h2 | h3 | h4 | h5 | h6 | p
   */
  @Prop({ type: String, default: 'h3' }) public element!: HeadingTagName;

  public get className() {
    return 'Polaris-Subheading';
  }
}
</script>
