<template>
    <ul
        class="Polaris-Tabs__List"
        @keydown="handleKeyDown"
        @keyup="$emit('keypress', event)"
    >
        <PItem
            v-for="(disclosureTab, index) in disclosureTabs"
            :key="disclosureTab.id"
            :id="disclosureTab.id"
            v-bind="disclosureTab"
            :focused="index === focusIndex"
            @click="$emit('click', disclosureTab.id)"
        >
            {{ disclosureTab.content }}
        </PItem>
    </ul>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from 'vue-property-decorator';
    import { PItem } from '@/components/PTabs/components/PItem';
    import { TabDescriptor } from '@/components/PTabs/types';

    @Component({
        components: {
            PItem,
        },
    })
    export default class PList extends Vue {

        @Prop({type: Number, default: 0}) public focusIndex!: number;
        @Prop({type: Array, default: () => ([])}) public disclosureTabs!: TabDescriptor[];

        public handleKeyDown(event: KeyboardEvent) {
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