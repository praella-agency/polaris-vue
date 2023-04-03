<template>
    <div :class="parentClassName">
        <div class="Polaris-Labelled__LabelWrapper" v-if="label || emptyLabel || isSlot($slots.label)">
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

<script setup>
    import { computed, onMounted, ref, watch } from 'vue';
    import { hasSlot, uuid } from '../../ComponentHelpers';
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
    let props = defineProps({
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
    });
    const emit = defineEmits(['change', 'update:modelValue']);

    let computedVModel = computed(() => {
        return props.modelValue;
    });

    let selected = ref(computedVModel.value);

    let parentClassName = computed(() => {
        return classNames(
            props.floatingLabel && 'Polaris-Select-Floating-Label',
            selected.value && 'Polaris-Select--Active',
            props.labelHidden && 'Polaris-Labelled--hidden',
        );
    });

    let className = computed(() => {
        return classNames(
            'Polaris-Select',
            props.disabled && 'Polaris-Select--disabled',
            props.error && 'Polaris-Select--error',
            props.floatingLabel && 'Polaris-Floating'
        );
    });

    let selectClassName = computed(() => {
        return classNames(
            props.floatingLabel ? 'Polaris-FloatingLabels__Input--select' : 'Polaris-Select__Input',
        );
    });

    let computedOptions = computed(() => {
        const options = [];
        if (props.placeholder && !props.floatingLabel) {
            options.push({
                [props.textField]: props.placeholder,
                [props.valueField]: PLACEHOLDER_VALUE,
                [props.disabledField]: true,
            });
        }
        props.options.map((value) => {
            if (typeof value === 'object') {
                options.push(value);
            } else {
                options.push({[props.textField]: value, [props.valueField]: value});
            }
        });

        return options;
    });

    let computedValue = computed({
        get() {
            return selected.value;
        },
        set(value) {
            selected.value = value;
            /**
             * Callback when selection is changed
             */
            emit('change', value);
            /**
             * Callback when input is triggered
             * @ignore
             */
            emit('update:modelValue', value);
        },
    });

    let selectedOption = computed(() => {
        let selectedOption = computedOptions.value.find((option) => computedValue.value === option[props.valueField]);

        if (selectedOption === undefined) {
            selectedOption = computedOptions.value.find((option) => !option[props.hiddenField]);
        }

        return selectedOption ? selectedOption[props.textField] : '';
    });

    let isSlot = computed(() => {
        return hasSlot;
    });

    watch(() => props.modelValue, (value) => {
        selected.value = value;
    });

    onMounted(() => {
        selected.value = computedVModel.value;
    });
</script>
