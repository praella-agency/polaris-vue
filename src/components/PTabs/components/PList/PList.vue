<template>
    <ul
        class="Polaris-Tabs__List"
        @keydown="handleKeyDown"
        @keyup="emit('keypress', event)"
    >
        <PItem
            v-for="(disclosureTab, index) in disclosureTabs"
            :key="disclosureTab.id"
            :id="disclosureTab.id"
            v-bind="disclosureTab"
            :focused="index === focusIndex"
            @click="emit('click', disclosureTab.id)"
        >
            {{ disclosureTab.content }}
        </PItem>
    </ul>
</template>

<script setup>
    import { PItem } from '../../../../components/PTabs/components/PItem';

    let props = defineProps({
        focusIndex: {
            type: Number,
            default: 0,
        },
        disclosureTabs: {
            type: Array,
            default: () => ([]),
        },
    });

    const emit = defineEmits(['keypress', 'click']);

    function handleKeyDown(event) {
        const {key} = event;

        if (key === 'ArrowLeft' || key === 'ArrowRight') {
            event.preventDefault();
            event.stopPropagation();
        }
    }
</script>
