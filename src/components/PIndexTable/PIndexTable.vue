<template>
    <div>
        <div>
            <PFilter
                v-if="$slots.hasOwnProperty('filterOptions') || hasFilter"
                v-bind="$attrs"
                :resourceName="resourceName"
                @remove-tag="onRemoveFilter"
                @input="onFilterInputChanged"
            >
                <!-- @slot Add filterOptions -->
                <slot name="filterOptions"/>
                <template slot="auxiliaryContainer">
                    <!-- @slot Add auxiliary filters -->
                    <slot name="auxiliaryContainer"/>
                </template>
            </PFilter>
        </div>
        <div class="Polaris-IndexTable">
            <template v-if="!shouldShowBulkActions && !condensed && loading">
                <transition>
                    <div class="Polaris-IndexTable__LoadingPanel">
                        <div class="Polaris-IndexTable__LoadingPanelRow">
                            <PSpinner size="small"/>
                            <span class="Polaris-IndexTable__LoadingPanelText">
                            {{ `Loading ${this.resourceName.plural.toLocaleLowerCase()}...` }}
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
                                            {{ `Loading ${this.resourceName.plural.toLocaleLowerCase()}...` }}
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
                                            {{ `Loading ${this.resourceName.plural.toLocaleLowerCase()}...` }}
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
                                            {{ `Loading ${this.resourceName.plural.toLocaleLowerCase()}...` }}
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
                                    v-bind="utils.isVue3 ? { key: heading.title } : {}"
                                >
                                    <div
                                        :class="stickyHeadingClassName(index)"
                                        :style="headingStyle(index + 1)"
                                        v-bind="utils.isVue2 ? { key: heading.title } : {}"
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
                                            {{ `Loading ${this.resourceName.plural.toLocaleLowerCase()}...` }}
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
                                            {{ `Loading ${this.resourceName.plural.toLocaleLowerCase()}...` }}
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
                                            {{ `Loading ${this.resourceName.plural.toLocaleLowerCase()}...` }}
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
                <PPagination v-bind="pagination"/>
            </div>
        </div>
    </div>
</template>

