<template>
    <div :class="className">
        <div class="Polaris-ResourceList__FiltersWrapper" v-if="!hideFilters">
            <PFilter
                v-if="$slots.hasOwnProperty('filter')"
                v-bind="$attrs"
                :resourceName="resourceName"
                @remove-tag="onRemoveFilter"
                @input="onFilterInputChanged">
                <!-- @slot Filter content -->
                <slot name="filter"/>
            </PFilter>
        </div>
        <div
            ref="PResourceListHeader"
            class="Polaris-ResourceList__HeaderOuterWrapper"
            v-if="showHeader && itemsExist"
        >
            <PResourceListHeader
                    v-bind="$attrs"
                    :promotedBulkActions="promotedBulkActions"
                    :bulkActions="bulkActions"
                    :sortOptions="sortOptions"
                    :selectable="selectable"
                    :selectedItems="computedValue.selected"
                    :selectedMore="computedValue.selectedMore"
                    :checked="checked"
                    :resourceTitle="resourceTitle"
                    :checkedCount="checkedCount"
                    :checkedAll="checkedAll"
                    :count="count()"
                    :hasMore="hasMore"
                    :loading="loading"
                    v-on="$listeners"
                    @toggle-all="onToggledAll($event)"
                    @toggle-select-more="onSelectMore"
                    @handle-selection-mode="handleSelectMode"
            />
        </div>
        <ul
            v-if="$slots.hasOwnProperty('default')"
            :class="resourceListClassName"
            ref="listRef"
            aria-live="polite"
            :aria-busy="loading"
        >
            <template v-if="loading">
                <li class="Polaris-ResourceList__SpinnerContainer" :style="{'padding-top': `${topPadding}px`}">
                    <PSpinner size="large"/>
                </li>
                <li class="Polaris-ResourceList__LoadingOverlay" />
            </template>
            <!-- @slot Displays when Selectable is true -->
            <slot :selectable="selectable"/>
        </ul>

        <template
            v-if="showEmptySearchState"
        >
            <!-- @slot Content for empty search state -->
            <slot name="emptySearchState">
                <div class="Polaris-ResourceList__EmptySearchResultWrapper">
                    <PStack alignment="center" vertical>
                        <PStackItem>
                            <PIcon source="SearchMajor" />
                        </PStackItem>
                        <PStackItem>
                            <PDisplayText size="small">
                                No {{resourceName.plural}} found
                            </PDisplayText>
                        </PStackItem>
                        <PStackItem>
                            <PTextStyle variation="subdued">
                                Try changing the filters or search term
                            </PTextStyle>
                        </PStackItem>
                    </PStack>
                </div>
            </slot>
        </template>

        <div
            v-if="loading && !itemsExist"
            :class="loadingClassName"
        >
            <ul
                :class="resourceListClassName"
                ref="listRef"
                aria-live="polite"
                :aria-busy="loading"
            >
                <li class="Polaris-ResourceList__SpinnerContainer">
                    <PSpinner size="small"/>
                </li>
                <li class="Polaris-ResourceList__LoadingOverlay" />
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames, variationName } from '@/utilities/css';
import {PIcon} from '@/components/PIcon';
import PResourceListHeader from '@/components/PResourceList/components/PResourceListHeader.vue';
import PFilter from '@/components/PFilter/PFilter.vue';
import {PSpinner} from '@/components/PSpinner';
import {PStack, PStackItem} from '@/components/PStack';
import {PDisplayText} from '@/components/PDisplayText';
import {PTextStyle} from '@/components/PTextStyle';

interface ResourceNameInterface {
    singular: string;
    plural: string;
}

interface SortOptionsInterface {
    /** Machine value of the option; this is the value passed to `onChange` */
    value: string;
    /** Human-readable text for the option */
    label: string;
    /** Option will be visible, but not selectable */
    disabled?: boolean;
}

interface BulkActionsInterface {
    content: string;
    onAction: void;
}

interface ItemType {

}

/**
 * <br/>
 * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
 *  sans-serif;">A resource list displays a collection of objects of the same type, like products or customers. The main
 *  job of a resource list is to help merchants find an object and navigate to a full-page representation of it.</h4>
 */
@Component({
    components: {
        PFilter,
        PResourceListHeader,
        PIcon,
        PSpinner,
        PStack, PStackItem,
        PDisplayText,
        PTextStyle,
    },
})
export default class PResourceList extends Vue {

    /**
     * Renders a Select All button at the top
     * of the list and checkboxes in front of each list item.
     * @values true | false
     */
    @Prop({type: Boolean, default: false}) public selectable!: boolean;

    /**
     * Get the value of the selected items in array.
     */
    @Prop({type: Array, default: () => []}) public selected!: number[];

    /**
     * Whether or not there are more items than currently set
     * on the items prop
     * @values true | false
     */
    @Prop({type: Boolean, default: false}) public hasMore!: boolean;

    /**
     * Overlays item list with a spinner while a
     * background action is being performed.
     * @values true | false
     */
    @Prop({type: Boolean, default: false}) public loading!: boolean;

