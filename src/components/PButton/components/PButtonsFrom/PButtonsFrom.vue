<template>
    <div>
        <PButton
            v-for="(prop, i) in computedProps" :key="i"
            @click="prop.onAction"
            v-bind="prop.rest"
        >
            {{ prop.content }}
        </PButton>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { ComplexAction } from '../../../../types';
    import { PButton } from '../../../../components/PButton';
    import ObjectValidator from '../../../../utilities/validators/ObjectValidator';

    let props = defineProps({
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
    });

    let computedProps = computed(() => {
        const actions = !Array.isArray(props.actions) ? [props.actions] : [...props.actions];

        return actions.map(({content, onAction, ...action}) => ({
            content,
            onAction: onAction || (() => undefined),
            rest: {...action, ...props.overrides},
        }));
    });
</script>
