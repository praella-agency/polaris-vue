<template>
    <li>
        <PUnstyledLink
            v-if="url"
            :id="id"
            ref="focusedNode"
            @click="$emit('click')"
            class="Polaris-Tabs__Item"
            :aria-controls="panelID"
            :aria-selected="false"
            :aria-label="accessibilityLabel"
        >
            <slot/>
        </PUnstyledLink>
        <button
            v-else
            type="button"
            :id="id"
            ref="focusedNode"
            @click="$emit('click')"
            class="Polaris-Tabs__Item"
            :aria-controls="panelID"
            :aria-selected="false"
            :aria-label="accessibilityLabel"
        >
            <slot/>
        </button>
    </li>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from 'vue-property-decorator';
    import { PUnstyledLink } from '@/components/PUnstyledLink';

    @Component({
        components: {
            PUnstyledLink,
        }
    })
    export default class PItem extends Vue {

        @Prop({type: String, required: true}) public id!: string;
        @Prop({type: Boolean, required: true}) public focused!: boolean;
        @Prop({type: String, default: null}) public panelID!: string;
        @Prop({type: String, default: null}) public url!: string;
        @Prop({type: String, default: null}) public accessibilityLabel!: string;

        public mounted() {
            if (
                (this.$refs.focusedNode as HTMLElement) &&
                (this.$refs.focusedNode as HTMLElement) instanceof HTMLElement &&
                this.focused
            ) {
                (this.$refs.focusedNode as HTMLElement).focus();
            }
        }

        public updated() {
            if (
                (this.$refs.focusedNode as HTMLElement) &&
                (this.$refs.focusedNode as HTMLElement) instanceof HTMLElement &&
                this.focused
            ) {
                (this.$refs.focusedNode as HTMLElement).focus();
            }
        }
    }
</script>

<style scoped>

</style>