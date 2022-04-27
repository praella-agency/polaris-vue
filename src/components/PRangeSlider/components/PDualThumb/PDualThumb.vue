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
                <div v-if="prefix || hasSlot($slots.prefix)" class="Polaris-RangeSlider-DualThumb__Prefix">
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
                            left: `${this.leftPositionThumbLower}px`,
                        }"
                        role="slider"
                        :aria-disabled="disabled"
                        :aria-valuemin="min"
                        :aria-valuemax="max"
                        :aria-valuenow="newValue[0]"
                        :aria-invalid="Boolean(error) || hasSlot($slots.error)"
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
                        :aria-invalid="Boolean(error) || hasSlot($slots.error)"
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
                <div v-if="suffix || hasSlot($slots.suffix)" class="Polaris-RangeSlider-DualThumb__Suffix">
                    <slot name="suffix">
                        {{ suffix }}
                    </slot>
                </div>
            </div>
        </PLabelled>
        <PEventListener event="resize" :handler="this.setTrackPosition"/>
    </div>
</template>

<script>
    import utils from '../../../../utilities';
    import { hasSlot } from '../../../../ComponentHelpers';
    import { classNames } from '../../../../utilities/css';
    import { Key } from '../../../../types/keys';
    import { PLabelled } from '../../../../components/PLabelled';
    import { PEventListener } from '../../../../components/PEventListener';

    export default {
        name: 'PDualThumb',
        components: {
            PLabelled, PEventListener,
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
        },
        emits: ['change', 'focus', 'blur'],
        data() {
            return {
                trackWidth: 0,
                trackLeft: 0,
                controlLower: 0,
                controlUpper: 1,
                idLower: this.id,
                idUpper: `${this.id}Upper`,
                describedBy: [],
            };
        },
        computed: {
            computedVModel() {
                if (utils.isVue3) {
                    return this.modelValue;
                }
                return this.value;
            },
            trackWrapperClassName() {
                return classNames(
                    'Polaris-RangeSlider-DualThumb__TrackWrapper',
                    (this.error || hasSlot(this.$slots.error)) && 'Polaris-RangeSlider-DualThumb--error',
                    this.disabled && 'Polaris-RangeSlider-DualThumb--disabled',
                )
            },
            thumbLowerClassName() {
                return classNames(
                    'Polaris-RangeSlider-DualThumb__Thumbs',
                    'Polaris-RangeSlider-DualThumb__ThumbLower',
                    this.disabled && 'Polaris-RangeSlider-DualThumb--disabled',
                );
            },
            thumbUpperClassName() {
                return classNames(
                    'Polaris-RangeSlider-DualThumb__Thumbs',
                    'Polaris-RangeSlider-DualThumb__ThumbUpper',
                    this.disabled && 'Polaris-RangeSlider-DualThumb--disabled',
                );
            },
            cssVars() {
                return {
                    [`--Polaris-RangeSlider-progress-lower`]: `${this.leftPositionThumbLower}px`,
                    [`--Polaris-RangeSlider-progress-upper`]: `${this.leftPositionThumbUpper}px`,
                };
            },
            newValue() {
                return this.sanitizeValue(this.computedVModel, this.min, this.max, this.step);
            },
            range() {
                return this.max - this.min;
            },
            minValuePosition() {
                return (this.min / this.range) * this.trackWidth;
            },
            leftPositionThumbLower() {
                return (this.newValue[0] / this.range) * this.trackWidth - this.minValuePosition;
            },
            leftPositionThumbUpper() {
                return (this.newValue[1] / this.range) * this.trackWidth - this.minValuePosition;
            },
            ariaDescribedBy() {
                return this.describedBy.length ? this.describedBy.join(' ') : undefined;
            },
            incrementValueLower() {
                this.setValue([this.newValue[0] + this.step + this.newValue[1]], this.controlUpper);
            },
            decrementValueLower() {
                this.setValue([this.newValue[0] - this.step, this.newValue[1]], this.controlUpper);
            },
            incrementValueUpper() {
                this.setValue([this.newValue[0], this.newValue[1] + this.step], this.controlLower);
            },
            decrementValueUpper() {
                this.setValue([this.newValue[0], this.newValue[1] - this.step], this.controlLower);
            },
            hasSlot() {
                return hasSlot;
            },
        },
        methods: {
            sanitizeValue(value, min, max, step, control = this.controlUpper) {
                let upperValue = this.inBoundsUpper(this.roundedToStep(value[1], step), min, max, step);
                let lowerValue = this.inBoundsLower(this.roundedToStep(value[0], step), min, max, step);
                const maxLowerValue = upperValue - step;
                const minUpperValue = lowerValue + step;

                if (control === this.controlUpper && lowerValue > maxLowerValue) {
                    lowerValue = maxLowerValue;
                } else if (control === this.controlLower && upperValue < minUpperValue) {
                    upperValue = minUpperValue;
                }

                return [lowerValue, upperValue];
            },
            inBoundsUpper(value, min, max, step) {
                const lowerMin = min + step;

                if (value < lowerMin) {
                    return lowerMin;
                } else if (value > max) {
                    return max;
                } else {
                    return value;
                }
            },
            inBoundsLower(value, min, max, step) {
                const upperMax = max - step;

                if (value < min) {
                    return min;
                } else if (value > upperMax) {
                    return upperMax;
                } else {
                    return value;
                }
            },
            roundedToStep(value, step) {
                return Math.round(value / step) * step;
            },
            handleMouseDownTrack(event) {
                if (event.button !== 0 || this.disabled)
                    return;

                event.preventDefault();

                const clickXPosition = this.actualXPosition(event.clientX);
                const value = this.newValue;
                const distanceFromLowerThumb = Math.abs(value[0] - clickXPosition);
                const distanceFromUpperThumb = Math.abs(value[1] - clickXPosition);

                if (distanceFromLowerThumb <= distanceFromUpperThumb) {
                    this.setValue([clickXPosition, value[1]], this.controlUpper);
                    this.registerMouseMoveHandler(this.handleMouseMoveThumbLower);

                    if (this.$refs.thumbLower != null) {
                        this.$refs.thumbLower.focus();
                    }
                } else {
                    this.setValue([value[0], clickXPosition], this.controlLower);
                    this.registerMouseMoveHandler(this.handleMouseMoveThumbUpper);

                    if (this.$refs.thumbUpper != null) {
                        this.$refs.thumbUpper.focus();
                    }
                }
            },
            actualXPosition(dirtyXPosition) {
                if (this.$refs.track) {
                    const {min, max} = this.$props;
                    const trackLeft = this.trackLeft;
                    const trackWidth = this.trackWidth;

                    const relativeX = dirtyXPosition - trackLeft;
                    const percentageOfTrack = relativeX / trackWidth;

                    return percentageOfTrack * (max - min);
                } else {
                    return 0;
                }
            },
            setValue(dirtyValue, control) {
                const {min, max, step} = this.$props;
                const value = this.newValue;

                const sanitizedValue = this.sanitizeValue(dirtyValue, min, max, step, control);
                if (sanitizedValue !== value) {
                    this.$emit('change', sanitizedValue, this.id);
                }
            },
            registerMouseMoveHandler(event) {
                document.addEventListener('mousemove', event);
                document.addEventListener(
                    'mouseup',
                    () => {
                        document.removeEventListener('mousemove', event);
                    },
                    {once: true},
                );
            },
            registerTouchMoveHandler(event) {
                const removeHandler = () => {
                    document.removeEventListener('touchmove', event);
                    document.removeEventListener('touchend', removeHandler);
                    document.removeEventListener('touchcancel', removeHandler);
                };

                document.addEventListener('touchmove', event, {passive: false});
                document.addEventListener('touchend', removeHandler, {once: true});
                document.addEventListener('touchcancel', removeHandler, {once: true});
            },
            handleMouseMoveThumbLower(event) {
                const valueUpper = this.newValue[1];
                this.setValue([this.actualXPosition(event.clientX), valueUpper], this.controlUpper);
            },
            handleMouseMoveThumbUpper(event) {
                const valueLower = this.newValue[0];
                this.setValue([valueLower, this.actualXPosition(event.clientX)], this.controlLower);
            },
            handleTouchMoveThumbLower(event) {
                event.preventDefault();
                const valueUpper = this.newValue[1];
                this.setValue([this.actualXPosition(event.touches[0].clientX), valueUpper], this.controlUpper);
            },
            handleTouchMoveThumbUpper(event) {
                event.preventDefault();
                const valueLower = this.newValue[0];
                this.setValue([valueLower, this.actualXPosition(event.touches[0].clientX)], this.controlLower);
            },
            handleKeyPressLower(event) {
                if (this.disabled) return;
                const incrementValueLower = this.incrementValueLower;
                const decrementValueLower = this.decrementValueLower;

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
            },
            handleMouseDownThumbLower(event) {
                if (event.button !== 0 || this.disabled) return;
                this.registerMouseMoveHandler(this.handleMouseMoveThumbLower);
                event.stopPropagation();
            },
            handleTouchStartThumbLower(event) {
                if (this.disabled) return;
                this.registerTouchMoveHandler(this.handleTouchMoveThumbLower);
                event.stopPropagation();
            },
            handleKeyPressUpper(event) {
                if (this.disabled) return;
                const incrementValueUpper = this.incrementValueUpper;
                const decrementValueUpper = this.decrementValueUpper;

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
            },
            handleMouseDownThumbUpper(event) {
                if (event.button !== 0 || this.disabled) return;
                this.registerMouseMoveHandler(this.handleMouseMoveThumbUpper);
                event.stopPropagation();
            },
            handleTouchStartThumbUpper(event) {
                if (this.disabled) return;
                this.registerTouchMoveHandler(this.handleTouchMoveThumbUpper);
                event.stopPropagation();
            },
            handleTouchStartTrack(event) {
                if (this.disabled) return;
                event.preventDefault();
                const clickXPosition = this.actualXPosition(event.touches[0].clientX);
                const value = this.newValue;
                const distanceFromLowerThumb = Math.abs(value[0] - clickXPosition);
                const distanceFromUpperThumb = Math.abs(value[1] - clickXPosition);

                if (distanceFromLowerThumb <= distanceFromUpperThumb) {
                    this.setValue([clickXPosition, value[1]], this.controlUpper);
                    this.registerTouchMoveHandler(this.handleTouchMoveThumbLower);

                    if (this.$refs.thumbLower != null) {
                        this.$refs.thumbLower.focus();
                    }
                } else {
                    this.setValue([value[0], clickXPosition], Control.Lower);
                    this.registerTouchMoveHandler(this.handleTouchMoveThumbUpper);

                    if (this.$refs.thumbUpper != null) {
                        this.$refs.thumbUpper.focus();
                    }
                }
            },
            setTrackPosition() {
                if (this.$refs.track) {
                    const thumbSize = 16;

                    const {width, left} = this.$refs.track.getBoundingClientRect();
                    const adjustedTrackWidth = width - thumbSize;
                    const adjustedTrackLeft = left + thumbSize / 2;

                    const range = this.max - this.min;
                    const minValuePosition = (this.min / range) * adjustedTrackWidth;

                    this.trackWidth = adjustedTrackWidth;
                    this.trackLeft = adjustedTrackLeft - minValuePosition;
                }
            }
        },
        mounted() {
            this.setTrackPosition();

            if (this.$refs.trackWrapper != null) {
                this.$refs.trackWrapper.addEventListener(
                    'touchstart',
                    this.handleTouchStartTrack,
                    {passive: false},
                );
            }
        },
        [utils.destroyed]() {
            if (this.$refs.trackWrapper != null) {
                this.$refs.trackWrapper.removeEventListener(
                    'touchstart',
                    this.handleTouchStartTrack,
                );
            }
        }
    }
</script>

<style scoped>

</style>