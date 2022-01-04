<template>
  <component :is="element" :class="className">
    <!-- @slot Content to display -->
    <slot/>
  </component>
</template>

<script>
import { classNames, variationName } from '../../utilities/css';
import StringValidator from '../../utilities/validators/StringValidator';

const Size = ['small', 'medium', 'large', 'extraLarge'];
const HeadingTagName = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'];

/**
 * <br/>
 * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
 *  sans-serif;">Display styles make a bold visual statement. Use them to create impact when the main goal is visual
 *  storytelling. For example, use display text to convince or reassure merchants such as in marketing content or to
 *  capture attention during onboarding.</h4>
 */

export default {
  name: 'PDisplayText',
  props: {
    /**
     * Size of the text
     */
    size: {
      type: String,
      default: 'medium',
      ...StringValidator('size', Size)
    },

    /**
     * Element of text
     */
    element: {
      type: String,
      default: 'p',
      ...StringValidator('element', HeadingTagName)
    },
  },
  computed: {
    className() {
      return classNames(
          'Polaris-DisplayText',
          this.size && `Polaris-DisplayText--${variationName('size', this.size)}`,
      );
    }
  },
}
</script>
