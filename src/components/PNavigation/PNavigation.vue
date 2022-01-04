<template>
    <nav class="Polaris-Navigation" :aria-labelledby="ariaLabelledBy">
        <template v-if="$slots.hasOwnProperty('contextControl')">
            <div class="Polaris-Navigation__ContextControl">
                <!-- @slot Add context control. -->
                <slot name="contextControl"/>
            </div>
        </template>
        <template v-else-if="Object.keys(logo).length > 0 && toggleLogo">
            <div class="Polaris-Navigation__LogoContainer">
                <PUnstyledLink
                    class="Polaris-Navigation__LogoLink"
                    :url="logo.url"
                    :style="width"
                >
                    <PImage
                        class="Polaris-Navigation__Logo"
                        :source="logo.topBarSource"
                        :alt="logo.accessibilityLabel"
                        :style="width"
                    />
                </PUnstyledLink>
            </div>
        </template>
        <div class="Polaris-Navigation__PrimaryNavigation" v-if="items.length > 0">
            <PSection
                v-for="(item, key) in items"
                :key="key"
                v-bind="item"
                :location="location"
                :onNavigationDismiss="onDismiss"
            >
                <template v-slot:icon="slotProps">
                    <!-- @slot Customize the icon part of navigation. This slot provides values.

Access values with `slot-props` attribute. -->
                    <slot name="icon" :item="slotProps.item"/>
                </template>
            </PSection>
        </div>
    </nav>
</template>

<script>
    import { ThemeLogo, getWidth } from '../../types/logo';
    import { PUnstyledLink } from '../../components/PUnstyledLink';
    import { PImage } from '../../components/PImage';
    import { PSection } from '../../components/PNavigation/components/PSection';
    import ObjectValidator from '../../utilities/validators/ObjectValidator';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">The navigation component is used to display the primary navigation in the sidebar of the
     *  <a href="https://polaris-vue.hulkapps.com/?path=/docs/structure-frame--default">frame</a>
     *  of an application. Navigation includes a list of links that merchants use to move between sections of the
     *  application.</h4>
     */
    export default {
        name: 'PNavigation',
        components: {
            PUnstyledLink, PImage, PSection,
        },
        props: {
            /**
             * Navigation Location
             */
            location: {
                type: String,
                default: null,
            },
            /**
             * Handle on dismiss method
             */
            onDismiss: {
                type: Function,
            },
            /**
             * Id of the element used as aria-labelledby
             */
            ariaLabelledBy: {
                type: String,
            },
            /**
             * Customize logo
             */
            logo: {
                type: Object,
                default: () => ({}),
                ...ObjectValidator('logo', ThemeLogo),
            },
            /**
             * Show mobile navigation
             */
            showMobileNavigation: {
                type: Boolean,
                default: false,
            },
            // PSection's props
            /**
             * A collection of navigation items
             */
            items: {
                type: Array,
                default: () => ([]),
            },
        },
        data() {
            return {
                showLogo: this.showMobileNavigation,
            };
        },
        computed: {
            width() {
                return {
                    width: getWidth(this.logo, 104),
                };
            },
            toggleLogo: {
                get() {
                    return this.showLogo;
                },
                set(value) {
                    this.showLogo = value;
                },
            },
        },
        methods: {
            useMediaQuery() {
                if (window.innerWidth <= 768) {
                    this.showLogo = true;
                    return;
                }
                this.showLogo = false;
            },
        },
        created() {
            window.addEventListener('resize', this.useMediaQuery);
        },
        destroyed() {
            window.removeEventListener('resize', this.useMediaQuery);
        },
    }
</script>

<style scoped>

</style>