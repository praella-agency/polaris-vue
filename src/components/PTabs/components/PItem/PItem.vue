<template>
    <li>
        <button
            v-if="!to && !url"
            type="button"
            :id="id"
            ref="focusedNode"
            @click="handleClick"
            class="Polaris-Tabs__Item"
            :aria-controls="panelID"
            :aria-selected="false"
            :aria-label="accessibilityLabel"
        >
            <slot/>
        </button>

        <a
            v-else-if="url"
            :id="id"
            ref="focusedNode"
            @click="handleClick"
            class="Polaris-Tabs__Item"
            :aria-controls="panelID"
            :aria-selected="false"
            :aria-label="accessibilityLabel"
        >
            <slot/>
        </a>

        <router-link
            v-else
            tabindex="-1"
            ref="focusedNode"
            class="Polaris-Tabs__Item"
            :to="to"
            @click.native="handleClick"
            :aria-controls="panelID"
            :aria-selected="false"
            :aria-label="accessibilityLabel"
        >
            <slot/>
        </router-link>
    </li>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from 'vue-property-decorator';

    @Component
    export default class PItem extends Vue {

        @Prop({type: String, required: true}) public id!: string;
        @Prop({type: Boolean, required: true}) public focused!: boolean;
        @Prop({type: String, default: null}) public panelID!: string;
        @Prop({type: String, default: null}) public url!: string;
        @Prop([String, Object]) public to!: string | object;
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

        public handleClick() {
            this.$emit('click');
        }
    }
</script>

<style scoped>

</style>