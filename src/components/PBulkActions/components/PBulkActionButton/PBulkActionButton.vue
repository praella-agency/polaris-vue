<template>
    <div
        class="Polaris-BulkActions__BulkActionButton"
        ref="bulkActionButton"
    >
        <PButton
            :external="external"
            :url="url"
            :icon="icon"
            :aria-label="accessibilityLabel"
            @click="$emit('action')"
            :disabled="disabled"
            :disclosure="disclosure"
        >
            {{ content }}
        </PButton>
        <span
            v-if="indicator"
            class="Polaris-Indicator"
        />
    </div>
</template>

<script>
    import { PButton } from '../../../../components/PButton';

    export default {
        name: 'PBulkActionButton',
        components: {
            PButton,
        },
        props: {
            url: {
                type: String,
            },
            external: {
                type: Boolean,
                default: false,
            },
            content: {
                type: String,
                default: null,
            },
            disclosure: {
                type: Boolean,
                default: false,
            },
            accessibilityLabel: {
                type: String,
                default: null,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            indicator: {
                type: Boolean,
                default: false,
            },
            icon: {
                type: String,
                default: null,
            },
        },
        mounted() {
            if (this.$refs.bulkActionButton) {
                const width = (this.$refs.bulkActionButton).getBoundingClientRect().width;
                this.$emit('handleMeasurement', width);
            }
        },
    }
</script>

<style scoped>

</style>