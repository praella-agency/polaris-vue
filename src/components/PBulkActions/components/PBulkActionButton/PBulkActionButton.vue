<template>
    <div
        class="Polaris-BulkActions__BulkActionButton"
        ref="bulkActionButton"
    >
        <PButton
            :external="external"
            :url="url"
            :aria-label="accessibilityLabel"
            @click="$emit('action')"
            :disabled="disabled"
            :disclosure="disclosure"
        >
            <template v-if="Object.keys(icon).length">
                <PStack alignment="center">
                    <PStackItem>
                        <PIcon :source="icon.source" :color="icon.color"/>
                    </PStackItem>
                    <PStackItem style="margin-left: 0.8rem;">
                        {{content}}
                    </PStackItem>
                </PStack>
            </template>
            <template v-else>
                {{ content }}
            </template>
        </PButton>
        <span
            v-if="indicator"
            class="Polaris-Indicator"
        />
    </div>
</template>

<script>
    import { PButton } from '../../../../components/PButton';
    import { PIcon } from '../../../../components/PIcon';
    import { PStack } from '../../../../components/PStack';
    import { PStackItem } from '../../../../components/PStack/components/PStackItem';

    export default {
        name: 'PBulkActionButton',
        components: {
            PButton, PIcon, PStack, PStackItem,
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
                type: Object,
                default: () => ({}),
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