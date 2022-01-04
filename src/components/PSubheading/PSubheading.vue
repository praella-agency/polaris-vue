<template>
  <component :is="element" :class="className">
    <!-- @slot Text to display in subheading -->
    <slot/>
  </component>
</template>

<script>
import StringValidator from '../../utilities/validators/StringValidator';

const HeadingTagName = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'];

/**
 * <br/>
 * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
 *  sans-serif;">Subheadings are used for the title of any sub-sections in top-level page sections.</h4>
 */
export default {
  name: 'PSubheading',
  props: {
    /**
     * Element for heading.
     */
    element: {
      type: String,
      default: 'h3',
      ...StringValidator('element', HeadingTagName)
    }
  },
  computed: {
    className() {
      return 'Polaris-Subheading';
    }
  }
}
</script>
