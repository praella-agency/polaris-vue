<template>
  <PFrameInner
      :showMobileNavigation="showMobileNavigation"
      :onNavigationDismiss="onNavigationDismiss"
      :contextualSaveBar="contextualSaveBar"
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
  import { PTrapFocus } from '@/components/PTrapFocus';
  import { PIcon } from '@/components/PIcon';
  import { PFrameInner } from '@/components/PFrame/components';
  import { ContextualSaveBarProps } from '@/components/PFrame/context';

  @Component({
    components: {
      PTrapFocus, PIcon, PFrameInner,
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
  }
</script>

<style scoped>

</style>