<template>
    <div
        ref="scrollArea"
        :class="finalClassName"
        :data-polaris-scrollable="true"
        :tabindex="focusable ? 0 : undefined"
    >
        <!-- @slot Content to display in scrollable area -->
        <slot/>
    </div>
</template>

<script setup>
    import { computed, onMounted, onUnmounted, onUpdated, ref } from 'vue';
    import { classNames } from '../../utilities/css';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">The scrollable component is a container for long form content, such as terms of service, that allows
     *  for scrolling so merchants can expose more text as they read.</h4>
     */

    let props = defineProps({
        /**
         * Scroll content vertically
         */
        vertical: {
            type: Boolean,
            default: false
        },

        /**
         * Scroll content horizontally
         */
        horizontal: {
            type: Boolean,
            default: false
        },

        /**
         * Add a shadow when content is scrollable
         */
        shadow: {
            type: Boolean,
            default: false
        },

        /**
         * Slightly hints content upon mounting when scrollable
         */
        hint: {
            type: Boolean,
            default: false
        },

        /**
         * Adds a tabIndex to scrollable when children are not focusable
         */
        focusable: {
            type: Boolean,
            default: false
        },
    });

    const emit = defineEmits(['scrolledToBottom']);

    let topShadow = ref(false);
    let bottomShadow = ref(false);
    let scrollPosition = ref(0);
    let canScroll = ref(false);
    let scrollArea = ref(null);

    let finalClassName = computed(() => {
        return classNames(
            'Polaris-Scrollable',
            props.vertical && 'Polaris-Scrollable--vertical',
            props.horizontal && 'Polaris-Scrollable--horizontal',
            topShadow.value && 'Polaris-Scrollable--hasTopShadow',
            bottomShadow.value && 'Polaris-Scrollable--hasBottomShadow',
            props.vertical && canScroll.value && 'Polaris-Scrollable--verticalHasScrolling',
        );
    });

    function handleScroll() {
        if (scrollArea == null) {
            return;
        }

        const {scrollTop, clientHeight, scrollHeight} = (scrollArea);
        const shouldBottomShadow = Boolean(props.shadow && !(scrollTop + clientHeight >= scrollHeight));
        const shouldTopShadow = Boolean(props.shadow && scrollTop > 0 && scrollPosition.value > 0);

        const canScrollable = scrollHeight > clientHeight;
        const hasScrolledToBottom = scrollHeight - scrollTop <= clientHeight + 2;

        if (canScrollable && hasScrolledToBottom) {
            /**
             * Called when scrolled to the bottom of the scroll area
             */
            emit('scrolledToBottom');
        }

        topShadow.value = shouldTopShadow;
        bottomShadow.value = shouldBottomShadow;
        scrollPosition.value = scrollTop;
        canScroll.value = true;
    }

    function scrollHint() {
        if (scrollArea == null) {
            return;
        }

        const {clientHeight, scrollHeight} = (scrollArea);
        if (prefersReducedMotion || scrollPosition.value > 0 || scrollHeight <= clientHeight) {
            return;
        }

        const scrollDistance = scrollHeight - clientHeight;
        toggleLock();

        scrollPosition.value = scrollDistance > 100 ? 100 : scrollDistance;
        window.requestAnimationFrame(scrollStep);
    }

    function prevent(event) {
        event.preventDefault();
    }

    function prefersReducedMotion() {
        try {
            return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        } catch (err) {
            return false;
        }
    }

    function scrollStep() {
        const delta = scrollPosition.value * 0.2;
        scrollPosition.value = delta < 0.2 ? 0 : scrollPosition.value - delta;

        if (scrollPosition.value > 0) {
            window.requestAnimationFrame(scrollStep);
        } else {
            toggleLock(false);
        }
    }

    function toggleLock(shouldLock = true) {
        if (scrollArea == null) {
            return;
        }

        ['scroll', 'touchmove', 'wheel'].forEach((eventName) => {
            if (shouldLock) {
                (scrollArea).addEventListener(eventName, prevent);
            } else {
                (scrollArea).removeEventListener(eventName, prevent);
            }
        });
    }

    onMounted(() => {
        scrollArea = scrollArea.value;
        if (scrollArea == null) {
            return;
        }
        (scrollArea).addEventListener('scroll', () => {
            window.requestAnimationFrame(handleScroll);
        });
        window.addEventListener('resize', handleScroll);
        window.requestAnimationFrame(() => {
            handleScroll();
            if (props.hint) {
                scrollHint();
            }
        });
    });

    onUnmounted(() => {
        if (scrollArea == null) {
            return;
        }

        (scrollArea).removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
    });

    onUpdated(() => {
        if (scrollPosition.value && (scrollArea) && scrollPosition.value > 0) {
            (scrollArea).scrollTop = scrollPosition.value;
        }
    });
</script>
