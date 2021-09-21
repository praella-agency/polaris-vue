<template>
    <div
        :id="id"
        :class="wrapperClassName"
        :style="collapsibleStyles"
        ref="collapsibleContainer"
        :aria-expanded="open"
    >
        <slot v-if="expandOnPrint || !isFullyClosed"/>
    </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
  import { classNames } from '@/utilities/css';

  interface Transition {
    /** Assign a transition duration to the collapsible animation. */
    duration?: string;
    /** Assign a transition timing function to the collapsible animation */
    timingFunction?: string;
  }

  type AnimationState = 'idle' | 'measuring' | 'animating';

  /**
   * <br/>
   * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
   *  sans-serif;">The collapsible component is used to put long sections of information under a block that merchants
   *  can expand or collapse.</h4>
   */
  @Component
  export default class PCollapsible extends Vue {
    /**
     * Assign a unique ID to the collapsible. For accessibility, pass this ID as the value of the triggering component’s aria-controls prop.
     */
    @Prop({type: String, default: null}) public id!: string;

    /**
     * Option to show collapsible content when printing
     */
    @Prop({type: Boolean, default: false}) public expandOnPrint!: boolean;

    /**
     * Toggle whether the collapsible is expanded or not.
     */
    @Prop({type: Boolean, default: false}) public open!: boolean;

    /**
     * Assign transition properties to the collapsible
     */
    @Prop({type: Object, default: () => ({})}) public transition!: Transition;

    public animationState: AnimationState = 'idle';

    public height = 0;

    public isOpen = this.open;

    @Watch('animationState')
    public onAnimationStateChanged() {
      if (!this.$refs.collapsibleContainer) {
        return;
      }

      switch (this.animationState) {
        case 'idle':
          break;
        case 'measuring':
          this.height = (this.$refs.collapsibleContainer as HTMLDivElement).scrollHeight;
          setTimeout(() => {
            this.animationState = 'animating';
          }, 1);
          break;
        case 'animating':
          this.height = this.open ? (this.$refs.collapsibleContainer as HTMLDivElement).scrollHeight : 0;
      }
    }

    @Watch('isOpen')
    public onIsOpenChanged(value) {
      if (this.open !== value) {
        this.animationState = 'measuring';
      } else {
        if (!this.$refs.collapsibleContainer) {
          return;
        }

        switch (this.animationState) {
          case 'idle':
            break;
          case 'measuring':
            this.height = (this.$refs.collapsibleContainer as HTMLDivElement).scrollHeight;
            this.animationState = 'animating';
            break;
          case 'animating':
            this.height = this.open ? (this.$refs.collapsibleContainer as HTMLDivElement).scrollHeight : 0;
        }
      }
    }

    @Watch('open')
    public onOpenChanged(value) {
      if (value !== this.isOpen) {
        this.animationState = 'measuring';
      } else {
        if (!this.$refs.collapsibleContainer) {
          return;
        }

        switch (this.animationState) {
          case 'idle':
            break;
          case 'measuring':
            this.height = (this.$refs.collapsibleContainer as HTMLDivElement).scrollHeight;
            this.animationState = 'animating';
            break;
          case 'animating':
            this.height = this.open ? (this.$refs.collapsibleContainer as HTMLDivElement).scrollHeight : 0;
        }
      }

    }

    public mounted() {
      (this.$refs.collapsibleContainer as HTMLDivElement).addEventListener('transitionend', this.handleCompleteAnimation);

      if (this.open && this.$refs.collapsibleContainer) {
        // If collapsible defaults to open, set an initial height
        this.height = (this.$refs.collapsibleContainer as HTMLDivElement).scrollHeight;
      }
    }

    public beforeDestroy() {
      (this.$refs.collapsibleContainer as HTMLDivElement).removeEventListener('transitionend', this.handleCompleteAnimation);
    }

    public get isFullyOpen() {
      return this.animationState === 'idle' && this.open && this.isOpen;
    }

    public get isFullyClosed() {
      return this.animationState === 'idle' && !this.open && !this.isOpen;
    }

    public get wrapperClassName() {
      return classNames(
        'Polaris-Collapsible',
        this.isFullyClosed && 'Polaris-Collapsible--isFullyClosed',
        this.expandOnPrint && 'Polaris-Collapsible--expandOnPrint',
      );
    }

    public get collapsibleStyles() {
      let transitionStyle = {};
      let collapsible = {
        maxHeight: this.isFullyOpen ? 'none' : `${this.height}px`,
        overflow: this.isFullyOpen ? 'visible' : 'hidden',
      };

      if (Object.keys(this.transition).length > 0) {
        transitionStyle = {
          transitionDuration: `${this.transition.duration}`,
          transitionTimingFunction: `${this.transition.timingFunction}`,
        };
      }

      return [transitionStyle, collapsible];
    }

    public handleCompleteAnimation({target}: TransitionEvent) {
      if (target === this.$refs.collapsibleContainer) {
        this.animationState = 'idle';
        this.isOpen = this.open;
      }
    }
  }
</script>

<style scoped>

</style>