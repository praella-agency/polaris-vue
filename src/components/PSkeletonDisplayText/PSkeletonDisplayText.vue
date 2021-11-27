<template>
  <div :class="className"></div>
</template>

<script>
import { classNames, variationName } from '../../utilities/css';
import StringValidator from '../../utilities/validators/StringValidator';

const Size = ['small', 'medium', 'large', 'extraLarge'];

/**
 * <br/>
 * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
 *  sans-serif;">Skeleton display text is used to provide a low fidelity representation of content before it appears on
 *  the page, and improves load times perceived by merchants. Can be used for content in or outside of a card.</h4>
 */
export default {
  name: 'PSkeletonDisplayText',
  props: {
    /**
     * Size of Skeleton
     * @values small | medium | large | extraLarge
     */
    size: {
      type: String,
      default: 'medium',
      ...StringValidator('size', Size)
    }
  },
  computed: {
    className() {
      return classNames(
          'Polaris-SkeletonDisplayText__DisplayText',
          this.size && `Polaris-SkeletonDisplayText--${variationName('size', this.size)}`,
      );
    }
  },
}
</script>
