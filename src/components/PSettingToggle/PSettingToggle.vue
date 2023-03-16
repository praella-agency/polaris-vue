<template>
    <PCard sectioned>
        <PSettingAction>
            <!-- @slot Inner content of the card -->
            <slot/>
            <template #action>
                <PButton
                    :accessibility-label="action.accessibilityLabel"
                    :destructive="action.destructive"
                    :disabled="action.disabled"
                    :external="action.external"
                    :icon="action.icon"
                    :id="action.id ? action.id : `Polaris-Setting-Toggle${isUuid}`"
                    :loading="action.loading"
                    :outline="action.outline"
                    :url="action.url"
                    :primary="!enabled"
                    @click="action.onAction"
                >
                    {{ action.contentStatus }}
                </PButton>
            </template>
        </PSettingAction>
    </PCard>
</template>

<script setup>
    import { computed } from 'vue';
    import { uuid } from '../../ComponentHelpers';
    import { PCard } from '../../components/PCard';
    import { PButton } from '../../components/PButton';
    import { PSettingAction } from '../../components/PSettingToggle/components/PSettingAction';
    import { SettingToggleAction } from '../variables';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Use to give merchants control over a feature or option that can be turned on or off.</h4>
     */

    let props = defineProps({
        /**
         * Card header actions.
         */
        action: {
            type: [Object, SettingToggleAction],
            default: Object,
        },
        /**
         * Sets toggle state.
         */
        enabled: {
            type: Boolean,
            default: false,
        },
        /**
         * @ignore
         */
        propsClass: {
            type: String,
            default: null,
        },
    });

    let isUuid = computed(() => {
        return uuid();
    });
</script>
