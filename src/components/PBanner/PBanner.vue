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
        <!-- @slot The content to display inside the badge -->
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

<script>
import { classNames, variationName } from '@/utilities/css';

import { PIcon } from './../../components/PIcon/index.js';
import { PButton } from '@/components/PButton';
import { PHeading } from './../../components/PHeading/index.js';
import { PButtonGroup } from '@/components/PButtonGroup';
import { PButtonsFrom } from '@/components/PButton/utils';
import {
  DisableableAction,
  LoadableAction,
} from '../../types/types.js'

const BannerStatus = 'success' | 'info' | 'warning' | 'critical';

/**
 * <br/>
 * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
 *  sans-serif;">Informs merchants about important changes or persistent conditions. Use this component if you need to
 *  communicate to merchants in a prominent way. Banners are placed at the top of the page or section they apply to, and
 *  below the page or section header.</h4>
 */

export default {
  name: 'PBanner',
  components: {
    PIcon, PButton, PHeading, PButtonGroup, PButtonsFrom,
  },
  props: {
    /**
     * Title content for the banner.
     */
    title: {
      type: String,
      default: null
    },

    /**
     * Set the status of the banner
     * @values success | info | warning | critical
     */
    status: {
      type: String,
      default: null,
      validator: function (value) {
        return ['success', 'info', 'warning', 'critical'].indexOf(value) !== -1
      }
    },

    /**
     * Action of the banner
     */
    action: {
      type: [Object, DisableableAction, LoadableAction],
      default: () => {}
    }
  },
  computed: {
    className() {
      return classNames(
          'Polaris-Banner',
          'Polaris-Banner--withinPage',
          this.isDismissable && 'Polaris-Banner--hasDismiss',
          this.status && `Polaris-Banner--${variationName('status', this.status)}`,
      );
    },
    isDismissable() {
      return this.$listeners && this.$listeners.dismiss;
    },
    colorAndIcon() {
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
  },
  mounted() {
    console.log(DisableableAction);
  }
}
</script>
