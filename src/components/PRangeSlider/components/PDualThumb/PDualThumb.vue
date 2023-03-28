<template>
    <div>
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
            <div class="Polaris-RangeSlider-DualThumb__Wrapper">
                <div v-if="prefix || isSlot(slots.prefix)" class="Polaris-RangeSlider-DualThumb__Prefix">
                    <slot name="prefix">
                        {{ prefix }}
                    </slot>
                </div>
                <div
                    :class="trackWrapperClassName"
                    @mousedown="handleMouseDownTrack"
                    ref="trackWrapper"
                >
                    <div class="Polaris-RangeSlider-DualThumb__Track" :style="cssVars" ref="track"></div>
                    <div class="Polaris-RangeSlider-DualThumb--trackDashed"></div>
                    <div
                        :id="idLower"
                        :class="thumbLowerClassName"
                        :style="{
                            left: `${leftPositionThumbLower}px`,
                        }"
                        role="slider"
                        :aria-disabled="disabled"
                        :aria-valuemin="min"
                        :aria-valuemax="max"
                        :aria-valuenow="newValue[0]"
                        :aria-invalid="Boolean(error) || isSlot(slots.error)"
                        :aria-describedby="ariaDescribedBy"
                        :aria-labelledby="`${id}Label`"
                        @focus="$emit('focus', $event)"
                        @blur="$emit('blur', $event)"
                        tabindex="0"
                        @keydown="handleKeyPressLower"
                        @mousedown="handleMouseDownThumbLower"
                        @touchstart="handleTouchStartThumbLower"
                        ref="thumbLower"
                    ></div>
                    <output
                        v-if="!disabled && output"
                        :for="idLower"
                        class="Polaris-RangeSlider-DualThumb__Output Polaris-RangeSlider-DualThumb__OutputLower"
                        :style="{
                            left: `${leftPositionThumbLower}px`
                        }"
                    >
                        <div class="Polaris-RangeSlider-DualThumb__OutputBubble">
                            <span class="Polaris-RangeSlider-DualThumb__OutputText">
                                {{ newValue[0] }}
                            </span>
                        </div>
                    </output>
                    <div
                        :id="idUpper"
                        :class="thumbUpperClassName"
                        :style="{
                            left: `${leftPositionThumbUpper}px`
                        }"
                        role="slider"
                        :aria-disabled="disabled"
                        :aria-valuemin="min"
                        :aria-valuemax="max"
                        :aria-valuenow="newValue[1]"
                        :aria-invalid="Boolean(error) || isSlot(slots.error)"
                        :aria-describedby="ariaDescribedBy"
                        :aria-labelledby="`${id}Label`"
                        @focus="$emit('focus', $event)"
                        @blur="$emit('blur', $event)"
                        tabindex="0"
                        @keydown="handleKeyPressUpper"
                        @mousedown="handleMouseDownThumbUpper"
                        @touchstart="handleTouchStartThumbUpper"
                        ref="thumbUpper"
                    ></div>
                    <output
                        v-if="!disabled && output"
                        :for="idUpper"
                        class="Polaris-RangeSlider-DualThumb__Output Polaris-RangeSlider-DualThumb__OutputUpper"
                        :style="{
                            left: `${leftPositionThumbUpper}px`
                        }"
                    >
                        <div class="Polaris-RangeSlider-DualThumb__OutputBubble">
                            <span class="Polaris-RangeSlider-DualThumb__OutputText">
                                {{ newValue[1] }}
                            </span>
                        </div>
                    </output>
                </div>
                <div v-if="suffix || isSlot(slots.suffix)" class="Polaris-RangeSlider-DualThumb__Suffix">
                    <slot name="suffix">
                        {{ suffix }}
                    </slot>
                </div>
            </div>
        </PLabelled>
        <PEventListener event="resize" :handler="setTrackPosition"/>
    </div>
</template>

