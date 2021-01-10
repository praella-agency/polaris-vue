<template>
  <div :class="className">
    <div v-if="isDismissable" class="Polaris-Banner__Dismiss">
      <PButton
        plain
        :icon="CancelSmallMinor"
        @click="$emit('dismiss', $event)">
      </PButton>
    </div>
    <div class="Polaris-Banner__Ribbon">
      <PIcon
        :source="colorAndIcon.icon"
        :color="colorAndIcon.color"
        backdrop/>
    </div>
    <div>
      <div v-if="title" class="Polaris-Banner__Heading">
        <PHeading element="p">{{ title }}</PHeading>
      </div>
      <div class="Polaris-Banner__Content">
        <slot/>
        <div v-if="action" class="Polaris-Banner__Actions">
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
  CancelSmallMinor,
  CircleTickMajorTwotone,
  FlagMajorTwotone,
  CircleAlertMajorTwotone,
  CircleDisabledMajorTwotone,
  CircleInformationMajorTwotone,
} from '@/assets/shopify-polaris-icons';
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
  mixins: [
    {
      data() {
        return {
          CancelSmallMinor,
          CircleTickMajorTwotone,
          FlagMajorTwotone,
          CircleAlertMajorTwotone,
          CircleDisabledMajorTwotone,
          CircleInformationMajorTwotone,
        };
      },
    },
  ],
})
export default class PBanner extends Vue {
  @Prop(String) public title!: string;
  @Prop(String) public status!: string;
  @Prop(Object) public action!: DisableableAction & LoadableAction;

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
        color = 'greenDark';
        icon = CircleTickMajorTwotone;
        break;
      case 'info':
        color = 'tealDark';
        icon = CircleInformationMajorTwotone;
        break;
      case 'warning':
        color = 'yellowDark';
        icon = CircleAlertMajorTwotone;
        break;
      case 'critical':
        color = 'redDark';
        icon = CircleDisabledMajorTwotone;
        break;
      default:
        color = 'inkLighter';
        icon = FlagMajorTwotone;
    }

    return { color, icon };
  }
}
</script>
