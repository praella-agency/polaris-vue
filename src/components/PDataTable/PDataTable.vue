<template>
    <div>
        <PFilter v-if="$slots.hasOwnProperty('filter') || hasFilter" v-bind="$attrs" :resourceName="resource"
                 @remove-tag="onRemoveFilter" @input="onFilterInputChanged">
            <!-- @slot Add a custom Filter content -->
            <slot name="filter" v-if="$slots.hasOwnProperty('filter')"></slot>
            <template slot="auxiliaryContainer">
                <!-- @slot Add auxiliary filters -->
                <slot name="auxiliaryContainer"/>
            </template>
        </PFilter>
        <div class="Polaris-DataTable" v-if="rows.length > 0 || $slots.hasOwnProperty('body')">
            <div class="Polaris-DataTable__ScrollContainer">
                <table class="Polaris-DataTable__Table">
                    <thead ref="thead">
                        <!-- @slot Add a custom Header content -->
                        <slot name="head">
                            <template>
                                <tr>
                                    <PDataTableCellNew
                                        v-for="(heading, hIndex) in headings"
                                        :key="`heading-cell-${hIndex}`"
                                        header
                                        :content="heading.content"
                                        :value="heading.value"
                                        :width="heading.width"
                                        :sort="sort"
                                        :sortable="heading.sortable"
                                        :default-sort-direction="defaultSortDirection"
                                        :content-type="heading.type ? heading.type : columnContentTypes[hIndex]"
                                        :first-column="hIndex === 0"
                                        :truncate="truncate"
                                        :verticalAlign="verticalAlign"
                                        @sort-changed="handleSortChange"
                                    />

                                    <!-- @deprecated Remove in version 3.0.0 - START -->
                                    <PDataTableCell
                                        v-if="hasActions"
                                        header
                                        content="Actions"
                                        :sortable="false"
                                        contentType="text"
                                        :firstColumn="false"
                                        :truncate="false"
                                        :verticalAlign="verticalAlign"/>
                                    <!-- @deprecated Remove in version 3.0.0 - END -->

                                </tr>


                                <tr v-if="!showTotalsInFooter">
                                    <PDataTableCellNew
                                        v-for="(total, index) in totals"
                                        :key="`total-cell-${index}`"
                                        total
                                        :value="index === 0 ? totalsRowHeading : total"
                                        :content-type="total !== '' && index > 0 ? 'numeric': columnContentTypes[index]"
                                        :first-column="index === 0"
                                        :truncate="truncate"
                                        :vertical-align="verticalAlign"
                                        :sortable="false"
                                    />

                                    <!-- @deprecated Remove in version 3.0.0 - START -->
                                    <PDataTableCell
                                        total
                                        v-if="totals.length && hasActions"
                                        :totalInFooter="showTotalsInFooter"
                                        :verticalAlign="verticalAlign"/>
                                    <!-- @deprecated Remove in version 3.0.0 - END -->

                                </tr>
                            </template>
                        </slot>
                    </thead>

                    <!-- @slot Overwrite tbody element.<br />**Warning:** Using this slot will not allow rows populated from package, you must have to utilize **body** slot as well.
                     -->
                    <slot name="tbody">
                        <tbody ref="tbody">
                            <template v-if="loading">
                                <tr class="Polaris-ResourceList__SpinnerContainer"
                                    :style="{'padding-top': `${topPadding}px`}">
                                    <PSpinner
                                        :size="!$slots.hasOwnProperty('body') && rows.length < 2 ? 'small' : 'large'"/>
                                </tr>
                                <tr class="Polaris-ResourceList__LoadingOverlay"/>
                            </template>

                            <!-- @slot Add a custom Body content -->
                            <slot name="body">
                                <template v-if="!hasOldRows">
                                    <template v-for="row in rows">
                                        <!-- @slot Replace the default rendering of a row. This slot provides row values.

                                        Access values with `slot-props` attribute -->
                                        <slot name="item" :item="row">
                                            <tr class="Polaris-DataTable__TableRow">
                                                <template v-for="(heading, hIndex) in headings">
                                                    <PDataTableCellNew
                                                        :value="row[heading.value]"
                                                        :header-value="heading.value"
                                                        :first-column="hIndex === 0"
                                                        :content-type="headings[hIndex].type ? headings[hIndex].type : columnContentTypes[hIndex]"
                                                        :truncate="truncate"
                                                        :vertical-align="verticalAlign"
                                                        :sortable="false">
                                                        <template v-slot:[`item.${heading.value}`]="slotProps">
                                                            <!-- @slot Customize a specific column. This slot provides row values.

                                                            Access values with `slot-props` attribute. -->
                                                            <slot :name="`item.${heading.value}`" :item="row"/>
                                                        </template>
                                                    </PDataTableCellNew>
                                                </template>
                                            </tr>
                                        </slot>
                                    </template>
                                </template>
                                <!-- @deprecated Remove in version 3.0.0 - START -->
                                <template v-else>
                                    <tr
                                        class="Polaris-DataTable__TableRow"
                                        v-for="(row, rIndex) in rows"
                                        :key="`row-${rIndex}`">
                                        <PDataTableCell
                                            v-for="(data, cIndex) in row"
                                            :key="`cell-${cIndex}-row-${rIndex}`"
                                            :content="typeof data !== 'object' ? data : data.content"
                                            :action="data.url || data.to || data.onAction ? data : null"
                                            :toggle="typeof data.status == 'boolean' && data.onAction ? data : null"
                                            :badge="typeof data === 'object' && !(data.url || data.to) && !data.onAction ? data : null"
                                            :contentType="headings[cIndex].type ? headings[cIndex].type : columnContentTypes[cIndex]"
                                            :firstColumn="cIndex === 0"
                                            :truncate="truncate"
                                            :verticalAlign="verticalAlign"
                                        />
                                        <PDataTableCell
                                            v-if="hasActions"
                                            :actions="actions"
                                            :value="ids[rIndex]"
                                            :verticalAlign="verticalAlign"
                                        />
                                    </tr>
                                </template>
                                <!-- @deprecated Remove in version 3.0.0 - END -->

                            </slot>
                        </tbody>
                    </slot>
                    <tfoot v-if="showTotalsInFooter">
                        <tr>
                            <PDataTableCellNew
                                v-for="(total, index) in totals"
                                :key="`total-cell-${index}`"
                                total
                                :total-in-footer="showTotalsInFooter"
                                :value="index === 0 ? totalsRowHeading : total"
                                :content-type="total !== '' && index > 0 ? 'numeric': columnContentTypes[index]"
                                :first-column="index === 0"
                                :truncate="truncate"
                                :vertical-align="verticalAlign"
                                :sortable="false"
                            />

                            <!-- @deprecated Remove in version 3.0.0 - START -->
                            <PDataTableCell
                                total
                                v-if="totals.length && hasActions"
                                :totalInFooter="showTotalsInFooter"
                                :verticalAlign="verticalAlign"/>
                            <!-- @deprecated Remove in version 3.0.0 - END -->
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div v-if="footerContent" class="Polaris-DataTable__Footer">
                <!-- @slot Add a custom Footer content -->
                <slot name="footer">
                    {{ footerContent }}
                </slot>
            </div>
            <div class="Polaris-DataTable__Pagination" v-if="hasPagination">
                <PPagination v-bind="pagination"/>
            </div>
        </div>
        <div v-else>
            <!-- @slot Display when no record available -->
            <slot name="emptyState">
                <PEmptyState
                    :heading="emptyStateTitle"
                    :image="emptyStateImage"
                >
                </PEmptyState>
            </slot>
        </div>
    </div>
