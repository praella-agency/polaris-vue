<template>
    <div ref="container" :id="activatorId">
        <!-- @slot Filter Activator content -->
        <slot name="activator" :activate="onActivate"></slot>

        <PPopoverOverlay
            :id="realId+'Overlay'"
            :active="activeStatus"
            :activatorId="activatorId"
            :preferredPosition="preferredPosition"
            :preferredAlignment="preferredAlignment"
            :fullWidth="fullWidth"
            @close="onClose">
            <template v-slot:overlay="props">
                <div :class="className" :ref="`content-${id}`">
                    <div v-if="!props.data.measuring"
                         :style="{ left: props.data.tipPosition+'px' }"
                         class="Polaris-Popover__Tip">
                    </div>
                    <div class="Polaris-Popover__FocusTracker"
                         @focus="handleFocusFirstItem"
                         tabindex="0">
                    </div>
                    <div class="Polaris-Popover__Wrapper">
                        <div :class="contentClassName">
                            <div class="Polaris-Popover__Pane Polaris-Scrollable Polaris-Scrollable--vertical"
                                 data-polaris-scrollable="true">
                                <!-- @slot Popover Overlay content -->
                                <slot name="content"></slot>
                            </div>
                        </div>
                    </div>
                    <div class="Polaris-Popover__FocusTracker"
                         @focus="handleFocusLastItem"
                         tabindex="0">
                    </div>
                </div>
            </template>
        </PPopoverOverlay>
    </div>
</template>


<script>
    import { classNames } from '../../utilities/css';
    import { PPopoverOverlay } from '../../components/PPopover/components/PPopoverOverlay';

    /**
     * <br/>
     * <h4 style={{fontFamily: '-apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto,
     * Helvetica Neue, sans-serif'}}>
     * Popovers are small overlays that open on demand. They let merchants access additional content and actions without
     * cluttering the page.</h4>
     */
    export default {
        name: 'PPopover',
        components: {
            PPopoverOverlay,
        },
        props: {
            /**
             * Id for the PPopover.
             */
            id: {
                type: [String, Number],
                required: true,
            },
            /**
             * Show or hide the PPopover.
             */
            active: {
                type: Boolean,
                required: true,
            },
            /**
             * Preferred Position.
             */
            preferredPosition: {
                type: String,
                default: 'below',
            },
            /**
             * Preferred Alignment.
             */
            preferredAlignment: {
                type: String,
                default: 'center',
            },
            /**
             * The element type to wrap the activator with.
             */
            activatorWrapper: {
                type: String,
                default: null,
            },
            /**
             * Prevent auto focus on the activator.
             */
            preventAutoFocus: {
                type: Boolean,
                default: false,
            },
            /**
             * Automatically add wrap content in section.
             */
            sectioned: {
                type: Boolean,
                default: false,
            },
            /**
             * Allow PPopover to stretch to the full width of its activator.
             */
            fullWidth: {
                type: Boolean,
                default: false,
            },
            /**
             * Allow popover to stretch to fit content vertically.
             */
            fullHeight: {
                type: Boolean,
                default: false,
            },
            /**
             * Allow popover content to determine the overlay width and height.
             */
            fluidContent: {
                type: Boolean,
                default: false,
            },
            /**
             * Enable measure.
             */
            measuring: {
                type: Boolean,
                default: false,
            },
            /**
             * Enable positioning.
             */
            positioning: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                isAppended: false,
                activeStatus: this.active,
                container: HTMLElement,
            };
        },
        computed: {
            className() {
                return classNames(
                    'Polaris-Popover',
                    this.fullWidth && 'Polaris-Popover--fullWidth',
                    this.measuring && 'Polaris-Popover--measuring',
                );
            },
            contentClassName() {
                return classNames(
                    'Polaris-Popover__Content',
                    this.fullHeight && 'Polaris-Popover__Content--fullHeight',
                    this.fluidContent && 'Polaris-Popover__Content--fluidContent',
                );
            },
            realId() {
                return 'PolarisPopover' + this.id;
            },
            activatorId() {
                return this.realId + 'Activator';
            },
        },
        methods: {
            findActivator() {
                return document.getElementById(this.activatorId);
            },
            handleKeyPress(e) {
                if (e.keyCode !== 27) {
                    return;
                }
                if (this.active) {
                    /** @ignore */
                    this.$emit('update:active', false);
                    /**
                     * Close filter menu when EscapeKey is pressed
                     */
                    this.$emit('close', 'EscapeKeypress');
                }
            },
            handlePageClick(e) {
                const target = e.target;
                const contentNode = this.$refs['content-' + this.id];
                if ((contentNode != null && this.nodeContainsDescendant(contentNode, target)) ||
                    this.nodeContainsDescendant(this.findActivator(), target) || !this.activeStatus) {
                    return;
                }
                if (this.active) {
                    /**
                     * Close filter menu when page is clicked
                     */
                    this.$emit('close', 'Click');
                    /** @ignore */
                    this.$emit('update:active', false);
                }
            },
            nodeContainsDescendant(haystack, needle) {
                if (haystack === needle) {
                    return true;
                }
                let parent = needle.parentNode;
                while (parent != null) {
                    if (parent === haystack) {
                        return true;
                    }
                    parent = parent.parentNode;
                }
                return false;
            },
            onActivate() {
                /**
                 * Activate method
                 */
                this.$emit('activate');
            },
            handleFocusFirstItem() {
                this.$emit('close', 'FocusOut');
                /** @ignore */
                this.$emit('update:active', false);
            },
            handleFocusLastItem() {
                this.$emit('close', 'FocusOut');
                /** @ignore */
                this.$emit('update:active', false);
            },
            onClose(event) {
                this.$emit('close', 'Click');
                /** @ignore */
                this.$emit('update:active', false);
                if (event && event.target) {
                    const target = event.target;
                    const contentNode = this.$refs['content-' + this.id];
                    if (!this.findActivator()) {
                        const popoverOverlay = document.getElementById(this.realId + 'Overlay');
                        if (popoverOverlay) {
                            popoverOverlay.remove();
                        }
                    } else {
                        if ((contentNode != null && this.nodeContainsDescendant(contentNode, target)) ||
                            this.nodeContainsDescendant(this.findActivator(), target) || !this.active) {
                            return;
                        }
                    }
                }
            }
        },
        watch: {
            active(value, oldValue) {
                this.activeStatus = value;
                if (value) {
                    const popoverOverlay = document.getElementById(this.realId + 'Overlay');
                    if (popoverOverlay) {
                        const rootElement = document.body;
                        rootElement.append(popoverOverlay);
                    }
                } else {
                    const popoverOverlay = document.getElementById(this.realId + 'Overlay');
                    if (popoverOverlay) {
                        const rootElement = this.$refs.container;
                        rootElement.append(popoverOverlay);
                    }
                }
            }
        },
        mounted() {
            window.addEventListener('click', this.handlePageClick);
            window.addEventListener('touchstart', this.handlePageClick);
            document.addEventListener('keyup', this.handleKeyPress);
        },
        beforeDestroy() {
            const overlay = document.getElementById(this.realId + 'Overlay');
            if (overlay) {
                overlay.remove();
            }
        },
        destroyed() {
            window.removeEventListener('click', this.handlePageClick);
            window.removeEventListener('touchstart', this.handlePageClick);
            window.removeEventListener('keyup', this.handleKeyPress);
        },
    }
</script>
