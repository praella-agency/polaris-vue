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

<script>
    import { PItem } from '../../../../components/PTabs/components/PItem';

    export default {
        name: 'PList',
        components: {
            PItem,
        },
        props: {
            focusIndex: {
                type: Number,
                default: 0,
            },
            disclosureTabs: {
                type: Array,
                default: () => ([]),
            },
        },
        emits: ['keypress', 'click'],
        methods: {
            handleKeyDown(event) {
                const {key} = event;

                if (key === 'ArrowLeft' || key === 'ArrowRight') {
                    event.preventDefault();
                    event.stopPropagation();
                }
            },
        },
    }
</script>
