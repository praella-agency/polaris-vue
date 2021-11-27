<template>
  <div :class="className">
    <!-- @slot The content to render in the text container. -->
    <slot/>
  </div>
</template>

<script>
import { classNames, variationName } from '../../utilities/css';
import StringValidator from '../../utilities/validators/StringValidator';

const Spacing = ['tight', 'loose', null];

/**
 * <br/>
 * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
 *  sans-serif;">A text container is used to wrap text elements such as paragraphs, headings, and lists to give them
 *  vertical spacing.</h4>
 */
export default {
  name: 'PTextContainer',
  props: {
    /**
     * The amount of vertical spacing children will get between them.
     * @values tight | loose
     */
    spacing: {
      type: String,
      default: null,
      ...StringValidator('spacing', Spacing)
    }
  },
  computed: {
    className() {
      return classNames(
          'Polaris-TextContainer',
          this.spacing && `Polaris-TextContainer--${variationName('spacing', this.spacing)}`,
      );
    }
  }
}
</script>
