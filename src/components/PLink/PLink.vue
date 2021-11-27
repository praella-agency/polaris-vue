<template>
    <PUnstyledLink v-if="url || to" :id="id" :to="to" :url="url" :external="external" :class="className"
                   v-on="$listeners" data-polaris-unstyled="true">
        <!-- @slot The content to display inside the link -->
        <slot/>
        <span v-if="isStringSlot" class="Polaris-Link__IconLockup">
            <span class="Polaris-Link__IconLayout">
                <PIcon source="ExternalSmallMinor"/>
            </span>
        </span>
    </PUnstyledLink>
    <button v-else type="button" :id="id" :class="className" v-on="$listeners">
        <!-- @slot The content to display inside the link -->
        <slot/>
        <span v-if="isStringSlot" class="Polaris-Link__IconLockup">
            <span class="Polaris-Link__IconLayout">
                <PIcon source="ExternalSmallMinor"/>
            </span>
        </span>
    </button>
</template>

<script>
    import { classNames } from '../../utilities/css';
    import { PButton } from '../../components/PButton';
    import { PUnstyledLink } from '../../components/PUnstyledLink';
    import { PIcon } from '../../components/PIcon';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Links take users to another place, and usually appear within or directly following a sentence.</h4>
     */
    export default {
        name: 'PLink',
        components: {
            PButton, PUnstyledLink, PIcon,
        },
        props: {
            /**
             * ID for the link.
             */
            id: {
                type: [String, Number],
                default: null,
            },
            /**
             * The url to link to.
             */
            url: {
                type: String,
                default: null,
            },
            /**
             * Set to for router link
             * @values Internal route link
             */
            to: {
                type: [String, Object],
                default: null,
            },
            /**
             * Makes the link open in a new tab.
             * @values true | false
             */
            external: {
                type: Boolean,
                default: false,
            },
            /**
             * Makes the link color the same as the current text color and adds an underline.
             * @values true | false
             */
            monochrome: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            className() {
                return classNames(
                    'Polaris-Link',
                    this.monochrome && 'Polaris-Link--monochrome',
                );
            },
            isStringSlot() {

                const slots = (this.$slots.default || []);
                return this.external && slots.length === 1 && slots[0].text;
            },
        },
    }
</script>
