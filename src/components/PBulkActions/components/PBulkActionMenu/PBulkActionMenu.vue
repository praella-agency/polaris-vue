<template>
    <PPopover
        :id="uuid"
        :active.sync="isVisible"
        @close="handleItemAction"
        preferInputActivator
    >
        <template #activator>
            <PBulkActionButton
                disclosure
                @action="toggleMenuVisibility"
                :content="title"
                :icon="icon"
                :indicator="isNewBadgeInBadgeActions"
            />
        </template>
        <template #content>
            <PActionList
                :items="actions"
                @item-action="handleItemAction"
            />
        </template>
    </PPopover>
</template>

<script setup>
    import { computed, onBeforeUnmount, ref } from 'vue';
    import { uuid } from '../../../../ComponentHelpers';
    import { PPopover } from '../../../../components/PPopover';
    import { PActionList } from '../../../../components/PActionList';
    import { PBulkActionButton } from '../../../../components/PBulkActions/components/PBulkActionButton';

    let props = defineProps({
        title: {
            type: String,
            default: null,
        },
        icon: {
            type: Object,
            default: () => ({}),
        },
        actions: {
            type: Array,
            default: () => ([]),
        },
        isNewBadgeInBadgeActions: {
            type: Boolean,
            default: false,
        },
    });
    let isVisible = ref(false);

    let isUuid = computed(() => {
        return uuid();
    });

    function toggleMenuVisibility() {
        isVisible.value = !isVisible.value;
    }

    function handleItemAction() {
        isVisible.value = false;
    }

    onBeforeUnmount(() => {
        if (document.getElementById(`PolarisPopover${isUuid.value}Overlay`)) {
            document.getElementById(`PolarisPopover${isUuid.value}Overlay`).remove();
        }
    });
</script>
