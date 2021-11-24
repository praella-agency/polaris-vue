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
      <!-- @slot Accepts a component that is used to help users switch between different contexts -->
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
        <!-- @slot Customize SearchField -->
        <slot name="searchField">
          <PSearchField
              v-model="searchFieldValue"
              :placeholder="searchField.placeholder"
              :showFocusBorder="searchField.showFocusBorder"
              :focused="searchField.focused"
              :active="searchField.active"
              @change="handleSearchFieldChange"
          />
        </slot>
        <PSearch
            :visible="(searchFieldValue.length > 0) && searchResultsVisible"
            @dismiss="handleSearchResultsDismiss"
            :overlayVisible="searchResultsOverlayVisible"
        >
          <!-- @slot Display custom list of result -->
          <slot name="searchResult">
            <PActionList
                :items="searchResult.items"
                :sections="searchResult.sections"
            />
          </slot>
        </PSearch>
      </div>
      <div
          v-if="$slots.hasOwnProperty('pSecondaryMenu') || Object.keys(secondaryMenu).length > 0"
          class="Polaris-TopBar__SecondaryMenu"
      >
        <!-- @slot Customize SecondaryMenu -->
        <slot name="secondaryMenu">
          <PMenu
              v-if="Object.keys(secondaryMenu).length > 0"
              v-bind="secondaryMenu"
          >
            <span slot="activatorContent">
              <PIcon :source="secondaryMenu.icon"/>
              <PVisuallyHidden>Secondary menu</PVisuallyHidden>
            </span>
          </PMenu>
        </slot>
      </div>
      <!-- @slot Customize UserMenu -->
      <slot name="userMenu">
        <PUserMenu
            v-if="Object.keys(userMenu).length > 0"
            v-bind="userMenu"
        />
      </slot>
    </div>
  </div>
</template>

<script>
  import { classNames } from '../../utilities/css';
  import { ThemeLogo, getWidth } from '../../types/logo.js';
  import { PIcon } from '../../components/PIcon';
  import { PButton } from '../../components/PButton/index.js';
  import { PUnstyledLink } from '../../components/PUnstyledLink/index.js';
  import { PImage } from '../../components/PImage';
  import { PTextField } from '../../components/PTextField';
  import { PActionList } from '../../components/PActionList/index.js';
  import { PPopover } from '../../components/PPopover/index.js';
  import { POptionList } from '../../components/POptionList';
  import { PAvatar } from '../../components/PAvatar/index.js';
  import { PSearch } from '../../components/PTopBar/components/PSearch/index.js';
  import { PUserMenu } from '../../components/PTopBar/components/PUserMenu/index.js';
  import { PMenu } from '../../components/PTopBar/components/PMenu/index.js';
  import { PVisuallyHidden } from '../../components/PVisuallyHidden';
  import { PSearchField } from '../../components/PTopBar/components/PSearchField/index.js';
  import { UserMenu, SecondaryMenu, SearchField, SearchResult } from './utilities';
  import ObjectValidator from '../../utilities/validators/ObjectValidator';

  /**
   * <br/>
   * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
   *  sans-serif;">The collapsible component is used to put long sections of information under a block that merchants
   *  can expand or collapse.</h4>
   */
  export default {
      name: 'PTopBar',
      components: {
          PSearch, PIcon, PButton, PUnstyledLink, PImage, PTextField, PPopover, POptionList, PAvatar, PUserMenu, PMenu,
          PVisuallyHidden, PSearchField, PActionList,
      },
      props: {
          /**
           * Toggles whether or not a navigation component has been provided. Controls the presence of the mobile nav
           * toggle button
           */
            showNavigationToggle: {
                type: Boolean,
          },
          /**
           * A boolean property indicating whether search results are currently visible
           */
          searchResultsVisible: {
              type: Boolean,
              default: true,
          },
          /**
           * A callback function that handles hiding and showing mobile navigation
           */
          onNavigationToggle: {
              type: Function,
              default: null,
          },
          /**
           * Whether or not the search results overlay has a visible backdrop
           */
          searchResultsOverlayVisible: {
              type: Boolean,
              default: false,
          },
          /**
           * Customize logo
           */
          logo: {
              type: Object,
              default: () => ({}),
              ...ObjectValidator('logo', ThemeLogo),
          },
          /**
           * Accepts a user component that is made available as a static member of the top bar component and renders as
           * the primary menu
           */
          userMenu: {
              type: Object,
              default: () => ({}),
              ...ObjectValidator('userMenu', UserMenu),
          },
          /**
           * Accepts a menu component that is made available as a static member of the top bar component
           */
          secondaryMenu: {
              type: Object,
              default: () => ({}),
              ...ObjectValidator('secondaryMenu', SecondaryMenu),
          },
          /**
           * Accepts a search field component that is made available as a `TextField` static member of the top bar component
           */
          searchField: {
              type: Object,
              default: () => ({}),
              ...ObjectValidator('searchField', SearchField),
          },
          /**
           * Accepts a search results component that is ideally composed of a card component containing a list of actionable
           * search results
           */
          searchResult: {
              type: Object,
              default: () => ({}),
              ...ObjectValidator('searchResult', SearchResult),
          },
      },
      data() {
          return {
            focused: false,
            popoverActive: false,
            searchFieldValue: Object.keys(this.searchField).length > 0 ? this.searchField.value : ''
          };
      },
      computed: {
          className() {
              return classNames(
                  'Polaris-TopBar__LogoContainer',
                  /* tslint:disable-next-line */
                  (this.showNavigationToggle || this.$slots['searchField'] || this.$scopedSlots['searchField']) ?
                      'Polaris-TopBar__LogoDisplayControl' :
                      'Polaris-TopBar__LogoDisplayContainer',
              );
          },
          iconClassName() {
              return classNames(
                  'Polaris-TopBar__NavigationIcon',
                  this.focused && 'Polaris-TopBar__NavigationIcon Polaris-TopBar--focused',
              );
          },
          width() {
              return {
                  width: getWidth(this.logo, 104),
              };
          },
      },
      methods: {
          handleSearchFieldChange(value) {
              /**
               * A callback function that handles the search field value
               */
              this.$emit('searchFieldChange', value);
          },
          handleSearchResultsDismiss() {
              /**
               * A callback function that handles the dismissal of search results
               */
              this.$emit('searchResultsDismiss');
          },
      },
  }
</script>
