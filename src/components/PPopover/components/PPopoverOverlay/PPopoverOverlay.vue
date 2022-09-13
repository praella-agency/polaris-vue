<template>
    <PPositionedOverlay
        :id="id"
        :fullWidth="fullWidth"
        :active="active"
        :preferredPosition="preferredPosition"
        :preferredAlignment="preferredAlignment"
        :activatorId="activatorId"
    >
        <template
            v-slot:overlay="props"
        >
            <slot
                name="overlay"
                :data="props"
            />
        </template>
    </PPositionedOverlay>
</template>

<script>
    import { PPositionedOverlay } from '../../../../components/PPopover/components/PPositionedOverlay';
    import utils from '../../../../utilities';

    export default {
        name: 'PPopoverOverlay',
        components: {
            PPositionedOverlay,
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
        [utils.beforeDestroy]() {
            this.$emit('close');
        }
    }
</script>