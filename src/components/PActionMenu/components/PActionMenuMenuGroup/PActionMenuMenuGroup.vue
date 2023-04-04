<template>
    <PPopover
        :id="`Popover${isUuid}`"
        :active="Boolean(active)"
        preferredAlignment="left"
        hideOnPrint @close="handleClose"
    >
        <template #activator>
            <PActionMenuMenuAction
                disclosure
                :content="title"
                :getOffsetWidth="getOffsetWidth"
                :icon="icon"
                :onAction="handleOpen"
            />
        </template>
        <template #content>
            <PActionList :items="actions" @item-action="handleClose"/>
        </template>
        <div v-if="isSlot($slots.details)" class="">
            <slot name="details"/>
        </div>
    </PPopover>
</template>

<script setup>
    import { computed } from 'vue';
    import { hasSlot, uuid } from '../../../../ComponentHelpers';
    import { ActionListItemDescriptor } from '../../../../types';
    import { PActionList } from '../../../../components/PActionList';
    import { PPopover } from '../../../../components/PPopover';
    import { PActionMenuMenuAction } from '../../../../components/PActionMenu/components/PActionMenuMenuAction';
    import ArrayValidator from '../../../../utilities/validators/ArrayValidator';

    let props = defineProps({
        active: {
            type: Boolean
        },
        title: {
            type: String
        },
        icon: {
            type: String,
            default: null,
        },
        onAction: {
            type: Function,
        },
        getOffsetWidth: {
            type: Function,
        },
        actions: {
            type: Array,
            ...ArrayValidator('actions', ActionListItemDescriptor)
        }
    });
    const emit = defineEmits(['open']);

    let isSlot = computed(() => {
        return hasSlot;
    });

    let isUuid = computed(() => {
        return uuid();
    });

    function handleClose() {
        props.onAction(props.title);
    }

    function handleOpen() {
        emit('open', props.title);
    }
</script>
