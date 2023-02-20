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
            const collapsibleContainerRef = ref(null);

            onBeforeUnmount(() => {
                collapsibleContainerRef.value.removeEventListener('transitionend', handleCompleteAnimation);
            })

            onMounted(() => {
                if (collapsibleContainerRef.value) {
                    collapsibleContainerRef.value.addEventListener('transitionend', handleCompleteAnimation);
                    if(props.open) height = collapsibleContainerRef.value.scrollHeight;
                }
            });

            const isFullyOpen = computed(() => {
                return animationState === 'idle' && props.open && isOpen;
            });

            const isFullyClosed = computed(() => {
                return animationState === 'idle' && !props.open && !isOpen;
            });

            const wrapperClassName = computed(() => {
                return classNames(
                    'Polaris-Collapsible',
                    isFullyClosed && 'Polaris-Collapsible--isFullyClosed',
                    props.expandOnPrint && 'Polaris-Collapsible--expandOnPrint',
                );
            });

            const collapsibleStyles = computed(() => {
                let transitionStyle = {};
                const collapsible = {
                    maxHeight: isFullyOpen ? 'none' : `${height}px`,
                    overflow: isFullyOpen ? 'visible' : 'hidden',
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
                    if (event.target === collapsibleContainerRef.value) {
                        animationState = 'idle';
                        isOpen = props.open;
                    }
                }
            }

            watch(animationState, () => {
                if (!collapsibleContainerRef.value) {
                    return;
                }

                switch (animationState) {
                    case 'idle':
                        break;
                    case 'measuring':
                        height = (collapsibleContainerRef.value).scrollHeight;
                        setTimeout(() => {
                            animationState = 'animating';
                        }, 1);
                        break;
                    case 'animating':
                        height = props.open ? (collapsibleContainerRef.value).scrollHeight : 0;
                }
            })

            watch(isOpen, (value) => {
                if (props.open !== value) {
                    animationState = 'measuring';
                } else {
                    if (!collapsibleContainerRef.value) {
                        return;
                    }

                    switch (animationState) {
                        case 'idle':
                            break;
                        case 'measuring':
                            height = (collapsibleContainerRef.value).scrollHeight;
                            animationState = 'animating';
                            break;
                        case 'animating':
                            height = props.open ? (collapsibleContainerRef.value).scrollHeight : 0;
                    }
                }
            })

            watch(open, (value) => {
                if (value !== isOpen) {
                    animationState = 'measuring';
                } else {
                    if (!collapsibleContainerRef.value) {
                        return;
                    }

                    switch (animationState) {
                        case 'idle':
                            break;
                        case 'measuring':
                            height = (collapsibleContainerRef.value).scrollHeight;
                            animationState = 'animating';
                            break;
                        case 'animating':
                            height = props.open ? (collapsibleContainerRef.value).scrollHeight : 0;
                    }
                }
            })

            return { animationState, height, isOpen, isFullyOpen, isFullyClosed, wrapperClassName, collapsibleStyles, handleCompleteAnimation, collapsibleContainerRef};
        }
    })
</script>