</template>


<script>
    import { PDataTableCellNew } from '../../components/PDataTable/components/PDataTableCellNew';
    import { PDataTableCell } from '../../components/PDataTable/components/PDataTableCell';
    import { PPagination } from '../../components/PPagination';
    import { PFilter } from '../../components/PFilter';
    import { PSpinner } from '../../components/PSpinner';
    import { PEmptyState } from '../../components/PEmptyState';
    import ArrayValidator from '../../utilities/validators/ArrayValidator';
    import StringValidator from '../../utilities/validators/StringValidator';
    import ObjectValidator from '../../utilities/validators/ObjectValidator';

    const Status = ['success', 'info', 'attention', 'warning', 'new', 'critical'];
    const Progress = ['incomplete', 'partiallyComplete', 'complete'];
    const Size = ['medium', 'small'];

    const Headings = {
        /** Header title */
        content: {
            type: String,
            required: true,
        },
        /** Header value */
        value: {
            type: String,
            required: true,
        },
        /** Value type */
        type: {
            type: String,
            required: true,
        },
        /** Sortable values */
        sortable: Boolean,
        /** Header Column width */
        width: String,
    }

    const TotalsName = {
        /** Singular label */
        singular: {
            type: String,
            required: true,
        },
        /** Plural label */
        plural: {
            type: String,
            required: true,
        },
    }

    const TableData = [String, Number, Object, Array];
    const ColumnContentType = ['text', 'numeric'];
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
        },
    }

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Data tables are used to organize and display all information from a data set. While a data
     *  visualization represents part of data set, a data table lets merchants view details from the entire set. This helps
     *  merchants compare and analyze the data.</h4>
     */
    export default {
        name: 'PDataTable',
        components: {
            PDataTableCellNew, PPagination, PFilter, PSpinner, PEmptyState, PDataTableCell,
        },
        props: {
            /**
             * List of data types, which determines content alignment for each column. Data types are "text," which aligns left,
             * or "numeric," which aligns right.
             * @values text | numeric
             */
            columnContentTypes: {
                type: Array,
                default: () => ([]),
                ...ArrayValidator('columnContentTypes', ColumnContentType),
            },
            /**
             * The direction to sort the table rows on first click or keypress
             * of a sortable column heading
             * @values ascending | descending | none
             */
            defaultSortDirection: {
                type: String,
                default: 'ascending',
                ...StringValidator('defaultSortDirection', SortDirection),
            },
            /**
             * Content centered in the full width cell of the table footer row
             */
            footerContent: {
                type: [String, Number, Object, Array],
            },
            /**
             * List of column headings
             */
            headings: {
                type: Array,
                default: () => ([]),
                ...ArrayValidator('headings', Headings),
            },
            /**
             * Lists of data points which map to table body rows
             */
            rows: {
                type: Array,
                default: () => [[]],
            },
            /**
             * Placement of totals row within table
             */
            showTotalsInFooter: {
                type: Boolean,
                default: false,
            },
            /**
             * List of numeric column totals, highlighted in the table’s header below column headings. Use empty strings as
             * placeholders for columns with no total.
             */
            totals: {
                type: Array,
                default: () => ([]),
            },
            /**
             * Custom totals row heading
             */
            totalsName: {
                type: Object,
                default: () => ({}),
                ...ObjectValidator('totalsName', TotalsName),
            },
            /**
             * Truncate content in first column instead of wrapping
             */
            truncate: {
                type: Boolean,
                default: false,
            },
            /**
             * Vertical alignment of content in the cells
             */
            verticalAlign: {
                type: String,
                default: 'top',
                ...StringValidator('verticalAlign', VerticalAlign),
            },
            /**
             * Callback fired on click or keypress of a sortable column heading
             */
            sort: {
                type: Object,
                default: () => ({}),
                ...ObjectValidator('sort', Sort),
            },
            /**
             * Display only search filter
             */
            hasFilter: {
                type: Boolean,
                default: false,
            },
            /**
             * Data table has pagination
             */
            hasPagination: {
                type: Boolean,
                default: false,
            },
            /**
             * Data table is loading
             */
            loading: {
                type: Boolean,
                default: false,
            },
            /**
             * Pagination object
             */
            pagination: {
                type: Object,
                default: () => ({}),
            },
            /**
             * Display empty state if record not found!
             */
            emptyStateTitle: {
                type: String,
                default: 'No record found!',
            },
            /**
             * Display empty state image if record not found!
             */
            emptyStateImage: {
                type: String,
                default: 'https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png',
            },
            // ============Deprecated Props============
            /**
             * Handle action events for the button.
             *
             * **Deprecation:-** `actions` will be removed in version 3.0.0,
             * use `headings` with extra object.
             * @deprecated
             */
            actions: {
                type: Array,
                default: () => ([]),
            },
            /**
             * Data ids
             *
             * **Deprecation:-** `ids` will be removed in version 3.0.0,
             * @deprecated
             */
            ids: {
                type: Array,
                default: () => ([]),
            },
            /**
             * Search Placeholder
             *
             * **Deprecation:-** `searchPlaceholder` will be removed in version 3.0.0, use `resourceName` instead.
             * @deprecated
             */
            searchPlaceholder: {
                type: String,
                default: null,
            },
            // ============Deprecated Props END============
        },
        data() {
            return {
                topPadding: 8,
            };
        },
        computed: {
            hasOldRows() {
                return this.rows.length > 0 && this.rows[0].constructor === Array;
            },
            hasActions() {
                return this.actions && this.actions.length > 0;
            },
            resource() {
                if (this.searchPlaceholder != null) {
                    return {
                        singular: this.searchPlaceholder,
                        plural: this.searchPlaceholder,
                    };
                } else {
                    return this.$attrs.resourceName;
                }
            },
            totalsRowHeading() {
                const totalsLabel = Object.keys(this.totalsName).length > 0 ? this.totalsName : {
                    singular: 'Total',
                    plural: 'Totals',
                };

                return this.totals.length > 0 &&
                this.totals.filter((total) => total !== '' || typeof (total !== 'number')).length > 1 ?
                    totalsLabel.plural :
                    totalsLabel.singular;
            },
        },
        methods: {
            onRemoveFilter(tag) {
                /**
                 * Removes filter tag
                 * @property {String} tag
                 */
                this.$emit('filter-removed', tag);
            },
            onFilterInputChanged(value) {
                /**
                 * Works on keypress
                 * @property {String} input-value
                 */
                this.$emit('input-filter-changed', value);
            },
            handleSortChange(value, direction) {
                /**
                 * Handle sorting on columns
                 * @property {Object} {value: 'columnName', direction:'sortDirection'}
                 */
                this.$emit('sort-changed', value, direction);
            },
            handleDeprecations() {
                if (this.searchPlaceholder != null) {
                    // tslint:disable-next-line:no-console
                    console.error('Deprecation Notice: `searchPlaceholder` will be removed in version 3.0.0, use `resourceName` instead. ' +
                        'Please check resourceName syntax here: https://polaris-vue.hulkapps.com/?path=/docs/lists-tables-filter--filter');
                }
                if (this.actions.length > 0) {
                    // tslint:disable-next-line:no-console
                    console.error('Deprecation Notice: `actions` will be removed in version 3.0.0, use `headings` with extra object. '
                        + 'Please check new example of' +
                        ' DataTable: https://polaris-vue.hulkapps.com/?path=/docs/lists-tables-data-table-slot--row-slot');
                }
                if (this.ids.length > 0) {
                    // tslint:disable-next-line:no-console
                    console.error('Deprecation Notice: `ids` will be removed in version 3.0.0. ' +
                        'Please check new example of' +
                        ' DataTable: https://polaris-vue.hulkapps.com/?path=/docs/lists-tables-data-table-slot--row-slot');
                }
            },
        },
        mounted() {
            let loadingPosition = 0;

            if (typeof window !== 'undefined' && this.$refs.hasOwnProperty('tbody')) {
                const overlay = (this.$refs.tbody).getBoundingClientRect();
                const viewportHeight = Math.max(document.documentElement ?
                    document.documentElement.clientHeight : 0, window.innerHeight || 0);
                const overflow = viewportHeight - overlay.height;
                const spinnerHeight = this.rows.length === 1 ? 28 : 45;
                loadingPosition = overflow > 0 ? (overlay.height - spinnerHeight) / 2 :
                    (viewportHeight - overlay.top - spinnerHeight) / 2;
                loadingPosition = loadingPosition + (this.$refs.thead).getBoundingClientRect().height;
                this.topPadding = loadingPosition > 0 ? loadingPosition : this.topPadding;
            }

            this.handleDeprecations();
        },
    }
</script>

<style scoped>
    .Polaris-DataTable__Pagination {
        text-align: center;
        padding: 1.6rem;
        border-top: 0.1rem solid #e1e3e5;
        border-bottom-left-radius: 0.4rem;
        border-bottom-right-radius: 0.4rem;
    }
</style>
