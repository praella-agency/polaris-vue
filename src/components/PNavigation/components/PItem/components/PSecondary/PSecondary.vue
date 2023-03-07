<template>
    <PCollapsible
        :id="id || uid"
        :open="expanded"
        :transition="{duration: '0ms', timingFunction: 'linear'}"
    >
        <ul class="Polaris-Navigation__List">
            <slot/>
        </ul>
    </PCollapsible>
</template>

<script setup>
    import { ref } from 'vue';
    import { uuid } from '../../../../../../ComponentHelpers';
    import { PCollapsible } from '../../../../../../components/PCollapsible';

    let props = defineProps({
        id: {
            type: String,
            default: null
        },
        expanded: {
            type: Boolean,
            default: true,
        },
    });

    let uid = ref(`SecondaryNavigation${uuid()}`);
</script>
