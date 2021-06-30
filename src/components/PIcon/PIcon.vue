<template>
  <span :class="className">
    <div v-if="source === 'placeholder'" class="Polaris-Icon--Placeholder"/>
    <!-- <img
      v-else
      class="Polaris-Icon--Img"
      :src="`data:image/svg+xml;utf8,${encodedSource}`"
      alt=""
      aria-hidden="true"
    /> -->
    <div v-else v-html="enhancedSource"></div>
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import * as Icon from '@/assets/shopify-polaris-icons';
import { classNames, variationName } from '@/utilities/css';
import { encode as encodeSVG } from '@/utilities/svg';

type Color =
  | 'white'
  | 'black'
  | 'skyLighter'
  | 'skyLight'
  | 'sky'
  | 'skyDark'
  | 'inkLightest'
  | 'inkLighter'
  | 'inkLight'
  | 'ink'
  | 'blueLighter'
  | 'blueLight'
  | 'blue'
  | 'blueDark'
  | 'blueDarker'
  | 'indigoLighter'
  | 'indigoLight'
  | 'indigo'
  | 'indigoDark'
  | 'indigoDarker'
  | 'tealLighter'
  | 'tealLight'
  | 'teal'
  | 'tealDark'
  | 'tealDarker'
  | 'greenLighter'
  | 'green'
  | 'greenDark'
  | 'yellowLighter'
  | 'yellow'
  | 'yellowDark'
  | 'orange'
  | 'redLighter'
  | 'red'
  | 'redDark'
  | 'purple';

const COLORS_WITH_BACKDROPS = [
  'teal',
  'tealDark',
  'greenDark',
  'redDark',
  'yellowDark',
  'ink',
  'inkLighter',
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
   *
   * @description true | false
   */
  @Prop({type: Boolean, default: false}) public backdrop!: boolean;

  public get className() {
    return classNames(
      'Polaris-Icon',
      this.color && `Polaris-Icon--${variationName('color', this.color)}`,
      this.color && this.color !== 'white' && 'Polaris-Icon--isColored',
      this.backdrop && 'Polaris-Icon--hasBackdrop',
    );
  }

  public get encodedSource() {
    return encodeSVG(this.source);
  }

  public get enhancedSource() {
    const sourceIcon = Icon[this.source];
    if (!sourceIcon) {
      return this.source.replace('<svg', '<svg class="Polaris-Icon__Svg"');
    }
    return sourceIcon.replace('<svg', '<svg class="Polaris-Icon__Svg"');
  }
}
</script>
