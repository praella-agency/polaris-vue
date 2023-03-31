<template>
    <div>
        <div v-if="open">
            <PModalDialog :large="large" :small="small" :limitHeight="limitHeight">
                <PModalHeader v-if="title || hasSlot(slots.title)" @close="handleOnClick">
                    <slot name="title">
                        {{ title }}
                    </slot>
                </PModalHeader>
                <PModalCloseButton v-else :title="false" @click="$emit('close', $event)"/>
                <div class="Polaris-Modal__BodyWrapper">
                    <iframe v-if="src" :name="iFrameName" :src="src" @load="handleIFrameLoad"
                            class="Polaris-Modal__IFrame" :style="{height: `${iframeHeight}px`}"/>
                    <div v-else class="Polaris-Modal__Body">
                        <template v-if="loading">
                            <div class="Polaris-Modal__Spinner">
                                <PSpinner/>
                            </div>
                        </template>
                        <template v-else>
                            <template v-if="sectioned">
                                <PModalSection>
                                    <slot/>
                                </PModalSection>
                            </template>
                            <template v-else>
                                <!-- @slot The content to display inside modal -->
                                <slot/>
                            </template>
                        </template>
                    </div>
                </div>
                <PModalFooter v-if="hasSlot(slots.footer)">
                    <!-- @slot The content to display inside modal footer -->
                    <slot name="footer"/>
                </PModalFooter>
                <PModalFooter v-if="!hasSlot(slots.footer) && (Object.keys(primaryAction).length > 0
                                      || secondaryActions)"
                              :primaryAction="primaryAction" :secondaryActions="secondaryActions">
                </PModalFooter>
            </PModalDialog>
        </div>
        <div v-if="open" class="Polaris-Backdrop"></div>
    </div>
</template>

<script setup>
    import { ref, useSlots } from 'vue';
    import { hasSlot } from '../../ComponentHelpers';
    import { PSpinner } from '../../components/PSpinner';
    import { PModalDialog } from '../../components/PModal/components/PModalDialog';
    import { PModalHeader } from '../../components/PModal/components/PModalHeader';
    import { PModalFooter } from '../../components/PModal/components/PModalFooter';
    import { PModalSection } from '../../components/PModal/components/PModalSection';
    import { PModalCloseButton } from '../../components/PModal/components/PModalCloseButton';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Modals are overlays that prevent merchants from interacting with the rest of the application until a
     *  specific action is taken. They can be disruptive because they require merchants to take an action before they can
     *  continue interacting with the rest of Shopify. It should be used thoughtfully and sparingly.</h4>
     */

    let props = defineProps({
        /**
         * Set it true to make it large.
         */
        large: {
            type: Boolean,
            default: false,
        },
        /**
         * Set it true to limits modal height on large screens with scrolling.
         */
        limitHeight: {
            type: Boolean,
            default: false,
        },
        /**
         * Replaces modal content with a spinner while a background action is being performed.
         */
        loading: {
            type: Boolean,
            default: false,
        },
        /**
         * Whether the modal is open or not
         */
        open: {
            type: Boolean,
            default: false,
        },
        /**
         * Automatically adds sections to modal.
         */
        sectioned: {
            type: Boolean,
            default: false,
        },
        /**
         * The url that will be loaded as the content of the modal.
         */
        src: {
            type: String,
            default: null,
        },
        /**
         * The name of the modal content iframe.
         */
        iFrameName: {
            type: String,
            default: null,
        },
        /**
         * Primary Action.
         */
        primaryAction: {
            type: Object,
            default: () => ({}),
        },
        /**
         * Secondary Action.
         */
        secondaryActions: {
            type: [Array, String],
            default: null,
        },
        /**
         * The content for the title of modal.
         */
        title: {
            type: String,
            default: null,
        },
        /**
         * Decreases the modal width
         */
        small: {
            type: Boolean,
            default: false,
        },
    });

    const emit = defineEmits(['close']);
    let slots = useSlots();
    let iframeHeight = ref(200);

    function setIframeHeight(height) {
        iframeHeight.value = height;
    }

    function handleIFrameLoad(evt) {
        const iframe = evt.target;
        if (iframe && iframe.contentWindow) {
            try {
                setIframeHeight(iframe.contentWindow.document.body.scrollHeight);
            } catch {
                setIframeHeight(200);
            }
        }
    }

    function handleOnClick($event) {
        /**
         * Method to handle on close event
         */
        emit('close', $event);
    }
</script>
