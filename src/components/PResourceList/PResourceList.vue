<template>
    <div :class="className">
        <div class="Polaris-ResourceList__FiltersWrapper" v-if="!hideFilters">
            <PFilter
                v-if="$slots.filter"
                v-bind="$attrs"
                :resourceName="resourceName"
                @remove-tag="onRemoveFilter"
                @input="onFilterInputChanged"
            >
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
                v-on="listeners"
                @toggle-all="onToggledAll($event)"
                @toggle-select-more="onSelectMore"
                @handle-selection-mode="handleSelectMode"
            />
        </div>
        <ul
            v-if="$slots.default"
            :class="resourceListClassName"
            ref="listRef"
            aria-live="polite"
            :aria-busy="loading"
        >
            <template v-if="loading">
                <li class="Polaris-ResourceList__SpinnerContainer" :style="{'padding-top': `${topPadding}px`}">
                    <PSpinner size="large"/>
                </li>
                <li class="Polaris-ResourceList__LoadingOverlay"/>
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
                            <PIcon source="SearchMajor"/>
                        </PStackItem>
                        <PStackItem>
                            <PDisplayText size="small">
                                No {{ resourceName.plural }} found
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
                <li class="Polaris-ResourceList__LoadingOverlay"/>
            </ul>
        </div>
    </div>
</template>