    /**
     * Name of the resource, such as customers or books.
     * @values {plural: string, singular: string}
     */
    @Prop({required: true, type: Object}) public resourceName!: ResourceNameInterface;

    /**
     * Boolean to show or hide the header
     * @value true | false
     */
    @Prop({type: Boolean, default: true}) public showHeader!: boolean;

    /**
     * Boolean to show or hide the filters
     * @value true | false
     */
    @Prop({type: Boolean, default: false}) public hideFilters!: boolean;

    /**
     * Collection of sort options to choose from
     */
    @Prop({type: [Array, String], default: null}) public sortOptions!: SortOptionsInterface[];

    /**
     * Bulk actions that will be given more prominence
     */
    @Prop([Object, Array]) public promotedBulkActions!: [] | {};

    /**
     * Actions available on the currently selected items
     */
    @Prop(Array) public bulkActions!: BulkActionsInterface[];

    public selectedItems = this.selectable && this.selected ? this.selected : [];
    public selectedMore: boolean = false;
    public selectedAll: boolean = false;
    public toggleSelectMode = false;

    public topPadding = 8;

    public mounted() {
      let loadingPosition = 0;

      if (typeof window !== 'undefined' && this.$refs.hasOwnProperty('PResourceListHeader')) {
        const overlay = (this.$refs.PResourceListHeader as HTMLDivElement).getBoundingClientRect();
        const viewportHeight = Math.max(document.documentElement ?
            document.documentElement.clientHeight : 0, window.innerHeight || 0);
        const overflow = viewportHeight - overlay.height;
        const spinnerHeight = 45;
        loadingPosition = overflow > 0 ? (overlay.height - spinnerHeight) / 2 :
            (viewportHeight - overlay.top - spinnerHeight) / 2;
        loadingPosition = loadingPosition +
            (this.$refs.PResourceListHeader as HTMLDivElement).getBoundingClientRect().height;
        this.topPadding = loadingPosition > 0 ? loadingPosition : this.topPadding;
      }
    }

    public count() {
        if (typeof this.$scopedSlots !== 'undefined'
            && typeof this.$scopedSlots.default === 'function'
            && this.$scopedSlots.default({})) {
            const slots = this.$scopedSlots.default({});
            return slots ? slots.filter((vnode) => vnode.tag !== undefined).length : 0;
        }
        if (this.$slots.default) {
            return this.$slots.default.filter((vnode) => {
                return vnode.tag !== undefined;
            }).length;
        }

        return 0;
    }

    public get className() {
        return classNames(
            'Polaris-ResourceList__ResourceListWrapper',
        );
    }

    public get resourceListClassName() {
        return classNames(
            'Polaris-ResourceList',
            this.loading && 'Polaris-ResourceList__DisabledPointerEvents',
            this.selectedItems.length > 0 && 'Polaris-ResourceList--disableTextSelection',
        );
    }

    public get loadingClassName() {
        return classNames(
            'Polaris-ResourceList__ItemWrapper',
            this.loading && 'Polaris-ResourceList__ItemWrapper--isLoading',
        );
    }

    public get checkedAll() {
        return this.checked && this.count() === this.checkedCount;
    }

    public get checked() {
        return this.selectable && this.checkedCount > 0;
    }

    public get resourceTitle() {

        const resourceName: ResourceNameInterface = this.resourceName;
        return this.count() > 1 ? resourceName.plural : resourceName.singular;
    }

    public get checkedCount() {
        return this.selectable ? this.selected.length : 0;
    }

    public get computedValue() {
        return { selected: this.selectedItems, selectedAll: this.selectedAll, selectedMore: this.selectedMore };
    }

    public set computedValue(items: any) {
        this.selectedAll = items.selectedAll;
        this.selectedMore = items.selectedMore;

        /**
         * Callback when selection is changed.
         * @property {Array} selectedItems
         */
        this.$emit('change', items);
    }

    public get itemsExist() {
        return this.$slots.default;
    }

    public get showEmptyState() {
        return this.$slots.emptyState && !this.itemsExist && !this.loading;
    }

    public get showEmptySearchState() {
        return !this.showEmptyState && !this.hideFilters && !this.itemsExist && !this.loading;
    }

    public onToggledAll(checked) {

        if (checked) {
            this.computedValue = { selectedAll: false, selectedMore: false };
        } else {
            this.computedValue = { ...this.computedValue, ...{ selectedAll: true } };
        }
    }

    public onSelectMore() {

        this.computedValue = { ...this.computedValue, ...{ selectedAll: true, selectedMore: !this.selectedMore } };
    }

    public onRemoveFilter(tag) {
        /**
         * Calls when filter removes
         * @property {String} tag
         */
        this.$emit('filter-removed', tag);
    }

    public onFilterInputChanged(value) {
        /**
         * Calls when filter is adding
         * @property {String} input-value
         */
        this.$emit('input-filter-changed', value);
    }

    public handleSelectMode(selectMode) {
        this.toggleSelectMode = selectMode;
        /**
         * Calls when selection is changed and component is responsive
         */
        this.$emit('select-mode', this.toggleSelectMode);
    }
}
</script>
