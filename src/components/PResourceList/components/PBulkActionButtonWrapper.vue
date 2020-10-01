<template>
    <div :class="className">
        <slot>
            <PButton v-if="action"
                     :primary="action.primary"
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
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { classNames } from '@/utilities/css';

    import PButton from '@/components/PButton/PButton.vue';

    @Component({
        components: { PButton },
    })

    export default class PBulkActionButtonWrapper extends Vue {
        @Prop(Object) public action!: object;

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