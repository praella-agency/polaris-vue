<template>
    <div
        :id="id"
        :class="wrapperClassName"
        :style="collapsibleStyles"
        ref="collapsibleContainer"
        :aria-expanded="open"
    >
        <!-- @slot The content to display inside the collapsible -->
        <slot v-if="expandOnPrint || !isFullyClosed"/>
    </div>
</template>

<script setup>
    import { onBeforeUnmount, onMounted, ref, computed, watch  } from 'vue';
    import { classNames } from '../../utilities/css';
    import ObjectValidator from '../../utilities/validators/ObjectValidator';
    import { Transition } from '../variables';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">The collapsible component is used to put long sections of information under a block that merchants
     *  can expand or collapse.</h4>
     */

    let props = defineProps({
        /**
         * Assign a unique ID to the collapsible. For accessibility, pass this ID as the value of the triggering
         * component’s aria-controls prop.
         */
        id: {
            type: [String, Number],
            default: null,
        },

        /**
         * Option to show collapsible content when printing
         */
        expandOnPrint: {
            type: Boolean,
            default: false,
        },

        /**
         * Toggle whether the collapsible is expanded or not.
         */
        open: {
            type: Boolean,
            default: false,
        },

        /**
         * Assign transition properties to the collapsible
         */
        transition: {
            type: Object,
            default: () => ({}),
            ...ObjectValidator('transition', Transition)
        }
    });

    let animationState = ref('idle');
    let height = ref(0);
    let isOpen = ref(props.open);
    let collapsibleContainer = ref(null);

    let isFullyOpen = computed(() => {
        return animationState.value === 'idle' && props.open && isOpen.value;
    });

    let isFullyClosed = computed(() => {
        return animationState.value === 'idle' && !props.open && !isOpen.value;
    });

    let wrapperClassName = computed(() => {
        return classNames(
            'Polaris-Collapsible',
            isFullyClosed.value && 'Polaris-Collapsible--isFullyClosed',
            props.expandOnPrint && 'Polaris-Collapsible--expandOnPrint',
        );
    });

    let collapsibleStyles = computed(() => {
        let transitionStyle = {};
        const collapsible = {
            maxHeight: isFullyOpen.value ? 'none' : `${height.value}px`,
            overflow: isFullyOpen.value ? 'visible' : 'hidden',
        };

        if (Object.keys(props.transition).length > 0) {
            transitionStyle = {
                transitionDuration: `${props.transition.duration}`,
                transitionTimingFunction: `${props.transition.timingFunction}`,
            };
        }

        return [transitionStyle, collapsible];
    });

    function handleCompleteAnimation(event) {
        if (event.target) {
            if (event.target === collapsibleContainer) {
                animationState.value = 'idle';
                isOpen.value = props.open;
            }
        }
    }

    watch(animationState, () => {
        if (!collapsibleContainer) {
            return;
        }

        switch (animationState.value) {
            case 'idle':
                break;
            case 'measuring':
                height.value = (collapsibleContainer).scrollHeight;
                setTimeout(() => {
                    animationState.value = 'animating';
                }, 1);
                break;
            case 'animating':
                height.value = props.open ? (collapsibleContainer).scrollHeight : 0;
        }
    })

    watch(() => props.open, (newValue) => {
        isOpen.value = newValue;

        if (props.open !== newValue) {
            animationState.value = 'measuring';
        } else {
            if (!collapsibleContainer) {
                return;
            }

            switch (animationState.value) {
                case 'idle':
                    break;
                case 'measuring':
                    height.value = (collapsibleContainer).scrollHeight;
                    animationState.value = 'animating';
                    break;
                case 'animating':
                    height.value = props.open ? (collapsibleContainer).scrollHeight : 0;
            }
        }
    })

    onMounted(() => {
        collapsibleContainer = collapsibleContainer.value;
        collapsibleContainer.addEventListener('transitionend', handleCompleteAnimation);
        if (collapsibleContainer) {
            if(props.open) {
                height.value = collapsibleContainer.scrollHeight;
            }
        }
    });

    onBeforeUnmount(() => {
        collapsibleContainer.removeEventListener('transitionend', handleCompleteAnimation);
    })
</script>
