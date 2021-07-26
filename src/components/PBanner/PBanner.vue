<template>
  <div :class="className">
    <div v-if="isDismissable" class="Polaris-Banner__Dismiss">
      <!--
        Triggered to dismiss the banner
        @event dismiss
      -->
      <PButton
        plain
        icon="CancelSmallMinor"
        @click="$emit('dismiss', $event)">
      </PButton>
    </div>
    <div class="Polaris-Banner__Ribbon">
      <PIcon
        :source="colorAndIcon.icon"
        :color="colorAndIcon.color" />
    </div>
    <div class="Polaris-Banner__ContentWrapper">
      <div v-if="title" class="Polaris-Banner__Heading">
        <PHeading element="p">{{ title }}</PHeading>
      </div>
      <div class="Polaris-Banner__Content">
        <!-- @slot Banner content -->
        <slot/>
        <div v-if="Object.keys(action).length > 0" class="Polaris-Banner__Actions">
          <PButtonGroup>
            <div class="Polaris-Banner__PrimaryAction">
              <PButtonsFrom :actions="action" :overrides="{ outline: true }"/>
            </div>
          </PButtonGroup>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames, variationName } from '@/utilities/css';

import { PIcon } from '@/components/PIcon';
import { PButton } from '@/components/PButton';
import { PHeading } from '@/components/PHeading';
import { PButtonGroup } from '@/components/PButtonGroup';
import { PButtonsFrom } from '@/components/PButton/utils';
import {
  DisableableAction,
  LoadableAction,
} from '@/types';
type BannerStatus = 'success' | 'info' | 'warning' | 'critical';

@Component({
  components: {
    PIcon, PButton, PHeading,
    PButtonGroup, PButtonsFrom,
  },
})
export default class PBanner extends Vue {

  /**
   * Title content for the banner.
   */
  @Prop({type: String, default: null}) public title!: string;

  /**
   * Set the status of the banner
   * @values success | info | warning | critical
   */
  @Prop({type: String, default: null}) public status!: string;

  /**
   * Action of the banner
   */
  @Prop({type: Object, default: {}}) public action!: DisableableAction & LoadableAction;

  public get className() {
    return classNames(
      'Polaris-Banner',
      'Polaris-Banner--withinPage',
      this.isDismissable && 'Polaris-Banner--hasDismiss',
      this.status && `Polaris-Banner--${variationName('status', this.status)}`,
    );
  }

  public get isDismissable() {
    return this.$listeners && this.$listeners.dismiss;
  }

  public get colorAndIcon() {
    let color;
    let icon;

    switch (this.status) {
      case 'success':
        color = 'success';
        icon = 'CircleTickMajor';
        break;
      case 'info':
        color = 'highlight';
        icon = 'CircleInformationMajor';
        break;
      case 'warning':
        color = 'warning';
        icon = 'CircleAlertMajor';
        break;
      case 'critical':
        color = 'critical';
        icon = 'DiamondAlertMajor';
        break;
      default:
        color = 'base';
        icon = 'CircleInformationMajor';
    }

    return { color, icon };
  }
}
</script>
