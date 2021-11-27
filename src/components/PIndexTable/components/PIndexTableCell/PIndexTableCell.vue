<template>
    <td :class="cellClassName">
        <slot/>
    </td>
</template>

<script>
    import { classNames } from '../../../../utilities/css';

    export default {
        name: 'PIndexTableCell',
        props: {
            flush: {
                type: Boolean,
                default: false,
            },
            lastChild: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            cellClassName() {
                return classNames(
                    'Polaris-IndexTable__TableCell',
                    this.flush && 'Polaris-IndexTable__TableCell--flush',
                    this.lastChild && 'Polaris-IndexTable__TableCell--last-child',
                );
            },
        },
    }
</script>

<style scoped>

</style>