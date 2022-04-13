<template>
    <PUnstyledLink v-if="url || to" :id="id" :to="to" :url="url" :external="external" :class="className"
                   v-on="listeners" data-polaris-unstyled="true">
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
    import utils from '../../utilities';
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
             */
            to: {
                type: [String, Object],
                default: null,
            },
            /**
             * Makes the link open in a new tab.
             */
            external: {
                type: Boolean,
                default: false,
            },
            /**
             * Makes the link color the same as the current text color and adds an underline.
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
                return this.external;
            },
        },
        methods: {
            listeners() {
                if (utils.isVue2) {
                    this.$listeners;
                }
            }
        }
    }
</script>
