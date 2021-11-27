<template>
    <div ref="container">
        <!-- @slot Filter Activator content -->
        <slot name="activator" :activate="onActivate"></slot>

        <PPopoverOverlay
            :id="realId+'Overlay'"
            :active="active"
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
             * @values true | false
             */
            active: {
                type: Boolean,
                required: true,
            },
            /**
             * Preferred Position.
             * @values below | above | mostSpace
             */
            preferredPosition: {
                type: String,
                default: 'below',
            },
            /**
             * Preferred Alignment
             * @values center | left | right
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
             * Prevent auto focus on the activator
             * @values true | false
             */
            preventAutoFocus: {
                type: Boolean,
                default: false,
            },
            /**
             * Automatically add wrap content in section.
             * @values true | false
             */
            sectioned: {
                type: Boolean,
                default: false,
            },
            /**
             * Allow PPopover to stretch to the full width of its activator.
             * @values true | false
             */
            fullWidth: {
                type: Boolean,
                default: false,
            },
            /**
             * Allow popover to stretch to fit content vertically.
             * @values true | false
             */
            fullHeight: {
                type: Boolean,
                default: false,
            },
            /**
             * Allow popover content to determine the overlay width and height.
             * @values true | false
             */
            fluidContent: {
                type: Boolean,
                default: false,
            },
            /**
             * Enable measure
             * @values true | false
             */
            measuring: {
                type: Boolean,
                default: false,
            },
            /**
             * Enable positioning
             * @values true | false
             */
            positioning: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                isAppended: false,
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
                /**
                 * Close filter menu when EscapeKey is pressed
                 * @property {Default}
                 */
                this.$emit('close', 'EscapeKeypress');
            },
            handlePageClick(e) {
                const target = e.target;
                const contentNode = this.$refs['content-' + this.id];
                if ((contentNode != null && this.nodeContainsDescendant(contentNode, target)) ||
                    this.nodeContainsDescendant(this.findActivator(), target) || !this.active) {
                    return;
                }
                /**
                 * Close filter menu when page is clicked
                 * @property {Event} click
                 */
                this.$emit('close', 'Click');
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
            },
            handleFocusLastItem() {
                this.$emit('close', 'FocusOut');
            },
            onClose() {
                this.$emit('close', 'Click');
            },
        },
        watch: {
            active(value, oldValue) {
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
            if (this.$refs.container['firstElementChild'] !== null) {
                this.$refs.container['firstElementChild'].id = this.activatorId;
            }

            window.addEventListener('click', this.handlePageClick);
            window.addEventListener('touchstart', this.handlePageClick);
            document.addEventListener('keyup', this.handleKeyPress);
        },
        beforeDestroy() {
            if (this.isAppended) {
                const popoverOverlay = document.getElementById(this.realId + 'Overlay');
                if (popoverOverlay) {
                    popoverOverlay.remove();
                }
            }
        },
        destroyed() {
            window.removeEventListener('click', this.handlePageClick);
            window.removeEventListener('touchstart', this.handlePageClick);
            window.removeEventListener('keyup', this.handleKeyPress);
        },
    }
</script>
