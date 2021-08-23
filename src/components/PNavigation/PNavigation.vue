<template>
  <nav class="Polaris-Navigation" :aria-labelledby="ariaLabelledBy">
    <template v-if="$slots.hasOwnProperty('contextControl')">
      <div class="Polaris-Navigation__ContextControl">
        <slot name="contextControl"/>
      </div>
    </template>
    <template v-else-if="Object.keys(logo).length > 0 && toggleLogo">
      <div class="Polaris-Navigation__LogoContainer">
        <PUnstyledLink
            class="Polaris-Navigation__LogoLink"
            :url="logo.url"
            :style="width"
        >
          <PImage
              class="Polaris-Navigation__Logo"
              :source="logo.topBarSource"
              :alt="logo.accessibilityLabel"
              :style="width"
          />
        </PUnstyledLink>
      </div>
    </template>
    <div class="Polaris-Navigation__PrimaryNavigation" v-if="items.length > 0">
      <PSection
          v-for="(item, key) in items"
          :key="key"
          v-bind="item"
          :location="location"
          :onNavigationDismiss="onDismiss"
      />
    </div>
  </nav>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { PUnstyledLink } from '../PUnstyledLink';
  import { PImage } from '../PImage';
  import { PSection } from './components/PSection';
  import { getWidth, ThemeLogo } from '@/types/logo';
  import { ItemProps } from '@/components/PNavigation/utilities';

  interface SectionItems {
    /** Section Title */
    title?: string;
    /** Items for sections */
    items: ItemProps[];
    /** Rollup */
    rollup?: {
      after: number;
      view: string;
      hide: string;
      activePath: string;
    }
    /** Action */
    action?: {
      icon: string;
      accessibilityLabel: string;
      onClick(): void;
    }
    /** Separator */
    separator?: boolean;
    /** Icon */
    icon?: string;
    /** Fill */
    fill?: boolean;
  }

  @Component({
    components: {
      PUnstyledLink, PImage, PSection,
    },
  })
  export default class PNavigation extends Vue {
    /**
     * Navigation Location
     */
    @Prop({type: String, default: null}) public location!: string;

    /**
     * Handle on dismiss method
     */
    @Prop({type: Function}) public onDismiss!: void;

    /**
     * Id of the element used as aria-labelledby
     */
    @Prop({type: String}) public ariaLabelledBy!: string;

    /**
     * Customize logo
     */
    @Prop({type: Object, default: () => ({})}) public logo!: ThemeLogo;

    /**
     * Show mobile navigation
     */
    @Prop({type: Boolean, default: false}) public showMobileNavigation!: boolean;

    //PSection's props
    /**
     * A collection of navigation items
     */
    @Prop({type: Array, default: () => ([])}) public items!: SectionItems[];

    public get width() {
      return {
        width: getWidth(this.logo, 104)
      };
    }

    public showLogo = this.showMobileNavigation;
    public get toggleLogo() {
      return this.showLogo;
    }

    public set toggleLogo(value) {
      this.showLogo = value;
    }

    created() {
      window.addEventListener('resize', this.useMediaQuery);
    }

    destroyed() {
      window.removeEventListener('resize', this.useMediaQuery);
    }

    public useMediaQuery() {
      if (window.innerWidth <= 768) {
        this.showLogo = true;
        return;
      }
      this.showLogo = false;
    }
  }
</script>

<style scoped>

</style>