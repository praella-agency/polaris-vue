<template>
    <div>
        <div class="Polaris-Labelled__LabelWrapper">
            <div class="Polaris-Label">
                <slot name="label">
                    <label :id="`${id}Label`" :for="id" class="Polaris-Label__Text">
                        {{ label }}
                    </label>
                </slot>
            </div>
        </div>
        <div :class="className">
            <!--
             Triggers on searchChange
             @event searchChange
             -->
            <multiselect
                :id="id"
                v-model="computedValue"
                v-bind="$attrs"
                :disabled="disabled"
                aria-invalid="false"
                :options="computedOptions"
                :track-by="valueField"
                :placeholder="placeholder"
                :searchable="searchable"
                :multiple="multiple"
                :taggable="taggable"
                :close-on-select="computedMultiple"
                :clear-on-select="false"
                :preserve-search="true"
                :label="textField"
                @tag="addTag"
                @search-change="(query) => {$emit('searchChange', query)}"
            >
                <template slot="caret">
                    <div class="multiselect__select">
                        <PIcon source="SelectMinor"/>
                    </div>
                </template>

                <template v-slot:selection="{values, search, remove, isOpen}">
                    <div class="multiselect__tags-wrap" v-show="values && values.length > 0">
                        <template v-for="(option, index) of values" @mousedown.prevent>
                            <PTag :tag='{"value":option[textField], "key":option[valueField]}' removable
                                  @remove-tag="remove(option)"/>
                        </template>
                    </div>
                    <template slot="limit"></template>
                </template>
            </multiselect>
        </div>
        <div class="Polaris-Labelled__HelpText" v-if="helpText">{{ helpText }}</div>
        <PFieldError v-if="error" :error="error"/>
    </div>
</template>

<script>
    import { classNames } from '../../utilities/css';
    import { PIcon } from '../../components/PIcon';
    import { PTag } from '../../components/PTag';
    import { PFieldError } from '../../components/PFieldError';

    export default {
        name: 'PMultiSelect',
        components: {
            PIcon, PTag, PFieldError,
            Multiselect: require('vue-multiselect').default,
        },
        props: {
            /**
             * Disable the PMultiSelect.
             */
            disabled: {
                type: Boolean,
                default: false,
            },
            /**
             * Label for the PMultiSelect.
             */
            label: {
                type: String,
                default: null,
            },
            /**
             * Options of PMultiSelect.
             */
            options: {
                type: Array,
                required: true,
                default: () => ([]),
            },
            /**
             * Field name in the `options` array that should be used for the text label
             */
            textField: {
                type: String,
                default: 'label',
            },
            /**
             * Field name in the `options` array that should be used for the value
             */
            valueField: {
                type: String,
                default: 'value',
            },
            /**
             * Field name in the `options` array that should be used for the disabled state
             */
            disabledField: {
                type: String,
                default: 'disabled',
            },
            /**
             * Value for PMultiSelect.
             */
            value: {
                type: [String, Object, Array, Number, Boolean],
                default: () => ([]),
            },
            /**
             * Disable the searchable options feature.
             */
            searchable: {
                type: Boolean,
                default: true,
            },
            /**
             * Taggable provides ability to add new user-input value on multiselect.
             */
            taggable: {
                type: Boolean,
                default: false,
            },
            /**
             * Provide Placeholder.
             */
            placeholder: {
                type: String,
                default: null,
            },
            /**
             * Help text
             */
            helpText: {
                type: String,
                default: null,
            },
            /**
             * Validation error
             */
            error: {
                type: String,
                default: null,
            },
            /**
             * To allow multiple selections
             */
            multiple: {
                type: Boolean,
                default: true,
            },
            /**
             * Id for the element
             */
            id: {
                type: [String, Number],
                default: `PolarisMultiSelect${(new Date()).getTime()}`,
            },
            /**
             * Create beautifully simple form labels that float over your input fields
             */
            floatingLabel: {
                type: Boolean,
                default: false,
            }
        },
        data() {
            return {
                selected: this.value,
            };
        },
        computed: {
            className() {
                return classNames(
                    'Polaris-Select',
                    this.disabled && 'Polaris-Select--disabled',
                    this.error && 'invalid',
                );
            },
            computedOptions() {
                const options = [];
                this.options.map((value) => {
                    if (typeof value === 'object') {
                        if (value[this.disabledField]) {
                            value.$isDisabled = value[this.disabledField];
                        }
                        options.push(value);
                    } else {
                        options.push({[this.textField]: value, [this.valueField]: value});
                    }
                });
                return options;
            },
            computedValue: {
                get() {
                    return this.selected;
                },
                set(value) {
                    this.selected = value;
                    /**
                     * Callback when selection is changed
                     */
                    this.$emit('change', value);
                    /**
                     * Callback when input is triggered
                     */
                    this.$emit('input', value);
                },
            },
            computedMultiple() {
                return !this.multiple;
            },
        },
        methods: {
            addTag(newTag) {
                const tag = {
                    [this.textField]: newTag,
                    [this.valueField]: newTag,
                };
                if (this.multiple) {
                    this.selected.push(tag);
                } else {
                    this.selected = tag;
                }
                this.options.push(tag);
                this.$emit('change', this.selected);
            },
        },
        watch: {
            value(value) {
                this.selected = value;
            },
        },
    }
</script>

