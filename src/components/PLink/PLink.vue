<template>
    <PUnstyledLink v-if="url" :id="id" :url="url" :external="external" :class="className" v-on="$listeners" data-polaris-unstyled="true">
        <slot/>
        <span v-if="isStringSlot" class="Polaris-Link__IconLockup">
            <span class="Polaris-Link__IconLayout">
                <PIcon source="ExternalSmallMinor" />
            </span>
        </span>
    </PUnstyledLink>
    <button v-else type="button" :id="id" :class="className" v-on="$listeners">
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
    import {classNames, variationName} from '@/utilities/css';
    import {PButton} from '@/components/PButton';
    import {PUnstyledLink} from '@/components/PUnstyledLink';
    import {PIcon} from '@/components/PIcon';

    @Component({
        components: { PButton, PUnstyledLink, PIcon },
    })
    export default class PLink extends Vue {

        @Prop(String) public id!: string;
        @Prop(String) public url!: string;
        @Prop(Boolean) public external!: boolean;
        @Prop(Boolean) public monochrome!: boolean;

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
