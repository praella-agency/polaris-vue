<template>
  <PFrameInner
      :showMobileNavigation="showMobileNavigation"
      :onNavigationDismiss="onNavigationDismiss"
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
    <!--    <template v-for="(_, slot) in $slots">-->
    <!--      <template :slot="slot">-->
    <!--        <slot :name="slot"/>-->
    <!--      </template>-->
    <!--    </template>-->
  </PFrameInner>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { PTrapFocus } from '@/components/PTrapFocus';
  import { PIcon } from '@/components/PIcon';
  import { PFrameInner } from '@/components/PFrame/components';

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
  }
</script>

<style scoped>

</style>