<template>
  <component :is="element" class="Polaris-Heading">
    <!-- @slot Heading content -->
    <slot/>
  </component>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

type HeadingTagName = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';

/**
 * <br/>
 * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
 *  sans-serif;">Headings are used as the titles of each major section of a page in the interface. For example,
 *  <a href="https://polaris-vue.hulkapps.com/?path=/docs/structure-card--card">card components</a>
 *  generally use headings as their title.</h4>
 */
@Component
export default class PHeading extends Vue {

  /**
   * The element name to use for the heading
   * @values h1, h2, h3, h4, h5, h6, p
   */
  @Prop({ type: String, default: 'h2' }) public element!: HeadingTagName;
}
</script>
