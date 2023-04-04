<template>
  <transition
      :enter-active-class="transition.enter"
      :leave-active-class="transition.leave">
    <div v-show="isActive" :class="`Polaris-Frame-ToastManager ${positionClass}`" ref="toast">
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
<script setup>
import { computed, onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue';
import {PIcon} from '../../../components/PIcon';
import Timer from './timer';
import {classNames} from '../../../utilities/css';
import { Positions } from '../../variables';

const removeElement = (el) => {
    if (typeof el.remove !== 'undefined') {
        el.remove();
    } else {
        el.parentNode.removeChild(el);
    }
    if (document.body.querySelector(".v-toast--pending")) {
        document.body.querySelector(".v-toast--pending").remove();
    }
};

let props = defineProps({
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
});

let isActive = ref(false);
let parentTop = ref(null);
let parentBottom = ref(null);
let queueTimer = ref(undefined);
let timer = ref(Timer);
let toast = ref(null);

let className = computed(() => {
    return classNames(
        props.error && 'Polaris-Frame-Toast--error',
    );
});

let positionClass = computed(() => {
    return classNames(
        `Polaris-Frame-Toast--Position-${props.position}`,
    );
});

let transition = computed(() => {
    switch (props.position) {
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
});

let correctParent = computed(() => {
    switch (props.position) {
        case Positions.TOP:
        case Positions.TOP_RIGHT:
        case Positions.TOP_LEFT:
            return parentTop.value;
        case Positions.BOTTOM:
        case Positions.BOTTOM_RIGHT:
        case Positions.BOTTOM_LEFT:
            return parentBottom.value;
    }
});

function setupContainer() {
    parentTop.value = document.querySelector('.Polaris-Frame-Toast-Wrapper.Polaris-Frame-Toast-Wrapper-Top');
    parentBottom.value = document.querySelector('.Polaris-Frame-Toast-Wrapper.Polaris-Frame-Toast-Wrapper-Bottom');
    // No need to create them, they already exists
    if (parentTop.value && parentBottom.value) {
        return;
    }
    if (!parentTop.value) {
        parentTop.value = document.createElement('div');
        parentTop.value.className = 'Polaris-Frame-Toast-Wrapper Polaris-Frame-Toast-Wrapper-Top';
    }
    if (!parentBottom.value) {
        parentBottom.value = document.createElement('div');
        parentBottom.value.className = 'Polaris-Frame-Toast-Wrapper Polaris-Frame-Toast-Wrapper-Bottom';
    }
    const container = document.body;
    container.appendChild(parentTop.value);
    container.appendChild(parentBottom.value);
}

function showNotice() {
    if (shouldQueue()) {
        // Call recursively if should queue
        queueTimer.value = setTimeout(showNotice, 250);
        return;
    }
    correctParent.value.insertAdjacentElement('afterbegin', toast);
    isActive.value = true;
    if (props.duration) {
        timer.value = new Timer(dismiss, props.duration);
    }
}

function shouldQueue() {
    if (!props.queue) {
        return false;
    }
    return (
        parentTop.value.childElementCount > 0 ||
        parentBottom.value.childElementCount > 0
    );
}

function dismiss() {
    if (timer.value) {
        timer.value.stop();
    }
    clearTimeout(queueTimer.value);
    isActive.value = false;
    // Timeout for the animation complete before destroying
    setTimeout(() => {
        props.onDismiss.apply(null, arguments);
        // this.$`utils.destroyed`;
        // this.$destroy();
        removeElement(toast);
    }, 150);
}

function toggleTimer(newVal) {
    if (!props.pauseOnHover || !timer.value) {
        return;
    }
    newVal ? timer.value.pause() : timer.value.resume();
}

function closeToast() {
    if (!props.dismissible) {
        return;
    }
    props.onClick.apply(null, arguments);
    dismiss();
}

onBeforeMount(() => {
    setupContainer();
});

onMounted(() => {
    toast = toast.value;
    showNotice();
    props.eventBus.on('toast-clear', () => {
        dismiss();
    });
});

onBeforeUnmount(() => {
    props.eventBus.off('toast-clear', dismiss);
});
</script>

