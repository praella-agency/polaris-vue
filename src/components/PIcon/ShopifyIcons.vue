<template>
  <PFrame>
      <PTopBar
          slot="topBar"
          :searchField="{
                value: search,
                placeholder: 'Search',
                showFocusBorder: true,
          }"
          :searchResultsVisible="false"
          @searchFieldChange="searchIcon"
          @searchResultsDismiss="handleSearchResultsDismiss"
      />
      <div class="shopify-div">
          <PStack v-if="icons.major.length > 0" vertical spacing="tight">
              <PStackItem>
                <PHeading class="icon-heading">Major Icons</PHeading>
              </PStackItem>
              <PStackItem>
                  <div class="container-div">
                      <div
                          v-for="(icon, key) in icons.major"
                          :key="key"
                          class="icon-div"
                          v-p-tooltip.mostSpace='"<PIcon source=\"" + icon + "\" />"'
                          @mouseover="changeCode(icon)"
                          @click="copyCode(icon)"
                      >
                          <div>
                              <PIcon v-if="source" :source="source"/>
                              <PIcon v-else :source="icon" :color="color" :backdrop="backdrop"/>
                              <div class="icon-text-div">
                                  {{ icon.replace('Major', '').replace(/([A-Z])/g, ' $1').trim() }}
                              </div>
                          </div>
                      </div>
                  </div>
              </PStackItem>
          </PStack>
          <PStack v-if="icons.minor.length > 0" vertical spacing="tight">
              <PStackItem>
                <PHeading class="icon-heading">Minor Icons</PHeading>
              </PStackItem>
              <PStackItem>
                  <div class="container-div">
                      <div
                          v-for="(icon, key) in icons.minor"
                          :key="key"
                          class="icon-div"
                          v-p-tooltip.mostSpace='"<PIcon source=\"" + icon + "\" />"'
                          @mouseover="changeCode(icon)"
                          @click="copyCode(icon)"
                      >
                          <div>
                              <PIcon v-if="source" :source="source"/>
                              <PIcon v-else :source="icon" :color="color" :backdrop="backdrop"/>
                              <div class="icon-text-div">
                                  {{ icon.replace('Minor', '').replace(/([A-Z])/g, ' $1').trim() }}
                              </div>
                          </div>
                      </div>
                  </div>
              </PStackItem>
          </PStack>
      </div>
  </PFrame>
</template>

<script>
import { PStack } from '../PStack';
import { PStackItem } from '../PStack/components/PStackItem';
import { PTopBar } from '../PTopBar';
import { PFrame } from '../PFrame';
import { PHeading } from '../PHeading';
import { PIcon } from '../PIcon';
import * as AllIcon from '@/assets/shopify-polaris-icons/index';
import { DeprecatedIcons } from './index';

export default {
  name: 'ShopifyIcons',
  components: {
    PIcon, PStack, PStackItem, PTopBar, PFrame, PHeading,
  },
  data() {
    return {
      id: '',
      icons: {
          major: [],
          minor: [],
      },
      iconCode: '',
      copyText: '',
      difference: {},
      search: '',
    };
  },
  props: {
    color: {
      type: String,
      default: null,
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
      if (value === '') {
        this.difference.forEach((icon) => {
          if (icon.includes('Major')) {
              this.icons.major.push(icon);
          } else if (icon.includes('Minor')) {
              this.icons.minor.push(icon);
          }
        });
        return this.icons;
      } else {
        this.icons = {
            major: [],
            minor: [],
        };
        this.difference.forEach((icon) => {
            if (icon.toLowerCase().includes(value.toLowerCase()) && icon.includes('Major')) {
                this.icons.major.push(icon);
            } else if (icon.toLowerCase().includes(value.toLowerCase()) && icon.includes('Minor')) {
                this.icons.minor.push(icon);
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
        if (this.color === null) {
            copy = navigator.clipboard.writeText(
              '<PIcon source="' + icon + '" />',
            );
        } else {
            copy = navigator.clipboard.writeText(
                '<PIcon source="' + icon + '" color="' + this.color + '" />',
            );
        }
      }
      this.copyText = copy ? 'Copied!' : '';
      this.$pToast.open({
        message: this.copyText,
        duration: 3000,
      });
    },
    handleSearchResultsDismiss() {
      this.search = '';
    },
  },
  created() {
    // let allIcon = Object.keys(AllIcon);
    this.difference = Object.keys(AllIcon).filter((icon) => !DeprecatedIcons.includes(icon));
    this.difference.sort();
    this.difference.forEach((icon) => {
        if (icon.includes('Major')) {
            this.icons.major.push(icon);
        } else if (icon.includes('Minor')) {
            this.icons.minor.push(icon);
        }
    });
  },
};
</script>

<style scoped>
.shopify-div {
  display: flex;
  flex-direction: column;
  width: 100%;
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

.icon-heading {
  margin: 15px 0 0 15px;
}
</style>
