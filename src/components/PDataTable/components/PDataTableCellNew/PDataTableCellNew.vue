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

<script setup>
    import { computed } from 'vue';
    import { classNames, variationName } from '../../../../utilities/css';
    import { PIcon } from '../../../../components/PIcon';
    import ObjectValidator from '../../../../utilities/validators/ObjectValidator';
    import StringValidator from '../../../../utilities/validators/StringValidator';
    import { Sort, SortDirection, VerticalAlign } from '../../../variables';

    let props = defineProps({
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
        alignLastRight: {
            type: Boolean,
            default: false,
        },
    });
    const emit = defineEmits(['sort-changed']);

    let numeric = computed(() => {
        return props.contentType === 'numeric';
    });

    let sorted = computed(() => {
        return props.sort && props.sort.value === props.value;
    });

    let className = computed(() => {
        return classNames(
            'Polaris-DataTable__Cell',
            props.firstColumn && 'Polaris-DataTable__Cell--firstColumn',
            props.firstColumn && props.truncate && 'Polaris-DataTable__Cell--truncated',
            props.header && 'Polaris-DataTable__Cell--header',
            props.total && 'Polaris-DataTable__Cell--total',
            props.totalInFooter && 'Polaris-DataTable--cellTotalFooter',
            numeric.value && 'Polaris-DataTable__Cell--numeric',
            sorted.value && 'Polaris-DataTable__Cell--sorted ',
            props.sortable && 'Polaris-DataTable__Cell--sortable',
            props.verticalAlign && `Polaris-DataTable__Cell--${variationName('verticalAlign', props.verticalAlign)}`,
            props.alignLastRight && `Polaris-DataTable__Cell-align-right`,
        );
    });

    let headerClassName = computed(() => {
        return classNames(
            'Polaris-DataTable__Heading',
            props.contentType === 'text' && 'Polaris-DataTable__Heading--left',
        );
    });

    let direction = computed(() => {
        return sorted.value && props.sort.direction ? props.sort.direction : props.defaultSortDirection;
    });

    let source = computed(() => {
        return direction.value === 'descending' ? 'CaretDownMinor' : 'CaretUpMinor';
    });

    let sortLabel = computed(() => {
        return props.sort && props.sort.value === props.value ? props.sort.direction : '';
    });

    function handleSortChange() {
        const direction = props.sort.direction === 'ascending' ? 'descending' : 'ascending';
        emit('sort-changed', props.value, direction);
    }
</script>