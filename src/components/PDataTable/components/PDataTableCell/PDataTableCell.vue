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
<script>
    import { classNames, variationName } from '../../../../utilities/css';
    import { PIcon } from '../../../../components/PIcon';
    import { PButton } from '../../../../components/PButton';
    import { PButtonGroup } from '../../../../components/PButtonGroup';
    import { PLink } from '../../../../components/PLink';
    import { PToggle } from '../../../../components/PToggle';
    import { PBadge } from '../../../../components/PBadge';
    import ObjectValidator from '../../../../utilities/validators/ObjectValidator';
    import StringValidator from '../../../../utilities/validators/StringValidator';

    const SortDirection = ['ascending', 'descending', 'none'];
    const VerticalAlign = ['top', 'bottom', 'middle', 'baseline'];
    const Status = ['success', 'info', 'attention', 'warning', 'new', 'critical'];
    const Progress = ['incomplete', 'partiallyComplete', 'complete'];
    const Size = ['medium', 'small'];

    const Sort = {
        value: {
            type: String,
            required: true,
        },
        direction: {
            type: String,
            required: true,
            expectedValues: SortDirection,
        },
    }

    export default {
        name: 'PDataTableCell',
        components: {
            PIcon, PButton, PButtonGroup, PLink, PToggle, PBadge,
        },
        props: {
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
        },
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
            hasActions() {
                return this.actions && this.actions.length > 0;
            },
            hasAction() {

                return this.action || this.badge || this.toggle;
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
