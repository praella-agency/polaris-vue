<template>
  <div
      :class="className"
      ref="scrollArea"
      :data-polaris-scrollable="true"
      :vertical="vertical"
      :horizontal="horizontal"
      :shadow="shadow"
      :hint="hint"
      :focusable="focusable"
      :onScrollToBottom="onScrolledToBottom"
      :tabIndex="focusable ? 0 : undefined"
  >
    <slot/>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { classNames } from '@/utilities/css';

  const MAX_SCROLL_DISTANCE = 100;
  const DELTA_THRESHOLD = 0.2;
  const DELTA_PERCENTAGE = 0.2;
  const EVENTS_TO_LOCK = ['scroll', 'touchmove', 'wheel'];
  const PREFERS_REDUCED_MOTION = () => {
    try {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (err) {
      return false;
    }
  };
  const LOW_RES_BUFFER = 2;

  interface State {
    topShadow: boolean;
    bottomShadow: boolean;
    scrollPosition: number;
    canScroll: boolean;
  }

  export default class PScrollable extends Vue {
    /**
     * Scroll content vertically
     */
    @Prop({type: Boolean, default: true}) public vertical!: boolean;

    /**
     * Scroll content horizontally
     */
    @Prop({type: Boolean, default: false}) public horizontal!: boolean;

    /**
     * Add a shadow when content is scrollable
     */
    @Prop({type: Boolean, default: false}) public shadow!: boolean;

    /**
     * Slightly hints content upon mounting when scrollable
     */
    @Prop({type: Boolean, default: false}) public hint!: boolean;

    /**
     * Adds a tabIndex to scrollable when children are not focusable
     */
    @Prop({type: Boolean, default: false}) public focusable!: boolean;

    /**
     * Called when scrolled to the bottom of the scroll area
     */
    @Prop(Function) public onScrolledToBottom!: void;

    public state: State = {
      topShadow: false,
      bottomShadow: false,
      scrollPosition: 0,
      canScroll: false,
    };

    public mounted() {
      if ((this.$refs.scrollArea as HTMLElement) == null) {
        return;
      }
    }

    public get className() {
      return classNames(
        'Polaris-Scrollable',
        this.vertical && 'Polaris-Scrollable--vertical',
        this.horizontal && 'Polaris-Scrollable--horizontal',
        this.state.topShadow && 'Polaris-Scrollable--hasTopShadow',
        this.state.bottomShadow && 'Polaris-Scrollable--hasBottomShadow',
        this.vertical && this.state.canScroll && 'Polaris-Scrollable--vertical',
      );
    }
  }
</script>

<style scoped>

</style>