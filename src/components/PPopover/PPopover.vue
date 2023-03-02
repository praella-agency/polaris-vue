<template>
    <div ref="popoverContainer" :id="activatorId">
        <!-- @slot Filter Activator content -->
        <slot name="activator" :activate="onActivate"/>

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

<script setup>
    import { computed, onBeforeUnmount, onMounted, onUnmounted, ref, watch } from 'vue';
    import { classNames } from '../../utilities/css';
    import { PPopoverOverlay } from '../../components/PPopover/components/PPopoverOverlay';

    /**
     * <br/>
     * <h4 style={{fontFamily: '-apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto,
     * Helvetica Neue, sans-serif'}}>
     * Popovers are small overlays that open on demand. They let merchants access additional content and actions without
     * cluttering the page.</h4>
     */

    let props = defineProps({
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
    });

    let emits = defineEmits(['click', 'keyup', 'close', 'update:active', 'activate']);
    let activeStatus = ref(props.active);
    let container = ref(HTMLElement);
    let popoverContainer = ref(null);
    let popoverOverlayContainer = ref(`content${props.id}`);

    let className = computed(() => {
        return classNames(
            'Polaris-Popover',
            props.fullWidth && 'Polaris-Popover--fullWidth',
            props.measuring && 'Polaris-Popover--measuring',
        );
    });

    let contentClassName = computed(() => {
        return classNames(
            'Polaris-Popover__Content',
            props.fullHeight && 'Polaris-Popover__Content--fullHeight',
            props.fluidContent && 'Polaris-Popover__Content--fluidContent',
        );
    });

    let realId = computed(() => {
        return `PolarisPopover${props.id}`;
    });

    let activatorId = computed(() => {
        return `${realId.value}Activator`;
    });

    function findActivator() {
        return document.getElementById(activatorId.value);
    }

    function handleKeyPress(e) {
        if (e.keyCode !== 27) {
            return;
        }
        if (props.active) {
            /** @ignore */
            emit('update:active', false);
            /**
             * Close filter menu when EscapeKey is pressed
             */
            emit('close', 'EscapeKeypress');
        }
    }

    function handlePageClick(e) {
        const target = e.target;
        const contentNode = popoverOverlayContainer.value;
        if ((contentNode != null && nodeContainsDescendant(contentNode, target)) ||
            nodeContainsDescendant(findActivator(), target) || !activeStatus.value) {
            return;
        }
        if (props.active) {
            /**
             * Close filter menu when page is clicked
             */
            emit('close', 'Click');
            /** @ignore */
            emit('update:active', false);
        }
    }

    function nodeContainsDescendant(haystack, needle) {
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
    }

    function onActivate() {
        /**
         * Activate method
         */
        emit('activate');
    }

    function handleFocusFirstItem() {
        emit('close', 'FocusOut');
        /** @ignore */
        emit('update:active', false);
    }

    function handleFocusLastItem() {
        emit('close', 'FocusOut');
        /** @ignore */
        emit('update:active', false);
    }

    function onClose(event) {
        emit('close', 'Click');
        /** @ignore */
        emit('update:active', false);
        if (event && event.target) {
            const target = event.target;
            const contentNode = popoverOverlayContainer;
            if (!findActivator()) {
                const popoverOverlay = document.getElementById(`${realId}Overlay`);
                if (popoverOverlay) {
                    popoverOverlay.remove();
                }
            } else {
                if ((contentNode != null && nodeContainsDescendant(contentNode, target)) ||
                    nodeContainsDescendant(findActivator(), target) || !props.active) {
                }
            }
        }
    }


    onMounted(() => {
        popoverContainer = popoverContainer.value;
        popoverOverlayContainer = popoverOverlayContainer.value;
        window.addEventListener('click', handlePageClick);
        window.addEventListener('touchstart', handlePageClick);
        document.addEventListener('keyup', handleKeyPress);
    });

    onBeforeUnmount(() => {
        const overlay = document.getElementById(`${realId.value}Overlay`);
        if (overlay) {
            overlay.remove();
        }
    });

    onUnmounted(() => {
        window.removeEventListener('click', handlePageClick);
        window.removeEventListener('touchstart', handlePageClick);
        window.removeEventListener('keyup', handleKeyPress);
    });

    watch(() => props.active, (value) => {
        activeStatus.value = value;
        if (value) {
            const popoverOverlay = document.getElementById(`${realId.value}Overlay`);
            if (popoverOverlay) {
                document.body.append(popoverOverlay);
            }
        } else {
            const popoverOverlay = document.getElementById(`${realId.value}Overlay`);
            if (popoverOverlay) {
                popoverContainer.append(popoverOverlay);
            }
        }
    });
</script>
