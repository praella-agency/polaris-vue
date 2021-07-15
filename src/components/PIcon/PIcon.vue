<template>
  <span :class="className" :aria-label="accessibilityLabel">
    <div v-if="source === 'placeholder'" class="Polaris-Icon__Placeholder" />
    <img
      v-else-if="source === 'external'"
      class="Polaris-Icon__Img"
      :src="`data:image/svg+xml;utf8,${encodedSource}`"
      alt=""
      aria-hidden="true"
    />
    <div
       v-else
       v-html="enhancedSource"
    />
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import {DeprecatedIcons} from './index';
import * as Icon from '@/assets/shopify-polaris-icons/index';
import { classNames, variationName } from '@/utilities/css';
import { encode as encodeSVG } from '@/utilities/svg';
import { Color } from '@/types';

const COLORS_WITH_BACKDROPS = [
  'base',
  'critical',
  'highlight',
  'success',
  'warning',
];

@Component
export default class PIcon extends Vue {

  /**
   * Icon to display
   * @see https://polaris-icons.shopify.com/?icon=AbandonedCartMajor available icon list.
   */
  @Prop({type: String, default: null}) public source!: 'placeholder' | string;

  /**
   * Icon color
   */
  @Prop({type: String, default: null}) public color!: Color;

  /**
   * Show a backdrop behind the icon
   * @values true | false
   */
  @Prop({type: Boolean, default: false}) public backdrop!: boolean;

  /**
   * Descriptive text to be read to screenreaders
   */
  @Prop({type: String, default: null}) public accessibilityLabel!: string;

  public get className() {
    return classNames(
      'Polaris-Icon',
      this.color && `Polaris-Icon--${variationName('color', this.color)}`,
      this.color && 'Polaris-Icon--applyColor',
      this.backdrop && 'Polaris-Icon--hasBackdrop',
    );
  }

  public get encodedSource() {
    return encodeSVG(this.source);
  }

  public get enhancedSource() {
    if (DeprecatedIcons.indexOf(this.source) > -1) {
      console.error('Deprecation Notice: You are using a deprecated icon `' + this.source + '`, please use new instead of this. Refer this link' +
              ' to get updated icons https://polaris-vue.hulkapps.com/?path=/story/images-icons-icon--icon');
    }

    const sourceIcon = Icon[this.source];
    if (!sourceIcon) {
      return this.source.replace('<svg', '<svg class="Polaris-Icon__Svg"');
    }
    return sourceIcon.replace('<svg', '<svg class="Polaris-Icon__Svg" focusable="false" aria-hidden="true"');
  }
}
</script>
