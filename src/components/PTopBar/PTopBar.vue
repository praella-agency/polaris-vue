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
          :url="logo.url || ''"
          class="Polaris-TopBar__LogoLink"
          :style="width"
      >
        <PImage
            :source="logo.topBarSource || ''"
            :alt="logo.accessibilityLabel || ''"
            class="Polaris-TopBar__Logo"
            :style="width"
        />
      </PUnstyledLink>
    </div>
    <div class="Polaris-TopBar__Contents">
      <div class="Polaris-TopBar-SearchField" v-if="$slots.hasOwnProperty('searchField')">
        <slot name="searchField"/>
        <PSearch
            :visible="searchResultsVisible"
            :onDismiss="onSearchResultsDismiss"
            :overlayVisible="searchResultsOverlayVisible"
        >
          <slot name="searchResult"/>
        </PSearch>
      </div>
      <div class="Polaris-TopBar__SecondaryMenu" v-if="$slots.hasOwnProperty('secondaryMenu')">
        <slot name="secondaryMenu"/>
      </div>
      <slot name="userMenu"/>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { classNames } from '@/utilities/css';
  import { ThemeLogo, getWidth } from '@/types/logo';

  import { PIcon } from '@/components/PIcon';
  import { PButton } from '@/components/PButton';
  import { PUnstyledLink } from '@/components/PUnstyledLink';
  import { PImage } from '@/components/PImage';
  import { PTextField } from '@/components/PTextField';
  import { PPopover } from '@/components/PPopover';
  import { POptionList } from '@/components/POptionList';
  import { PAvatar } from '@/components/PAvatar';
  import { PSearch } from '@/components/PTopBar/components/PSearch';

  @Component({
    components: {
      PSearch, PIcon, PButton, PUnstyledLink, PImage, PTextField, PPopover, POptionList, PAvatar,
    },
  })
  export default class PTopBar extends Vue {
    public focused = false;
    public popoverActive = false;

    @Prop({type: Boolean, default: false}) public showNavigationToggle!: boolean;
    @Prop({type: Boolean, default: false}) public searchResultsVisible!: boolean;
    @Prop({type: Function, default: null}) public onNavigationToggle!: void;
    @Prop({type: Function, default: null}) public onSearchResultsDismiss!: void;
    @Prop({type: Boolean, default: false}) public searchResultsOverlayVisible!: void;
    @Prop({type: Object, default: () => ({})}) public logo!: ThemeLogo;

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
      return getWidth(this.logo, 104);
    }
  }
</script>
