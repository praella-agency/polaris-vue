<template>
    <th v-if="header" data-polaris-header-cell='true' :class="className" :width="width" scope='col'
        :aria-sort="sortLabel">
        <template v-if="sortable">
            <button :class="headerClassName" @click="handleSortChange">
        <span class="Polaris-DataTable__Icon">
            <PIcon :source="source"></PIcon>
        </span>
                {{ content }}
            </button>
        </template>
        <template v-else>
            {{ content }}
        </template>
    </th>
    <th v-else-if="firstColumn" scope="row" :class="className">
        <template v-if="hasAction">
            <PButton plain v-if="action && action.to" :to="action.to">{{ action.content }}</PButton>
            <PLink v-if="action && (action.url || action.external)" :url="action.url" :external="action.external"
                   :monochrome="action.monochrome">{{ action.content ? action.content : action.url }}
            </PLink>
            <PBadge v-if="badge" :status="badge.status" :progress="badge.progress">Badge{{ badge.content }}</PBadge>
            <PToggle v-if="toggle" :checked="toggle.status" :value="toggle.id" @change="toggle.onAction"/>
        </template>
        <template v-else>
            {{ content }}
        </template>
    </th>
    <td v-else :class="className">
        <template v-if="!hasActions">
            <template v-if="hasAction">
                <PButton plain v-if="action && action.to" :to="action.to">{{ action.content }}</PButton>
                <PLink v-if="action && (action.url || action.external)" :url="action.url" :external="action.external"
                       :monochrome="action.monochrome">{{ action.content ? action.content : action.url }}
                </PLink>
                <PBadge v-if="badge" :status="badge.status" :progress="badge.progress">{{ badge.content }}</PBadge>
                <PToggle v-if="toggle" :checked="toggle.status" :value="toggle.id" @change="toggle.onAction"/>
            </template>
            <template v-else>
                {{ content }}
            </template>
        </template>
        <template v-else>
            <PButtonGroup segmented>
                <PButton v-for="(action, key) in actions" :key="key" v-bind="action" :primary="action.primary"
                         :destructive="action.destructive" @click="action.onAction(value)">{{ action.content }}
                </PButton>
            </PButtonGroup>
        </template>
    </td>
</template>
<script setup>
    import { computed } from 'vue';
    import { classNames, variationName } from '../../../../utilities/css';
    import { PIcon } from '../../../../components/PIcon';
    import { PButton } from '../../../../components/PButton';
    import { PButtonGroup } from '../../../../components/PButtonGroup';
    import { PLink } from '../../../../components/PLink';
    import { PToggle } from '../../../../components/PToggle';
    import { PBadge } from '../../../../components/PBadge';
    import ObjectValidator from '../../../../utilities/validators/ObjectValidator';
    import StringValidator from '../../../../utilities/validators/StringValidator';
    import { Sort, SortDirection, VerticalAlign } from '../../../variables';

    let props = defineProps({
        content: {
            type: [String, Number],
        },
        contentType: {
            type: String,
        },
        value: {
            type: [String, Number],
        },
        firstColumn: {
            type: Boolean,
        },
        truncate: {
            type: Boolean,
        },
        header: {
            type: Boolean,
        },
        total: {
            type: Boolean,
        },
        sortable: {
            type: Boolean,
        },
        width: {
            type: [String, Number],
        },
        sort: {
            type: Object,
            ...ObjectValidator('sort', Sort),
        },
        defaultSortDirection: {
            type: String,
            default: 'ascending',
            ...StringValidator('defaultSortDirection', SortDirection),
        },
        totalInFooter: {
            type: Boolean,
        },
        verticalAlign: {
            type: String,
            default: 'top',
            ...StringValidator('verticalAlign', VerticalAlign),
        },
        actions: {
            type: Array,
            default: () => ([]),
        },
        action: {
            type: Object,
            default: () => ({}),
        },
        badge: {
            type: Object,
            default: () => ({}),
        },
        toggle: {
            type: Object,
            default: () => ({}),
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

    let hasActions = computed(() => {
        return props.actions && props.actions.length > 0;
    });

    let hasAction = computed(() => {
        return props.action || props.badge || props.toggle;
    });

    let sortLabel = computed(() => {
        return props.sort && props.sort.value === props.value ? props.sort.direction : '';
    });

    function handleSortChange() {
        const direction = props.sort.direction === 'ascending' ? 'descending' : 'ascending';
        emit('sort-changed', props.value, direction);
    }
</script>