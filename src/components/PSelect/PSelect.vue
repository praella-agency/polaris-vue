<template>
    <div :class="labelHidden && 'Polaris-Labelled--hidden'">
        <div class="Polaris-Labelled__LabelWrapper" v-if="label || emptyLabel">
            <div class="Polaris-Label">
                <slot name="label">
                    <label
                        :id="`${id}Label`"
                        :for="id"
                        class="Polaris-Label__Text"
                        v-html="emptyLabel ? '&nbsp' : label"
                    />
                </slot>
            </div>
        </div>
        <div :class="className">
            <select
                :id="id"
                :name="name"
                v-model="computedValue"
                class="Polaris-Select__Input"
                :disabled="disabled"
                aria-invalid="false"
            >
                <option
                    v-for="(option, key) in computedOptions"
                    :key="key"
                    :value="option[valueField]"
                    :disabled="option[disabledField]"
                    :hidden="option[hiddenField]"
                >
                    {{ option[textField] }}
                </option>
            </select>
            <div class="Polaris-Select__Content" aria-hidden="true" :aria-disabled="disabled">
                <span v-if="inlineLabel" class="Polaris-Select__InlineLabel">{{ inlineLabel }}</span>
                <span class="Polaris-Select__SelectedOption">{{ selectedOption }}</span>
                <span class="Polaris-Select__Icon">
          <PIcon source="SelectMinor"/>
        </span>
            </div>
            <div class="Polaris-Select__Backdrop"></div>
        </div>
        <PFieldError v-if="error" :error="error"/>
    </div>
</template>

<script>
    import { classNames } from '../../utilities/css';
    import { PIcon } from '../../components/PIcon';
    import { PFieldError } from '../../components/PFieldError';

    const PLACEHOLDER_VALUE = '';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Select lets merchants choose one option from an options menu. Consider select when you have 4 or more
     *  options, to avoid cluttering the interface.</h4>
     */
    export default {
        name: 'PSelect',
        components: {
            PIcon, PFieldError
        },
        props: {
            /**
             * ID for form input.
             */
            id: {
                type: [String, Number],
                default: `PolarisSelect${new Date().getUTCMilliseconds()}`,
            },
            /**
             * Name for form input.
             */
            name: {
                type: String,
                default: null,
            },
            /**
             * Disable input.
             */
            disabled: {
                type: Boolean,
                default: false,
            },
            /**
             * Visually hide the label.
             */
            labelHidden: {
                type: Boolean,
                default: false,
            },
            /**
             * Empty label.
             */
            emptyLabel: {
                type: Boolean,
                default: false,
            },
            /**
             * Label for the select.
             */
            label: {
                type: String,
                default: null,
            },
            /**
             * List of Options or option to choose from.
             */
            options: {
                type: Array,
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
             * Field name in the `options` array that should be used for the hidden state
             */
            hiddenField: {
                type: String,
                default: 'hidden',
            },
            /**
             * Value for form input.
             */
            value: {
                type: [String, Object, Array, Boolean, Number],
            },
            /**
             * Example text to display as placeholder.
             */
            placeholder: {
                type: String,
                default: null,
            },
            /**
             * Display an error state.
             */
            error: {
                type: String,
                default: null,
            },
            /**
             * Show the label to the left of the value, inside the control.
             */
            inlineLabel: {
                type: [Boolean, String],
                default: false,
            },
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
                    this.error && 'Polaris-Select--error',
                );
            },
            computedOptions() {
                const options = [];
                if (this.placeholder) {
                    options.push({
                        [this.textField]: this.placeholder,
                        [this.valueField]: PLACEHOLDER_VALUE,
                        [this.disabledField]: true,
                    });
                }
                this.options.map((value) => {

                    if (typeof value === 'object') {
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
            selectedOption() {
                let selectedOption = this.computedOptions.find((option) => this.computedValue === option[this.valueField]);

                if (selectedOption === undefined) {
                    selectedOption = this.computedOptions.find((option) => !option[this.hiddenField]);
                }

                return selectedOption ? selectedOption[this.textField] : '';
            },
        },
        watch: {
            value(value, oldValue) {
                this.selected = value;
            },
        },
    }
</script>
