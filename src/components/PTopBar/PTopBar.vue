<template>
  <div class="Polaris-TopBar">
    <button
        v-if="showNavigationToggle"
        type="button"
        :class="iconClassName"
        @click="onNavigationToggle"
        @focus="focused = true"
        @blur="focused = false"
        aria-label="Toggle menu"
    >
      <PIcon source="MobileHamburgerMajor"/>
    </button>
    <div v-if="$slots.hasOwnProperty('contextControl')" testID="ContextControl" class="Polaris-TopBar__ContextControl">
      <slot name="contextControl"/>
    </div>
    <div v-else-if="Object.keys(logo).length > 0" :class="className">
      <PUnstyledLink
          :url="logo.url"
          class="Polaris-TopBar__LogoLink"
          :style="width"
      >
        <PImage
            :source="logo.topBarSource"
            :alt="logo.accessibilityLabel"
            class="Polaris-TopBar__Logo"
            :style="width"
        />
      </PUnstyledLink>
    </div>
    <div class="Polaris-TopBar__Contents">
      <div
          v-if="$slots.hasOwnProperty('pSearchField') || Object.keys(searchField).length > 0"
          class="Polaris-TopBar__SearchField"
      >
        <slot name="pSearchField">
          <PSearchField
              v-model="searchFieldValue"
              :placeholder="searchField.placeholder"
              :showFocusBorder="searchField.showFocusBorder"
              :focused="searchField.focused"
              :active="searchField.active"
              @change="searchField.onChange ? searchField.onChange() : {}"
          />
        </slot>
        <PSearch
            :visible="Object.keys(searchField).length > 0 ? searchFieldValue.length > 0 : searchResultsVisible"
            :onDismiss="onSearchResultsDismiss"
            :overlayVisible="searchResultsOverlayVisible"
        >
          <slot name="pSearchResult">
            <PActionList
                :items="searchResult.items"
                :sections="searchResult.sections"
            />
          </slot>
        </PSearch>
      </div>
      <div
          v-if="$slots.hasOwnProperty('pSecondaryMenu') || Object.keys(menu).length > 0"
          class="Polaris-TopBar__SecondaryMenu"
      >
        <slot name="pSecondaryMenu">
          <PMenu
              :id="menu.id"
              :actions="menu.actions"
              :message="menu.message"
              :open="menu.open"
              :onOpen="menu.onOpen"
              :onClose="menu.onClose"
              :accessibilityLabel="menu.accessibilityLabel"
          >
            <span slot="activatorContent">
              <PIcon :source="menu.icon"/>
              <PVisuallyHidden>Secondary menu</PVisuallyHidden>
            </span>
          </PMenu>
        </slot>
      </div>
      <slot name="pUserMenu">
        <PUserMenu
            :id="userMenu.id"
            :actions="userMenu.actions"
            :message="userMenu.message"
            :name="userMenu.name"
            :detail="userMenu.detail"
            :accessibilityLabel="userMenu.accessibilityLabel"
            :initials="userMenu.initials"
            :avatar="userMenu.avatar"
            :open="userMenu.open"
            :onToggle="userMenu.onToggle"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
  import { classNames } from '@/utilities/css';
  import { ThemeLogo, getWidth } from '@/types/logo';

  import { PIcon } from '@/components/PIcon';
  import { PButton } from '@/components/PButton';
  import { PUnstyledLink } from '@/components/PUnstyledLink';
  import { PImage } from '@/components/PImage';
  import { PTextField } from '@/components/PTextField';
  import { PActionList } from '@/components/PActionList';
  import { PPopover } from '@/components/PPopover';
  import { POptionList } from '@/components/POptionList';
  import { PAvatar } from '@/components/PAvatar';
  import { PSearch } from '@/components/PTopBar/components/PSearch';
  import { PUserMenu } from '@/components/PTopBar/components/PUserMenu';
  import { PMenu } from '@/components/PTopBar/components/PMenu';
  import { PVisuallyHidden } from '@/components/PVisuallyHidden';
  import { PSearchField } from '@/components/PTopBar/components/PSearchField';

  interface UserMenu {
    id: string;
    actions?: object;
    message?: object;
    name?: string;
    detail?: string;
    accessibilityLabel?: string;
    initials?: string;
    avatar?: string;
    open: boolean;

    onToggle(): void;
  }

  interface Menu {
    id: string;
    actions?: [];
    message?: object;
    open: boolean;
    icon: string;
    accessibilityLabel?: string;

    onOpen(): void;

    onClose(): void;
  }

  interface SearchField {
    value?: string;
    placeholder?: object;
    showFocusBorder?: boolean;
    active?: boolean;
    focused?: boolean;

    onChange(): void;
  }

  interface SearchResult {
    items?: [];
    sections?: [];
  }

  @Component({
    components: {
      PSearch, PIcon, PButton, PUnstyledLink, PImage, PTextField, PPopover, POptionList, PAvatar, PUserMenu, PMenu,
      PVisuallyHidden, PSearchField, PActionList,
    },
  })
  export default class PTopBar extends Vue {
    public focused = false;
    public popoverActive = false;

    @Prop({type: Boolean}) public showNavigationToggle!: boolean;
    @Prop({type: Boolean, default: false}) public searchResultsVisible!: boolean;
    @Prop({type: Function, default: null}) public onNavigationToggle!: void;
    @Prop({type: Function, default: null}) public onSearchResultsDismiss!: void;
    @Prop({type: Boolean, default: false}) public searchResultsOverlayVisible!: void;
    @Prop({type: Object, default: () => ({})}) public logo!: ThemeLogo;
    @Prop({type: Object, default: () => ({})}) public userMenu!: UserMenu;
    @Prop({type: Object, default: () => ({})}) public menu!: Menu;
    @Prop({type: Object, default: () => ({})}) public searchField!: SearchField;
    @Prop({type: Object, default: () => ({})}) public searchResult!: SearchResult;

    public searchFieldValue = Object.keys(this.searchField).length > 0 ? this.searchField.value : '';

    public get className() {
      return classNames(
        'Polaris-TopBar__LogoContainer',
        (this.showNavigationToggle ||
          this.$slots['searchField'] ||
          this.$scopedSlots['searchField']) ?
          'Polaris-TopBar__LogoDisplayControl' :
          'Polaris-TopBar__LogoDisplayContainer',
      );
    }

    public get iconClassName() {
      return classNames(
        'Polaris-TopBar__NavigationIcon',
        this.focused && 'Polaris-TopBar__NavigationIcon Polaris-TopBar--focused',
      );
    }

    public get width() {
      return {
        width: getWidth(this.logo, 104)
      };
    }
  }
</script>
