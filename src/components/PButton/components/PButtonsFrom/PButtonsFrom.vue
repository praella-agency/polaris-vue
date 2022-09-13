<template>
    <div>
        <PButton
            v-for="(prop, i) in props" :key="i"
            @click="prop.onAction"
            v-bind="prop.rest"
        >
            {{ prop.content }}
        </PButton>
    </div>
</template>

<script>
    import { ComplexAction } from '../../../../types';
    import { PButton } from '../../../../components/PButton';
    import ObjectValidator from '../../../../utilities/validators/ObjectValidator';

    export default {
        name: 'PButtonsFrom',
        components: {
            PButton,
        },
        props: {
            /**
             * Action or Array of actions
             */
            actions: {
                type: [Array, Object],
                ...ObjectValidator('actions', ComplexAction),
            },
            overrides: {
                type: Object,
                default: () => ({}),
            }
        },
        computed: {
            props() {
                const actions = !Array.isArray(this.actions) ? [this.actions] : [...this.actions];

                return actions.map(({content, onAction, ...action}) => ({
                    content,
                    onAction: onAction || (() => undefined),
                    rest: {...action, ...this.overrides},
                }));
            },
        },
    }
</script>
