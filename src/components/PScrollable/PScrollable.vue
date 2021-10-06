<template>
    <div
        ref="scrollArea"
        :class="finalClassName"
        :data-polaris-scrollable="true"
        :tabindex="focusable ? 0 : undefined"
    >
        <slot/>
    </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { classNames } from '@/utilities/css';

  @Component
  export default class PScrollable extends Vue {
    /**
     * Scroll content vertically
     */
    @Prop({type: Boolean, default: false}) public vertical!: boolean;

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

    public topShadow = false;
    public bottomShadow = false;
    public scrollPosition = 0;
    public canScroll = false;

    public get finalClassName() {
      return classNames(
        'Polaris-Scrollable',
        this.vertical && 'Polaris-Scrollable--vertical',
        this.horizontal && 'Polaris-Scrollable--horizontal',
        this.topShadow && 'Polaris-Scrollable--hasTopShadow',
        this.bottomShadow && 'Polaris-Scrollable--hasBottomShadow',
        this.vertical && this.canScroll && 'Polaris-Scrollable--verticalHasScrolling',
      );
    }

    public mounted() {
      if (this.$refs.scrollArea == null) {
        return;
      }
      (this.$refs.scrollArea as HTMLElement).addEventListener('scroll', () => {
        window.requestAnimationFrame(this.handleScroll);
      });
      window.addEventListener('resize', this.handleScroll);
      window.requestAnimationFrame(() => {
        this.handleScroll();
        if (this.hint) {
          this.scrollHint();
        }
      });
    }

    public destroyed() {
      if (this.$refs.scrollArea == null) {
        return;
      }

      (this.$refs.scrollArea as HTMLElement).removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('resize', this.handleScroll);
    }

    public updated() {
      if (this.scrollPosition && (this.$refs.scrollArea as HTMLElement) && this.scrollPosition > 0) {
        (this.$refs.scrollArea as HTMLElement).scrollTop = this.scrollPosition;
      }
    }

    public handleScroll() {
      if (this.$refs.scrollArea == null) {
        return;
      }

      let {scrollTop, clientHeight, scrollHeight} = (this.$refs.scrollArea as HTMLElement);
      let shouldBottomShadow = Boolean(this.shadow && !(scrollTop + clientHeight >= scrollHeight));
      let shouldTopShadow = Boolean(this.shadow && scrollTop > 0 && this.scrollPosition > 0);

      let canScroll = scrollHeight > clientHeight;
      let hasScrolledToBottom = scrollHeight - scrollTop <= clientHeight + 2;

      if (canScroll && hasScrolledToBottom) {
        this.$emit('scrolledToBottom');
      }

      this.topShadow = shouldTopShadow;
      this.bottomShadow = shouldBottomShadow;
      this.scrollPosition = scrollTop;
      this.canScroll = true;
    }

    public scrollHint() {
      if (this.$refs.scrollArea == null) {
        return;
      }

      let {clientHeight, scrollHeight} = (this.$refs.scrollArea as HTMLElement);
      if (this.prefersReducedMotion || this.scrollPosition > 0 || scrollHeight <= clientHeight) {
        return;
      }

      let scrollDistance = scrollHeight - clientHeight;
      this.toggleLock();

      this.scrollPosition = scrollDistance > 100 ? 100 : scrollDistance;
      window.requestAnimationFrame(this.scrollStep);
    }

    private scrollStep() {
      let delta = this.scrollPosition * 0.2;
      this.scrollPosition = delta < 0.2 ? 0 : this.scrollPosition - delta;

      if (this.scrollPosition > 0) {
        window.requestAnimationFrame(this.scrollStep);
      } else {
        this.toggleLock(false);
      }
    }

    private toggleLock(shouldLock = true) {
      if (this.$refs.scrollArea == null) {
        return;
      }

      ['scroll', 'touchmove', 'wheel'].forEach((eventName) => {
        if (shouldLock) {
          (this.$refs.scrollArea as HTMLElement).addEventListener(eventName, this.prevent);
        } else {
          (this.$refs.scrollArea as HTMLElement).removeEventListener(eventName, this.prevent);
        }
      });
    }

    public prevent(evt: Event) {
      evt.preventDefault();
    }

    public prefersReducedMotion() {
      try {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      } catch (err) {
        return false;
      }
    }
  }
</script>

<style scoped>

</style>