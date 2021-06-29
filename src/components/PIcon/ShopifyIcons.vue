<template>
  <div class="shopify-div">
    <PTextField class="shopify-polaris-text" placeholder="Search Icon" @input="searchIcon"/>
    <div class="container-div">
      <div v-for="(icon, key) in icons" :key="key" class="icon-div" @click="openModal(icon)">
        <div>
          <PIcon :source="icon" color="tealDark"></PIcon>
          <div class="icon-text-div">
            {{ icon }}
          </div>
        </div>
      </div>
    </div>
    <div>
      <PModal
          :title="modalTitle"
          :primaryAction="{}"
          :secondaryActions="[]"
          :open="isActive"
          @close="closeModal"
          large
          sectioned
      >
        <PFormLayout>
          <PStack>
            <PStackItem>
              <PIcon :source="modalTitle" color="tealDark"></PIcon>
            </PStackItem>
            <PStackItem>
              <PTextStyle variation="code" :id="id">
                {{ iconCode }}
              </PTextStyle>
            </PStackItem>
            <PStackItem>
              <PButton size="slim" @click="copyCode">{{ copyText }}</PButton>
            </PStackItem>
          </PStack>
        </PFormLayout>
      </PModal>
    </div>
  </div>
</template>

<script>
import { PTextField } from '../PTextField';
import { PModal } from '../PModal';
import { PFormLayout } from '../PFormLayout';
import { PTextStyle } from '../PTextStyle';
import { PButton } from '../PButton';
import { PStack, PStackItem } from '../PStack';
import PIcon from './PIcon.vue';
import * as AllIcon from '@/assets/shopify-polaris-icons';

export default {
  name: "ShopifyIcons",
  components: {
    PTextField, PIcon, PModal, PFormLayout, PTextStyle, PStack, PStackItem, PButton,
  },
  data() {
    return {
      id: '',
      icons: [],
      modalTitle: '',
      isActive: false,
      iconCode: '',
      copyText: 'Copy',
    };
  },
  methods: {
    openModal(icon) {
      this.modalTitle = icon;
      this.id = 'Shopify-Icons-' + this.modalTitle;
      this.iconCode = '<PIcon :source="' + this.modalTitle + '" />';
      this.isActive = true;
    },
    closeModal() {
      this.isActive = !this.isActive;
      this.copyText = 'Copy';
    },
    searchIcon(value) {
      if (value === null){
        for (let icon in AllIcon) {
          this.icons.push(icon);
        }
        return this.icons;
      } else {
        this.icons = [];
        for (let icon in AllIcon) {
          if (icon.toLowerCase().includes(value.toLowerCase())) {
            this.icons.push(icon);
          }
        }
        return this.icons;
      }
    },
    copyCode() {
      let copy = navigator.clipboard.writeText(this.iconCode);
      this.copyText = copy ? 'Copied' : 'Copy';
    },
  },
  created() {
    for (let icon in AllIcon) {
      this.icons.push(icon);
    }
    return this.icons;
  },
}
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
    margin: 12px;
    text-align: center;
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
