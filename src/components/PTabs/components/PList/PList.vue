<template>
    <ul
        class="Polaris-Tabs__List"
        @keydown="handleKeyDown"
        @keyup="$emit('keyPress', event)"
    >

    </ul>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from 'vue-property-decorator';
    import { TabDescriptor } from '@/components/PTabs/types';

    @Component
    export default class PList extends Vue {

        @Prop({type: Number, default: 0}) public focusIndex!: number;
        @Prop({type: Object, default: () => ({})}) public disclosureTabs!: TabDescriptor[];

        public handleKeyDown(event: KeyboardEvent<HTMLElement>) {
            const { key } = event;

            if (key === 'ArrowLeft' || key === 'ArrowRight') {
                event.preventDefault();
                event.stopPropagation();
            }
        }
    }
</script>

<style scoped>

</style>