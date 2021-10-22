<template>
  <div class="shopify-div">
    <PTextField class="shopify-polaris-text" placeholder="Search Icon" v-model="search" @input="searchIcon"/>
    <div class="container-div">
      <div v-for="(icon, key) in icons" :key="key" class="icon-div"
           v-p-tooltip.mostSpace='"<PIcon source=\"" + icon + "\" />"'
           @mouseover="changeCode(icon)"
           @click="copyCode(icon)">
        <div>
          <PIcon v-if="source" :source="source"/>
          <PIcon v-else :source="icon" :color="color" :backdrop="backdrop"/>
          <div class="icon-text-div">
            {{ icon }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {PTextField} from '../PTextField';
import {PModal} from '../PModal';
import {PFormLayout} from '../PFormLayout';
import {PTextStyle} from '../PTextStyle';
import {PButton} from '../PButton';
import {PStack, PStackItem} from '../PStack';
import PIcon from './PIcon.vue';
import * as AllIcon from '@/assets/shopify-polaris-icons/index';
import {DeprecatedIcons} from './index';

export default {
  name: 'ShopifyIcons',
  components: {
    PTextField, PIcon, PModal, PFormLayout, PTextStyle, PStack, PStackItem, PButton,
  },
  data() {
    return {
      id: '',
      icons: [],
      iconCode: '',
      copyText: '',
      difference: {},
      search: null,
    };
  },
  props: {
    color: {
      type: String,
      default: 'base',
    },
    backdrop: {
      type: Boolean,
    },
    source: {
      type: String,
    },
  },
  methods: {
    searchIcon(value) {
      if (value === null) {
        this.difference.forEach((icon) => {
          this.icons.push(icon);
        });
        return this.icons;
      } else {
        this.icons = [];
        this.difference.forEach((icon) => {
          if (icon.toLowerCase().includes(value.toLowerCase())) {
            this.icons.push(icon);
          }
        });
        return this.icons;
      }
    },
    changeCode(icon) {
      this.iconCode = icon;
      this.iconCode = '<PIcon source="' + icon + '" />';
    },
    copyCode(icon) {
      let copy = '';
      if (this.backdrop) {
        copy = navigator.clipboard.writeText(
            '<PIcon source="' + icon + '" color="' + this.color + '" backdrop="' + this.backdrop + '" />',
        );
      } else {
        copy = navigator.clipboard.writeText(
            '<PIcon source="' + icon + '" color="' + this.color + '"/>',
        );
      }
      this.copyText = copy ? 'Copied!' : '';
      this.$pToast.open({
        message: this.copyText,
        duration: 3000,
      });
    },
  },
  created() {
    // let allIcon = Object.keys(AllIcon);
    this.difference = Object.keys(AllIcon).filter((icon) => !DeprecatedIcons.includes(icon));

    this.difference.forEach((icon) => {
      this.icons.push(icon);
    });
    return this.icons;
  },
};
</script>

<style scoped>
.shopify-div {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.shopify-polaris-text {
  width: 300px;
  margin-bottom: 30px;
}

.container-div {
  display: flex;
  flex-wrap: wrap;
}

.icon-div {
  width: 150px;
  padding: 12px;
  margin: 10px;
  text-align: center;
  position: relative;
  height: 100px;
}

.icon-div:hover {
  border-radius: 10px;
  cursor: pointer;
  background-color: #FFFFFF;
  box-shadow: 0 0 11px rgba(33, 33, 33, .2);
}

.icon-text-div {
  color: #464c54;
  padding-top: 16px;
  word-break: break-all;
  font-size: 14px;
}
</style>
