<template>
    <div ref="container">
        <slot name="activator" :activate="onActivate"></slot>

        <PPopoverOverlay
                :id="realId+'Overlay'"
                :active="active"
                :activatorId="activatorId"
                :preferredPosition="preferredPosition"
                :fullWidth="fullWidth"
                @close="onClose">
            <template v-slot:overlay="props">
                <div :class="className" ref="content">
                    <div v-if="!props.data.measuring"
                         :style="{ left: props.data.tipPosition+'px' }"
                         class="Polaris-Popover__Tip">
                    </div>
                    <div class="Polaris-Popover__FocusTracker"
                         @focus="handleFocusFirstItem"
                         tabindex="0">
                    </div>
                    <div class="Polaris-Popover__Wrapper">
                        <slot name="content"></slot>
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


<script lang="ts">

    import {Component, Vue, Prop, Ref} from 'vue-property-decorator';
    import { classNames } from '@/utilities/css';
    import PPopoverOverlay from "@/components/PPopover/components/PPopoverOverlay.vue";

    @Component({
        components: { PPopoverOverlay },
    })

    export default class PPopover extends Vue {
        @Prop({type: String, default: `PolarisPopover${new Date().getUTCMilliseconds()}`}) public id!: string;
        @Prop(Boolean) public active!: boolean;
        @Prop({ type: String, default: 'below' }) public preferredPosition!: string;
        @Prop(String) public activatorWrapper!: string;
        @Prop(Boolean) public preventAutofocus!: boolean;
        @Prop(Boolean) public sectioned!: boolean;
        @Prop(Boolean) public fullWidth!: boolean;
        @Prop(Boolean) public measuring!: boolean;
        @Prop(Boolean) public positioning!: boolean;

        @Ref('container') readonly container!: HTMLElement;


        public get className() {
            return classNames(
                'Polaris-Popover',
                this.fullWidth && 'Polaris-Popover--fullWidth',
                this.measuring && 'Polaris-Popover--measuring',
            );
        }

        public get realId() {
            return 'PolarisPopover'+this.id;
        }

        public get activatorId() {
            return this.realId+'Activator'
        }


        public mounted() {

            if (this.container.firstElementChild !== null)
                this.container.firstElementChild.id = this.activatorId;

            window.addEventListener('click', this.handlePageClick);
            window.addEventListener('touchstart', this.handlePageClick);
            document.addEventListener('keyup', this.handleKeyPress);
        }


        public findActivator() {
            return document.getElementById(this.activatorId);
        }

        public handleKeyPress(e) {
            if (e.keyCode !== 27) {
                return;
            }
            this.$emit('close', 'EscapeKeypress');
        }

        public handlePageClick(e) {
            const target = e.target;
            const contentNode = this.$refs.content;
            if ((contentNode != null && this.nodeContainsDescendant(contentNode, target)) ||
                this.nodeContainsDescendant(this.findActivator(), target) || !this.active) {
                return;
            }
            this.$emit('close', 'Click');
        }

        public nodeContainsDescendant(haystack, needle) {
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

        public onActivate() {
        }

        public handleFocusFirstItem() {
            this.$emit('close', 'FocusOut');
        }

        public handleFocusLastItem() {
            this.$emit('close', 'FocusOut');
        }

        public onClose() {
            this.$emit('close', 'Click');
        }
    }
</script>
