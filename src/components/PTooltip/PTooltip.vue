<template>
    <div ref="container">
        <!-- @slot Filter Activator content -->
        <slot name="activator" :activate="onActivate"/>

        <PTooltipOverlay
            :id="realId+'Overlay'"
            :active="toggleActive"
            :activatorId="activatorRectId"
            :preferredPosition="preferredPosition"
            :preferredAlignment="preferredAlignment"
            :fullWidth="fullWidth"
        >
            <template v-slot:overlay="props">
                <div :class="className" :ref="`content-${activatorRectId}`">
                    <div v-if="!props.data.measuring"
                         :style="{ left: props.data.tipPosition+'px' }"
                         class="Polaris-Popover__Tip">
                    </div>
                    <div class="Polaris-Popover__Content">
                        <div class="Polaris-Popover__Pane Polaris-Scrollable Polaris-Scrollable--vertical
                          Polaris-Scrollable--hasBottomShadow Polaris-Scrollable--verticalHasScrolling"
                             data-polaris-scrollable="true">
                            <div class="Polaris-Tooltip-TooltipOverlay">
                                <div class="Polaris-Tooltip-TooltipOverlay__Content" style="min-height: 28px;">
                                    <slot name="tooltipContent"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </PTooltipOverlay>
    </div>
</template>

<script>
    import { classNames } from '../../utilities/css';
    import { PTooltipOverlay } from '../../components/PTooltip/components/PTooltipOverlay';

    export default {
        name: 'Tooltip',
        components: {
            PTooltipOverlay,
        },
        props: {
            /**
             * Id for the PPopover.
             */
            id: {
                type: String,
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
                default: 'above',
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
                container: HTMLElement,
                toggleActive: this.active,
            };
        },
        computed: {
            activatorRectId() {
                return this.id.replace(/_/g, '');
            },
            realId() {
                return 'PolarisPopover' + this.activatorRectId;
            },
            activatorId() {
                return this.realId + 'Activator';
            },
            className() {
                return classNames(
                    'Polaris-Popover',
                    'Polaris-Tooltip-Popover',
                    this.fullWidth && 'Polaris-Popover--fullWidth',
                    this.measuring && 'Polaris-Popover--measuring',
                );
            },
            findActivator() {
                return document.getElementById(this.activatorId);
            },
        },
        methods: {
            handlePageClick(e) {
                const target = e.target;
                const contentNode = this.$refs['content-' + this.activatorRectId];
                if ((contentNode != null && this.nodeContainsDescendant(contentNode, target)) ||
                    this.nodeContainsDescendant(this.findActivator, target) || !this.toggleActive) {
                    return;
                }
                /**
                 * Close filter menu when page is clicked
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
            },
        },
        mounted() {
            if (this.$refs.container.firstElementChild !== null) {
                this.$refs.container.firstElementChild.id = this.activatorId;
            }

            window.addEventListener('click', this.handlePageClick);
            window.addEventListener('touchstart', this.handlePageClick);
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
        },
    }
</script>

<style scoped>

</style>