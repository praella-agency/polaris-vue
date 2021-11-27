<template>
  <div :class="className"></div>
</template>

<script>
import { classNames, variationName } from '../../utilities/css';
import StringValidator from '../../utilities/validators/StringValidator';

const Size = ['small', 'medium', 'large'];

/**
 * <br/>
 * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
 *  sans-serif;">Skeleton thumbnail is used to provide a low fidelity representation of an image before it appears on
 *  the page, and improves load times perceived by merchants. Use for thumbnails in or outside of a card.</h4>
 */
export default {
  name: 'PSkeletonThumbnail',
  props: {
    /**
     * Size of Skeleton
     * @values 'small' | 'medium' | 'large'
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
          'Polaris-SkeletonThumbnail',
          this.size && `Polaris-SkeletonThumbnail--${variationName('size', this.size)}`,
      );
    }
  },
}
</script>
