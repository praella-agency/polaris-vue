<template>
    <div>
        <div v-if="open">
            <PModalDialog :large="large" :small="small" :limitHeight="limitHeight">
                <PModalHeader v-if="title" @close="handleOnClick">{{title}}</PModalHeader>
                <PModalCloseButton v-else :title="false" @click="$emit('close', $event)" />
                <div class="Polaris-Modal__BodyWrapper">
                    <iframe v-if="src" :name="iFrameName" :src="src" @load="handleIFrameLoad" class="Polaris-Modal__IFrame" :style="{height: `${iframeHeight}px`}" />
                    <div v-else class="Polaris-Modal__Body">
                        <div v-if="loading" class="Polaris-Modal__Spinner">
                            <PSpinner />
                        </div>
                        <template v-else>
                            <PModalSection v-if="sectioned">
                                <slot />
                            </PModalSection>
                            <!-- @slot The content to display inside modal -->
                            <slot v-else />
                        </template>
                    </div>
                </div>
              <PModalFooter v-if="$slots.hasOwnProperty('footer')" >
                <!-- @slot The content to display inside modal footer -->
                <slot name="footer" />
              </PModalFooter>
              <PModalFooter v-if="!$slots.footer && (Object.keys(primaryAction).length > 0
                                      || secondaryActions)"
                            :primaryAction="primaryAction" :secondaryActions="secondaryActions" >
              </PModalFooter>
            </PModalDialog>
        </div>
        <div v-if="open" class="Polaris-Backdrop"></div>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import { Action } from '@/types';
import { PSpinner } from '@/components/PSpinner';
import { PModalDialog } from '@/components/PModal/components/PModalDialog';
import { PModalHeader } from '@/components/PModal/components/PModalHeader';
import { PModalFooter } from '@/components/PModal/components/PModalFooter';
import { PModalSection } from '@/components/PModal/components/PModalSection';
import { PModalCloseButton } from '@/components/PModal/components/PModalCloseButton';

/**
 * <br/>
 * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
 *  sans-serif;">Modals are overlays that prevent merchants from interacting with the rest of the application until a
 *  specific action is taken. They can be disruptive because they require merchants to take an action before they can
 *  continue interacting with the rest of Shopify. It should be used thoughtfully and sparingly.</h4>
 */
@Component({
    components: {
        PSpinner, PModalDialog, PModalHeader, PModalFooter, PModalSection, PModalCloseButton,
    },
})
export default class PModel extends Vue {

    /**
     * Set it true to make it large.
     * @values true | false
     */
    @Prop({type: Boolean, default: false}) public large!: boolean;
    /**
     * Set it true to limits modal height on large screens with scrolling.
     * @values true | false
     */
    @Prop({type: Boolean, default: false}) public limitHeight!: boolean;
    /**
     * Replaces modal content with a spinner while a background action is being performed.
     * @values true | false
     */
    @Prop({type: Boolean, default: false}) public loading!: boolean;
    /**
     * Whether the modal is open or not
     * @values true | false
     */
    @Prop({type: Boolean, default: false}) public open!: boolean;
    /**
     * Automatically adds sections to modal.
     * @values true | false
     */
    @Prop({type: Boolean, default: false}) public sectioned!: boolean;
    /**
     * The url that will be loaded as the content of the modal.
     */
    @Prop({type: String, default: null}) public src!: string;
    /**
     * The name of the modal content iframe.
     */
    @Prop({type: String, default: null}) public iFrameName!: string;
    /**
     * Primary Action.
     */
    @Prop({type: Object, default: () => ({})}) public primaryAction!: Action;
    /**
     * Secondary Action.
     */
    @Prop({type: [Array, String], default: null}) public secondaryActions!: [];
    /**
     * The content for the title of modal.
     */
    @Prop({type: String, default: null}) public title!: string;

    /**
     * Decreases the modal width
     */
    @Prop({type: Boolean, default: false}) public small!: boolean;

    public iframeHeight = 200;

    public setIframeHeight(height) {
        this.iframeHeight = height;
    }

    public handleIFrameLoad(evt) {

        const iframe = evt.target;
        if (iframe && iframe.contentWindow) {
            try {
                this.setIframeHeight(iframe.contentWindow.document.body.scrollHeight);
            } catch {
                this.setIframeHeight(200);
            }
        }
    }

    public handleOnClick($event) {
        /**
         * Method to handle on close event
         * @property {Event}
         */
        this.$emit('close', $event);
    }
}
</script>
