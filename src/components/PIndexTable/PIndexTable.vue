<template>
    <div class="Polaris-DataTable-Wrapper">
        <PFilter
            v-if="isSlot($slots.filterOptions) || hasFilter"
            v-bind="$attrs"
            :resourceName="resourceName"
            @remove-tag="onRemoveFilter"
            @input="onFilterInputChanged"
        >
            <!-- @slot Add filterOptions -->
            <slot name="filterOptions"/>
            <template #auxiliaryContainer>
                <!-- @slot Add auxiliary filters -->
                <slot name="auxiliaryContainer"/>
            </template>
        </PFilter>
        <div class="Polaris-IndexTable">
            <template v-if="!shouldShowBulkActions && !condensed && loading">
                <transition>
                    <div class="Polaris-IndexTable__LoadingPanel">
                        <div class="Polaris-IndexTable__LoadingPanelRow">
                            <PSpinner size="small"/>
                            <span class="Polaris-IndexTable__LoadingPanelText">
                            {{ `Loading ${resourceName.plural.toLocaleLowerCase()}...` }}
                        </span>
                        </div>
                    </div>
                </transition>
            </template>
            <template v-if="itemCount > 0">
                <template v-if="condensed">

                    <div
                        v-if="selectable"
                        :class="stickyTableClassName"
                        role="presentation"
                    >
                        <div
                            v-if="shouldShowBulkActions"
                            :class="bulkActionClassName"
                            :data-condensed="condensed"
                        >
                            <template v-if="!shouldShowBulkActions && !condensed && loading">
                                <transition>
                                    <div class="Polaris-IndexTable__LoadingPanel">
                                        <div class="Polaris-IndexTable__LoadingPanelRow">
                                            <PSpinner size="small"/>
                                            <span class="Polaris-IndexTable__LoadingPanelText">
                                            {{ `Loading ${resourceName.plural.toLocaleLowerCase()}...` }}
                                        </span>
                                        </div>
                                    </div>
                                </transition>
                            </template>
                            <PBulkActions
                                :smallScreen="condensed"
                                :label="`${selectedItemsCountLabel}${togglePlus} selected`"
                                :selected="selectMode"
                                :selectMode="selectMode || isSmallScreenSelectable"
                                @toggleAll="handleTogglePage"
                                :promotedActions="(!condensed || selectedRowsCount) ? promotedBulkActions : []"
                                :actions="((!condensed || selectedRowsCount) && bulkActions) ? bulkActions : []"
                                :paginatedSelectAllText="paginatedSelectAllText"
                                :paginatedSelectAllAction="paginatedSelectAction"
                                :indeterminate="!(selectedRowsCount === itemCount || selectedRowsCount === 'All')"
                                @selectModeToggle="condensed ? handleSelectModeToggle : undefined"
                            />
                        </div>
                        <div
                            v-else-if="condensed"
                            :class="headerMarkupClassName"
                        >
                            <template v-if="condensed && loading">
                                <transition>
                                    <div class="Polaris-IndexTable__LoadingPanel">
                                        <div class="Polaris-IndexTable__LoadingPanelRow">
                                            <PSpinner size="small"/>
                                            <span class="Polaris-IndexTable__LoadingPanelText">
                                            {{ `Loading ${resourceName.plural.toLocaleLowerCase()}...` }}
                                        </span>
                                        </div>
                                    </div>
                                </transition>
                            </template>
                            <!-- @slot Customize sort when condensed is true -->
                            <slot name="sort"/>
                            <PButton
                                v-if="selectable"
                                icon="EnableSelectionMinor"
                                @click="toggleIsSmallScreenSelectable"
                            >
                                Select
                            </PButton>
                        </div>
                        <div
                            v-else
                            :class="stickyHeaderClassName"
                            ref="stickyHeaderWrapperElement"
                        >
                            <template v-if="condensed && loading">
                                <transition>
                                    <div class="Polaris-IndexTable__LoadingPanel">
                                        <div class="Polaris-IndexTable__LoadingPanelRow">
                                            <PSpinner size="small"/>
                                            <span class="Polaris-IndexTable__LoadingPanelText">
                                            {{ `Loading ${resourceName.plural.toLocaleLowerCase()}...` }}
                                        </span>
                                        </div>
                                    </div>
                                </transition>
                            </template>
                            <div
                                :class="stickyColumnHeaderClassName"
                            >
                                <div
                                    class="Polaris-IndexTable__TableHeading"
                                    :key="headings[0].title"
                                    :style="stickyColumnHeaderStyle"
                                    data-index-table-sticky-heading
                                >
                                    <PStack
                                        spacing="none"
                                        :wrap="false"
                                        alignment="center"
                                    >
                                        <PStackItem v-if="selectable">
                                            <div
                                                class="Polaris-IndexTable-FirstStickyHeaderElement"
                                                ref="firstStickyHeaderElement"
                                            >
                                                <div
                                                    class="Polaris-IndexTable__ColumnHeaderCheckboxWrapper"
                                                >
                                                    <PCheckbox
                                                        :id="headings[0].title"
                                                        :label="`Select all ${resourceName.plural}`"
                                                        labelHidden
                                                        @change="handleSelectPage"
                                                        :checked="selectMode"
                                                    />
                                                </div>
                                            </div>
                                        </PStackItem>
                                        <PStackItem v-if="selectable">
                                            <div
                                                class="Polaris-IndexTable-StickyTableHeading-second-scrolling"
                                            >
                                                <PStack
                                                    v-if="headings[0].new"
                                                    :wrap="false"
                                                    alignment="false"
                                                >
                                                    <PStackItem>
                                                    <span>
                                                        {{ headings[0].title }}
                                                    </span>
                                                    </PStackItem>
                                                    <PStackItem>
                                                        <PBadge status="new">
                                                            new
                                                        </PBadge>
                                                    </PStackItem>
                                                </PStack>
                                                <span v-else-if="headings[0].hidden" class="Polaris-VisuallyHidden">
                                                {{ headings[0].title }}
                                            </span>
                                                <template v-else>
                                                    {{ headings[0].title }}
                                                </template>
                                            </div>
                                        </PStackItem>
                                        <PStackItem v-if="!selectable">
                                            <div
                                                class="Polaris-IndexTable-FirstStickyHeaderElement"
                                                ref="firstStickyHeaderElement"
                                            >
                                                <PStack
                                                    v-if="headings[0].new"
                                                    :wrap="false"
                                                    alignment="false"
                                                >
                                                    <PStackItem>
                                                    <span>
                                                        {{ headings[0].title }}
                                                    </span>
                                                    </PStackItem>
                                                    <PStackItem>
                                                        <PBadge status="new">
                                                            new
                                                        </PBadge>
                                                    </PStackItem>
                                                </PStack>
                                                <span v-else-if="headings[0].hidden" class="Polaris-VisuallyHidden">
                                                {{ headings[0].title }}
                                            </span>
                                                <template v-else>
                                                    {{ headings[0].title }}
                                                </template>
                                            </div>
                                        </PStackItem>
                                    </PStack>
                                </div>
                            </div>
                            <div
                                class="Polaris-IndexTable__StickyTableHeadings"
                                ref="stickyHeaderElement"
                            >
                                <template
                                    v-for="(heading, index) in headings"
                                    v-bind="{ key: heading.title }"
                                >
                                    <div
                                        :class="stickyHeadingClassName(index)"
                                        :style="headingStyle(index + 1)"
                                        v-bind="{}"
                                        data-index-table-sticky-heading
                                    >
                                        <PStack
                                            v-if="heading.new"
                                            :wrap="false"
                                            alignment="false"
                                        >
                                            <PStackItem>
                                            <span>
                                                {{ heading.title }}
                                            </span>
                                            </PStackItem>
                                            <PStackItem>
                                                <PBadge status="new">
                                                    new
                                                </PBadge>
                                            </PStackItem>
                                        </PStack>
                                        <span v-else-if="heading.hidden" class="Polaris-VisuallyHidden">
                                        {{ heading.title }}
                                    </span>
                                        <template v-else>
                                            {{ heading.title }}
                                        </template>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>

                    <ul
                        :data-selectmode="Boolean(selectMode || isSmallScreenSelectable)"
                        class="Polaris-IndexTable__CondensedList"
                        ref="condensedListElement"
                    >
                        <PIndexTableRow
                            v-for="(row, key) in rows"
                            :key="row.id"
                            :id="row.id"
                            :selected="selectedResources.includes(row)"
                            :position="key"
                            :selectable="selectable"
                            :status="row.status"
                            :condensed="condensed"
                            :selectMode="selectMode"
                            :clickable="clickableRow"
                            @navigation="handleNavigation(row)"
                            @selectionChange="handleSelectionChange"
                        >
                            <template
                                v-for="(heading, key) in headings"
                            >
                                <PIndexTableCell :lastChild="!!(lastColumnSticky && headings.length === key + 1)">
                                    <!-- @slot Customize a specific column. This slot provides row values.

