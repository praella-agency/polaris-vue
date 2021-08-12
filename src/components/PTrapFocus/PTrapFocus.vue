<template>
  <PFocus :disabled="disableFocus">
    <template v-slot="root">
      <div ref="focusTrapWrapper"></div>
    </template>
    <div ref="focusTrapWrapper">
      <PEventListener event="focusin" :handler="handleFocusIn" />
      <slot />
    </div>
  </PFocus>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from 'vue-property-decorator';
    import {PFocus} from '../PFocus';
    import {PEventListener} from '../PEventListener';
    import { useFocusManager, focusFirstFocusableNode } from '@/components/PTrapFocus/context';

    @Component({
      components: {
        PFocus, PEventListener,
      }
    })
    export default class PTrapFocus extends Vue {
      @Prop({type: Boolean, default: true}) public trapping!: boolean;

      public disableFocus = true;
      public canSafelyFocus = useFocusManager(this.trapping);

      public handleFocusIn (event: FocusEvent) {
        const containerContentsHaveFocus =
          this.$refs.focusTrapWrapper &&
          (this.$refs.focusTrapWrapper as HTMLDivElement).contains(document.activeElement);

        if (
          !this.trapping || !this.$refs.focusTrapWrapper || containerContentsHaveFocus ||
          (event.target instanceof Element &&
            event.target.matches(`[data-portal-id] *`))
        ) {
          return;
        }

        if (
          this.canSafelyFocus &&
          event.target instanceof HTMLElement &&
          this.$refs.focusTrapWrapper !== event.target &&
          !(this.$refs.focusTrapWrapper as HTMLDivElement).contains(event.target)
        ) {
          focusFirstFocusableNode(this.$refs.focusTrapWrapper as HTMLDivElement);
        }
      }
    }
</script>

<style scoped>

</style>