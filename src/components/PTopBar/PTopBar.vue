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
      <!-- @slot Slot to Accepts a component that is used to help users switch between different contexts -->
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
        <!-- @slot Slot to customize SearchField -->
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
          <!-- @slot Slot to display custom list of result -->
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
        <!-- @slot Slot to customize SecondaryMenu -->
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
      <!-- @slot Slot to customize UserMenu -->
      <slot name="userMenu">
        <PUserMenu
            v-if="Object.keys(userMenu).length > 0"
            v-bind="userMenu"
        />
      </slot>
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
    actions?: [];
    message?: object;
    name?: string;
    detail?: string;
    accessibilityLabel?: string;
    initials?: string;
    avatar?: string;
    open: boolean;

    onToggle(): void;
  }

  interface SecondaryMenu {
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
  }

  interface SearchResult {
    items?: [];
    sections?: [];
  }

  /**
   * <br/>
   * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
   *  sans-serif;">The collapsible component is used to put long sections of information under a block that merchants
   *  can expand or collapse.</h4>
   */
  @Component({
    components: {
      PSearch, PIcon, PButton, PUnstyledLink, PImage, PTextField, PPopover, POptionList, PAvatar, PUserMenu, PMenu,
      PVisuallyHidden, PSearchField, PActionList,
    },
  })
  export default class PTopBar extends Vue {
    public focused = false;
    public popoverActive = false;

    /**
     * Toggles whether or not a navigation component has been provided. Controls the presence of the mobile nav
     * toggle button
     */
    @Prop({type: Boolean}) public showNavigationToggle!: boolean;

    /**
     * A boolean property indicating whether search results are currently visible
     */
    @Prop({type: Boolean, default: true}) public searchResultsVisible!: boolean;

    /**
     * A callback function that handles hiding and showing mobile navigation
     */
    @Prop({type: Function, default: null}) public onNavigationToggle!: void;

    /**
     * Whether or not the search results overlay has a visible backdrop
     */
    @Prop({type: Boolean, default: false}) public searchResultsOverlayVisible!: void;

    /**
     * Customize logo
     */
    @Prop({type: Object, default: () => ({})}) public logo!: ThemeLogo;

    /**
     * Accepts a user component that is made available as a static member of the top bar component and renders as
     * the primary menu
     */
    @Prop({type: Object, default: () => ({})}) public userMenu!: UserMenu;

    /**
     * Accepts a menu component that is made available as a static member of the top bar component
     */
    @Prop({type: Object, default: () => ({})}) public secondaryMenu!: SecondaryMenu;

    /**
     * Accepts a search field component that is made available as a `TextField` static member of the top bar component
     */
    @Prop({type: Object, default: () => ({})}) public searchField!: SearchField;

    /**
     * Accepts a search results component that is ideally composed of a card component containing a list of actionable
     * search results
     */
    @Prop({type: Object, default: () => ({})}) public searchResult!: SearchResult;

    public searchFieldValue = Object.keys(this.searchField).length > 0 ? this.searchField.value : '';

    public get className() {
      return classNames(
        'Polaris-TopBar__LogoContainer',
        /* tslint:disable-next-line */
        (this.showNavigationToggle || this.$slots['searchField'] || this.$scopedSlots['searchField']) ?
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
        width: getWidth(this.logo, 104),
      };
    }

    public handleSearchFieldChange(value) {
        /**
         * A callback function that handles the search field value
         */
        this.$emit('searchFieldChange', value);
    }

    public handleSearchResultsDismiss() {
        /**
         * A callback function that handles the dismissal of search results
         */
        this.$emit('searchResultsDismiss');
    }
  }
</script>
