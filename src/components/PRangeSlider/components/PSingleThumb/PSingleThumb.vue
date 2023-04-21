<template>
    <PLabelled
        :id="id"
        :label="label"
        :error="error"
        :action="labelAction"
        :labelHidden="labelHidden"
        :helpText="helpText"
    >
        <template #label>
            <slot name="label"/>
        </template>
        <template #helpText>
            <slot name="helpText"/>
        </template>
        <div
            :class="className"
            :style="cssVars"
        >
            <div v-if="prefix || isSlot($slots.prefix)" class="Polaris-RangeSlider-SingleThumb__Prefix">
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
                    :aria-invalid="Boolean(error) || isSlot($slots.error)"
                    :aria-describedby="ariaDescribedBy"
                    :disabled="disabled"
                    @input="handleChange"
                    @focus="emit('focus', $event)"
                    @blur="emit('blur', $event)"
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
            <div v-if="suffix || isSlot($slots.suffix)" class="Polaris-RangeSlider-SingleThumb__Suffix">
                <slot name="suffix">
                    {{ suffix }}
                </slot>
            </div>
        </div>
    </PLabelled>
</template>

<script setup>
    import { computed, ref, useSlots } from 'vue';
    import { hasSlot } from '../../../../ComponentHelpers';
    import { classNames } from '../../../../utilities/css';
    import { PLabelled } from '../../../../components/PLabelled';

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
    });
    const emit = defineEmits(['change', 'focus', 'blur']);
    let slots = useSlots();

    let describedBy = ref([]);

    let computedVModel = computed(() => {
        return props.modelValue;
    });

    let className = computed(() => {
        return classNames(
            'Polaris-RangeSlider-SingleThumb',
            (props.error || hasSlot(slots.error)) && 'Polaris-RangeSlider-SingleThumb--error',
            props.disabled && 'Polaris-RangeSlider-SingleThumb--disabled',
        );
    });

    let clampedValue = computed(() => {
        return clamp(computedVModel.value, props.min, props.max);
    });

    let sliderProgress = computed(() => {
        return ((clampedValue.value - props.min) * 100) / (props.max - props.min);
    });

    let outputFactor = computed(() => {
        return invertNumber((sliderProgress.value - 50) / 100);
    });

    let cssVars = computed(() => {
        return {
            [`--Polaris-RangeSlider-min`]: props.min,
            [`--Polaris-RangeSlider-max`]: props.max,
            [`--Polaris-RangeSlider-current`]: clampedValue.value,
            [`--Polaris-RangeSlider-progress`]: `${sliderProgress.value}%`,
            [`--Polaris-RangeSlider-output-factor`]: `${outputFactor.value}`,
        }
    });

    let ariaDescribedBy = computed(() => {
        return describedBy.value.length ? describedBy.value.join(' ') : undefined;
    });

    let isSlot = computed(() => {
        return hasSlot;
    });

    function handleChange(event) {
        emit('change', parseFloat(event.target.value), props.id);
    }

    function clamp(number, min, max) {
        if (number < min) return min;
        if (number > max) return max;
        return number;
    }

    function invertNumber(number) {
        if (Math.sign(number) === 1) {
            return -Math.abs(number);
        } else if (Math.sign(number) === -1) {
            return Math.abs(number);
        } else {
            return 0;
        }
    }
</script>
