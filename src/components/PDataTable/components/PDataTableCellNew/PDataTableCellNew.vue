<template>
    <th v-if="header" data-polaris-header-cell="true" :class="className" :width="width" scope="col"
        :aria-sort="sortLabel">
        <template v-if="sortable">
            <button :class="headerClassName" @click="handleSortChange">
                <span class="Polaris-DataTable__Icon">
                    <PIcon :source="source"/>
                </span>
                {{ content }}
            </button>
        </template>
        <template v-else>
            {{ content }}
        </template>
    </th>
    <th v-else-if="firstColumn" scope="row" :class="className">
        <slot :name="`item.${headerValue}`" :item="headerValue">
            {{ value }}
        </slot>
    </th>
    <td v-else :class="className">
        <slot :name="`item.${headerValue}`" :item="headerValue">
            {{ value }}
        </slot>
    </td>
</template>

<script>
    import { classNames, variationName } from '../../../../utilities/css';
    import { PIcon } from '../../../../components/PIcon';
    import ObjectValidator from '../../../../utilities/validators/ObjectValidator';
    import StringValidator from '../../../../utilities/validators/StringValidator';

    const SortDirection = ['ascending', 'descending', 'none'];
    const VerticalAlign = ['top', 'bottom', 'middle', 'baseline'];

    const Sort = {
        value: {
            type: String,
            required: true,
        },
        direction: {
            type: String,
            required: true,
            expectedValues: SortDirection,
        }
    }

    export default {
        name: 'PDataTableCellNew',
        components: {
            PIcon,
        },
        props: {
            header: {
                type: Boolean,
            },
            content: {
                type: [String, Number],
            },
            value: {
                type: [String, Number, Boolean, Object, Array],
            },
            width: {
                type: [String, Number],
            },
            sort: {
                type: Object,
                ...ObjectValidator('sort', Sort),
            },
            sortable: {
                type: Boolean,
                default: true,
            },
            defaultSortDirection: {
                type: String,
                default: 'ascending',
                ...StringValidator('defaultSortDirection', SortDirection),
            },
            contentType: {
                type: String,
            },
            firstColumn: {
                type: Boolean,
            },
            truncate: {
                type: Boolean,
            },
            verticalAlign: {
                type: String,
                default: 'top',
                ...StringValidator('verticalAlign', VerticalAlign),
            },
            total: {
                type: Boolean,
            },
            totalInFooter: {
                type: Boolean,
            },
            headerValue: {
                type: String,
            },
        },
        emits: ['sort-changed'],
        computed: {
            className() {
                return classNames(
                    'Polaris-DataTable__Cell',
                    this.firstColumn && 'Polaris-DataTable__Cell--firstColumn',
                    this.firstColumn && this.truncate && 'Polaris-DataTable__Cell--truncated',
                    this.header && 'Polaris-DataTable__Cell--header',
                    this.total && 'Polaris-DataTable__Cell--total',
                    this.totalInFooter && 'Polaris-DataTable--cellTotalFooter',
                    this.numeric && 'Polaris-DataTable__Cell--numeric',
                    this.sorted && 'Polaris-DataTable__Cell--sorted ',
                    this.sortable && 'Polaris-DataTable__Cell--sortable',
                    this.verticalAlign && `Polaris-DataTable__Cell--${variationName('verticalAlign', this.verticalAlign)}`,
                );
            },
            headerClassName() {
                return classNames(
                    'Polaris-DataTable__Heading',
                    this.contentType === 'text' && 'Polaris-DataTable__Heading--left',
                );
            },
            direction() {
                return this.sorted && this.sort.direction ? this.sort.direction : this.defaultSortDirection;
            },
            source() {
                return this.direction === 'descending' ? 'CaretDownMinor' : 'CaretUpMinor';
            },
            numeric() {
                return this.contentType === 'numeric';
            },
            sorted() {
                return this.sort && this.sort.value === this.value;
            },
            sortLabel() {
                return this.sort && this.sort.value === this.value ? this.sort.direction : '';
            },
        },
        methods: {
            handleSortChange() {
                const direction = this.sort.direction === 'ascending' ? 'descending' : 'ascending';
                this.$emit('sort-changed', this.value, direction);
            },
        },
    }
</script>