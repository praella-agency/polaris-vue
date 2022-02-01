<template>
    <div :class="labelHidden && 'Polaris-Labelled--hidden'">
        <div class="Polaris-Labelled__LabelWrapper" v-if="label || emptyLabel || $slots.hasOwnProperty('label')"
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
            v-bind="$attrs"
            v-model="computedValue"
            @update="updateValues"
            @toggle="checkOpen"
            :linkedCalendars="linkedCalendars"
            :style="pDatePickerButtonStyle"
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
                <PTextField v-if="!button" readOnly aria-readonly="true" :value="computedTextValue(picker)"
                            style="min-width:100%" labelHidden>
                    <template slot="suffix">
                        <PStack slot="suffix">
                            <PStackItem>
                                <PIcon source="CalendarMajor"/>
                            </PStackItem>
                            <PStackItem v-if="clearable">
                                <PIcon source="CircleCancelMinor" @click.stop="handleCancelClick"/>
                            </PStackItem>
                        </PStack>
                    </template>
                    <template v-if="showPrefix" slot="prefix">
                        {{ prefix }}
                    </template>
                </PTextField>
                <PButton icon="CalendarMajor" v-else>
                    <PStack>
                        <PStackItem style="padding: 2px 0;">
                            {{ computedTextValue(picker) }}
                        </PStackItem>
                        <PStackItem v-if="clearable">
                            <PIcon source="CircleCancelMinor" @click.stop="handleCancelClick"/>
                        </PStackItem>
                    </PStack>
                </PButton>
            </template>
            <template v-if="!autoApply" slot="footer" slot-scope="data" class="slot">
                <PStack distribution="equalSpacing" alignment="center">
                    <PStackItem>
                        <PButton @click="data.clickCancel" v-if="!data.in_selection">Cancel</PButton>
                    </PStackItem>
                    <PStackItem>
                        <PButtonGroup>
                            <PButton primary @click="data.clickApply" v-if="!data.in_selection">Apply</PButton>
                        </PButtonGroup>
                    </PStackItem>
                </PStack>
            </template>
        </DateRangePicker>
        <div class="Polaris-Labelled__HelpText" v-if="$slots.hasOwnProperty('helpText') || helpText">
            <!-- @slot Custom helpText -->
            <slot name="helpText">
                {{ helpText }}
            </slot>
        </div>
        <PFieldError v-if="error" :error="error"/>
    </div>
</template>

