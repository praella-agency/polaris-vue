<template>
    <div>
        <div v-if="open">
            <PModalDialog :large="large" :small="small" :limitHeight="limitHeight">
                <PModalHeader v-if="title" @close="handleOnClick">{{ title }}</PModalHeader>
                <PModalCloseButton v-else :title="false" @click="$emit('close', $event)"/>
                <div class="Polaris-Modal__BodyWrapper">
                    <iframe v-if="src" :name="iFrameName" :src="src" @load="handleIFrameLoad"
                            class="Polaris-Modal__IFrame" :style="{height: `${iframeHeight}px`}"/>
                    <div v-else class="Polaris-Modal__Body">
                        <div v-if="loading" class="Polaris-Modal__Spinner">
                            <PSpinner/>
                        </div>
                        <template v-else>
                            <PModalSection v-if="sectioned">
                                <slot/>
                            </PModalSection>
                            <!-- @slot The content to display inside modal -->
                            <slot v-else/>
                        </template>
                    </div>
                </div>
                <PModalFooter v-if="$slots.hasOwnProperty('footer')">
                    <!-- @slot The content to display inside modal footer -->
                    <slot name="footer"/>
                </PModalFooter>
                <PModalFooter v-if="!$slots.footer && (Object.keys(primaryAction).length > 0
                                      || secondaryActions)"
                              :primaryAction="primaryAction" :secondaryActions="secondaryActions">
                </PModalFooter>
            </PModalDialog>
        </div>
        <div v-if="open" class="Polaris-Backdrop"></div>
    </div>
</template>

<script>

    // const ActionKeys = [
    //     'id', 'content', 'accessibilityLabel', 'url', 'external', 'onAction'
    // ];

    import { PSpinner } from '../../components/PSpinner';
    import { PModalDialog } from '../../components/PModal/components/PModalDialog/index.js';
    import { PModalHeader } from '../../components/PModal/components/PModalHeader/index.js';
    import { PModalFooter } from '../../components/PModal/components/PModalFooter/index.js';
    import { PModalSection } from '../../components/PModal/components/PModalSection/index.js';
    import { PModalCloseButton } from '../../components/PModal/components/PModalCloseButton/index.js';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Modals are overlays that prevent merchants from interacting with the rest of the application until a
     *  specific action is taken. They can be disruptive because they require merchants to take an action before they can
     *  continue interacting with the rest of Shopify. It should be used thoughtfully and sparingly.</h4>
     */
    export default {
        name: 'PModal',
        components: {
            PSpinner, PModalDialog, PModalHeader, PModalFooter, PModalSection, PModalCloseButton,
        },
        props: {
            /**
             * Set it true to make it large.
             * @values true | false
             */
            large: {
                type: Boolean,
                default: false,
            },
            /**
             * Set it true to limits modal height on large screens with scrolling.
             * @values true | false
             */
            limitHeight: {
                type: Boolean,
                default: false,
            },
            /**
             * Replaces modal content with a spinner while a background action is being performed.
             * @values true | false
             */
            loading: {
                type: Boolean,
                default: false,
            },
            /**
             * Whether the modal is open or not
             * @values true | false
             */
            open: {
                type: Boolean,
                default: false,
            },
            /**
             * Automatically adds sections to modal.
             * @values true | false
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
                // validator: function (value) {
                //     if (typeof value === 'object') {
                //         let result = true;
                //         ActionKeys.forEach(item => {
                //             const keys = Object.keys(item);
                //             if (!ActionKeys.every(key => keys.includes(key))) {
                //                 result = false;
                //             }
                //         });
                //         return result;
                //     }
                // },
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
        },
        data() {
            return {
                iframeHeight: 200,
            };
        },
        methods: {
            setIframeHeight(height) {
                this.iframeHeight = height;
            },
            handleIFrameLoad(evt) {

                const iframe = evt.target;
                if (iframe && iframe.contentWindow) {
                    try {
                        this.setIframeHeight(iframe.contentWindow.document.body.scrollHeight);
                    } catch {
                        this.setIframeHeight(200);
                    }
                }
            },
            handleOnClick($event) {
                /**
                 * Method to handle on close event
                 * @property {Event}
                 */
                this.$emit('close', $event);
            },
        },
    }
</script>
