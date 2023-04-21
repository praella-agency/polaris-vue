<template>
    <div :class="className">
        <div class="Polaris-Labelled__LabelWrapper"
             v-if="!floatingLabel && (label || emptyLabel || isSlot($slots.label))"
             :class="labelClass">
            <!-- @slot Display label for the element -->
            <slot name="label">
                <div class="Polaris-Label">
                    <label :id="`${id}Label`" :for="id" class="Polaris-Label__Text" v-html="emptyLabel?'&nbsp':label"/>
                </div>
            </slot>
        </div>
        <DateRangePicker
            ref="picker"
            :opens="opens"
            :controlContainerClass="containerClass"
            :readonly="readOnly"
            :disabled="disabled"
            :locale-data="{ firstDay: 1, format: 'dd-mm-yyyy HH:mm:ss' }"
            :minDate="minDate"
            :maxDate="maxDate"
            :singleDatePicker="singleDatePicker"
            :timePicker="timePicker"
            :timePicker24Hour="timePicker24Hour"
            :showWeekNumbers="showWeekNumbers"
            :showDropdowns="showDropdowns"
            :autoApply="autoApply"
            :closeOnEsc="closeOnEsc"
            :localeData="localeData"
            :ranges="computedRanges"
            :date-range="computedValue"
            v-bind="attrs"
            v-model="computedValue"
            @update="updateValues"
            @toggle="checkOpen"
            :linkedCalendars="linkedCalendars"
            :styles="pDatePickerButtonStyle"
        >
            <template #ranges="ranges">
                <PStack>
                    <PStackItem fill>
                        <PSelect label="Date range" v-model="selectedRanges" returnKey="returnValue"
                                 :options="rangeOptions(ranges.ranges)"
                                 @change="(range) => changeRange(range, ranges)"/>
                    </PStackItem>
                </PStack>
            </template>
            <template v-slot:input="picker" style="min-width: 100%">
                <PTextField
                    v-if="!button"
                    :floating-label="floatingLabel"
                    readOnly
                    aria-readonly="true"
                    :modelValue="computedTextValue(picker)"
                    :value="computedTextValue(picker)"
                    labelHidden
                    :error="hasError"
                    style="min-width:100%"
                >
                    <template #error>
                        <PVisuallyHidden>{{ error }}</PVisuallyHidden>
                    </template>
                    <template #label>
                        <slot name="label">
                            {{ label }}
                        </slot>
                    </template>
                    <template #suffix>
                      <PStack>
                        <PStackItem>
                          <PIcon source="CalendarMajor"/>
                        </PStackItem>
                        <PStackItem v-if="clearable">
                          <PIcon source="CircleCancelMinor" @click.stop="handleCancelClick"/>
                        </PStackItem>
                      </PStack>
                    </template>
                    <template #prefix v-if="showPrefix">
                        {{ prefix }}
                    </template>
                </PTextField>
                <button class="Polaris-Button" v-else>
                    <span class="Polaris-Button__Icon">
                        <PIcon source="CalendarMajor"/>
                    </span>
                    <span class="Polaris-Button__Text">
                        <PStack>
                            <PStackItem style="padding: 2px 0;">
                                {{ computedTextValue(picker) }}
                            </PStackItem>
                            <PStackItem v-if="clearable">
                                <PIcon source="CircleCancelMinor" @click="handleCancelClick"/>
                            </PStackItem>
                        </PStack>
                    </span>
                </button>
            </template>
            <template v-slot:footer="data" v-if="!autoApply" class="slot">
                <PStack v-show="!data.in_selection" distribution="equalSpacing" alignment="center">
                    <PStackItem>
                        <PButton @click="data.clickCancel">Cancel</PButton>
                    </PStackItem>
                    <PStackItem>
                        <PButton primary @click="data.clickApply">Apply</PButton>
                    </PStackItem>
                </PStack>
            </template>
        </DateRangePicker>
        <div class="Polaris-Labelled__HelpText" v-if="isSlot($slots.helpText) || helpText">
            <!-- @slot Custom helpText -->
            <slot name="helpText">
                {{ helpText }}
            </slot>
        </div>
        <PFieldError v-if="hasError" :error="error"/>
    </div>
