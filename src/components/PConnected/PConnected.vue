<template>
    <div class="Polaris-Connected">
        <PConnectedItem
            v-if="isSlot($slots.left) || left"
            position="Left"
        >
            <slot name="left">
                {{ left }}
            </slot>
        </PConnectedItem>

        <PConnectedItem position="Primary">
            <slot>
                {{ children }}
            </slot>
        </PConnectedItem>

        <PConnectedItem
            v-if="isSlot($slots.right) || right"
            position="Right"
        >
            <slot name="right">
                {{ right }}
            </slot>
        </PConnectedItem>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { hasSlot } from '../../ComponentHelpers';
    import { PConnectedItem } from '../../components/PConnected/components/PConnectedItem';

    let props = defineProps({
        left: {
            type: String,
        },
        right: {
            type: String,
        },
        children: {
            type: String,
        },
    })

    const isSlot = computed(() => {
        return hasSlot;
    });
</script>
