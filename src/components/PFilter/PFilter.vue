<template>
    <div>
        <div class="Polaris-Filters">
            <div class="Polaris-Filters-ConnectedFilterControl__Wrapper">
                <div class="Polaris-Filters-ConnectedFilterControl Polaris-Filters-ConnectedFilterControl--right">
                    <PFilterItemWrapper position="center" v-if="!hideQueryField">
                        <PTextField
                            id="Polaris-Input-Filter"
                            connected
                            labelHidden
                            showPrefix
                            showClearButton
                            :placeholder="queryPlaceholder || resourceTitle || resource"
                            @input="handleQueryChange"
                            @blur="handleQueryBlur"
                            @focus="handleQueryFocus"
                            :value="queryValue || inputFilter"
                            :autoFocus="focused"
                            :label="queryPlaceholder || resourceTitle || resource"
                            clearable
                            :disabled="disabled"
                            v-on="$listeners"
                        >
                            <template #prefix>
                                <PIcon source="SearchMinor"/>
                            </template>
                        </PTextField>
                    </PFilterItemWrapper>
                    <PFilterItemWrapper v-if="$slots.default" position="right">
                        <!-- @slot The content to display inline with the controls -->
                        <slot/>
                    </PFilterItemWrapper>
                </div>
                <div class="Polaris-Filters-ConnectedFilterControl__AuxiliaryContainer">
                    <!-- @slot Add extra elements -->
                    <slot name="auxiliaryContainer"/>
                </div>
            </div>
            <div class="Polaris-Filters__TagsContainer" v-if="!hideTags">
                <PTag v-for="(filter, key) in appliedFilters" :key="key" v-on="$listeners" removable :tag="filter"/>
            </div>
        </div>
    </div>
</template>

<script>
    import { PTextField } from '../../components/PTextField';
    import { PIcon } from '../../components/PIcon';
    import { PTag } from '../../components/PTag';
    import { PFilterItemWrapper } from '../../components/PFilter/components/PFilterItemWrapper';
    import ObjectValidator from '../../utilities/validators/ObjectValidator';
    import ArrayValidator from '../../utilities/validators/ArrayValidator';

    const ResourceNameInterface = {
        singular: {
            type: String,
            required: true,
        },
        plural: {
            type: String,
            required: true,
        },
    }

    export const FilterInterface = {
        /** A unique key used to identify the filter */
        key: {
            type: String,
            required: true,
        },
        /** The label for the filter */
        label: {
            type: String,
            required: true,
        },
        /** The markup for the given filter */
        filter: {
            type: String,
            required: true,
        },
        /** Whether or not the filter should have a shortcut popover displayed */
        shortcut: Boolean,
        /** Whether or not the filter is disabled */
        disabled: Boolean,
        /**
         * @default false
         * Whether or not the clear button is displayed
         */
        hideClearButton: Boolean,
    }

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Filter is a composite component that filters the items of a list or table.</h4>
     */
    export default {
        name: 'PFilter',
        components: {
            PTextField, PIcon, PTag, PFilterItemWrapper,
        },
        props: {
            /**
             * Title or placeholder for the element
             */
            resourceName: {
                type: Object,
                default: () => ({}),
                ...ObjectValidator('resourceName', ResourceNameInterface),
            },
            /**
             * Title or placeholder for the element. **Deprecated** ResourceTitle will be removed in version 4.0.0
             */
            resourceTitle: {
                type: String,
                default: null,
            },
            /**
             * Add default value to filter
             */
            inputFilter: {
                type: String,
                default: null,
            },
            /**
             * Applied filters which are rendered as tags. The remove callback is called with respective key
             */
            appliedFilters: {
                type: Array,
                default: () => ([]),
            },
            /**
             * Currently entered text in the query field
             */
            queryValue: {
                type: String,
                default: null,
            },
            /**
             * Placeholder text for the query field
             */
            queryPlaceholder: {
                type: String,
                default: null,
            },
            /**
             * Whether the query field is focused
             */
            focused: {
                type: Boolean,
                default: false,
            },
            /**
             * Available filters added to the sheet. Shortcut filters are exposed outside of the sheet.
             */
            filters: {
                type: Array,
                default: () => ([]),
                ...ArrayValidator('filters', FilterInterface),
            },
            /**
             * Disable all filters
             */
            disabled: {
                type: Boolean,
                default: false,
            },
            /**
             * Additional hint text to display below the filters
             */
            helpText: {
                type: String,
                default: null
            },
            /**
             * Hide tags for applied filters
             */
            hideTags: {
                type: Boolean,
                default: false,
            },
            /**
             * Hide the query field
             */
            hideQueryField: {
                type: Boolean,
                default: false,
            },
        },
        emits: ['queryChange', 'queryClear', 'queryClearAll', 'queryBlur', 'queryFocus'],
        data() {
            return {
                appliedFiltersCount: this.appliedFilters ? this.appliedFilters.length : 0,
            };
        },
        computed: {
          prefix() {
            if(this.resourceName.plural) {
              return `${this.resourceName.plural.toLowerCase()}`;
            } else {
              return this.resourceName.plural;
            }
          },
          resource() {
            const resourceName = this.resourceName;
            return resourceName.plural ? 'Filter ' + resourceName.plural.toLowerCase() :
                (resourceName.singular ? 'Filter ' + resourceName.singular.toLowerCase() : '');
          },
        },
        methods: {
            handleQueryChange(queryValue) {
                /**
                 * Callback when the query field is changed
                 */
                this.$emit('queryChange', queryValue);
            },
            handleQueryClear() {
                /**
                 * Callback when the clear button is triggered
                 */
                this.$emit('queryClear');
            },
            handleQueryClearAll() {
                /**
                 * Callback when the reset all button is pressed
                 */
                this.$emit('queryClearAll');
            },
            handleQueryBlur() {
                /**
                 * Callback when the query field is blurred
                 */
                this.$emit('queryBlur');
            },
            handleQueryFocus() {
                /**
                 * Callback when the query field is focused
                 */
                this.$emit('queryFocus');
            },
        },
        mounted() {
            if (this.resourceTitle != null) {
                // tslint:disable-next-line:no-console
                console.error('Deprecation Notice: `resourceTitle` will be removed in version 4.0.0, use `resourceName` ' +
                    'instead.');
            }

            if (this.inputFilter != null) {
                // tslint:disable-next-line:no-console
                console.error('Deprecation Notice: `inputFilter` will be removed in version 4.0.0, use `queryValue` instead.');
            }
        }
    }
</script>
