<template>
    <div :class="className">
        <slot>
            <template v-if="actions ? actions.length > 0 : false">
                <PButton
                    v-for="(action, key) in actions"
                    :key="key"
                    :primary="action.primary"
                    @click="handleAction(action)"
                    :url="action.url"
                    :destructive="action.destructive"
                    :disabled="action.disabled"
                    :icon="action.icon"
                    :accessibility-label="action.accessibilityLabel"
                >
                    {{ action.content }}
                </PButton>
            </template>
            <template v-else-if="actions ? Object.keys(actions) : false">
                <PButton
                    :primary="actions.primary"
                    @click="handleAction(actions)"
                    :url="actions.url"
                    :destructive="actions.destructive"
                    :disabled="actions.disabled"
                    :icon="actions.icon"
                    :accessibility-label="actions.accessibilityLabel"
                >
                    {{ actions.content }}
                </PButton>
            </template>
        </slot>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { classNames } from '@/utilities/css';
    import { PButton } from '@/components/PButton/index.js';

    @Component({
        components: {
            PButton,
        },
    })
    export default class PBulkActionButtonWrapper extends Vue {
        @Prop([Object, Array]) public actions!: [] | {};

        public get className() {
            return classNames(
                'Polaris-ResourceList-BulkActions__BulkActionButton',
            );
        }

        public handleAction(action: any) {
            if (action.onAction) {
                action.onAction();
            }
        }
    }
</script>