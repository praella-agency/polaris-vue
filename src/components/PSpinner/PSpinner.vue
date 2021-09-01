<template>
  <img :src="`data:image/svg+xml;utf8,${spinnerSVG}`" :class="className">
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames, variationName } from '@/utilities/css';
import { encode as encodeSVG, encode } from '@/utilities/svg';
import { spinnerLarge, spinnerSmall } from './images';

type Color = 'white' | 'teal' | 'inkLightest';
type Size = 'small' | 'large';

const COLORS_FOR_LARGE_SPINNER = ['teal', 'inkLightest'];

/**
 * <br/>
 * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
 *  sans-serif;">Spinners are used to notify merchants that their action is being processed. For loading states,
 *  spinners should only be used for content that can’t be represented with skeleton loading components, like for data
 *  charts.</h4>
 */
@Component
export default class PSpinner extends Vue {
  /**
   * Color for spinner
   * @values white | teal | inkLightest
   */
  @Prop({ type: String, default: 'teal' }) public color!: Color;
  /**
   * Size of spinner.
   * @values small | large
   */
  @Prop({ type: String, default: 'large' }) public size!: Size;

  public type: string = '';

  public get className() {
    return classNames(
      'Polaris-Spinner',
      this.color && `Polaris-Spinner--${variationName('color', this.color)}`,
      this.size && `Polaris-Spinner--${variationName('size', this.size)}`,
    );
  }

  public get spinnerSVG() {
    const svg: string = this.size === 'large' ? spinnerLarge : spinnerSmall;
    return encodeSVG(svg);
  }
}
</script>
