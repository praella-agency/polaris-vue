<template>
    <PLabelled
        :id="id"
        :label="label"
        :error="error"
        :action="labelAction"
        :labelHidden="labelHidden"
        :helpText="helpText"
    >
        <div
            :class="className"
            :style="cssVars"
        >
            <div v-if="prefix || $slots.prefix" class="Polaris-RangeSlider-SingleThumb__Prefix">
                <slot name="prefix">
                    {{ prefix }}
                </slot>
            </div>
            <div class="Polaris-RangeSlider-SingleThumb__InputWrapper">
                <input
                    type="range"
                    class="Polaris-RangeSlider-SingleThumb__Input"
                    :id="id"
                    :name="id"
                    :min="min"
                    :max="max"
                    :step="step"
                    :value="clampedValue"
                    :aria-valuemin="min"
                    :aria-valuemax="max"
                    :aria-valuenow="clampedValue"
                    :aria-invalid="Boolean(error) || $slots.error"
                    :aria-describedby="ariaDescribedBy"
                    :disabled="disabled"
                    @input="handleChange"
                    @focus="$emit('focus', $event)"
                    @blur="$emit('blur', $event)"
                />
                <output
                    v-if="!disabled && output"
                    :for="id"
                    class="Polaris-RangeSlider-SingleThumb__Output"
                >
                    <div class="Polaris-RangeSlider-SingleThumb__OutputBubble">
                        <span class="Polaris-RangeSlider-SingleThumb__OutputText">
                            {{ clampedValue }}
                        </span>
                    </div>
                </output>
            </div>
            <div v-if="suffix || $slots.suffix" class="Polaris-RangeSlider-SingleThumb__Suffix">
                <slot name="suffix">
                    {{ suffix }}
                </slot>
            </div>
        </div>
    </PLabelled>
</template>

<script>
    import { classNames } from '../../../../utilities/css';
    import { PLabelled } from '../../../../components/PLabelled';

    export default {
        name: 'PSingleThumb',
        components: {
            PLabelled,
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
            },
            /**
             * Maximum possible value for range input
             */
            max: {
                type: Number,
            },
            /**
             * Increment value for range input changes
             */
            step: {
                type: Number,
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
        data() {
            return {
                describedBy: [],
            };
        },
        computed: {
            className() {
                return classNames(
                    'Polaris-RangeSlider-SingleThumb',
                    (this.error || this.$slots.error) && 'Polaris-RangeSlider-SingleThumb--error',
                    this.disabled && 'Polaris-RangeSlider-SingleThumb--disabled',
                );
            },
            cssVars() {
                return {
                    [`--Polaris-RangeSlider-min`]: this.min,
                    [`--Polaris-RangeSlider-max`]: this.max,
                    [`--Polaris-RangeSlider-current`]: this.clampedValue,
                    [`--Polaris-RangeSlider-progress`]: `${this.sliderProgress}%`,
                    [`--Polaris-RangeSlider-output-factor`]: `${this.outputFactor}`,
                }
            },
            clampedValue() {
                return this.clamp(this.value, this.min, this.max);
            },
            sliderProgress() {
                return ((this.clampedValue - this.min) * 100) / (this.max - this.min);
            },
            outputFactor() {
                return this.invertNumber((this.sliderProgress - 50) / 100);
            },
            ariaDescribedBy() {
                return this.describedBy.length ? this.describedBy.join(' ') : undefined;
            },
        },
        methods: {
            handleChange(event) {
                this.$emit('change', parseFloat(event.target.value), this.id);
            },
            clamp(number, min, max) {
                if (number < min) return min;
                if (number > max) return max;
                return number;
            },
            invertNumber(number) {
                if (Math.sign(number) === 1) {
                    return -Math.abs(number);
                } else if (Math.sign(number) === -1) {
                    return Math.abs(number);
                } else {
                    return 0;
                }
            }
        }
    }
</script>

<style scoped>

</style>