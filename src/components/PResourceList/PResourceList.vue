<template>
    <div :class="className">
        <div class="Polaris-ResourceList__FiltersWrapper" v-if="!hideFilters">
            <PFilter
                v-if="isSlot($slots.filter)"
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
            ref="PResourceListHeaderRef"
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

<script setup>
    import { hasSlot } from '../../ComponentHelpers';
    import { classNames } from '../../utilities/css';
    import { PIcon } from '../../components/PIcon';
    import { PFilter } from '../../components/PFilter';
    import { PSpinner } from '../../components/PSpinner';
    import { PStack } from '../../components/PStack';
    import { PStackItem } from '../../components/PStack/components/PStackItem';
    import { PDisplayText } from '../../components/PDisplayText';
    import { PTextStyle } from '../../components/PTextStyle';
    import { PResourceListHeader } from '../../components/PResourceList/components/PResourceListHeader';
    import {computed, onMounted, ref, useSlots} from "vue";

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">A resource list displays a collection of objects of the same type, like products or customers. The main
     *  job of a resource list is to help merchants find an object and navigate to a full-page representation of it.</h4>
     */
    let props = defineProps({
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
    });
    const emit = defineEmits(['change', 'filter-removed', 'input-filter-changed', 'select-mode']);
    let slots = useSlots();

    let selectedItems = ref(props.selectable && props.selected ? props.selected : []);
    let selectedMore = ref(false);
    let selectedAll = ref(false);
    let toggleSelectMode = ref(false);
    let topPadding = ref(8);
    let PResourceListHeaderRef = ref(null);

    let className = computed(() => {
        return classNames(
            'Polaris-ResourceList__ResourceListWrapper',
        );
    });

    let resourceListClassName = computed(() => {
        return classNames(
            'Polaris-ResourceList',
            props.loading && 'Polaris-ResourceList__DisabledPointerEvents',
            selectedItems.value.length > 0 && 'Polaris-ResourceList--disableTextSelection',
        );
    });

    let loadingClassName = computed(() => {
        return classNames(
            'Polaris-ResourceList__ItemWrapper',
            props.loading && 'Polaris-ResourceList__ItemWrapper--isLoading',
        );
    });

    let checkedCount = computed(() => {
        return props.selectable ? props.selected.length : 0;
    });

    let checked = computed(() => {
        return props.selectable && checkedCount.value > 0;
    });

    let checkedAll = computed(() => {
        return checked.value && count() === checkedCount.value;
    });

    let resourceTitle = computed(() => {
        const resourceName = props.resourceName;
        return count() > 1 ? resourceName.plural : resourceName.singular;
    });

    let computedValue = computed({
        get() {
            return {
                selected: selectedItems.value,
                selectedAll: selectedAll.value,
                selectedMore: selectedMore.value
            };
        },
        set(items) {
            selectedAll.value = items.selectedAll;
            selectedMore.value = items.selectedMore;

            /**
             * Callback when selection is changed
             */
            emit('change', items);
        },
    });

    let itemsExist = computed(() => {
        return slots.default && slots.default();
    });

    let showEmptyState = computed(() => {
        return slots.emptyState && !itemsExist.value && !props.loading;
    });

    let showEmptySearchState = computed(() => {
        return !showEmptyState.value && !props.hideFilters && !itemsExist.value && !props.loading;
    });

    let listeners = computed(() => {
        return {};
    });

    let isSlot = computed(() => {
        return hasSlot;
    });

    function count() {
        if (typeof slots !== 'undefined'
            && typeof slots.default() === 'function'
            && slots.default({})) {
            const isDefaultSlots = slots.default({});
            return isDefaultSlots ? isDefaultSlots.filter((vNode) => vNode.tag !== undefined).length : 0;
        }
        if (slots.default()) {
            let count = 0;
            slots.default().forEach((node) => {
                node?.children.forEach(vNode => {
                    if (vNode.type && vNode.type.name === 'PResourceListItem') {
                        count++;
                    }
                });
            });
            return count;
        }
        return 0;
    }

    function onToggledAll(checked) {
        if (checked) {
            computedValue.value = {selectedAll: false, selectedMore: false};
        } else {
            computedValue.value = {...computedValue.value, ...{selectedAll: true}};
        }
    }

    function onSelectMore() {
        computedValue.value = {...computedValue.value, ...{selectedAll: true, selectedMore: !selectedMore.value}};
    }

    function onRemoveFilter(tag) {
        /**
         * Calls when filter removes
         */
        emit('filter-removed', tag);
    }

    function onFilterInputChanged(value) {
        /**
         * Calls when filter is adding
         */
        emit('input-filter-changed', value);
    }

    function handleSelectMode(selectMode) {
        toggleSelectMode.value = selectMode;
        /**
         * Calls when selection is changed and component is responsive
         */
        emit('select-mode', toggleSelectMode.value);
    }

    onMounted(() => {
        PResourceListHeaderRef = PResourceListHeaderRef.value;
        let loadingPosition = 0;

        if (typeof window !== 'undefined' && PResourceListHeaderRef) {
            const overlay = (PResourceListHeaderRef).getBoundingClientRect();
            const viewportHeight = Math.max(document.documentElement ?
                document.documentElement.clientHeight : 0, window.innerHeight || 0);
            const overflow = viewportHeight - overlay.height;
            const spinnerHeight = 45;
            loadingPosition = overflow > 0 ? (overlay.height - spinnerHeight) / 2 :
                (viewportHeight - overlay.top - spinnerHeight) / 2;
            loadingPosition = loadingPosition +
                (PResourceListHeaderRef).getBoundingClientRect().height;
            topPadding.value = loadingPosition > 0 ? loadingPosition : topPadding.value;
        }
    });
</script>
