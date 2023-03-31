<template>
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
                            v-model="computedValue"
                            :autoFocus="focused"
                            :label="queryPlaceholder || resourceTitle || resource"
                            clearable
                            :disabled="disabled"
                            v-bind="$attrs"
                    >
                        <template #prefix>
                            <PIcon source="SearchMinor"/>
                        </template>
                    </PTextField>
                </PFilterItemWrapper>
                <PFilterItemWrapper v-if="hasSlot($slots.default)" position="right">
                    <!-- @slot The content to display inline with the controls -->
                    <slot/>
                </PFilterItemWrapper>
            </div>
            <div class="Polaris-Filters-ConnectedFilterControl__AuxiliaryContainer">
                <!-- @slot Add extra elements -->
                <slot name="auxiliaryContainer"/>
            </div>
        </div>
        <div class="Polaris-Filters__TagsContainer" v-if="!hideTags && appliedFilters.length">
            <PTag
                    v-for="(filter, key) in appliedFilters"
                    v-bind="$attrs"
                    :key="key"
                    removable
                    :tag="filter"
                    @remove-tag="handleTagRemove"
            />
        </div>
    </div>
</template>

<script setup>
    import { hasSlot } from '../../ComponentHelpers';
    import { PTextField } from '../../components/PTextField';
    import { PIcon } from '../../components/PIcon';
    import { PTag } from '../../components/PTag';
    import { PFilterItemWrapper } from '../../components/PFilter/components/PFilterItemWrapper';
    import ObjectValidator from '../../utilities/validators/ObjectValidator';
    import ArrayValidator from '../../utilities/validators/ArrayValidator';
    import {FilterInterface, ResourceNameInterface} from "../variables";
    import {computed, onMounted, ref} from "vue";
    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Filter is a composite component that filters the items of a list or table.</h4>
     */
    let props = defineProps({
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
    });
    const emit = defineEmits(['queryChange', 'queryClear', 'queryClearAll', 'queryBlur', 'queryFocus', 'remove-tag']);

    let prefix = computed(() => {
        if (props.resourceName.plural) {
            return `${props.resourceName.plural.toLowerCase()}`;
        } else {
            return props.resourceName.plural;
        }
    });

    let resource = computed(() => {
        const resourceName = props.resourceName;
        return resourceName.plural ? 'Filter ' + resourceName.plural.toLowerCase() : (resourceName.singular ? 'Filter ' + resourceName.singular.toLowerCase() : '');
    });

    let computedValue = computed({
        get() {
            if (props.queryValue) {
                return props.queryValue;
            }
            return props.inputFilter;
        },
        set(value) {}
    });

    let isSlot = computed(() => {
        return hasSlot;
    });

    function handleQueryChange(queryValue) {
        /**
         * Callback when the query field is changed
         */
        emit('queryChange', queryValue);
    }

    function handleQueryClear() {
        /**
         * Callback when the clear button is triggered
         */
        emit('queryClear');
    }

    function handleQueryClearAll() {
        /**
         * Callback when the reset all button is pressed
         */
        emit('queryClearAll');
    }

    function handleQueryBlur() {
        /**
         * Callback when the query field is blurred
         */
        emit('queryBlur');
    }

    function handleQueryFocus() {
        /**
         * Callback when the query field is focused
         */
        emit('queryFocus');
    }

    function handleTagRemove(key) {
        /**
         * Method to remove tag
         */
        emit('remove-tag', key);
    }

    onMounted(() => {
        if (props.resourceTitle != null) {
            // tslint:disable-next-line:no-console
            console.error('Deprecation Notice: `resourceTitle` will be removed in version 4.0.0, use `resourceName` instead.');
        }

        if (props.inputFilter != null) {
            // tslint:disable-next-line:no-console
            console.error('Deprecation Notice: `inputFilter` will be removed in version 4.0.0, use `queryValue` instead.');
        }
    });
</script>
