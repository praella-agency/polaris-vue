<template>
  <th v-if="header" data-polaris-header-cell='true' :class="className" :width="width" scope='col' :aria-sort="sortLabel">
    <template v-if="sortable">
      <button :class="headerClassName" @click="handleSortChange">
        <span class="Polaris-DataTable__Icon">
            <PIcon :source="source"></PIcon>
        </span>
        {{content}}
      </button>
    </template>
    <template v-else>
      {{content}}
    </template>
  </th>
  <th v-else-if="firstColumn" scope="row" :class="className">
    <template v-if="hasAction">
      <PButton plain v-if="action && action.to" :to="action.to">{{action.content}}</PButton>
      <PLink v-if="action && (action.url || action.external)" :url="action.url" :external="action.external" :monochrome="action.monochrome">{{action.content ? action.content : action.url}}</PLink>
      <PBadge v-if="badge" :status="badge.status" :progress="badge.progress">Badge{{badge.content}}</PBadge>
      <PToggle v-if="toggle" :checked="toggle.status" :value="toggle.id" @change="toggle.onAction" />
    </template>
    <template v-else>
      {{content}}
    </template>
  </th>
  <td v-else :class="className">
    <template v-if="!hasActions">
      <template v-if="hasAction">
        <PButton plain v-if="action && action.to" :to="action.to">{{action.content}}</PButton>
        <PLink v-if="action && (action.url || action.external)" :url="action.url" :external="action.external" :monochrome="action.monochrome">{{action.content ? action.content : action.url}}</PLink>
        <PBadge v-if="badge" :status="badge.status" :progress="badge.progress">{{badge.content}}</PBadge>
        <PToggle v-if="toggle" :checked="toggle.status" :value="toggle.id" @change="toggle.onAction" />
      </template>
      <template v-else>
        {{content}}
      </template>
    </template>
    <template v-else>
      <PButtonGroup segmented>
        <PButton v-for="(action, key) in actions" :key="key" v-bind="action" :primary="action.primary" :destructive="action.destructive" @click="action.onAction(value)">{{action.content}}</PButton>
      </PButtonGroup>
    </template>
  </td>
</template>
<script lang="tsx">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { classNames, variationName } from '@/utilities/css';
    import { PIcon } from '@/components/PIcon';
    import {Action, ComplexAction, LinkAction} from '@/types';
    import { PButton } from '@/components/PButton';
    import { PButtonGroup } from '@/components/PButtonGroup';
    import { PLink } from '@/components/PLink';
    import { PToggle } from '@/components/PToggle';
    import { PBadge } from '@/components/PBadge/index.js';

    type SortDirection = 'ascending' | 'descending' | 'none';
    type VerticalAlign = 'top' | 'bottom' | 'middle' | 'baseline';
    type Status = 'success' | 'info' | 'attention' | 'warning' | 'new' | 'critical';
    type Progress = 'incomplete' | 'partiallyComplete' | 'complete';
    type Size = 'medium' | 'small';

    interface Sort {
        value: string;
        direction: SortDirection;
    }

    interface Badge {
        content?: string;
        status?: Status;
        progress?: Progress;
        size?: Size;
    }

    interface Toggle {
        id?: number;
        status?: Status;
        onAction?: Action;
    }

    @Component({
        components: { PIcon, PButton, PButtonGroup, PLink, PToggle, PBadge },
    })
    export default class PDataTableCell extends Vue {
        @Prop() public content!: string | number;
        @Prop(String) public contentType!: string;
        @Prop([String, Number]) public value!: string | number;
        @Prop(Boolean) public firstColumn!: boolean;
        @Prop(Boolean) public truncate!: boolean;
        @Prop(Boolean) public header!: boolean;
        @Prop(Boolean) public total!: boolean;
        @Prop(Boolean) public sortable!: boolean;
        @Prop([String, Number]) public width!: string | number;
        @Prop(Object) public sort!: Sort;
        @Prop({ type: String, default: 'ascending' }) public defaultSortDirection!: SortDirection;
        @Prop(Boolean) public totalInFooter!: boolean;
        @Prop({ type: String, default: 'top' }) public verticalAlign!: VerticalAlign;
        @Prop(Array) public actions!: ComplexAction[];
        @Prop(Object) public action!: LinkAction | ComplexAction;
        @Prop(Object) public badge!: Badge;
        @Prop(Object) public toggle!: Toggle;

        public get className() {
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
        }

        public get headerClassName() {
            return classNames(
                'Polaris-DataTable__Heading',
                this.contentType === 'text' && 'Polaris-DataTable__Heading--left',
            );
        }

        public get direction() {
            return this.sorted && this.sort.direction ? this.sort.direction : this.defaultSortDirection;
        }

        public get source() {
            return this.direction === 'descending' ? 'CaretDownMinor' : 'CaretUpMinor';
        }

        public get numeric() {
            return this.contentType === 'numeric';
        }

        public get hasActions() {

            return this.actions && this.actions.length > 0;
        }

        public get hasAction() {

            return this.action || this.badge || this.toggle;
        }

        public get sorted() {
            return this.sort && this.sort.value === this.value;
        }

        public get sortLabel() {
            return this.sort && this.sort.value === this.value ? this.sort.direction : '';
        }

        public handleSortChange() {

            const direction = this.sort.direction === 'ascending' ? 'descending' : 'ascending';
            this.$emit('sort-changed', this.value, direction);
        }
    }
</script>

<style scoped>
th:last-child { text-align: right; }
td:last-child { text-align: right; }
td:last-child > * { float: right; }
</style>
