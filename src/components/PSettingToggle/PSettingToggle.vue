<template>
    <PCard sectioned>
        <PSettingAction>
            <template slot="children">
                <!-- @slot Inner content of the card -->
                <slot/>
            </template>
            <PButton slot="action"
                     :accessibility-label="action.accessibilityLabel"
                     :destructive="action.destructive"
                     :disabled="action.disabled"
                     :external="action.external"
                     :icon="action.icon"
                     :id="action.id ? action.id : `Polaris-Setting-Toggle${this['_uid']}`"
                     :loading="action.loading"
                     :outline="action.outline"
                     :url="action.url"
                     :primary="!enabled"
                     @click="action.onAction"
            > {{ action.contentStatus }}
            </PButton>
        </PSettingAction>
    </PCard>
</template>

<script>
    import { PCard } from '../../components/PCard';
    import { PButton } from '../../components/PButton/index.js';
    import { PSettingAction } from '../../components/PSettingToggle/components/PSettingAction/index.js';

    const Action = {
        accessibilityLabel: String,
        destructive: Boolean,
        disabled: Boolean,
        external: Boolean,
        icon: String,
        id: [String| Number],
        loading: Boolean,
        outline: Boolean,
        url: String,
        contentStatus: String,

        onAction() {
            return 0;
        },
    }

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Use to give merchants control over a feature or option that can be turned on or off.</h4>
     */
    export default {
        name: 'PSettingToggle',
        components: {
            PSettingAction, PCard, PButton,
        },
        props: {
            /**
             * Card header actions.
             */
            action: {
                type: [Object, Action],
                default: Object,
            },
            /**
             * Sets toggle state.
             * @values true|false
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
        },
    }
</script>