</template>

<script setup>
    import { computed, ref, useAttrs, useSlots, watch } from 'vue';
    import { hasSlot } from '../../ComponentHelpers';
    import { classNames } from '../../utilities/css';
    import dayjs from 'dayjs';
    import { DateRangePicker } from './components/components';
    import { PIcon } from '../../components/PIcon';
    import { PFieldError } from '../../components/PFieldError';
    import { PButton } from '../../components/PButton';
    import { PStack } from '../../components/PStack';
    import { PStackItem } from '../../components/PStack/components/PStackItem';
    import { PSelect } from '../../components/PSelect';
    import { PTextField } from '../../components/PTextField';
    import { PVisuallyHidden } from '../PVisuallyHidden';
    import ObjectValidator from '../../utilities/validators/ObjectValidator';
    import { DateRangeInterface, ValueInterface } from '../variables';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Date pickers let merchants choose dates from a visual calendar that’s consistently applied wherever
     *  dates need to be selected across Shopify.</h4>
     */

    let props = defineProps({
        /**
         *  Show button as picker instead of input field
         */
        button: {
            type: Boolean,
            default: false,
        },
        /**
         *  Which way the picker opens. Works without button attribute
         */
        opens: {
            type: String,
            default: 'center',
        },
        /**
         * ID for the element
         */
        id: {
            type: [String, Number],
            required: true,
        },
        /**
         * Makes the picker readonly. No button in footer. No ranges. Cannot change.
         */
        readOnly: {
            type: Boolean,
            default: false,
        },
        /**
         * Disabled state. If true picker do not popup on click.
         */
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * Whether to close the dropdown on "esc"
         */
        closeOnEsc: {
            type: Boolean,
            default: true,
        },
        /**
         * Visually hide the label
         */
        labelHidden: {
            type: Boolean,
            default: false,
        },
        /**
         * Label for the element
         */
        label: {
            type: String,
            default: null,
        },
        /**
         * Label class for the element
         */
        labelClass: {
            type: String,
            default: null,
        },
        /**
         * Empty Label for the element
         */
        emptyLabel: {
            type: Boolean,
            default: false,
        },
        /**
         * Display an error message
         */
        error: {
            type: String,
            default: null,
        },
        /**
         * Define prefix for the element. Works without button attribute
         */
        prefix: {
            type: String,
            default: null,
        },
        /**
         * Minimum date allowed to be selected
         */
        minDate: {
            type: String,
            default: null,
        },
        /**
         * Maximum date allowed to be selected
         */
        maxDate: {
            type: String,
            default: null,
        },
        /**
         * Date format for the element
         */
        format: {
            type: String,
            default: 'MM/DD/YYYY',
        },
        /**
         * Only show a single calendar, with or without ranges.
         * Set true or 'single' for a single calendar with no ranges, single dates only.
         * Set 'range' for a single calendar WITH ranges.
         * Set false for a double calendar with ranges.
         */
        singleDatePicker: {
            type: [Boolean, String],
            default: true
        },
        /**
         * Show the dropdown for time (hour/minute) selection below the calendars
         */
        timePicker: {
            type: Boolean,
            default: false,
        },
        /**
         * Use 24h format for the time
         */
        timePicker24Hour: {
            type: Boolean,
            default: true,
        },
        /**
         * Show the week numbers on the left side of the calendar
         */
        showWeekNumbers: {
            type: Boolean,
            default: true,
        },
        /**
         * Show the dropdowns for month and year selection above the calendars
         */
        showDropdowns: {
            type: Boolean,
            default: false,
        },
        /**
         * You can set this to false in order to hide the ranges selection.
         * Otherwise it is an object with key/value.
         */
        ranges: {
            type: [Boolean, Object],
            default: () => {
                let today = new Date();
                today.setHours(0, 0, 0, 0);

                let yesterday = dayjs().add(-1, 'day').toDate();

                return {
                    'Today': [today, today],
                    'Yesterday': [yesterday, yesterday],
                    'This week': [dayjs().startOf('week').toDate(), dayjs().endOf('week').toDate()],
                    'This month': [dayjs().startOf('month').toDate(), dayjs().endOf('month').toDate()],
                    'This year': [dayjs().startOf('year').toDate(), dayjs().endOf('year').toDate()],
                    'Last month': [dayjs().subtract(1, 'month').startOf('month').toDate(),
                        dayjs().subtract(1, 'month').endOf('month').toDate()],
                };
            },
        },
        /**
         * Auto apply selected range. If false you need to click an apply button
         */
        autoApply: {
            type: Boolean,
            default: false,
        },
        /**
         * This should be an object containing startDate and endDate.
         */
        dateRange: {
            type: [String, Object],
            ...ObjectValidator('dateRange', DateRangeInterface),
        },
        /**
         * Each calendar has separate navigation when this is false
         */
        linkedCalendars: {
            type: Boolean,
            default: true,
        },
        /**
         * Object containing locale data used by the picker
         */
        localeData: {
            type: Object,
        },
        /**
         * Help text for the date picker
         */
        helpText: {
            type: String,
            default: null,
        },
        /**
         * Clear date
         */
        clearable: {
            type: Boolean,
            default: false,
        },
        /**
         * Containing a hint to the user of what can be entered in the control
         */
        placeholder: {
            type: String,
            default: '-',
        },
        /**
         * Element value
         */
        value: {
            type: [String, Object],
            ...ObjectValidator('value', ValueInterface),
        },
        /**
         * For Vue 3
         * Element model value
         */
        modelValue: {
            type: [String, Object],
            ...ObjectValidator('value', ValueInterface),
        },
        /**
         * Create beautifully simple form labels that float over your input fields
         */
        floatingLabel: {
            type: Boolean,
            default: false,
        }
    });

    const emit = defineEmits(['change', 'input', 'checkOpen', 'updateValues', 'update:modelValue']);
    let slots = useSlots();
    let attrs = useAttrs();
    let content = ref(null);
    let selectedRanges = ref(null);

    let computedVModel = computed(() => {
        return props.modelValue;
    });

    let className = computed(() => {
        return classNames(
            props.labelHidden && 'Polaris-Labelled--hidden',
            'Polaris-DatePicker',
        );
    });

    let computedRanges = computed(() => {
        return !props.singleDatePicker ? props.ranges : false;
    });

    let hasError = computed(() => {
        return props.error && props.error.length > 0;
    });

    let containerClass = computed(() => {
        return classNames(
            'Polaris-TextField',
            hasError.value && 'Polaris-TextField--error',
            Boolean(content.value) && 'Polaris-TextField--hasValue',
            props.disabled && 'Polaris-TextField--disabled',
            props.readOnly && 'Polaris-TextField--readOnly',
        );
    });

    let pDatePickerButtonStyle = computed(() => {
        if (props.button) {
            return {
                'min-width': '3.6rem',
            };
        }
    });

    let computedValue = computed({
        get() {
            if (props.singleDatePicker) {
                if (computedVModel.value) {
                    return {
                        startDate: typeof computedVModel.value === 'string' ? computedVModel.value : computedVModel.value.startDate,
                        endDate: typeof computedVModel.value === 'string' ? computedVModel.value : computedVModel.value.startDate,
                    };
                } else if (props.dateRange) {
                    return {
                        startDate: typeof props.dateRange === 'string' ? props.dateRange : props.dateRange.startDate,
                        endDate: typeof props.dateRange === 'string' ? props.dateRange : props.dateRange.startDate,
                    };
                }
            } else {
                if (computedVModel.value) {
                    return computedVModel.value;
                } else if (props.dateRange) {
                    return props.dateRange;
                }
            }
            return {startDate: null, endDate: null};
        },
        set(dateRange) {
            content.value = dateRange;
            /**
             * Change date range
             */
            emit('change', dateRange);
            /**
             * Emits when the input is triggered
             */
            emit('input', dateRange);
            /**
             * For Vue 3
             * Emits when the input is triggered
             * v-model
             * @ignore
             */
            emit('update:modelValue', dateRange);
        }
    });

    let showPrefix = computed(() => {
        return props.prefix || hasSlot(slots.prefix);
    });

    let isSlot = computed(() => {
        return hasSlot;
    });

    function computedTextValue(picker) {
        if (!props.singleDatePicker) {
            if (picker.startDate && picker.endDate) {
                let today = new Date();
                today.setHours(0, 0, 0, 0);
                let yesterday = dayjs().add(-1, 'day').toDate();

                if (picker.startDate.toLocaleDateString() === today.toLocaleDateString() &&
                    picker.endDate.toLocaleDateString() === today.toLocaleDateString()) {
                    return (`Today`);
                } else if (picker.startDate.toLocaleDateString() === yesterday.toLocaleDateString() &&
                    picker.endDate.toLocaleDateString() === yesterday.toLocaleDateString()) {
                    return (`Yesterday`);
                } else if (picker.startDate.toLocaleDateString() === dayjs().startOf('week').toDate().toLocaleDateString() &&
                    picker.endDate.toLocaleDateString() === dayjs().endOf('week').toDate().toLocaleDateString()) {
                    return (`This week`);
                } else if (picker.startDate.toLocaleDateString() === dayjs().startOf('month').toDate().toLocaleDateString() &&
                    picker.endDate.toLocaleDateString() === dayjs().endOf('month').toDate().toLocaleDateString()) {
                    return (`This month`);
                } else if (picker.startDate.toLocaleDateString() === dayjs().startOf('year').toDate().toLocaleDateString() &&
                    picker.endDate.toLocaleDateString() === dayjs().endOf('year').toDate().toLocaleDateString()) {
                    return (`This year`);
                } else if (picker.startDate.toLocaleDateString() === dayjs().subtract(1, 'month').startOf('month').toDate().toLocaleDateString() &&
                    picker.endDate.toLocaleDateString() === dayjs().subtract(1, 'month').endOf('month').toDate().toLocaleDateString()) {
                    return (`Last month`);
                } else {
                    return (`${formatDate(picker.startDate)} - ${formatDate(picker.endDate)}`);
                }
            } else {
                return !props.floatingLabel ? props.placeholder : null;
            }
        } else {
            if (picker.startDate) {
                return formatDate(picker.startDate);
            } else {
                return !props.floatingLabel ? props.placeholder : null;
            }
        }
    }

    function updateValues(values) {
        /**
         * Emits when the user selects a range from the picker
         * and clicks "apply" (if autoApply is true).
         * @param values {startDate, endDate}
         */
        emit('updateValues');
        emit('change', values);
    }

    function checkOpen() {
        /**
         * Emits whenever the picker opens/closes
         */
        emit('checkOpen');
    }

    function formatDate(date) {
        return dayjs(date).format(props.format);
    }

    function rangeOptions(ranges) {
        return Object.keys(ranges);
    }

    function changeRange(range, ranges) {
        if (typeof ranges.ranges[range] !== 'undefined') {
            ranges.clickRange(ranges.ranges[range]);
        }
    }

    function handleCancelClick(event) {
        event.stopPropagation();
        computedValue.value = {startDate: null, endDate: null};
    }

    watch(() => props.dateRange, (dateRange) => {
        content.value = dateRange;
    });
</script>
