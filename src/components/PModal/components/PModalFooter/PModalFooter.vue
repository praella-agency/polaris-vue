<template>
    <div class="Polaris-Modal-Footer">
        <div class="Polaris-Modal-Footer__FooterContent">
            <PStack alignment="center">
                <PStackItem fill>
                    <slot/>
                </PStackItem>
                <PStackItem v-if="primaryAction || secondaryActions">
                    <PButtonGroup v-if="primaryAction || secondaryActions.length > 0">
                        <PButton
                            v-for="(secondaryAction, secondaryActionIndex) in secondaryActions"
                            :key="`secondaryAction-${secondaryActionIndex}`"
                            :destructive="secondaryAction.destructive"
                            :disabled="secondaryAction.disabled"
                            v-on="secondaryAction.onAction ? { click: secondaryAction.onAction } : {}"
                        >
                            {{ secondaryAction.content }}
                        </PButton>
                        <PButton
                            v-if="Object.keys(primaryAction).length > 0"
                            :disabled="primaryAction.disabled && primaryAction.disabled"
                            :destructive="primaryAction.destructive"
                            :primary="!primaryAction.destructive"
                            v-on="primaryAction.onAction ? { click: primaryAction.onAction } : {}"
                        >
                            {{ primaryAction.content }}
                        </PButton>
                    </PButtonGroup>
                </PStackItem>
            </PStack>
        </div>
    </div>
</template>

<script>
    import { PStack } from '../../../../components/PStack';
    import { PStackItem } from '../../../../components/PStack/components/PStackItem';
    import { PButtonGroup } from '../../../../components/PButtonGroup/index.js';
    import { PButton } from '../../../../components/PButton/index.js';

    export default {
        name: 'PModalFooter',
        components: {
            PStack, PStackItem, PButtonGroup, PButton,
        },
        props: {
            primaryAction: {
                type: Object,
            },
            secondaryActions: {
                type: Array,
            },
        },
    }
</script>
