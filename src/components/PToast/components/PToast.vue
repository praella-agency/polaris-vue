<template>
  <transition
      :enter-active-class="transition.enter"
      :leave-active-class="transition.leave">
    <div :class="`Polaris-Frame-ToastManager ${transition.enter}`">
      <div class="Polaris-Frame-ToastManager__ToastWrapper">
        <div class="Polaris-Frame-Toast">
          {{message}}
          <button class="Polaris-Frame-Toast__CloseButton" @click="whenClicked">
            <PIcon source="MobileCancelMajorMonotone"></PIcon>
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import {PIcon} from '@/components/PIcon';
import Timer from './timer.js';

import mitt from 'mitt';

const eventBus = mitt();

import {classNames} from '@/utilities/css';

const Positions = Object.freeze({
  TOP_RIGHT: 'top-right',
  TOP: 'top',
  TOP_LEFT: 'top-left',
  BOTTOM_RIGHT: 'bottom-right',
  BOTTOM: 'bottom',
  BOTTOM_LEFT: 'bottom-left',
});

type type = 'success' | 'info' | 'warning' | 'error' | 'default';

type position = 'top-right' | 'top' | 'top-left' | 'bottom-right' | 'bottom' | 'bottom-left';

const removeElement = (el) => {
  if (typeof el.remove !== 'undefined') {
    el.remove()
  } else {
    el.parentNode.removeChild(el)
  }
};

@Component({
  components: {
    PIcon,
  },
})
export default class PToast extends Vue {

  /**
   * Id for the element
   */
  @Prop({type: String, default: null}) public id!: string;

  /**
   * The message that should appear in the toast message
   */
  @Prop({type: String, required: true}) public message!: string;

  /**
   * Toast type
   */
  @Prop({type: String, default: 'default'}) public type!: string;

  /**
   * Toast Position
   */
  @Prop({type: String, default: 'bottom'}) public position!: position;

  /**
   * The length of time in milliseconds the toast message should persist
   */
  @Prop({type: Number, default: 3000}) public duration!: number;

  /**
   * Allow user dismiss by clicking
   */
  @Prop({type: Boolean, default: true}) public dismissible!: boolean;

  /**
   * Wait for existing to dismiss before showing new
   */
  @Prop({type: Boolean, default: false}) public queue!: boolean;

  /**
   * Pause the timer when mouse on over a toast
   */
  @Prop({type: Boolean, default: true}) public pauseOnHover!: boolean;

  /**
   * Do something when user clicks
   */
  @Prop({
    type: Function, default: () => {
    }
  }) public onClick!: any;

  /**
   * Do something after toast gets dismissed
   */
  @Prop({
    type: Function, default: () => {
    }
  }) public onDismiss!: any;

  public isActive = false;
  public parentTop: any = null;
  public parentBottom: any = null;
  public queueTimer: number | undefined;
  public timer: Timer;

  public beforeMount() {
    this.setupContainer();
  }

  public mounted() {
    this.showNotice();
    eventBus.on('toast-clear', this.dismiss);
  }

  beforeDestroy() {
    eventBus.off('toast-clear', this.dismiss)
  }

  public setupContainer() {
    this.parentTop = document.querySelector('.p-toast.p-toast--top');
    this.parentBottom = document.querySelector('.p-toast.p-toast--bottom');
    // No need to create them, they already exists
    if (this.parentTop && this.parentBottom) {
      return;
    }

    if (!this.parentTop) {
      this.parentTop = document.createElement('div');
      this.parentTop.className = 'p-toast p-toast--top';
    }

    if (!this.parentBottom) {
      this.parentBottom = document.createElement('div');
      this.parentBottom.className = 'p-toast p-toast--bottom';
    }

    const container = document.body;
    container.appendChild(this.parentTop);
    container.appendChild(this.parentBottom);
  }

  public showNotice() {
    if (this.shouldQueue()) {
      // Call recursively if should queue
      this.queueTimer = setTimeout(this.showNotice, 250);
      return
    }
    this.correctParent.insertAdjacentElement('afterbegin', this.$el);
    this.isActive = true;

    if (this.duration) {
      this.timer = new Timer(this.dismiss, this.duration);
    }
  }

  public shouldQueue() {
    if (!this.queue) return false;

    return (
        this.parentTop.childElementCount > 0 ||
        this.parentBottom.childElementCount > 0
    )
  }

  public dismiss() {
    if (this.timer) this.timer.stop();
    clearTimeout(this.queueTimer);
    this.isActive = false;

    // Timeout for the animation complete before destroying
    setTimeout(() => {
      this.onDismiss.apply(null, arguments);
      this.$destroy();
      removeElement(this.$el)
    }, 150)
  }

  public toggleTimer(newVal) {
    if (!this.pauseOnHover || !this.timer) return;
    newVal ? this.timer.pause() : this.timer.resume();
  }

  public whenClicked() {
    if (!this.dismissible) return;
    this.onClick.apply(null, arguments);
    this.dismiss();
  }

  public closeToast() {
    this.dismiss();
  }

  public get className() {
    return classNames('p-toast__item--' + this.type,
        'p-toast__item--' + this.position
    );
  }

  public get transition() {
    switch (this.position) {
      case Positions.TOP:
      case Positions.TOP_RIGHT:
      case Positions.TOP_LEFT:
        return {
          enter: 'p-toast--fade-in-down',
          leave: 'p-toast--fade-out'
        };

      case Positions.BOTTOM:
      case Positions.BOTTOM_RIGHT:
      case Positions.BOTTOM_LEFT:
        return {
          enter: 'p-toast--fade-in-up',
          leave: 'p-toast--fade-out'
        };
    }
  }

  public get correctParent() {
    switch (this.position) {
      case Positions.TOP:
      case Positions.TOP_RIGHT:
      case Positions.TOP_LEFT:
        return this.parentTop;

      case Positions.BOTTOM:
      case Positions.BOTTOM_RIGHT:
      case Positions.BOTTOM_LEFT:
        return this.parentBottom;
    }
  }

}
</script>

<style scoped>

</style>