<script>
    import { classNames } from '../../utilities/css';
    import dayjs from 'dayjs';
    import { PIcon } from '../../components/PIcon';
    import { PFieldError } from '../../components/PFieldError';
    import { PButton } from '../../components/PButton';
    import { PButtonGroup } from '../../components/PButtonGroup';
    import { PStack } from '../../components/PStack';
    import { PStackItem } from '../../components/PStack/components/PStackItem';
    import { PCard } from '../../components/PCard';
    import { PSelect } from '../../components/PSelect';
    import { PTextField } from '../../components/PTextField';
    import ObjectValidator from '../../utilities/validators/ObjectValidator';

    const DateType = [Date, String];
    const DateRange = {
        type: [String, Object],
        properties: {
            startDate: {
                type: DateType,
                nullable: true,
            },
            endDate: {
                type: DateType,
                nullable: true,
            },
        },
    }

    const DateRangeInterface = {
        dateRange: DateRange,
    }

    const ValueInterface = {
        value: DateRange,
    }

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Date pickers let merchants choose dates from a visual calendar that’s consistently applied wherever
     *  dates need to be selected across Shopify.</h4>
     */
    export default {
        name: 'PDatePicker',
        components: {
            DateRangePicker: require('vue2-daterange-picker').default,
            PIcon, PFieldError, PButton, PButtonGroup, PStack, PStackItem, PCard, PSelect, PTextField,
        },
        props: {
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
                default: false,
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
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);

                    const yesterday = dayjs().add(-1, 'day').toDate();

                    return {
                        'Today': [today, today],
                        'Yesterday': [yesterday, yesterday],
                        'This week': [dayjs().startOf('week').add(1, 'day').toDate(), dayjs().endOf('week').toDate()],
                        'This month': [dayjs().startOf('month').add(1, 'day').toDate(), dayjs().endOf('month').toDate()],
                        'This year': [dayjs().startOf('year').add(1, 'day').toDate(), dayjs().endOf('year').toDate()],
                        'Last month': [dayjs().subtract(1, 'month').startOf('month').add(1, 'day').toDate(),
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
             * Element Value
             */
            value: {
                type: [String, Object],
                ...ObjectValidator('value', ValueInterface),
            },
        },
        data() {
            return {
                selectedRanges: null,
            };
        },
        computed: {
            className() {
                return classNames(
                    'Polaris-TextField__Input',
                );
            },
            computedRanges() {
                return !this.singleDatePicker ? this.ranges : false;
            },
            hasError() {
                return this.error && this.error.length > 0;
            },
            containerClass() {
                return classNames(
                    'Polaris-TextField',
                    this.hasError && 'Polaris-TextField--error',
                    Boolean(this.content) && 'Polaris-TextField--hasValue',
                    this.disabled && 'Polaris-TextField--disabled',
                    this.readOnly && 'Polaris-TextField--readOnly',
                );
            },
            pDatePickerButtonStyle() {
                if (this.button) {
                    return {
                        'min-width': '3.6rem',
                    };
                }
            },
            computedValue: {
                get() {
                    if (this.singleDatePicker) {
                        if (this.value) {
                            return {
                                startDate: typeof this.value === 'string' ? this.value : this.value.startDate,
                                endDate: typeof this.value === 'string' ? this.value : this.value.startDate,
                            };
                        } else if (this.dateRange) {
                            return {
                                startDate: typeof this.dateRange === 'string' ? this.dateRange : this.dateRange.startDate,
                                endDate: typeof this.dateRange === 'string' ? this.dateRange : this.dateRange.startDate,
                            };
                        }
                    } else {
                        if (this.value) {
                            return this.value;
                        } else if (this.dateRange) {
                            return this.dateRange;
                        }
                    }
                    return {startDate: null, endDate: null};
                },
                set(dateRange) {
                    this.content = dateRange;
                    /**
                     * Change date range
                     */
                    this.$emit('change', dateRange);
                    /**
                     * Emits when the input is triggered
                     */
                    this.$emit('input', dateRange);
                }
            },
            showPrefix() {
                return this.prefix || this.$slots.prefix;
            },
        },
        methods: {
            computedTextValue(picker) {
                if (!this.singleDatePicker) {
                    if (picker.startDate && picker.endDate) {
                        return (`${this.formatDate(picker.startDate)} - ${this.formatDate(picker.endDate)}`);
                    } else {
                        return this.placeholder;
                    }
                } else {
                    if (picker.startDate) {
                        return this.formatDate(picker.startDate);
                    } else {
                        return this.placeholder;
                    }
                }
            },
            updateValues(values) {
                /**
                 * Emits when the user selects a range from the picker
                 * and clicks "apply" (if autoApply is true).
                 * @param values {startDate, endDate}
                 */
                this.$emit('updateValues');
                this.$emit('change', values);
            },
            checkOpen() {
                /**
                 * Emits whenever the picker opens/closes
                 */
                this.$emit('checkOpen');
            },
            formatDate(date) {
                return dayjs(date).format(this.format);
            },
            rangeOptions(ranges) {
                return Object.keys(ranges);
            },
            changeRange(range, ranges) {
                if (typeof ranges.ranges[range] !== 'undefined') {
                    ranges.clickRange(ranges.ranges[range]);
                }
            },
            handleCancelClick(event) {
                event.stopPropagation();
                this.computedValue = {startDate: null, endDate: null};
            },
        },
        watch: {
            dateRange(dateRange) {
                this.content = dateRange;
            },
        },
    }
</script>

<style scoped>
    .vue-daterange-picker {
        min-width: 100%;
    }

    .date-date {
        background: orange;
    }
</style>
<style>
    .daterangepicker {
        border: none;
        box-shadow: -1px 0px 20px rgba(23, 24, 24, 0.05), 0px 1px 5px rgba(0, 0, 0, 0.15);
    }

    @media screen and (min-width: 339px) {
        .vue-daterange-picker div.daterangepicker.single.show-ranges.show-weeknumbers,
        .vue-daterange-picker div.daterangepicker.single.show-ranges {
            min-width: 250px;
        }
    }

    @media screen and (min-width: 768px) {
        .vue-daterange-picker div.daterangepicker.show-ranges.show-weeknumbers,
        .vue-daterange-picker div.daterangepicker.show-ranges {
            min-width: 500px;
        }
    }

    .daterangepicker .calendars {
        display: block;
        border-bottom: .1rem solid #e1e3e5;
    }

    .daterangepicker .Polaris-Stack {
        padding: 10px;
    }


    .daterangepicker td.in-range {
        background-color: #f2f7fe;
    }

    .daterangepicker td.active,
    .daterangepicker td.active:hover {
        background-color: #2c6ecb;
        color: #FFF;
    }

    .daterangepicker td:hover {
        background: #1f5199;
        color: #ffffff;
        outline: .1rem solid transparent;
    }

    .daterangepicker td.start-date {
        border-radius: 3rem 0 0 3rem;
    }

    .daterangepicker td.end-date {
        border-radius: 0 3rem 3rem 0;
    }
</style>
