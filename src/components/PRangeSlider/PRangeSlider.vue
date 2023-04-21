<template>
    <PDualThumb
        v-if="isDualThumb"
        v-bind="$props"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
    >
        <template #label>
            <slot name="label"/>
        </template>
        <template #helpText>
            <slot name="helpText"/>
        </template>
        <template #prefix>
            <slot name="prefix"/>
        </template>
        <template #suffix>
            <slot name="suffix"/>
        </template>
    </PDualThumb>
    <PSingleThumb
        v-else
        v-bind="$props"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
    >
        <template #label>
            <slot name="label"/>
        </template>
        <template #helpText>
            <slot name="helpText"/>
        </template>
        <template #prefix>
            <slot name="prefix"/>
        </template>
        <template #suffix>
            <slot name="suffix"/>
        </template>
    </PSingleThumb>
</template>

<script setup>
    import { computed } from 'vue';
    import { uuid } from '../../ComponentHelpers';
    import { Action } from '../../types';
    import { PDualThumb } from './components/PDualThumb';
    import { PSingleThumb } from './components/PSingleThumb';
    import ObjectValidator from '../../utilities/validators/ObjectValidator';

    let props = defineProps({
        /**
         * Label for the range input
         */
        label: {
            type: String,
            default: null,
        },
        /**
         * Adds an action to the label
         */
        labelAction: {
            type: Object,
            default: () => ({}),
            ...ObjectValidator('labelAction', Action),
        },
        /**
         * Visually hide the label
         */
        labelHidden: {
            type: Boolean,
            default: false,
        },
        /**
         * ID for range input
         */
        id: {
            type: [String, Number],
            default: `PolarisRangeSlider-${uuid()}`,
        },
        /**
         * Initial model value for range input
         */
        modelValue: {
            type: [Number, Array],
        },
        /**
         * Minimum possible value for range input
         */
        min: {
            type: Number,
            default: 0,
        },
        /**
         * Maximum possible value for range input
         */
        max: {
            type: Number,
            default: 100,
        },
        /**
         * Increment value for range input changes
         */
        step: {
            type: Number,
            default: 1,
        },
        /**
         * Provide a tooltip while sliding, indicating the current value
         */
        output: {
            type: Boolean,
            default: false,
        },
        /**
         * Additional text to aid in use
         */
        helpText: {
            type: String,
        },
        /**
         * Display an error message
         */
        error: {
            type: String,
            default: null,
        },
        /**
         * Disable input
         */
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * Element to display before the input
         */
        prefix: {
            type: String,
            default: null,
        },
        /**
         * Element to display after the input
         */
        suffix: {
            type: String,
            default: null,
        },
    });
    const emit = defineEmits(['change', 'update:value', 'update:modelValue', 'focus', 'blur']);

    let computedVModel = computed(() => {
        return props.modelValue;
    });

    let isDualThumb = computed(() => {
        return Array.isArray(computedVModel.value);
    });

    function handleChange(value, id) {
        /**
         * Callback when the range input is changed
         */
        emit('change', value, id);
        /**
         * @ignore
         */
        emit('update:value', value);
        /**
         * @ignore
         */
        emit('update:modelValue', value);
    }

    function handleFocus(event) {
        /**
         * Callback when the range input is focused
         */
        emit('focus', event);
    }

    function handleBlur(event) {
        /**
         * Callback when focus is removed
         */
        emit('blur', event);
    }
</script>
