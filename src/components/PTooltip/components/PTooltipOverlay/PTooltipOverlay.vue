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
            slot="overlay"
            slot-scope="props"
        >
            <slot
                name="overlay"
                :data="props"
            />
        </template>
    </PTooltipPositionedOverlay>
</template>

<script>
    import { PTooltipPositionedOverlay } from '../../../../components/PTooltip/components/PTooltipPositionedOverlay/index.js';

    export default {
        name: 'PTooltipOverlay',
        components: {
            PTooltipPositionedOverlay,
        },
        props: {
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
        },
        methods: {
            handleScrollOut() {
                this.$emit('scrollout');
            }
        },
    }
</script>