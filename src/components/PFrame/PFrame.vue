<template>
  <PFrameInner
      :showMobileNavigation="showMobileNavigation"
      :onNavigationDismiss="onNavigationDismiss"
      :contextualSaveBar="contextualSaveBar"
      :logo="Object.keys(logo).length > 0 ? logo : {}"
      :topBar="topBar"
      :frameOffset="frameOffset"
      :navigation="navigation"
  >
    <template slot="topBar">
      <!-- @slot Accepts a top bar component that will be rendered at the top-most portion of an application frame -->
      <slot name="topBar"/>
    </template>
    <template slot="globalRibbon">
      <!-- @slot Accepts a global ribbon component that will be rendered fixed to the bottom of an application frame -->
      <slot name="globalRibbon"/>
    </template>
    <template slot="navigation">
      <!-- @slot Accepts a navigation component that will be rendered in the left sidebar of an application frame -->
      <slot name="navigation"/>
    </template>
    <template>
      <!-- @slot The content to display inside the frame -->
      <slot/>
    </template>
  </PFrameInner>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { PIcon } from '@/components/PIcon';
  import { PFrameInner } from '@/components/PFrame/components';
  import { ContextualSaveBarProps } from '@/components/PFrame/context';
  import { ThemeLogo } from '@/types/logo';

  /**
   * <br/>
   * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
   *  sans-serif;">The frame component, while not visible in the user interface itself, provides the structure for
   *  an application. It wraps the main elements and houses the primary
   *  <a href="https://polaris-vue.hulkapps.com/?path=/docs/navigation-navigation--navigation" target="_blank">navigation</a>,
   *  <a href="https://polaris-vue.hulkapps.com/?path=/docs/structure-top-bar--top-bar" target="_blank">top bar</a>,
   *  <a href="https://polaris-vue.hulkapps.com/?path=/docs/feedback-indicators-toast--toast" target="_blank">toast</a>, and
   *  <a href="https://polaris-vue.hulkapps.com/?path=/docs/forms-contextual-save-bar--contextual-save-bar" target="_blank">contextual
   *  save bar</a>
   *  components.</h4>
   */
  @Component({
    components: {
      PIcon, PFrameInner,
    }
  })
  export default class PFrame extends Vue {
    /**
     * A boolean property indicating whether the mobile navigation is currently visible
     */
    @Prop({type: Boolean, default: false}) public showMobileNavigation!: boolean;

    /**
     * A callback function to handle clicking the mobile navigation dismiss button
     */
    @Prop({type: Function}) public onNavigationDismiss!: any;

    /**
     * ContextualSaveBar Props
     */
    @Prop({type: Object, default: () => ({})}) public contextualSaveBar!: ContextualSaveBarProps;

    /**
     * ContextualSaveBar Logo
     */
    @Prop({type: Object, default: () => ({})}) public logo!: ThemeLogo;

    /**
     * TopBar props
     */
    @Prop({type: Object, default: () => ({})}) public topBar!: object;

    /**
     * Navigation props
     */
    @Prop({type: Object, default: () => ({})}) public navigation!: object;

    /**
     * Frame offset value
     */
    @Prop({type: String, default: '0px'}) public frameOffset!: string;
  }
</script>

<style scoped>

</style>