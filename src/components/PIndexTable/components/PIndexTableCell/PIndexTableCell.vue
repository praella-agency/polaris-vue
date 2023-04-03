<template>
    <td :class="cellClassName">
        <slot/>
    </td>
</template>

<script setup>
    import { computed } from 'vue';
    import { classNames } from '../../../../utilities/css';

    let props = defineProps({
        flush: {
            type: Boolean,
            default: false,
        },
        lastChild: {
            type: Boolean,
            default: false,
        },
    });

    let cellClassName = computed(() => {
        return classNames(
            'Polaris-IndexTable__TableCell',
            props.flush && 'Polaris-IndexTable__TableCell--flush',
            props.lastChild && 'Polaris-IndexTable__TableCell--last-child',
        );
    });
</script>
