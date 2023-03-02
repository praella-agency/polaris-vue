<template>
    <PFrameInner
        :showMobileNavigation="showMobileNavigation"
        :onNavigationDismiss="onNavigationDismiss"
        :contextualSaveBar="contextualSaveBar"
        :logo="Object.keys(logo).length > 0 ? logo : {}"
        :topBar="topBar"
        :frameOffset="frameOffset"
        :navigation="navigation"
    >
        <template #topBar>
            <!-- @slot Accepts a top bar component that will be rendered at the top-most portion of an application frame -->
            <slot name="topBar"/>
        </template>
        <template #globalRibbon>
            <!-- @slot Accepts a global ribbon component that will be rendered fixed to the bottom of an application frame -->
            <slot name="globalRibbon"/>
        </template>
        <template #navigation>
            <!-- @slot Accepts a navigation component that will be rendered in the left sidebar of an application frame -->
            <slot name="navigation"/>
        </template>
        <template #default>
            <!-- @slot The content to display inside the frame -->
            <slot/>
        </template>
    </PFrameInner>
</template>

<script setup>
    import { PFrameInner } from '../../components/PFrame/components/PFrameInner';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">The frame component, while not visible in the user interface itself, provides the structure for
     *  an application. It wraps the main elements and houses the primary
     *  <a href="https://polaris-vue.hulkapps.com/?path=/docs/navigation-navigation--navigation" target="_blank">
     *      navigation</a>,
     *  <a href="https://polaris-vue.hulkapps.com/?path=/docs/structure-top-bar--top-bar" target="_blank">top bar</a>,
     *  <a href="https://polaris-vue.hulkapps.com/?path=/docs/feedback-indicators-toast--toast" target="_blank">toast</a>,
     *  and
     *  <a href="https://polaris-vue.hulkapps.com/?path=/docs/forms-contextual-save-bar--contextual-save-bar"
     *    target="_blank">contextual save bar</a> components.</h4>
     */
    let props = defineProps({
        /**
         * A boolean property indicating whether the mobile navigation is currently visible
         */
        showMobileNavigation: {
            type: Boolean,
            default: false,
        },
        /**
         * A callback function to handle clicking the mobile navigation dismiss button
         */
        onNavigationDismiss: {
            type: Function,
        },
        /**
         * ContextualSaveBar Props
         */
        contextualSaveBar: {
            type: Object,
            default: () => ({}),
        },
        /**
         * ContextualSaveBar Logo
         */
        logo: {
            type: Object,
            default: () => ({}),
        },
        /**
         * TopBar props
         */
        topBar: {
            type: Object,
            default: () => ({}),
        },
        /**
         * Navigation props
         */
        navigation: {
            type: Object,
            default: () => ({}),
        },
        /**
         * Frame offset value
         */
        frameOffset: {
            type: String,
            default: '0px',
        }
    });
</script>
