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
    export default {
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
        data() {
            return {
                animationState: 'idle',
                height: 0,
                isOpen: this.open,
            }
        },
        computed: {
            isFullyOpen() {
                return this.animationState === 'idle' && this.open && this.isOpen;
            },
            isFullyClosed() {
                return this.animationState === 'idle' && !this.open && !this.isOpen;
            },
            wrapperClassName() {
                return classNames(
                    'Polaris-Collapsible',
                    this.isFullyClosed && 'Polaris-Collapsible--isFullyClosed',
                    this.expandOnPrint && 'Polaris-Collapsible--expandOnPrint',
                );
            },
            collapsibleStyles() {
                let transitionStyle = {};
                const collapsible = {
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
        },
        methods: {
            handleCompleteAnimation(event) {
                if (event.target) {
                    if (event.target === this.$refs.collapsibleContainer) {
                        this.animationState = 'idle';
                        this.isOpen = this.open;
                    }
                }
            }
        },
        watch: {
            animationState: function () {
                if (!this.$refs.collapsibleContainer) {
                    return;
                }

                switch (this.animationState) {
                    case 'idle':
                        break;
                    case 'measuring':
                        this.height = (this.$refs.collapsibleContainer).scrollHeight;
                        setTimeout(() => {
                            this.animationState = 'animating';
                        }, 1);
                        break;
                    case 'animating':
                        this.height = this.open ? (this.$refs.collapsibleContainer).scrollHeight : 0;
                }
            },
            isOpen: function (value) {
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
                            this.height = (this.$refs.collapsibleContainer).scrollHeight;
                            this.animationState = 'animating';
                            break;
                        case 'animating':
                            this.height = this.open ? (this.$refs.collapsibleContainer).scrollHeight : 0;
                    }
                }
            },
            open: function (value) {
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
                            this.height = (this.$refs.collapsibleContainer).scrollHeight;
                            this.animationState = 'animating';
                            break;
                        case 'animating':
                            this.height = this.open ? (this.$refs.collapsibleContainer).scrollHeight : 0;
                    }
                }
            }
        },
        mounted() {
            (this.$refs.collapsibleContainer).addEventListener('transitionend', this.handleCompleteAnimation);

            if (this.open && this.$refs.collapsibleContainer) {
                // If collapsible defaults to open, set an initial height
                this.height = (this.$refs.collapsibleContainer).scrollHeight;
            }
        },
        beforeDestroy() {
            (this.$refs.collapsibleContainer)
                .removeEventListener('transitionend', this.handleCompleteAnimation);
        },
    }
</script>

<style scoped>

</style>