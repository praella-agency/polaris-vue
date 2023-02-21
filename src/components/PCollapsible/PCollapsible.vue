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

<script>
    import { defineComponent, onBeforeUnmount, onMounted, ref, computed, watch  } from 'vue';
    import { classNames } from '../../utilities/css';
    import ObjectValidator from '../../utilities/validators/ObjectValidator';

    const Transition = {
        /** Assign a transition duration to the collapsible animation. */
        duration: String,
        /** Assign a transition timing function to the collapsible animation */
        timingFunction: String,
    }

    const AnimationState = ['idle', 'measuring', 'animating'];

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">The collapsible component is used to put long sections of information under a block that merchants
     *  can expand or collapse.</h4>
     */
    export default defineComponent({
        name: 'PCollapsible',
        props: {
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
        },
        setup(props) {
            let animationState = ref('idle');
            let height = ref(0);
            let isOpen = ref(props.open);

            const collapsibleContainer = ref(null);

            onBeforeUnmount(() => {
                collapsibleContainer.value.removeEventListener('transitionend', handleCompleteAnimation);
            })

            onMounted(() => {
                if (collapsibleContainer.value) {
                    collapsibleContainer.value.addEventListener('transitionend', handleCompleteAnimation);
                    if(props.open) {
                      height.value = collapsibleContainer.value.scrollHeight;
                    }
                }
            });

            const isFullyOpen = computed(() => {
                return animationState.value === 'idle' && props.open && isOpen.value;
            });

            const isFullyClosed = computed(() => {
                return animationState.value === 'idle' && !props.open && !isOpen.value;
            });

            const wrapperClassName = computed(() => {
                return classNames(
                    'Polaris-Collapsible',
                    isFullyClosed.value && 'Polaris-Collapsible--isFullyClosed',
                    props.expandOnPrint && 'Polaris-Collapsible--expandOnPrint',
                );
            });

            const collapsibleStyles = computed(() => {
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
                    if (event.target === collapsibleContainer.value) {
                        animationState.value = 'idle';
                        isOpen.value = props.open;
                    }
                }
            }

            watch(animationState, () => {
                if (!collapsibleContainer.value) {
                    return;
                }

                switch (animationState.value) {
                    case 'idle':
                        break;
                    case 'measuring':
                        height.value = (collapsibleContainer.value).scrollHeight;
                        setTimeout(() => {
                            animationState.value = 'animating';
                        }, 1);
                        break;
                    case 'animating':
                        height.value = props.open ? (collapsibleContainer.value).scrollHeight : 0;
                }
            })

            watch(() => props.open, (newValue) => {
              isOpen.value = newValue;

              if (props.open !== newValue) {
                    animationState.value = 'measuring';
                } else {
                    if (!collapsibleContainer.value) {
                        return;
                    }

                    switch (animationState.value) {
                        case 'idle':
                            break;
                        case 'measuring':
                            height.value = (collapsibleContainer.value).scrollHeight;
                            animationState.value = 'animating';
                            break;
                        case 'animating':
                            height.value = props.open ? (collapsibleContainer.value).scrollHeight : 0;
                    }
                }
            })

            return { animationState, height, isOpen, isFullyOpen, isFullyClosed, wrapperClassName, collapsibleStyles, handleCompleteAnimation, collapsibleContainer};
        }
    })
</script>