<script>
    import utils from '../../utilities';
    import { classNames } from '../../utilities/css';
    import { PIcon } from '../../components/PIcon';
    import { PFilter } from '../../components/PFilter';
    import { PSpinner } from '../../components/PSpinner';
    import { PStack } from '../../components/PStack';
    import { PStackItem } from '../../components/PStack/components/PStackItem';
    import { PDisplayText } from '../../components/PDisplayText';
    import { PTextStyle } from '../../components/PTextStyle';
    import { PResourceListHeader } from '../../components/PResourceList/components/PResourceListHeader';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">A resource list displays a collection of objects of the same type, like products or customers. The main
     *  job of a resource list is to help merchants find an object and navigate to a full-page representation of it.</h4>
     */
    export default {
        name: 'PResourceList',
        components: {
            PFilter, PResourceListHeader, PIcon, PSpinner, PStack, PStackItem, PDisplayText, PTextStyle,
        },
        props: {
            /**
             * Renders a Select All button at the top
             * of the list and checkboxes in front of each list item.
             */
            selectable: {
                type: Boolean,
                default: false,
            },
            /**
             * Get the value of the selected items in array.
             */
            selected: {
                type: Array,
                default: () => ([]),
            },
            /**
             * Whether or not there are more items than currently set
             * on the items prop.
             */
            hasMore: {
                type: Boolean,
                default: false,
            },
            /**
             * Overlays item list with a spinner while a
             * background action is being performed.
             */
            loading: {
                type: Boolean,
                default: false,
            },
            /**
             * Name of the resource, such as customers or books.
             */
            resourceName: {
                type: Object,
                required: true,
            },
            /**
             * Boolean to show or hide the header.
             */
            showHeader: {
                type: Boolean,
                default: true,
            },
            /**
             * Boolean to show or hide the filters.
             */
            hideFilters: {
                type: Boolean,
                default: false,
            },
            /**
             * Collection of sort options to choose from.
             */
            sortOptions: {
                type: [Array, String],
                default: null,
            },
            /**
             * Bulk actions that will be given more prominence.
             */
            promotedBulkActions: {
                type: [Object, Array],
            },
            /**
             * Actions available on the currently selected items.
             */
            bulkActions: {
                type: Array,
            },
        },
        emits: ['change', 'filter-removed', 'input-filter-changed', 'select-mode'],
        data() {
            return {
                selectedItems: this.selectable && this.selected ? this.selected : [],
                selectedMore: false,
                selectedAll: false,
                toggleSelectMode: false,
                topPadding: 8,
            };
        },
        computed: {
            className() {
                return classNames(
                    'Polaris-ResourceList__ResourceListWrapper',
                );
            },
            resourceListClassName() {
                return classNames(
                    'Polaris-ResourceList',
                    this.loading && 'Polaris-ResourceList__DisabledPointerEvents',
                    this.selectedItems.length > 0 && 'Polaris-ResourceList--disableTextSelection',
                );
            },
            loadingClassName() {
                return classNames(
                    'Polaris-ResourceList__ItemWrapper',
                    this.loading && 'Polaris-ResourceList__ItemWrapper--isLoading',
                );
            },
            checkedAll() {
                return this.checked && this.count() === this.checkedCount;
            },
            checked() {
                return this.selectable && this.checkedCount > 0;
            },
            resourceTitle() {
                const resourceName = this.resourceName;
                return this.count() > 1 ? resourceName.plural : resourceName.singular;
            },
            checkedCount() {
                return this.selectable ? this.selected.length : 0;
            },
            computedValue: {
                get() {
                    return {
                        selected: this.selectedItems,
                        selectedAll: this.selectedAll,
                        selectedMore: this.selectedMore
                    };
                },
                set(items) {
                    this.selectedAll = items.selectedAll;
                    this.selectedMore = items.selectedMore;

                    /**
                     * Callback when selection is changed
                     */
                    this.$emit('change', items);
                },
            },
            itemsExist() {
                return utils.isVue3 ? this.$slots.default() : this.$slots.default;
            },
            showEmptyState() {
                return this.$slots.emptyState && !this.itemsExist && !this.loading;
            },
            showEmptySearchState() {
                return !this.showEmptyState && !this.hideFilters && !this.itemsExist && !this.loading;
            },
        },
        methods: {
            count() {
                if (utils.isVue3) {
                    if (typeof this.$slots !== 'undefined'
                        && typeof this.$slots.default() === 'function'
                        && this.$slots.default({})) {
                        const slots = this.$slots.default({});
                        return slots ? slots.filter((vNode) => vNode.tag !== undefined).length : 0;
                    }
                    if (this.$slots.default()) {
                        let count = 0;
                        this.$slots.default().forEach((node) => {
                            node?.children.forEach(vNode => {
                                if (vNode.type && vNode.type.name === 'PResourceListItem') {
                                  count++;
                                }
                            });
                        });
                      return count;
                    }
                } else {
                    if (typeof this.$scopedSlots !== 'undefined'
                        && typeof this.$scopedSlots.default === 'function'
                        && this.$scopedSlots.default({})) {
                        const slots = this.$scopedSlots.default({});
                        return slots ? slots.filter((vNode) => vNode.tag !== undefined).length : 0;
                    }
                    if (this.$slots.default) {
                        return this.$slots.default.filter((vNode) => {
                            return vNode.tag !== undefined;
                        }).length;
                    }
                }

                return 0;
            },
            onToggledAll(checked) {
                if (checked) {
                    this.computedValue = {selectedAll: false, selectedMore: false};
                } else {
                    this.computedValue = {...this.computedValue, ...{selectedAll: true}};
                }
            },
            onSelectMore() {
                this.computedValue = {...this.computedValue, ...{selectedAll: true, selectedMore: !this.selectedMore}};
            },
            onRemoveFilter(tag) {
                /**
                 * Calls when filter removes
                 */
                this.$emit('filter-removed', tag);
            },
            onFilterInputChanged(value) {
                /**
                 * Calls when filter is adding
                 */
                this.$emit('input-filter-changed', value);
            },
            handleSelectMode(selectMode) {
                this.toggleSelectMode = selectMode;
                /**
                 * Calls when selection is changed and component is responsive
                 */
                this.$emit('select-mode', this.toggleSelectMode);
            },
            listeners() {
                if (utils.isVue2) {
                    return this.$listeners;
                }
            },
        },
        mounted() {
            let loadingPosition = 0;

            if (typeof window !== 'undefined' && this.$refs.hasOwnProperty('PResourceListHeader')) {
                const overlay = (this.$refs.PResourceListHeader).getBoundingClientRect();
                const viewportHeight = Math.max(document.documentElement ?
                    document.documentElement.clientHeight : 0, window.innerHeight || 0);
                const overflow = viewportHeight - overlay.height;
                const spinnerHeight = 45;
                loadingPosition = overflow > 0 ? (overlay.height - spinnerHeight) / 2 :
                    (viewportHeight - overlay.top - spinnerHeight) / 2;
                loadingPosition = loadingPosition +
                    (this.$refs.PResourceListHeader).getBoundingClientRect().height;
                this.topPadding = loadingPosition > 0 ? loadingPosition : this.topPadding;
            }
        },
    }
</script>
