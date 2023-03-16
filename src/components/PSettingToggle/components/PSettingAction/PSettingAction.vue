<template>
    <div class="Polaris-SettingAction">
        <div class="Polaris-SettingAction__Setting">
            <slot/>
        </div>
        <div v-if="isSlot(slots.action) || action" class="Polaris-SettingAction__Action">
            <slot name="action">
                <PButton v-if="action"
                         primary
                         @click="handleAction(action)"
                         :url="action.url"
                         :destructive="action.destructive"
                         :disabled="action.disabled"
                         :icon="action.icon"
                         :accessibility-label="action.accessibilityLabel">
                    {{ action.content }}
                </PButton>
            </slot>
        </div>
    </div>
</template>

<script setup>
    import { computed, useSlots } from 'vue';
    import { hasSlot } from '../../../../ComponentHelpers';
    import { PButton } from '../../../../components/PButton';

    let props = defineProps({
        label: {
            type: String,
        },
        action: {
            type: [String, Number, Boolean, Array, Object],
        },
        propsClass: {
            type: String,
        },
    });
    let slots = useSlots();

    let isSlot = computed(() => {
        return hasSlot;
    });

    function handleAction(action) {
        if (action.onAction) {
            action.onAction();
        }
    }
</script>
