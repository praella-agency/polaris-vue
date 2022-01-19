<template>
    <PLabelled
        :id="id"
        :label="label"
        :error="error"
        :action="labelAction"
        :labelHidden="labelHidden"
        :helpText="helpText"
    >
        <div class="Polaris-RangeSlider-DualThumb__Wrapper">
            <div v-if="prefix || $slots.prefix" class="Polaris-RangeSlider-DualThumb__Prefix">
                <slot name="prefix">
                    {{ prefix }}
                </slot>
            </div>
            <div
                :class="trackWrapperClassName"
                @mousedown="handleMouseDownTrack"
                ref="trackWrapper"
            >
                <div class="Polaris-RangeSlider-DualThumb__Track" :style="cssVars"></div>
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
                    :aria-invalid="Boolean(error) || $slots.error"
                    :aria-describedby="ariaDescribedBy"
                    :aria-labelledby="`${id}Label`"
                    @focus="$emit('focus', event)"
                    @blur="$emit('blue', event)"
                    tabindex="0"
                    @keydown="handleKeyPressLower"
                    @mousedown="handleMouseDownThumbLower"
                    @touchStart="handleTouchStartThumbLower"
                    ref="thumbLower"
                ></div>
            </div>
        </div>
    </PLabelled>
</template>

<script>
    import { classNames } from '../../../../utilities/css';
    import { Key } from '../../../../types/keys';
    import { PLabelled } from '../../../../components/PLabelled';

    export default {
        name: 'PDualThumb',
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
                type: String,
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
                newValue: this.sanitizeValue(
                    this.value, this.min, this.max, this.step
                ),
                trackWidth: 0,
                trackLeft: 0,
                controlLower: 0,
                controlUpper: 1,
                range: this.max - this.min,
                idLower: this.id,
                idUpper: `${this.id}Upper`,
                describedBy: [],
            };
        },
        computed: {
            trackWrapperClassName() {
                return classNames(
                    'Polaris-RangeSlider-DualThumb__TrackWrapper',
                    (this.error || this.$slots.error) && 'Polaris-RangeSlider-DualThumb--error',
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
        },
        methods: {
            sanitizeValue(dirtyValue, min, max, step, control = this.controlUpper) {
                let upperValue = this.inBoundsUpper(this.roundedToStep(this.value[1]));
                let lowerValue = this.inBoundsLower(this.roundedToStep(this.value[0]));
                const maxLowerValue = upperValue - this.step;
                const minUpperValue = lowerValue + this.step;

                if (control === this.controlUpper && lowerValue > maxLowerValue) {
                    lowerValue = maxLowerValue;
                } else if (control === this.controlLower && upperValue < minUpperValue) {
                    upperValue = minUpperValue;
                }

                return [lowerValue, upperValue];
            },
            inBoundsUpper(value) {
                const lowerMin = min + this.step;

                if (value < lowerMin) {
                    return lowerMin;
                } else if (value > max) {
                    return max;
                } else {
                    return value;
                }
            },
            inBoundsLower(value) {
                const upperMax = max - this.step;

                if (value < min) {
                    return min;
                } else if (value > upperMax) {
                    return upperMax;
                } else {
                    return value;
                }
            },
            roundedToStep(value) {
                return Math.round(value / this.step) * this.step;
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
                if (this.$refs.track.current) {
                    const {min, max} = this.$props;
                    const {trackLeft, trackWidth} = this.state;

                    const relativeX = dirtyXPosition - trackLeft;
                    const percentageOfTrack = relativeX / trackWidth;

                    return percentageOfTrack * (max - min);
                } else {
                    return 0;
                }
            },
            setValue(dirtyValue, control) {
                const { min, max, step } = this.$props;
                const value = this.newValue;

                const sanitizedValue = this.sanitizeValue(dirtyValue, min, max, step, control);
                if (sanitizedValue !== value) {
                    this.$emit('change', value, this.id)
                    // this.newValue = this.dispatchValue;
                    // this.setState(
                    //     {
                    //         value: sanitizedValue,
                    //     },
                    //     this.dispatchValue,
                    // );
                }
            },
            registerMouseMoveHandler(event) {
                document.addEventListener('mousemove', event.handler);
                document.addEventListener(
                    'mouseup',
                    () => {
                        document.removeEventListener('mousemove', event.handler);
                    },
                    {once: true},
                );
            },
            registerTouchMoveHandler(event) {
                const removeHandler = () => {
                    document.removeEventListener('touchmove', event.handler);
                    document.removeEventListener('touchend', removeHandler);
                    document.removeEventListener('touchcancel', removeHandler);
                };

                document.addEventListener('touchmove', event.handler, {passive: false});
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
            }
        }
    }
</script>

<style scoped>

</style>