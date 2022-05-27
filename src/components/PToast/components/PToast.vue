<template>
  <transition
      :enter-active-class="transition.enter"
      :leave-active-class="transition.leave">
    <div v-show="isActive" :class="`Polaris-Frame-ToastManager ${positionClass}`">
      <div class="Polaris-Frame-ToastManager__ToastWrapper">
        <div class="Polaris-Frame-Toast" :class="className"
             @mouseover="toggleTimer(true)"
             @mouseleave="toggleTimer(false)">
          {{ message }}
          <button v-if="dismissible" class="Polaris-Frame-Toast__CloseButton" @click="closeToast">
            <PIcon source="MobileCancelMajor"></PIcon>
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import {PIcon} from '../../../components/PIcon';
import Timer from './timer';
import {classNames} from '../../../utilities/css';
import utils from "../../../utilities";

const Positions = Object.freeze({
  TOP_RIGHT: 'top-right',
  TOP: 'top',
  TOP_LEFT: 'top-left',
  BOTTOM_RIGHT: 'bottom-right',
  BOTTOM: 'bottom',
  BOTTOM_LEFT: 'bottom-left',
});
const removeElement = (el) => {
  if (typeof el.remove !== 'undefined') {
    el.remove();
  } else {
    el.parentNode.removeChild(el);
  }
};

export default {
  components: {
    PIcon,
  },
  props: {
    /**
     * Id for the element
     */
    id: {
      type: [String, Number],
      default: null,
    },
    /**
     * The message that should appear in the toast message
     */
    message: {
      type: String,
      required: true,
    },
    /**
     * Show errored message
     */
    error: {
      type: Boolean,
      default: false,
    },
    /**
     * Toast Position
     */
    position: {
      type: String,
      default: 'bottom',
      validator(value) {
        return ['top-right', 'top', 'top-left', 'bottom-right', 'bottom', 'bottom-left'].indexOf(value) !== -1;
      },
    },
    /**
     * The length of time in milliseconds the toast message should persist
     */
    dismissible: {
      type: Boolean,
      default: true,
    },
    /**
     * Allow user dismiss by clicking
     */
    duration: {
      type: Number,
      default: 3000,
    },
    /**
     * Wait for existing to dismiss before showing new
     */
    queue: {
      type: Boolean,
      default: false,
    },
    /**
     * Pause the timer when mouse on over a toast
     */
    pauseOnHover: {
      type: Boolean,
      default: true,
    },
    /**
     * Do something when user clicks
     */
    onClick: {
      type: Function,
      default: () => ({}),
    },
    /**
     * Do something after toast gets dismissed
     */
    onDismiss: {
      type: Function,
      default: () => ({}),
    },
    eventBus: {
      type: Object
    }
  },
  data() {
    return {
      isActive: false,
      parentTop: null,
      parentBottom: null,
      queueTimer: undefined,
      timer: Timer,
    };
  },
  computed: {
    className() {
      return classNames(
          this.error && 'Polaris-Frame-Toast--error',
      );
    },
    positionClass() {
      return classNames(
          'Polaris-Frame-Toast--Position-' + this.position,
      );
    },
    transition() {
      switch (this.position) {
        case Positions.TOP:
        case Positions.TOP_RIGHT:
        case Positions.TOP_LEFT:
          return {
            enter: 'Polaris-Frame-Toast-Fade-In-Down',
            leave: 'Polaris-Frame-Toast-Fade-Out',
          };
        case Positions.BOTTOM:
        case Positions.BOTTOM_RIGHT:
        case Positions.BOTTOM_LEFT:
          return {
            enter: 'Polaris-Frame-Toast-Fade-In-Up',
            leave: 'Polaris-Frame-Toast-Fade-Out',
          };
      }
    },
    correctParent() {
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
    },
  },
  methods: {
    setupContainer() {
      this.parentTop = document.querySelector('.Polaris-Frame-Toast-Wrapper.Polaris-Frame-Toast-Wrapper-Top');
      this.parentBottom = document.querySelector('.Polaris-Frame-Toast-Wrapper.Polaris-Frame-Toast-Wrapper-Bottom');
      // No need to create them, they already exists
      if (this.parentTop && this.parentBottom) {
        return;
      }
      if (!this.parentTop) {
        this.parentTop = document.createElement('div');
        this.parentTop.className = 'Polaris-Frame-Toast-Wrapper Polaris-Frame-Toast-Wrapper-Top';
      }
      if (!this.parentBottom) {
        this.parentBottom = document.createElement('div');
        this.parentBottom.className = 'Polaris-Frame-Toast-Wrapper Polaris-Frame-Toast-Wrapper-Bottom';
      }
      const container = document.body;
      container.appendChild(this.parentTop);
      container.appendChild(this.parentBottom);
    },
    showNotice() {
      if (this.shouldQueue()) {
        // Call recursively if should queue
        this.queueTimer = setTimeout(this.showNotice, 250);
        return;
      }
      this.correctParent.insertAdjacentElement('afterbegin', this.$el);
      this.isActive = true;
      if (this.duration) {
        this.timer = new Timer(this.dismiss, this.duration);
      }
    },
    shouldQueue() {
      if (!this.queue) {
        return false;
      }
      return (
          this.parentTop.childElementCount > 0 ||
          this.parentBottom.childElementCount > 0
      );
    },
    dismiss() {
      if (this.timer) {
        this.timer.stop();
      }
      clearTimeout(this.queueTimer);
      this.isActive = false;
      // Timeout for the animation complete before destroying
      setTimeout(() => {
        this.onDismiss.apply(null, arguments);
        // this.$`utils.destroyed`;
        // this.$destroy();
        removeElement(this.$el);
      }, 150);
    },
    toggleTimer(newVal) {
      if (!this.pauseOnHover || !this.timer) {
        return;
      }
      newVal ? this.timer.pause() : this.timer.resume();
    },
    closeToast() {
      if (!this.dismissible) {
        return;
      }
      this.onClick.apply(null, arguments);
      this.dismiss();
    },
  },
  beforeMount() {
    console.log('binding container');
    this.setupContainer();
  },
  mounted() {
    this.showNotice();
    this.eventBus.on('toast-clear', () => {
      this.dismiss();
    });
  },
  [utils.beforeDestroy]() {
    this.eventBus.off('toast-clear', this.dismiss);
  },
};
</script>

