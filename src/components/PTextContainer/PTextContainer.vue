<template>
  <div :class="className">
    <!-- @slot The content to render in the text container. -->
    <slot/>
  </div>
</template>

<script>
import { classNames, variationName } from '@/utilities/css';

const Spacing = 'tight' | 'loose';

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
      validator: function (value) {
        return ['tight', 'loose'].indexOf(value) !== -1;
      }
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