Access values with `slot-props` attribute. -->
                                    <slot :name="`item.${heading.value}`" :item="row">
                                        {{ row[heading.value] }}
                                    </slot>
                                </PIndexTableCell>
                            </template>
                        </PIndexTableRow>
                    </ul>
                </template>
                <template v-else>

                    <div
                        v-if="selectable"
                        :class="stickyTableClassName"
                        role="presentation"
                    >
                        <div
                            v-if="shouldShowBulkActions"
                            :class="bulkActionClassName"
                            :data-condensed="condensed"
                        >
                            <template v-if="!shouldShowBulkActions && !condensed && loading">
                                <transition>
                                    <div class="Polaris-IndexTable__LoadingPanel">
                                        <div class="Polaris-IndexTable__LoadingPanelRow">
                                            <PSpinner size="small"/>
                                            <span class="Polaris-IndexTable__LoadingPanelText">
                                            {{ `Loading ${resourceName.plural.toLocaleLowerCase()}...` }}
                                        </span>
                                        </div>
                                    </div>
                                </transition>
                            </template>
                            <PBulkActions
                                :smallScreen="condensed"
                                :label="`${selectedItemsCountLabel}${togglePlus} selected`"
                                :selected="selectMode"
                                :selectMode="selectMode || isSmallScreenSelectable"
                                @toggleAll="handleTogglePage"
                                :promotedActions="(!condensed || selectedRowsCount) ? promotedBulkActions : []"
                                :actions="(!condensed || selectedRowsCount) ? bulkActions : []"
                                :paginatedSelectAllText="paginatedSelectAllText"
                                :paginatedSelectAllAction="paginatedSelectAction"
                                :indeterminate="!(selectedRowsCount === itemCount || selectedRowsCount === 'All')"
                                @selectModeToggle="condensed ? handleSelectModeToggle : undefined"
                            />
                        </div>
                        <div
                            v-else-if="condensed"
                            :class="headerMarkupClassName"
                        >
                            <template v-if="!shouldShowBulkActions && !condensed && loading">
                                <transition>
                                    <div class="Polaris-IndexTable__LoadingPanel">
                                        <div class="Polaris-IndexTable__LoadingPanelRow">
                                            <PSpinner size="small"/>
                                            <span class="Polaris-IndexTable__LoadingPanelText">
                                            {{ `Loading ${resourceName.plural.toLocaleLowerCase()}...` }}
                                        </span>
                                        </div>
                                    </div>
                                </transition>
                            </template>
                            <!-- @slot Customize sort when condensed is true -->
                            <slot name="sort"/>
                            <PButton
                                v-if="selectable"
                                icon="EnableSelectionMinor"
                                @click="toggleIsSmallScreenSelectable"
                            >
                                Select
                            </PButton>
                        </div>
                        <div
                            v-else
                            :class="stickyHeaderClassName"
                            ref="stickyHeaderWrapperElement"
                        >
                            <template v-if="!shouldShowBulkActions && !condensed && loading">
                                <transition>
                                    <div class="Polaris-IndexTable__LoadingPanel">
                                        <div class="Polaris-IndexTable__LoadingPanelRow">
                                            <PSpinner size="small"/>
                                            <span class="Polaris-IndexTable__LoadingPanelText">
                                            {{ `Loading ${resourceName.plural.toLocaleLowerCase()}...` }}
                                        </span>
                                        </div>
                                    </div>
                                </transition>
                            </template>
                            <div
                                :class="stickyColumnHeaderClassName"
                            >
                                <div
                                    class="Polaris-IndexTable__TableHeading"
                                    :key="headings[0].title"
                                    :style="stickyColumnHeaderStyle"
                                    data-index-table-sticky-heading
                                >
                                    <PStack
                                        spacing="none"
                                        :wrap="false"
                                        alignment="center"
                                    >
                                        <PStackItem v-if="selectable">
                                            <div
                                                class="Polaris-IndexTable-FirstStickyHeaderElement"
                                                ref="firstStickyHeaderElement"
                                            >
                                                <div
                                                    class="Polaris-IndexTable__ColumnHeaderCheckboxWrapper"
                                                >
                                                    <PCheckbox
                                                        :id="headings[0].title"
                                                        :label="`Select all ${resourceName.plural}`"
                                                        labelHidden
                                                        @change="handleSelectPage"
                                                        :checked="selectMode"
                                                    />
                                                </div>
                                            </div>
                                        </PStackItem>
                                        <PStackItem v-if="selectable">
                                            <div
                                                class="Polaris-IndexTable-StickyTableHeading-second-scrolling"
                                            >
                                                <PStack
                                                    v-if="headings[0].new"
                                                    :wrap="false"
                                                    alignment="false"
                                                >
                                                    <PStackItem>
                                                    <span>
                                                        {{ headings[0].title }}
                                                    </span>
                                                    </PStackItem>
                                                    <PStackItem>
                                                        <PBadge status="new">
                                                            new
                                                        </PBadge>
                                                    </PStackItem>
                                                </PStack>
                                                <span v-else-if="headings[0].hidden" class="Polaris-VisuallyHidden">
                                                {{ headings[0].title }}
                                            </span>
                                                <template v-else>
                                                    {{ headings[0].title }}
                                                </template>
                                            </div>
                                        </PStackItem>
                                        <PStackItem v-if="!selectable">
                                            <div
                                                class="Polaris-IndexTable-FirstStickyHeaderElement"
                                                ref="firstStickyHeaderElement"
                                            >
                                                <PStack
                                                    v-if="headings[0].new"
                                                    :wrap="false"
                                                    alignment="false"
                                                >
                                                    <PStackItem>
                                                    <span>
                                                        {{ headings[0].title }}
                                                    </span>
                                                    </PStackItem>
                                                    <PStackItem>
                                                        <PBadge status="new">
                                                            new
                                                        </PBadge>
                                                    </PStackItem>
                                                </PStack>
                                                <span v-else-if="headings[0].hidden" class="Polaris-VisuallyHidden">
                                                    {{ headings[0].title }}
                                                </span>
                                                <template v-else>
                                                    {{ headings[0].title }}
                                                </template>
                                            </div>
                                        </PStackItem>
                                    </PStack>
                                </div>
                            </div>
                            <div
                                class="Polaris-IndexTable__StickyTableHeadings"
                                ref="stickyHeaderElement"
                            >
                                <template
                                    v-for="(heading, index) in headings"
                                    :key="heading.title"
                                >
                                    <div
                                        :class="stickyHeadingClassName(index)"
                                        :style="headingStyle(index + 1)"

                                        data-index-table-sticky-heading
                                    >
                                        <PStack
                                            v-if="heading.new"
                                            :wrap="false"
                                            alignment="false"
                                        >
                                            <PStackItem>
                                            <span>
                                                {{ heading.title }}
                                            </span>
                                            </PStackItem>
                                            <PStackItem>
                                                <PBadge status="new">
                                                    new
                                                </PBadge>
                                            </PStackItem>
                                        </PStack>
                                        <span v-else-if="heading.hidden" class="Polaris-VisuallyHidden">
                                        {{ heading.title }}
                                    </span>
                                        <template v-else>
                                            {{ heading.title }}
                                        </template>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>


                    <table
                        ref="tableElement"
                        :class="tableClassName"
                    >
                        <thead>
                            <tr>
                                <template
                                    v-for="(heading, key) in headings"
                                >
                                    <th
                                        v-if="key === 0 && selectable"
                                        :class="checkboxClassName(key)"
                                        :key="`${heading}-${key}`"
                                        data-index-table-heading
                                    >
                                        <div
                                            class="Polaris-IndexTable__ColumnHeaderCheckboxWrapper"
                                        >
                                            <PCheckbox
                                                :id="key"
                                                :label="`Select all ${resourceName.plural}`"
                                                labelHidden
                                                @change="handleSelectPage"
                                                :checked="selectedRowsCount === itemCount || selectedRowsCount === 'All'"
                                                :indeterminate="!(selectedRowsCount === itemCount || selectedRowsCount === 0 || selectedRowsCount === 'All')"
                                            />
                                        </div>
                                    </th>
                                    <th
                                        v-if="key+1 !== 0 || !selectable"
                                        :class="headingContentClassName(heading, key)"
                                        :key="heading.title"
                                        data-index-table-heading
                                        :style="stickyPositioningStyle(key)"
                                    >
                                        <PStack
                                            v-if="heading.new"
                                            :wrap="false"
                                            alignment="false"
                                        >
                                            <PStackItem>
                                        <span>
                                            {{ heading.title }}
                                        </span>
                                            </PStackItem>
                                            <PStackItem>
                                                <PBadge status="new">
                                                    new
                                                </PBadge>
                                            </PStackItem>
                                        </PStack>
                                        <span v-else-if="heading.hidden" class="Polaris-VisuallyHidden">
                                        {{ heading.title }}
                                    </span>
                                        <template v-else>
                                            {{ heading.title }}
                                        </template>
                                    </th>
                                </template>
                            </tr>
                        </thead>
                        <tbody
                            ref="tableBodyRef"
                        >
                            <PIndexTableRow
                                v-for="(row, key) in rows"
                                :key="row.id"
                                :id="row.id"
                                :selected="selectedResources.includes(row)"
                                :position="key"
                                :selectable="selectable"
                                :status="row.status"
                                :selectMode="selectMode"
                                :clickable="clickableRow"
                                @navigation="handleNavigation(row)"
                                @selectionChange="handleSelectionChange"
                            >
                                <template
                                    v-for="(heading, key) in headings"
                                >
                                    <PIndexTableCell :lastChild="!!(lastColumnSticky && headings.length === key + 1)">
                                        <!-- @slot Customize a specific column. This slot provides row values.

