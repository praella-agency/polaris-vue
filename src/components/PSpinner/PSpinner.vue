<template>
  <img :src="`data:image/svg+xml;utf8,${spinnerSVG}`" :class="className" alt="">
</template>

<script>
import { classNames, variationName } from '@/utilities/css';
import { encode as encodeSVG } from '@/utilities/svg';
import { spinnerLarge, spinnerSmall } from './images';
import StringValidator from "./../../utilities/validators/StringValidator";

const Color = ['white', 'teal', 'inkLightest'];
const Size = ['small', 'large'];

const COLORS_FOR_LARGE_SPINNER = ['teal', 'inkLightest'];

/**
 * <br/>
 * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
 *  sans-serif;">Spinners are used to notify merchants that their action is being processed. For loading states,
 *  spinners should only be used for content that can’t be represented with skeleton loading components, like for data
 *  charts.</h4>
 */
export default {
  name: 'PSpinner',
  props: {
    /**
     * Color for spinner
     * @values white | teal | inkLightest
     */
    color: {
      type: String,
      default: 'teal',
      ...StringValidator('color', Color)
    },
    /**
     * Size of spinner.
     * @values small | large
     */
    size: {
      type: String,
      default: 'large',
      ...StringValidator('size', Size)
    }
  },
  computed: {
    className() {
      return classNames(
          'Polaris-Spinner',
          this.color && `Polaris-Spinner--${variationName('color', this.color)}`,
          this.size && `Polaris-Spinner--${variationName('size', this.size)}`,
      );
    },
    spinnerSVG() {
      const svg = this.size === 'large' ? spinnerLarge : spinnerSmall;
      if(typeof svg === 'string') {
        return encodeSVG(svg);
      }
    }
  },

}
</script>
