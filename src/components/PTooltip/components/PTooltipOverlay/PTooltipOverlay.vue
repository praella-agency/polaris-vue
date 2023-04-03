<template>
    <PTooltipPositionedOverlay
        :id="id"
        :fullWidth="fullWidth"
        :active="active"
        :preferredPosition="preferredPosition"
        :preferredAlignment="preferredAlignment"
        :activatorId="activatorId"
        @scrollout="handleScrollOut"
    >
        <template
            v-slot:overlay="props"
        >
            <slot
                name="overlay"
                :data="props"
            />
        </template>
    </PTooltipPositionedOverlay>
</template>

<script setup>
    import { PTooltipPositionedOverlay } from '../../../../components/PTooltip/components/PTooltipPositionedOverlay';

    let props = defineProps({
        id: {
            type: [String, Number],
        },
        active: {
            type: Boolean,
        },
        preventAutoFocus: {
            type: Boolean,
        },
        preferredAlignment: {
            type: String,
        },
        preferredPosition: {
            type: String,
        },
        sectioned: {
            type: Boolean,
        },
        fullWidth: {
            type: Boolean,
        },
        activatorId: {
            type: String,
        },
    });
    const emit = defineEmits(['scrollout']);

    function handleScrollOut() {
        emit('scrollout');
    }
</script>