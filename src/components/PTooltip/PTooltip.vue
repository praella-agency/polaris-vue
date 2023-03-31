<template>
    <div ref="container">
        <!-- @slot Filter Activator content -->
        <slot name="activator" :activate="onActivate"/>

        <PTooltipOverlay
            :id="`${realId}Overlay`"
            :active="toggleActive"
            :activatorId="activatorRectId"
            :preferredPosition="preferredPosition"
            :preferredAlignment="preferredAlignment"
            :fullWidth="fullWidth"
        >
            <template v-slot:overlay="props">
                <div :class="className" ref="content">
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
                                    <slot name="tooltipContent">
                                        {{ tooltipContent }}
                                    </slot>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </PTooltipOverlay>
    </div>
</template>

<script setup>
    import { computed, onBeforeUnmount, onMounted, onUnmounted, ref, watch } from 'vue';
    import { classNames } from '../../utilities/css';
    import { PTooltipOverlay } from '../../components/PTooltip/components/PTooltipOverlay';

    let props = defineProps({
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
        /**
         * Enable positioning.
         */
        tooltipContent: {
            type: [String, Number, Object, Array, Boolean],
        },
    });
    const emit = defineEmits(['close', 'activate']);

    let isAppended = ref(false);
    let container = ref(null);
    let toggleActive = ref(props.active);
    let content = ref(null);

    let activatorRectId = computed(() => {
        return props.id.replace(/_/g, '');
    });

    let realId = computed(() => {
        return `PolarisPopover${activatorRectId.value}`;
    });

    let activatorId = computed(() => {
        return `${realId.value}Activator`;
    });

    let className = computed(() => {
        return classNames(
            'Polaris-Popover',
            'Polaris-Tooltip-Popover',
            props.fullWidth && 'Polaris-Popover--fullWidth',
            props.measuring && 'Polaris-Popover--measuring',
        );
    });

    let findActivator = computed(() => {
        return document.getElementById(activatorId.value);
    });

    function handlePageClick(e) {
        const target = e.target;
        if ((content != null && nodeContainsDescendant(content, target)) ||
            nodeContainsDescendant(findActivator, target) || !toggleActive.value) {
            return;
        }
        /**
         * Close filter menu when page is clicked
         */
        emit('close', 'Click');
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

    watch(() => props.active , (value) => {
        if (value) {
            const popoverOverlay = document.getElementById(`${realId.value}Overlay`);
            if (popoverOverlay) {
                const rootElement = document.body;
                rootElement.append(popoverOverlay);
            }
        } else {
            const popoverOverlay = document.getElementById(`${realId.value}Overlay`);
            if (popoverOverlay) {
                container.append(popoverOverlay);
            }
        }
    });

    onMounted(() => {
        container = container.value;
        content = content.value;
        if (container.firstElementChild !== null) {
            container.firstElementChild.id = activatorId.value;
        }

        window.addEventListener('click', handlePageClick);
        window.addEventListener('touchstart', handlePageClick);
    });

    onBeforeUnmount(() => {
        const popoverOverlay = document.getElementById(`${realId.value}Overlay`);
        if (popoverOverlay) {
            popoverOverlay.remove();
        }
    });

    onUnmounted(() => {
        window.removeEventListener('click', handlePageClick);
        window.removeEventListener('touchstart', handlePageClick);
    });
</script>
