<template>
    <PUnstyledLink v-if="url || to" :id="id" :to="to" :url="url" :external="external" :class="className" v-on="$listeners" data-polaris-unstyled="true">
        <!-- @slot The content to display inside the link -->
        <slot/>
        <span v-if="isStringSlot" class="Polaris-Link__IconLockup">
            <span class="Polaris-Link__IconLayout">
                <PIcon source="ExternalSmallMinor" />
            </span>
        </span>
    </PUnstyledLink>
    <button v-else type="button" :id="id" :class="className" v-on="$listeners">
        <!-- @slot The content to display inside the link -->
        <slot/>
        <span v-if="isStringSlot" class="Polaris-Link__IconLockup">
            <span class="Polaris-Link__IconLayout">
                <PIcon source="ExternalSmallMinor" />
            </span>
        </span>
    </button>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { classNames } from '@/utilities/css';
    import { PButton } from '@/components/PButton';
    import { PUnstyledLink } from '@/components/PUnstyledLink';
    import { PIcon } from '@/components/PIcon/index.js';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Links take users to another place, and usually appear within or directly following a sentence.</h4>
     */
    @Component({
        components: { PButton, PUnstyledLink, PIcon },
    })
    export default class PLink extends Vue {

        /**
         * ID for the link.
         */
        @Prop({type: [String, Number], default: null}) public id!: string | number;

        /**
         * The url to link to.
         */
        @Prop({type: String, default: null}) public url!: string;

        /**
         * Set to for router link
         * @values Internal route link
         */
        @Prop({type: [String, Object], default: null}) public to!: string | object;

        /**
         * Makes the link open in a new tab.
         * @values true | false
         */
        @Prop({type: Boolean, default: false}) public external!: boolean;

        /**
         * Makes the link color the same as the current text color and adds an underline.
         * @values true | false
         */
        @Prop({type: Boolean, default: false}) public monochrome!: boolean;

        public get isStringSlot() {

            const slots = (this.$slots.default || []);
            return this.external && slots.length === 1 && slots[0].text;
        }

        public get className() {
            return classNames(
                'Polaris-Link',
                this.monochrome && 'Polaris-Link--monochrome',
            );
        }
    }
</script>
