<template>
    <PDualThumb
        v-if="isDualThumb"
        v-bind="$props"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
    >
        <slot name="prefix" slot="prefix"/>
        <slot name="suffix" slot="suffix"/>
    </PDualThumb>
    <PSingleThumb
        v-else
        v-bind="$props"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
    >
        <slot name="prefix" slot="prefix"/>
        <slot name="suffix" slot="suffix"/>
    </PSingleThumb>
</template>

<script>
    import { Action } from '../../types';
    import { PDualThumb } from './components/PDualThumb';
    import { PSingleThumb } from './components/PSingleThumb';
    import { ObjectValidator } from '../../utilities/validators/ObjectValidator';

    export default {
        name: 'PRangeSlider',
        components: {
            PSingleThumb, PDualThumb,
        },
        props: {
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
                // ...ObjectValidator('labelAction', Action),
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
                default: null,
            },
            /**
             * Initial value for range input
             */
            value: {
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
        },
        computed: {
            isDualThumb() {
                return Array.isArray(this.value);
            }
        },
        methods: {
            handleChange(value, id) {
                this.$emit('change', value, id);
            },
            handleFocus(event) {
                this.$emit('focus', event);
            },
            handleBlur(event) {
                this.$emit('blur', event);
            },
        },
    }
</script>

<style scoped>

</style>