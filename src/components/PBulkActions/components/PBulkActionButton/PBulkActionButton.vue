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

<script setup>
    import { onMounted, ref } from 'vue';
    import { PButton } from '../../../../components/PButton';
    import { PIcon } from '../../../../components/PIcon';
    import { PStack } from '../../../../components/PStack';
    import { PStackItem } from '../../../../components/PStack/components/PStackItem';

    let props = defineProps({
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
    });
    const emit = defineEmits(['handleMeasurement']);
    let bulkActionButton = ref(null);

    onMounted(() => {
        bulkActionButton = bulkActionButton.value;
        if (bulkActionButton) {
            const width = (bulkActionButton).getBoundingClientRect().width;
            emit('handleMeasurement', width);
        }
    });
</script>
