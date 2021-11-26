<template>
    <th v-if="firstColumn" scope="row" :class="className">
        <slot/>
    </th>
    <td v-else :class="className">
        <slot/>
    </td>
</template>

<script>
    import { classNames, variationName } from '../../../../utilities/css';
    import StringValidator from '../../../../utilities/validators/StringValidator';

    const VerticalAlign = ['top', 'bottom', 'middle', 'baseline'];

    export default {
        name: 'PDataTableCol',
        props: {
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
        },
        computed: {
            className() {
                return classNames(
                    'Polaris-DataTable__Cell',
                    this.firstColumn && 'Polaris-DataTable__Cell--firstColumn',
                    this.firstColumn && this.truncate && 'Polaris-DataTable__Cell--truncated',
                    this.numeric && 'Polaris-DataTable__Cell--numeric',
                    this.verticalAlign && `Polaris-DataTable__Cell--${variationName('verticalAlign', this.verticalAlign)}`,
                );
            },
        },
    }
</script>

<style scoped>
    th:last-child {
        text-align: right;
    }

    td:last-child {
        text-align: right;
    }

    td:last-child > * {
        float: right;
    }
</style>