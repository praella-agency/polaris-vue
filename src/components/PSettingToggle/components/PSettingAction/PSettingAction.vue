<template>
    <div class="Polaris-SettingAction">
        <div class="Polaris-SettingAction__Setting">
            <slot/>
        </div>
        <div v-if="hasSlot($slots.action) || action" class="Polaris-SettingAction__Action">
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

<script>
    import { hasSlot } from '../../../../ComponentHelpers';
    import { PCard } from '../../../../components/PCard';
    import { PButton } from '../../../../components/PButton';

    export default {
        name: 'PSettingAction',
        components: {
            PCard, PButton,
        },
        props: {
            label: {
                type: String,
            },
            action: {
                type: [String, Number, Boolean, Array, Object],
            },
            propsClass: {
                type: String,
            },
        },
        computed: {
            hasSlot() {
                return hasSlot;
            },
        },
        methods: {
            handleAction(action) {
                if (action.onAction) {
                    action.onAction();
                }
            },
        },
    }
</script>
