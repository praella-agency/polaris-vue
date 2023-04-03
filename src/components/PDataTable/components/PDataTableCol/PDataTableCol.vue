<template>
    <th v-if="firstColumn" scope="row" :class="className">
        <slot/>
    </th>
    <td v-else :class="className">
        <slot/>
    </td>
</template>

<script setup>
    import { computed } from 'vue';
    import { classNames, variationName } from '../../../../utilities/css';
    import StringValidator from '../../../../utilities/validators/StringValidator';
    import { VerticalAlign } from '../../../variables';

    let props = defineProps({
        /**
         * First Column of a table
         */
        firstColumn: {
            type: Boolean,
            default: false,
        },
        /**
         * Truncate content in first column instead of wrapping
         */
        truncate: {
            type: Boolean,
            default: false,
        },
        /**
         * Numeric column of a table
         */
        numeric: {
            type: Boolean,
            default: false,
        },
        /**
         * Vertical alignment of content in the cells
         */
        verticalAlign: {
            type: String,
            default: 'top',
            ...StringValidator('verticalAlign', VerticalAlign),
        },
    });

    let className = computed(() => {
        return classNames(
            'Polaris-DataTable__Cell',
            props.firstColumn && 'Polaris-DataTable__Cell--firstColumn',
            props.firstColumn && props.truncate && 'Polaris-DataTable__Cell--truncated',
            props.numeric && 'Polaris-DataTable__Cell--numeric',
            props.verticalAlign && `Polaris-DataTable__Cell--${variationName('verticalAlign', props.verticalAlign)}`,
        );
    });
</script>