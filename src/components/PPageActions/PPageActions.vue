<template>
    <div class="Polaris-PageActions">
        <PStack :distribution="distribution" spacing="tight">
            <PStackItem>
                <PButtonGroup v-if="secondaryActions.length">
                    <PButton v-for="(secondaryAction, secondaryActionIndex) in secondaryActions"
                             :key="`secondaryAction-${secondaryActionIndex}`" @click="secondaryAction.onAction()"
                             v-bind="secondaryAction">
                        {{ secondaryAction.content }}
                    </PButton>
                </PButtonGroup>
            </PStackItem>
            <PStackItem>
                <PButtonGroup v-if="Object.keys(secondaryAction).length">
                    <PButton @click="secondaryAction.onAction()" v-bind="secondaryAction">
                        {{ secondaryAction.content }}
                    </PButton>
                    <template v-if="Object.keys(primaryAction).length">
                        <PButton @click="primaryAction.onAction()" v-bind="primaryAction" primary>
                            {{ primaryAction.content }}
                        </PButton>
                    </template>
                </PButtonGroup>
                <PButton
                    v-else-if="Object.keys(primaryAction).length"
                    @click="primaryAction.onAction()"
                    v-bind="primaryAction"
                    primary
                >
                    {{ primaryAction.content }}
                </PButton>
            </PStackItem>
        </PStack>
    </div>
</template>

<script>
    import { PStack } from '../../components/PStack';
    import { PStackItem } from '../../components/PStack/components/PStackItem';
    import { PButtonGroup } from '../../components/PButtonGroup';
    import { PButton } from '../../components/PButton';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Page actions let merchants take key actions at the bottom of specific pages in the interface. This is
     *  important because sometimes the primary call to action is hard to access when merchants are at the bottom of a page.
     *  </h4>
     */
    export default {
        name: 'PPageActions',
        components: {
            PStack, PStackItem, PButtonGroup, PButton,
        },
        props: {
            /**
             * The primary action for the page
             */
            primaryAction: {
                type: Object,
                default: () => ({}),
            },
            /**
             * The secondary action for the page
             */
            secondaryAction: {
                type: Object,
                default: () => ({}),
            },
            /**
             * The secondary actions for the page
             */
            secondaryActions: {
                type: Array,
                default: () => ([]),
            },
        },
        computed: {
            distribution() {
                return this.secondaryActions ? 'equalSpacing' : 'trailing';
            },
        },
    }
</script>
