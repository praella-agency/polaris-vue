<template>
    <div :class="parentClassName">
        <div class="Polaris-Labelled__LabelWrapper" v-if="label || emptyLabel || hasSlot($slots.label)">
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
                :class="selectClassName"
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
            <div v-if="!floatingLabel" class="Polaris-Select__Content" aria-hidden="true" :aria-disabled="disabled">
                <span v-if="inlineLabel" class="Polaris-Select__InlineLabel">{{ inlineLabel }}</span>
                <span class="Polaris-Select__SelectedOption">{{ selectedOption }}</span>
                <span class="Polaris-Select__Icon">
                    <PIcon source="SelectMinor"/>
                </span>
            </div>
            <div v-else class="Polaris-FloatingField__Caret">
                <PIcon source="CaretDownMinor"/>
            </div>
            <div v-if="!floatingLabel" class="Polaris-Select__Backdrop"></div>
        </div>
        <PFieldError v-if="error" :error="error"/>
    </div>
</template>

<script>
    import { hasSlot, uuid } from '../../ComponentHelpers';
    import { classNames } from '../../utilities/css';
    import { PIcon } from '../../components/PIcon';
    import { PFieldError } from '../../components/PFieldError';
    import utils from "../../utilities";

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
                default: `PolarisSelect${uuid()}`,
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
             * Value for form input.
             */
            modelValue: {
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
            /**
             * Create beautifully simple form labels that float over your input fields
             */
            floatingLabel: {
                type: Boolean,
                default: false,
            }
        },
        emits: ['change', 'update:value', 'update:modelValue'],
        data() {
            return {
                selected: this.computedVModel,
            };
        },
        computed: {
            computedVModel() {
                if (utils.isVue3) {
                    return this.modelValue;
                }
                return this.value;
            },
            parentClassName() {
                return classNames(
                    this.floatingLabel && 'Polaris-Select-Floating-Label',
                    this.selected && 'Polaris-Select--Active',
                    this.labelHidden && 'Polaris-Labelled--hidden',
                );
            },
            className() {
                return classNames(
                    'Polaris-Select',
                    this.disabled && 'Polaris-Select--disabled',
                    this.error && 'Polaris-Select--error',
                    this.floatingLabel && 'Polaris-Floating'
                );
            },
            selectClassName() {
                return classNames(
                    this.floatingLabel
                        ? 'Polaris-FloatingLabels__Input--select'
                        : 'Polaris-Select__Input',
                );
            },
            computedOptions() {
                const options = [];
                if (this.placeholder && !this.floatingLabel) {
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
                     * @ignore
                     */
                    this.$emit('update:value', value);
                    /**
                     * Callback when input is triggered
                     * @ignore
                     */
                    this.$emit('update:modelValue', value);
                },
            },
            selectedOption() {
                let selectedOption = this.computedOptions.find((option) => this.computedValue === option[this.valueField]);

                if (selectedOption === undefined) {
                    selectedOption = this.computedOptions.find((option) => !option[this.hiddenField]);
                }

                return selectedOption ? selectedOption[this.textField] : '';
            },
            hasSlot() {
                return hasSlot;
            },
        },
        watch: {
            value(value, oldValue) {
                this.selected = value;
            },
            modelValue(value, oldValue) {
                this.selected = value;
            },
        },
        created() {
            this.selected = this.computedVModel;
        }
    }
</script>