Access values with `slot-props` attribute.-->
                                        <slot :name="`item.${heading.value}`" :item="row">
                                            {{ row[heading.value] }}
                                        </slot>
                                    </PIndexTableCell>
                                </template>
                            </PIndexTableRow>
                        </tbody>
                    </table>
                </template>
            </template>
            <template v-else>
                <div
                    class="Polaris-IndexTable__EmptySearchResultWrapper"
                >
                    <!-- @slot Customize empty state -->
                    <slot name="emptyState">
                        <PEmptySearchResult
                            :title="`No ${resourceName.plural} found`"
                            description="Try changing the filters or search term"
                            withIllustration
                        ></PEmptySearchResult>
                    </slot>
                </div>
            </template>
            <div class="Polaris-IndexTable__Pagination" v-if="Object.keys(pagination).length > 0">
                <!-- @slot Table Pagination -->
                <slot name="pagination" :pagination="pagination">
                    <PPagination v-bind="pagination"/>
                </slot>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
    import { hasSlot } from '../../ComponentHelpers';
    import { classNames } from '../../utilities/css';
    import { PSpinner } from '../../components/PSpinner';
    import { PButton } from '../../components/PButton';
    import { PEmptySearchResult } from '../../components/PEmptySearchResult';
    import { PStack } from '../../components/PStack';
    import { PStackItem } from '../../components/PStack/components/PStackItem';
    import { PCheckbox } from '../../components/PCheckbox';
    import { PBadge } from '../../components/PBadge';
    import { BulkActionsProps, IndexTableHeading } from './utilities';
    import { PBulkActions } from '../../components/PBulkActions';
    import { PIndexTableCell } from '../../components/PIndexTable/components/PIndexTableCell';
    import { PIndexTableRow } from '../../components/PIndexTable/components/PIndexTableRow';
    import { PFilter } from '../../components/PFilter';
    import { PPagination } from '../../components/PPagination';
    import ArrayValidator from '../../utilities/validators/ArrayValidator';

    const TableHeadingRect = {
        offsetWidth: {
            type: Number,
            required: true,
        },
        offsetLeft: {
            type: Number,
            required: true,
        },
    }

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">An index table displays a collection of objects of the same type, like orders or products. The main
     *  job of an index table is to help merchants get an at-a-glance of the objects to perform actions or navigate to a
     *  full-page representation of it.</h4>
     */
    let props = defineProps({
        /**
         * List of column headings.
         */
        headings: {
            type: Array,
            default: () => ([]),
            ...ArrayValidator('headings', IndexTableHeading),
        },
        /**
         * Lists of data points which map to table body rows.
         */
        rows: {
            type: Array,
            default: () => ([]),
        },
        /**
         * Bulk actions that will be given more prominence.
         */
        promotedBulkActions: {
            type: Array,
            default: () => ([]),
            ...ArrayValidator('promotedBulkActions', BulkActionsProps),
        },
        /**
         * Actions available on the currently selected items.
         */
        bulkActions: {
            type: Array,
            default: () => ([]),
            ...ArrayValidator('bulkActions', {actions: BulkActionsProps['actions']}),
        },
        /**
         * Name of the resource, such as customers or books.
         */
        resourceName: {
            type: Object,
            default: () => ({}),
        },
        /**
         * An index table with a sticky last column that stays visible on scroll.
         */
        lastColumnSticky: {
            type: Boolean,
            default: false,
        },
        /**
         * Selectable index table.
         */
        selectable: {
            type: Boolean,
            default: true,
        },
        /**
         * Switch mode to small screen.
         */
        condensed: {
            type: Boolean,
            default: false,
        },
        /**
         * Item list with a spinner while a background action is being performed.
         */
        loading: {
            type: Boolean,
            default: false,
        },
        /**
         * Whether or not there are more items than currently set on the items prop. Determines whether or not to set the
         * paginatedSelectAllAction and paginatedSelectAllText props on the BulkActions component.
         */
        hasMoreItems: {
            type: Boolean,
            default: false,
        },
        /**
         * Counts for the currently selected items.
         */
        selectedItemsCount: {
            type: [String, Number],
            default: null,
        },
        /**
         * Total number of items.
         */
        itemCount: {
            type: Number,
            default: 0,
        },
        /**
         * Clickable row.
         */
        clickableRow: {
            type: Boolean,
            default: true,
        },
        // Filter <-- Start -->
        /**
         * Display search filter.
         */
        hasFilter: {
            type: Boolean,
            default: false,
        },
        // Filter <-- End -->

        // Pagination <-- Start -->
        /**
         * Pagination object.
         */
        pagination: {
            type: Object,
            default: () => ({}),
        },
    });
    const emit = defineEmits(['selectionChange', 'navigation', 'filter-removed', 'input-filter-changed']);

    let tableHeadingRect = ref([
        {
            offsetWidth: Number,
            offsetLeft: Number,
        },
        {
            offsetWidth: Number,
            offsetLeft: Number,
        },
    ]);
    let bulkActionsSelectable = ref(Boolean(props.promotedBulkActions.length > 0 || props.bulkActions.length > 0));
    let isSmallScreenSelectable = ref(false);
    let selectMode = ref(false);
    let hasMoreLeftColumns = ref(false);
    let isSticky = ref(false);
    let selectedResources = ref([]);
    let selectedRowsCount = ref(selectedResources.value ? selectedResources.value.length : 0);
    let paginatedSelectAllText = ref('');
    let togglePlus = ref('');
    let paginatedSelectAction = ref(props.hasMoreItems ? {
        content: `Select all ${props.itemCount}+ ${props.resourceName.plural}`,
        onAction: handleSelectAllItemsInStore,
    } : {});
    let canScrollRight = ref(true);
    let tableInitialized = ref(false);

    let shouldShowBulkActions = computed(() => {
        return (bulkActionsSelectable.value && selectedRowsCount.value) || isSmallScreenSelectable.value;
    });

    let tableClassName = computed(() => {
        return classNames(
            'Polaris-IndexTable__Table',
            hasMoreLeftColumns.value && 'Polaris-IndexTable__Table--scrolling',
            selectMode.value && 'Polaris-IndexTable--disableTextSelection',
            selectMode.value && shouldShowBulkActions.value && 'Polaris-IndexTable--selectMode',
            !props.selectable && 'Table-unselectable',
            props.lastColumnSticky && 'Polaris-IndexTable--tableStickyLast',
            props.lastColumnSticky && canScrollRight.value && '',
        );
    });

    let stickyTableClassName = computed(() => {
        return classNames(
            'Polaris-IndexTable__StickyTable',
            props.condensed && 'Polaris-IndexTable__StickyTable--condensed',
        );
    });

    let stickyHeaderClassName = computed(() => {
        return classNames(
            'Polaris-IndexTable__StickyTableHeader',
            isSticky.value && 'Polaris-IndexTable__StickyTableHeader--isSticky',
        );
    });

    let bulkActionClassName = computed(() => {
        return classNames(
            'Polaris-IndexTable__BulkActionsWrapper',
            props.condensed && 'Polaris-IndexTable__StickyTableHeader--condensed',
            isSticky.value && 'Polaris-IndexTable__StickyTableHeader--isSticky',
        );
    });

    let headerMarkupClassName = computed(() => {
        return classNames(
            'Polaris-IndexTable__HeaderWrapper',
        );
    });

    let stickyColumnHeaderClassName = computed(() => {
        return classNames(
            'Polaris-IndexTable__StickyTableColumnHeader',
            hasMoreLeftColumns.value && 'Polaris-IndexTable__StickyTableColumnHeader--isScrolling',
        );
    });

    let selectedItemsCountLabel = computed(() => {
        return selectedRowsCount.value === 'All' ? `${props.itemCount}` : selectedRowsCount.value;
    });

    let stickyColumnHeaderStyle = computed(() => {
        return tableHeadingRect.value && tableHeadingRect.value.length > 0 ? {
            minWidth: calculateFirstHeaderOffset(),
        } : undefined;
    });

    let hasBulkActions = computed(() => {
        return Boolean(props.promotedBulkActions && props.promotedBulkActions.length > 0) || (props.bulkActions && props.bulkActions.length > 0);
    });

    let paginatedSelectAllAction = computed({
        get() {
            if (!props.selectable || !hasBulkActions.value || !props.hasMoreItems) {
                return;
            }

            const actionText = selectedRowsCount.value === 'All' ? 'Undo' : `Select all ${props.itemCount}+ ${props.resourceName.plural}`;

            paginatedSelectAction.value = {
                content: actionText,
                onAction: handleSelectAllItemsInStore,
            };

            return paginatedSelectAction.value;
        },
        set(value) {
            // this.$set(this, 'paginatedSelectAction', value);
            paginatedSelectAction = value;
        },
    });

    let isSlot = computed(() => {
        return hasSlot;
    });

    function isSmallScreen() {
        return typeof window === 'undefined' ? false : window.innerWidth < 458;
    }

    function calculateFirstHeaderOffset() {
        if (!props.selectable) {
            return tableHeadingRect.value[0].offsetWidth;
        }

        return props.condensed ? tableHeadingRect.value[0].offsetWidth : tableHeadingRect.value[0].offsetWidth + tableHeadingRect.value[1].offsetWidth;
    }

    function handleTogglePage() {
        if (selectedRowsCount.value === 0) {
            props.rows.map((row) => {
                selectedResources.value = [...selectedResources.value, row];
            });
            selectMode.value = true;
            selectedRowsCount.value = selectedResources.value.length;
            emitSelection('multiple', selectMode.value, selectedResources.value);
            return;
        } else if (selectedRowsCount.value !== props.itemCount) {
            selectedRowsCount.value = 0;
            selectedResources.value = [];
            props.rows.map((row) => {
                selectedResources.value = [...selectedResources.value, row];
            });
            selectMode.value = true;
            selectedRowsCount.value = selectedResources.value.length;
        } else {
            selectedRowsCount.value = 0;
            selectedResources.value = [];
            selectMode.value = false;
        }

        emitSelection('multiple', selectMode.value, selectedResources.value);
    }

    function handleSelectModeToggle(val) {
    }

    function toggleIsSmallScreenSelectable() {
        isSmallScreenSelectable.value = !isSmallScreenSelectable.value;
    }

    function handleSelectPage(checked) {
        if (!shouldShowBulkActions.value) {
            handleTogglePage();
            return;
        }

        if (props.hasMoreItems) {
            paginatedSelectAllAction.value = {
                content: `Select all ${props.itemCount}+ ${props.resourceName.plural}`,
                onAction: handleSelectAllItemsInStore,
            }
        }
        paginatedSelectAllText.value = '';
        togglePlus.value = '';

        if (checked['checked']) {
            props.rows.map((row) => {
                selectedResources.value = [...selectedResources.value, row];
            });
            selectedRowsCount.value = props.itemCount;
        } else {
            selectedResources.value = [];
        }

        selectMode.value = checked['checked'];
        emitSelection('multiple', checked['checked'], selectedResources.value);
    }

    function headingStyle(position) {
        return tableHeadingRect.value && tableHeadingRect.value.length > position ? { minWidth: tableHeadingRect.value[position].offsetWidth, } : undefined;
    }

    function stickyHeadingClassName(index) {
        return classNames(
            'Polaris-IndexTable__TableHeading',
            index === 0 && 'Polaris-IndexTable-StickyTableHeading-second',
            index === 0 && !props.selectable && 'unselectable',
        );
    }

    function headingContentClassName(heading, index) {
        const isSecond = index === 0;
        const isLast = index === props.headings.length - 1;

        return classNames(
            'Polaris-IndexTable__TableHeading',
            isSecond && 'Polaris-IndexTable-TableHeading-second',
            props.lastColumnSticky && isLast && !heading.hidden && 'Polaris-IndexTable__TableHeading--last',
            !props.selectable && 'TableHeading-unselectable',
        );
    }

    function stickyPositioningStyle(index) {
        return props.selectable && index === 0 && tableHeadingRect.value && tableHeadingRect.value.length > 0 ? {left: tableHeadingRect.value[0].offsetWidth} : undefined;
    }

    function checkboxClassName(index) {
        return classNames(
            'Polaris-IndexTable__TableHeading',
            index === 0 && 'Polaris-IndexTable__TableHeading--first',
        );
    }

    function handleSelectAllItemsInStore() {
        let actionText = '';
        if (paginatedSelectAction.value.content === 'Undo') {
            actionText = `Select all ${props.itemCount}+ ${props.resourceName.plural}`;
            paginatedSelectAllText.value = '';
            togglePlus.value = '';
        } else {
            selectedResources.value = [];
            selectedRowsCount.value = 0;
            togglePlus.value = '+';
            paginatedSelectAllText.value = `All ${props.itemCount}+ ${props.resourceName.plural} are selected.`;
            actionText = 'Undo';
            selectedRowsCount.value = 'All';
            props.rows.map((row) => {
                selectedResources.value = [...selectedResources.value, row];
            });
        }

        emitSelection('multiple', true, selectedResources.value);
        if (props.hasMoreItems) {
            paginatedSelectAllAction.value = {
                content: actionText,
                onAction: handleSelectAllItemsInStore,
            }
        }
    }

    function handleSelectionChange(selectionType, selected, id) {
        selectMode.value = true;

        const index = selectedResources.value.findIndex(x => x.id === id);
        const rowId = props.rows.findIndex(x => x['id'] === id);

        if (!selected) {
            if (props.hasMoreItems) {
                paginatedSelectAllAction.value = {
                    content: `Select all ${props.itemCount}+ ${props.resourceName.plural}`,
                    onAction: handleSelectAllItemsInStore,
                }
            }
            paginatedSelectAllText.value = '';
            togglePlus.value = '';
            if (index > -1) {
                selectedResources.value.splice(index, 1);
            }
        } else {
            if (props.condensed) {
                isSmallScreenSelectable.value = true;
            }
            selectedResources.value = [...selectedResources.value, props.rows[rowId]];
        }

        if (selectedResources.value.length === props.itemCount) {
            selectedRowsCount.value = props.itemCount;
        } else if (selectedResources.value.length === 0) {
            selectedRowsCount.value = 0;
            selectMode.value = false;
        } else {
            if (selectedResources.value.length === 1) {
                if (props.hasMoreItems) {
                    paginatedSelectAllAction.value = {
                        content: `Select all ${props.itemCount}+ ${props.resourceName.plural}`,
                        onAction: handleSelectAllItemsInStore,
                    }
                }
                paginatedSelectAllText.value = '';
                togglePlus.value = '';
            }
            selectedRowsCount.value = selectedResources.value.length;
        }

        emitSelection(selectionType, selected, selectedResources.value);
    }

    function emitSelection(selectionType, toggleType, selectedResources) {
        /**
         * Triggers when selection is changed
         */
        emit('selectionChange', selectionType, toggleType, selectedResources);
    }

    function handleNavigation(row) {
        /**
         * Perform action on row click.
         * Triggers when clickableRow is disabled.
         */
        emit('navigation', row);
    }

    // Filter <-- Start -->
    function onRemoveFilter(tag) {
        /**
         * Removes filter tag
         */
        emit('filter-removed', tag);
    }

    function onFilterInputChanged(value) {
        /**
         * Works on keypress
         */
        emit('input-filter-changed', value);
    }
    // Filter <-- End -->

    watch(() => props.condensed, () => {
        isSmallScreenSelectable.value = false;
        selectedResources.value = [];
        selectedRowsCount.value = 0;
        selectMode.value = false;
        paginatedSelectAllText.value = '';
    });

    watch(() => props.selectedItemsCount, (value) => {
        selectedResources.value = [];
        selectedRowsCount.value = 0;
        selectMode.value = true;

        if (value <= 0) {
            selectMode.value = false;
            return;
        }

        if (value > props.itemCount) {
            props.rows.map((row) => {
                selectedResources.value = [...selectedResources.value, row];
            });
            selectedRowsCount.value = 'All';
            emitSelection('multiple', selectMode.value, selectedResources.value);
        } else {
            for (let i = 0; i < value; i++) {
                selectedResources.value = [...selectedResources.value, props.rows[i]];
            }
            selectedRowsCount.value = value;
            emitSelection('single', selectMode.value, selectedResources.value);
        }
    });

    onMounted(() => {
        window.addEventListener('resize', isSmallScreen);
        isSmallScreen();
    });

    onUnmounted(() => {
        window.removeEventListener('resize', isSmallScreen);
    });
</script>