<script setup>
    import { computed, onMounted, onUnmounted, ref, useSlots } from 'vue';
    import { hasSlot } from '../../../../ComponentHelpers';
    import { classNames } from '../../../../utilities/css';
    import { Key } from '../../../../types/keys';
    import { PLabelled } from '../../../../components/PLabelled';
    import { PEventListener } from '../../../../components/PEventListener';

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
         * Initial value for range input
         */
        value: {
            type: [Number, Array],
        },
        /**
         * Initial value for range input
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

    let trackWidth = ref(0);
    let trackLeft = ref(0);
    let controlLower = ref(0);
    let controlUpper = ref(1);
    let idLower = ref(props.id);
    let idUpper = ref(`${props.id}Upper`);
    let describedBy = ref([]);
    let trackWrapper = ref(null);
    let thumbLower = ref(null);
    let thumbUpper = ref(null);
    let track = ref(null);

    let computedVModel = computed(() => {
        return props.modelValue;
    });

    let trackWrapperClassName = computed(() => {
        return classNames('Polaris-RangeSlider-DualThumb__TrackWrapper',
            (props.error || hasSlot(slots.error)) && 'Polaris-RangeSlider-DualThumb--error',
            props.disabled && 'Polaris-RangeSlider-DualThumb--disabled',
        )
    });

    let thumbLowerClassName = computed(() => {
        return classNames('Polaris-RangeSlider-DualThumb__Thumbs',
            'Polaris-RangeSlider-DualThumb__ThumbLower',
            props.disabled && 'Polaris-RangeSlider-DualThumb--disabled',
        );
    });

    let thumbUpperClassName = computed(() => {
        return classNames('Polaris-RangeSlider-DualThumb__Thumbs',
            'Polaris-RangeSlider-DualThumb__ThumbUpper',
            props.disabled && 'Polaris-RangeSlider-DualThumb--disabled',
        );
    });

    let newValue = computed(() => {
        return sanitizeValue(computedVModel.value, props.min, props.max, props.step);
    });

    let range = computed(() => {
        return props.max - props.min;
    });

    let minValuePosition = computed(() => {
        return (props.min / range.value) * trackWidth.value;
    });

    let leftPositionThumbLower = computed(() => {
        return (newValue.value[0] / range.value) * trackWidth.value - minValuePosition.value;
    });

    let cssVars = computed(() => {
        return {
            [`--Polaris-RangeSlider-progress-lower`]: `${leftPositionThumbLower.value}px`,
            [`--Polaris-RangeSlider-progress-upper`]: `${leftPositionThumbUpper.value}px`,
        };
    });

    let leftPositionThumbUpper = computed(() => {
        return (newValue.value[1] / range.value) * trackWidth.value - minValuePosition.value;
    });

    let ariaDescribedBy = computed(() => {
        return describedBy.value.length ? describedBy.value.join(' ') : undefined;
    });

    let incrementValueLower = computed(() => {
        setValue([newValue.value[0] + props.step + newValue.value[1]], controlUpper.value);
    });

    let decrementValueLower = computed(() => {
        setValue([newValue.value[0] - props.step, newValue.value[1]], controlUpper.value);
    });

    let incrementValueUpper = computed(() => {
        setValue([newValue.value[0], newValue.value[1] + props.step], controlLower.value);
    });

    let decrementValueUpper = computed(() => {
        setValue([newValue.value[0], newValue.value[1] - props.step], controlLower.value);
    });

    let isSlot = computed(() => {
        return hasSlot;
    });

    onMounted(() => {
        trackWrapper = trackWrapper.value;
        thumbLower = thumbLower.value;
        thumbUpper = thumbUpper.value;
        track = track.value;
        setTrackPosition();

        if (trackWrapper != null) {
            trackWrapper.addEventListener(
                'touchstart',
                handleTouchStartTrack,
                { passive: false },
            );
        }
    });

    onUnmounted(() => {
        if (trackWrapper != null) {
            trackWrapper.removeEventListener(
                'touchstart',
                handleTouchStartTrack,
            );
        }
    });

    function sanitizeValue(value, min, max, step, control = controlUpper.value) {
        let upperValue = inBoundsUpper(roundedToStep(value[1], step), min, max, step);
        let lowerValue = inBoundsLower(roundedToStep(value[0], step), min, max, step);
        const maxLowerValue = upperValue - step;
        const minUpperValue = lowerValue + step;

        if (control === controlUpper.value && lowerValue > maxLowerValue) {
            lowerValue = maxLowerValue;
        } else if (control === controlLower.value && upperValue < minUpperValue) {
            upperValue = minUpperValue;
        }

        return [lowerValue, upperValue];
    }

    function inBoundsUpper(value, min, max, step) {
        const lowerMin = min + step;

        if (value < lowerMin) {
            return lowerMin;
        } else if (value > max) {
            return max;
        } else {
            return value;
        }
    }

    function inBoundsLower(value, min, max, step) {
        const upperMax = max - step;

        if (value < min) {
            return min;
        } else if (value > upperMax) {
            return upperMax;
        } else {
            return value;
        }
    }

    function roundedToStep(value, step) {
        return Math.round(value / step) * step;
    }

    function handleMouseDownTrack(event) {
        if (event.button !== 0 || props.disabled)
            return;

        event.preventDefault();

        const clickXPosition = actualXPosition(event.clientX);
        const value = newValue.value;
        const distanceFromLowerThumb = Math.abs(value[0] - clickXPosition);
        const distanceFromUpperThumb = Math.abs(value[1] - clickXPosition);

        if (distanceFromLowerThumb <= distanceFromUpperThumb) {
            setValue([clickXPosition, value[1]], controlUpper.value);
            registerMouseMoveHandler(handleMouseMoveThumbLower);

            if (thumbLower != null) {
                thumbLower.focus();
            }
        } else {
            setValue([value[0], clickXPosition], controlLower.value);
            registerMouseMoveHandler(handleMouseMoveThumbUpper);

            if (thumbUpper != null) {
                thumbUpper.focus();
            }
        }
    }

    function actualXPosition(dirtyXPosition) {
        if (track) {
            const {min, max} = props;

            const relativeX = dirtyXPosition - trackLeft.value;
            const percentageOfTrack = relativeX / trackWidth.value;

            return percentageOfTrack * (max - min);
        } else {
            return 0;
        }
    }

    function setValue(dirtyValue, control) {
        const {min, max, step} = props;
        const value = newValue.value;

        const sanitizedValue = sanitizeValue(dirtyValue, min, max, step, control);
        if (sanitizedValue !== value) {
            emit('change', sanitizedValue, props.id);
        }
    }

    function registerMouseMoveHandler(event) {
        document.addEventListener('mousemove', event);
        document.addEventListener(
            'mouseup',
            () => {
                document.removeEventListener('mousemove', event);
            },
            {once: true},
        );
    }

    function registerTouchMoveHandler(event) {
        const removeHandler = () => {
            document.removeEventListener('touchmove', event);
            document.removeEventListener('touchend', removeHandler);
            document.removeEventListener('touchcancel', removeHandler);
        };

        document.addEventListener('touchmove', event, {passive: false});
        document.addEventListener('touchend', removeHandler, {once: true});
        document.addEventListener('touchcancel', removeHandler, {once: true});
    }

    function handleMouseMoveThumbLower(event) {
        const valueUpper = newValue.value[1];
        setValue([actualXPosition(event.clientX), valueUpper], controlUpper.value);
    }

    function handleMouseMoveThumbUpper(event) {
        const valueLower = newValue.value[0];
        setValue([valueLower, actualXPosition(event.clientX)], controlLower.value);
    }

    function handleTouchMoveThumbLower(event) {
        event.preventDefault();
        const valueUpper = newValue.value[1];
        setValue([actualXPosition(event.touches[0].clientX), valueUpper], controlUpper.value);
    }

    function handleTouchMoveThumbUpper(event) {
        event.preventDefault();
        const valueLower = newValue.value[0];
        setValue([valueLower, actualXPosition(event.touches[0].clientX)], controlLower.value);
    }

    function handleKeyPressLower(event) {
        if (props.disabled) return;
        const incrementValueLower = incrementValueLower.value;
        const decrementValueLower = decrementValueLower.value;

        const handlerMap = {
            [Key.UpArrow]: incrementValueLower,
            [Key.RightArrow]: incrementValueLower,
            [Key.DownArrow]: decrementValueLower,
            [Key.LeftArrow]: decrementValueLower,
        };

        const handler = handlerMap[event.keyCode];

        if (handler != null) {
            event.preventDefault();
            event.stopPropagation();
            handler();
        }
    }

    function handleMouseDownThumbLower(event) {
        if (event.button !== 0 || props.disabled) return;
        registerMouseMoveHandler(handleMouseMoveThumbLower);
        event.stopPropagation();
    }

    function handleTouchStartThumbLower(event) {
        if (props.disabled) return;
        registerTouchMoveHandler(handleTouchMoveThumbLower);
        event.stopPropagation();
    }

    function handleKeyPressUpper(event) {
        if (props.disabled) return;
        const incrementValueUpper = incrementValueUpper.value;
        const decrementValueUpper = decrementValueUpper.value;

        const handlerMap = {
            [Key.UpArrow]: incrementValueUpper,
            [Key.RightArrow]: incrementValueUpper,
            [Key.DownArrow]: decrementValueUpper,
            [Key.LeftArrow]: decrementValueUpper,
        };

        const handler = handlerMap[event.keyCode];

        if (handler != null) {
            event.preventDefault();
            event.stopPropagation();
            handler();
        }
    }

    function handleMouseDownThumbUpper(event) {
        if (event.button !== 0 || props.disabled) return;
        registerMouseMoveHandler(handleMouseMoveThumbUpper);
        event.stopPropagation();
    }

    function handleTouchStartThumbUpper(event) {
        if (props.disabled) return;
        registerTouchMoveHandler(handleTouchMoveThumbUpper);
        event.stopPropagation();
    }

    function handleTouchStartTrack(event) {
        if (props.disabled) return;
        event.preventDefault();
        const clickXPosition = actualXPosition(event.touches[0].clientX);
        const value = newValue.value
        const distanceFromLowerThumb = Math.abs(value[0] - clickXPosition);
        const distanceFromUpperThumb = Math.abs(value[1] - clickXPosition);

        if (distanceFromLowerThumb <= distanceFromUpperThumb) {
            setValue([clickXPosition, value[1]], controlUpper.value);
            registerTouchMoveHandler(handleTouchMoveThumbLower);

            if (thumbLower != null) {
                thumbLower.focus();
            }
        } else {
            setValue([value[0], clickXPosition], Control.Lower);
            registerTouchMoveHandler(handleTouchMoveThumbUpper);

            if (thumbUpper != null) {
                thumbUpper.focus();
            }
        }
    }

    function setTrackPosition() {
        if (track) {
            const thumbSize = 16;

            const {width, left} = track.getBoundingClientRect();
            const adjustedTrackWidth = width - thumbSize;
            const adjustedTrackLeft = left + thumbSize / 2;

            const range = props.max - props.min;
            const minValuePosition = (props.min / range) * adjustedTrackWidth;

            trackWidth.value = adjustedTrackWidth;
            trackLeft.value = adjustedTrackLeft - minValuePosition;
        }
    }
</script>