<script>
    import utils from '../../utilities';
    import { classNames } from '../../utilities/css';
    import { PSpinner } from '../../components/PSpinner';
    import { PButton } from '../../components/PButton';
    import { PEmptySearchResult } from '../../components/PEmptySearchResult';
    import { PStack } from '../../components/PStack';
    import { PStackItem } from '../../components/PStack/components/PStackItem';
    import { PCheckbox } from '../../components/PCheckbox';
    import { PBadge } from '../../components/PBadge';
    import { BulkActionsProps, IndexTableHeading } from '../../components/PIndexTable/utilities';
    import { PBulkActions } from '../../components/PBulkActions';
    import { PIndexTableCell } from '../../components/PIndexTable/components/PIndexTableCell';
    import { PIndexTableRow } from '../../components/PIndexTable/components/PIndexTableRow';
    import { PTextStyle } from '../../components/PTextStyle';
    import { PFilter } from '../../components/PFilter';
    import { PPagination, PPaginationDescriptor } from '../../components/PPagination';
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
    export default {
        name: 'PIndexTable',
        components: {
            PBulkActions, PEmptySearchResult, PSpinner, PButton, PStack, PStackItem, PCheckbox, PBadge, PIndexTableRow,
            PIndexTableCell, PTextStyle, PFilter, PPagination,
        },
        props: {
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
            // Pagination <-- End -->
        },
        data() {
            return {
                tableHeadingRect: [
                    {
                        offsetWidth: Number,
                        offsetLeft: Number,
                    },
                    {
                        offsetWidth: Number,
                        offsetLeft: Number,
                    },
                ],
                bulkActionsSelectable: Boolean(this.promotedBulkActions.length > 0 || this.bulkActions.length > 0),
                isSmallScreenSelectable: false,
                selectMode: false,
                hasMoreLeftColumns: false,
                isSticky: false,
                selectedResources: [],
                selectedRowsCount: this.selectedResources ? this.selectedResources.length : 0,
                paginatedSelectAllText: '',
                togglePlus: '',
                paginatedSelectAction: this.hasMoreItems ? {
                    content: `Select all ${this.itemCount}+ ${this.resourceName.plural}`,
                    onAction: this.handleSelectAllItemsInStore,
                } : {},
                canScrollRight: true,
                tableInitialized: false,
            };
        },
        computed: {
            tableClassName() {
                return classNames(
                    'Polaris-IndexTable__Table',
                    this.hasMoreLeftColumns && 'Polaris-IndexTable__Table--scrolling',
                    this.selectMode && 'Polaris-IndexTable--disableTextSelection',
                    this.selectMode && this.shouldShowBulkActions && 'Polaris-IndexTable--selectMode',
                    !this.selectable && 'Table-unselectable',
                    this.lastColumnSticky && 'Polaris-IndexTable--tableStickyLast',
                    this.lastColumnSticky && this.canScrollRight && '',
                );
            },
            stickyTableClassName() {
                return classNames(
                    'Polaris-IndexTable__StickyTable',
                    this.condensed && 'Polaris-IndexTable__StickyTable--condensed',
                );
            },
            stickyHeaderClassName() {
                return classNames(
                    'Polaris-IndexTable__StickyTableHeader',
                    this.isSticky && 'Polaris-IndexTable__StickyTableHeader--isSticky',
                );
            },
            bulkActionClassName() {
                return classNames(
                    'Polaris-IndexTable__BulkActionsWrapper',
                    this.condensed && 'Polaris-IndexTable__StickyTableHeader--condensed',
                    this.isSticky && 'Polaris-IndexTable__StickyTableHeader--isSticky',
                );
            },
            headerMarkupClassName() {
                return classNames(
                    'Polaris-IndexTable__HeaderWrapper',
                );
            },
            stickyColumnHeaderClassName() {
                return classNames(
                    'Polaris-IndexTable__StickyTableColumnHeader',
                    this.hasMoreLeftColumns && 'Polaris-IndexTable__StickyTableColumnHeader--isScrolling',
                );
            },
            shouldShowBulkActions() {
                return (this.bulkActionsSelectable && this.selectedRowsCount) || this.isSmallScreenSelectable;
            },
            selectedItemsCountLabel() {
                return this.selectedRowsCount === 'All' ? `${this.itemCount}` : this.selectedRowsCount;
            },
            stickyColumnHeaderStyle() {
                return this.tableHeadingRect && this.tableHeadingRect.length > 0 ? {
                    minWidth: this.calculateFirstHeaderOffset(),
                } : undefined;
            },
            hasBulkActions() {
                return Boolean(this.promotedBulkActions && this.promotedBulkActions.length > 0) ||
                    (this.bulkActions && this.bulkActions.length > 0);
            },
            paginatedSelectAllAction: {
                get() {
                    if (!this.selectable || !this.hasBulkActions || !this.hasMoreItems) {
                        return;
                    }

                    const actionText = this.selectedRowsCount === 'All'
                        ? 'Undo' : `Select all ${this.itemCount}+ ${this.resourceName.plural}`;

                    this.paginatedSelectAction = {
                        content: actionText,
                        onAction: this.handleSelectAllItemsInStore,
                    };

                    return this.paginatedSelectAction;
                },
                set(value) {
                    if (utils.isVue3) {
                        this.paginatedSelectAction = value;
                    } else {
                        this.$set(this, 'paginatedSelectAction', value);
                    }
                },
            }
        },
        methods: {
            isSmallScreen() {
                return typeof window === 'undefined' ? false : window.innerWidth < 458;
            },
            calculateFirstHeaderOffset() {
                if (!this.selectable) {
                    return this.tableHeadingRect[0].offsetWidth;
                }

                return this.condensed
                    ? this.tableHeadingRect[0].offsetWidth
                    : this.tableHeadingRect[0].offsetWidth + this.tableHeadingRect[1].offsetWidth;
            },
            handleTogglePage() {
                if (this.selectedRowsCount === 0) {
                    this.rows.map((row) => {
                        this.selectedResources = [...this.selectedResources, row];
                    });
                    this.selectMode = true;
                    this.selectedRowsCount = this.selectedResources.length;
                    this.emitSelection('multiple', this.selectMode, this.selectedResources);
                    return;
                } else if (this.selectedRowsCount !== this.itemCount) {
                    this.selectedRowsCount = 0;
                    this.selectedResources = [];
                    this.rows.map((row) => {
                        this.selectedResources = [...this.selectedResources, row];
                    });
                    this.selectMode = true;
                    this.selectedRowsCount = this.selectedResources.length;
                } else {
                    this.selectedRowsCount = 0;
                    this.selectedResources = [];
                    this.selectMode = false;
                }

                this.emitSelection('multiple', this.selectMode, this.selectedResources);
            },
            handleSelectModeToggle(val) {
            },
            toggleIsSmallScreenSelectable() {
                this.isSmallScreenSelectable = !this.isSmallScreenSelectable;
            },
            handleSelectPage(checked) {
                if (!this.shouldShowBulkActions) {
                    this.handleTogglePage();
                    return;
                }

                if (this.hasMoreItems) {
                    if (utils.isVue3) {
                        this.paginatedSelectAllAction = {
                            content: `Select all ${this.itemCount}+ ${this.resourceName.plural}`,
                            onAction: this.handleSelectAllItemsInStore,
                        }
                    } else {
                        this.$set(this, 'paginatedSelectAllAction', {
                            content: `Select all ${this.itemCount}+ ${this.resourceName.plural}`,
                            onAction: this.handleSelectAllItemsInStore,
                        });
                    }
                }
                this.paginatedSelectAllText = '';
                this.togglePlus = '';

                if (checked['checked']) {
                    this.rows.map((row) => {
                        this.selectedResources = [...this.selectedResources, row];
                    });
                    this.selectedRowsCount = this.itemCount;
                } else {
                    this.selectedResources = [];
                }

                this.selectMode = checked['checked'];
                this.emitSelection('multiple', checked['checked'], this.selectedResources);
            },
            headingStyle(position) {
                return this.tableHeadingRect && this.tableHeadingRect.length > position
                    ? {
                        minWidth: this.tableHeadingRect[position].offsetWidth,
                    } : undefined;
            },
            stickyHeadingClassName(index) {
                return classNames(
                    'Polaris-IndexTable__TableHeading',
                    index === 0 && 'Polaris-IndexTable-StickyTableHeading-second',
                    index === 0 && !this.selectable && 'unselectable',
                );
            },
            headingContentClassName(heading, index) {
                const isSecond = index === 0;
                const isLast = index === this.headings.length - 1;

                return classNames(
                    'Polaris-IndexTable__TableHeading',
                    isSecond && 'Polaris-IndexTable-TableHeading-second',
                    this.lastColumnSticky && isLast && !heading.hidden && 'Polaris-IndexTable__TableHeading--last',
                    !this.selectable && 'TableHeading-unselectable',
                );
            },
            stickyPositioningStyle(index) {
                return this.selectable && index === 0 && this.tableHeadingRect && this.tableHeadingRect.length > 0
                    ? {left: this.tableHeadingRect[0].offsetWidth} : undefined;
            },
            checkboxClassName(index) {
                return classNames(
                    'Polaris-IndexTable__TableHeading',
                    index === 0 && 'Polaris-IndexTable__TableHeading--first',
                );
            },
            handleSelectAllItemsInStore() {
                let actionText = '';
                if (this.paginatedSelectAction.content === 'Undo') {
                    actionText = `Select all ${this.itemCount}+ ${this.resourceName.plural}`;
                    this.paginatedSelectAllText = '';
                    this.togglePlus = '';
                } else {
                    this.selectedResources = [];
                    this.selectedRowsCount = 0;
                    this.togglePlus = '+';
                    this.paginatedSelectAllText = `All ${this.itemCount}+ ${this.resourceName.plural} are selected.`;
                    actionText = 'Undo';
                    this.selectedRowsCount = 'All';
                    this.rows.map((row) => {
                        this.selectedResources = [...this.selectedResources, row];
                    });
                }

                this.emitSelection('multiple', true, this.selectedResources);
                if (this.hasMoreItems) {
                    if (utils.isVue3) {
                        this.paginatedSelectAllAction = {
                            content: actionText,
                            onAction: this.handleSelectAllItemsInStore,
                        }
                    } else {
                        this.$set(this, 'paginatedSelectAllAction', {
                            content: actionText,
                            onAction: this.handleSelectAllItemsInStore,
                        });
                    }
                }
            },
            handleSelectionChange(selectionType, selected, id) {
                this.selectMode = true;

                const index = this.selectedResources.findIndex(x => x.id === id);
                const rowId = this.rows.findIndex(x => x['id'] === id);

                if (!selected) {
                    if (this.hasMoreItems) {
                        if (utils.isVue3) {
                            this.paginatedSelectAllAction = {
                                content: `Select all ${this.itemCount}+ ${this.resourceName.plural}`,
                                onAction: this.handleSelectAllItemsInStore,
                            }
                        } else {
                            this.$set(this, 'paginatedSelectAllAction', {
                                content: `Select all ${this.itemCount}+ ${this.resourceName.plural}`,
                                onAction: this.handleSelectAllItemsInStore,
                            });
                        }
                    }
                    this.paginatedSelectAllText = '';
                    this.togglePlus = '';
                    if (index > -1) {
                        this.selectedResources.splice(index, 1);
                    }
                } else {
                    if (this.condensed) {
                        this.isSmallScreenSelectable = true;
                    }
                    this.selectedResources = [...this.selectedResources, this.rows[rowId]];
                }

                if (this.selectedResources.length === this.itemCount) {
                    this.selectedRowsCount = this.itemCount;
                } else if (this.selectedResources.length === 0) {
                    this.selectedRowsCount = 0;
                    this.selectMode = false;
                } else {
                    if (this.selectedResources.length === 1) {
                        if (this.hasMoreItems) {
                            if (utils.isVue3) {
                                this.paginatedSelectAllAction = {
                                    content: `Select all ${this.itemCount}+ ${this.resourceName.plural}`,
                                    onAction: this.handleSelectAllItemsInStore,
                                }
                            } else {
                                this.$set(this, 'paginatedSelectAllAction', {
                                    content: `Select all ${this.itemCount}+ ${this.resourceName.plural}`,
                                    onAction: this.handleSelectAllItemsInStore,
                                });
                            }
                        }
                        this.paginatedSelectAllText = '';
                        this.togglePlus = '';
                    }
                    this.selectedRowsCount = this.selectedResources.length;
                }

                this.emitSelection(selectionType, selected, this.selectedResources);
            },
            emitSelection(selectionType, toggleType, selectedResources) {
                /**
                 * Triggers when selection is changed
                 */
                this.$emit('selectionChange', selectionType, toggleType, selectedResources);
            },
            handleNavigation(row) {
                /**
                 * Perform action on row click.
                 * Triggers when clickableRow is disabled.
                 */
                this.$emit('navigation', row);
            },
            // Filter <-- Start -->
            onRemoveFilter(tag) {
                /**
                 * Removes filter tag
                 */
                this.$emit('filter-removed', tag);
            },
            onFilterInputChanged(value) {
                /**
                 * Works on keypress
                 */
                this.$emit('input-filter-changed', value);
            },
            // Filter <-- End -->
        },
        watch: {
            condensed(value, oldValue) {
                this.isSmallScreenSelectable = false;
                this.selectedResources = [];
                this.selectedRowsCount = 0;
                this.selectMode = false;
                this.paginatedSelectAllText = '';
            },
            selectedItemsCount(value, oldValue) {
                this.selectedResources = [];
                this.selectedRowsCount = 0;
                this.selectMode = true;

                if (value <= 0) {
                    this.selectMode = false;
                    return;
                }

                if (value > this.itemCount) {
                    this.rows.map((row) => {
                        this.selectedResources = [...this.selectedResources, row];
                    });
                    this.selectedRowsCount = 'All';
                    this.emitSelection('multiple', this.selectMode, this.selectedResources);
                } else {
                    for (let i = 0; i < value; i++) {
                        this.selectedResources = [...this.selectedResources, this.rows[i]];
                    }
                    this.selectedRowsCount = value;
                    this.emitSelection('single', this.selectMode, this.selectedResources);
                }
            },
        },
        created() {
            window.addEventListener('resize', this.isSmallScreen);
            this.isSmallScreen();
        },
        destroyed() {
            window.removeEventListener('resize', this.isSmallScreen);
        },
    }
</script>

<style scoped>
    .Polaris-IndexTable__Pagination {
        text-align: center;
        padding: 1.6rem;
        border-top: 0.1rem solid #e1e3e5;
        border-bottom-left-radius: 0.4rem;
        border-bottom-right-radius: 0.4rem;
    }
</style>