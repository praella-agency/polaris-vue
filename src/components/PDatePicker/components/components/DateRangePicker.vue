<template>
    <div class="vue-daterange-picker"
         v-p-click-outside="clickCancel"
         :class="{ inline: opens === 'inline' }"
         :style="styles"
    >
        <div
            :class="controlContainerClass"
            @click="onClickPicker"
            ref="toggle"
        >
            <!--
              Allows you to change the input which is visible before the picker opens

              @param {Date} startDate - current startDate
              @param {Date} endDate - current endDate
              @param {object} ranges - object with ranges
              @param {string} rangeText - the calculated rangeText string
            -->
            <slot
                name="input"
                :startDate="start"
                :endDate="end"
                :ranges="ranges"
                :rangeText="rangeText"
            >
                <i class="glyphicon glyphicon-calendar fa fa-calendar"></i>&nbsp;
                <span>{{rangeText}}</span>
                <b class="caret"></b>
            </slot>
        </div>
        <transition name="slide-fade" mode="out-in">
            <div
                class="PDateRangePicker daterangepicker ltr"
                :class="pickerStyles"
                v-if="open || opens === 'inline'"
                ref="dropdown"
            >

                <!--
                  Optional header slot (same props as footer) @see footer slot for documentation
                -->
                <slot name="header"
                      :rangeText="rangeText"
                      :locale="locale"
                      :clickCancel="clickCancel"
                      :clickApply="clickedApply"
                      :in_selection="in_selection"
                      :autoApply="autoApply"
                >
                </slot>

                <div class="calendars">
                    <!--
                      Allows you to change the range

                      @param {Date} startDate - current startDate
                      @param {Date} endDate - current endDate
                      @param {object} ranges - object with ranges
                      @param {Fn} clickRange(dateRange) - call to select the dateRange - any two date objects or an object from tha ranges array
                    -->
                    <slot
                        name="ranges"
                        :startDate="start"
                        :endDate="end"
                        :ranges="ranges"
                        :clickRange="clickRange"
                        v-if="showRanges"
                    >
                        <calendar-ranges
                            @clickRange="clickRange"
                            @showCustomRange="showCustomRangeCalendars=true"
                            :always-show-calendars="alwaysShowCalendars"
                            :locale-data="locale"
                            :ranges="ranges"
                            :selected="{ startDate: start, endDate: end }"
                        ></calendar-ranges>
                    </slot>

                    <div class="calendars-container" v-if="showCalendars">
                        <div class="drp-calendar col left" :class="{single: singleDatePicker}">
                            <div class="daterangepicker_input d-none d-sm-block" v-if="false">
                                <input class="input-mini form-control" type="text" name="daterangepicker_start"
                                       :value="startText"/>
                                <i class="fa fa-calendar glyphicon glyphicon-calendar"></i>
                            </div>
                            <div class="calendar-table">
                                <calendar :monthDate="monthDate"
                                          :locale-data="locale"
                                          :start="start" :end="end"
                                          :minDate="min" :maxDate="max"
                                          :show-dropdowns="showDropdowns"

                                          @change-month="changeLeftMonth"
                                          :date-format="dateFormatFn"

                                          @dateClick="dateClick" @hoverDate="hoverDate"
                                          :showWeekNumbers="showWeekNumbers"
                                >
                                    <slot name="date" v-bind="data"></slot>
                                </calendar>
                            </div>
                            <calendar-time v-if="timePicker && start"
                                           @update="onUpdateStartTime"
                                           :miniute-increment="timePickerIncrement"
                                           :hour24="timePicker24Hour"
                                           :second-picker="timePickerSeconds"
                                           :current-time="start"
                                           :readonly="readonly"
                            />
                        </div>

                        <div class="drp-calendar col right" v-if="!singleDatePicker">
                            <div class="daterangepicker_input" v-if="false">
                                <input class="input-mini form-control" type="text" name="daterangepicker_end"
                                       :value="endText"/>
                                <i class="fa fa-calendar glyphicon glyphicon-calendar"></i>
                            </div>
                            <div class="calendar-table">
                                <calendar :monthDate="nextMonthDate"
                                          :locale-data="locale"
                                          :start="start" :end="end"
                                          :minDate="min" :maxDate="max"
                                          :show-dropdowns="showDropdowns"

                                          @change-month="changeRightMonth"
                                          :date-format="dateFormatFn"

                                          @dateClick="dateClick" @hoverDate="hoverDate"
                                          :showWeekNumbers="showWeekNumbers"
                                >
                                    <!--
                                      Allows you to change date cell slot. By default it renders the day number

                                      @param {Date} date - the date being rendered into the table cell
                                    -->
                                    <slot name="date" v-bind="data"></slot>
                                </calendar>
                            </div>
                            <calendar-time v-if="timePicker && end"
                                           @update="onUpdateEndTime"
                                           :miniute-increment="timePickerIncrement"
                                           :hour24="timePicker24Hour"
                                           :second-picker="timePickerSeconds"
                                           :current-time="end"
                                           :readonly="readonly"
                            />
                        </div>
                    </div>
                </div>
                <!--
                  Allows you to change footer of the component (where the buttons are)

                  @param {string} rangeText - the formatted date range by the component
                  @param {object} locale - the locale object @see locale prop
                  @param {function} clickCancel - function which is called when you want to cancel the range picking and reset old values
                  @param {function} clickApply -function which to call when you want to apply the selection
                  @param {boolean} in_selection - is the picker in selection mode
                  @param {boolean} autoApply - value of the autoApply prop (whether to select immediately)
                -->
                <slot name="footer"
                      :rangeText="rangeText"
                      :locale="locale"
                      :clickCancel="clickCancel"
                      :clickApply="clickedApply"
                      :in_selection="in_selection"
                      :autoApply="autoApply"
                >
                    <div class="drp-buttons" v-if="!autoApply">
                        <span class="drp-selected" v-if="showCalendars">{{rangeText}}</span>
                        <button
                            class="cancelBtn btn btn-sm btn-secondary"
                            type="button"
                            @click="clickCancel"
                            v-if="!readonly"
                        >{{locale.cancelLabel}}
                        </button>
                        <button
                            class="applyBtn btn btn-sm btn-success"
                            :disabled="in_selection"
                            type="button"
                            @click="clickedApply"
                            v-if="!readonly"
                        >{{locale.applyLabel}}
                        </button>
                    </div>
                </slot>
            </div>
        </transition>
    </div>
</template>

<script setup>
    import { computed, ref, watch } from 'vue';
    import useDateUtil from './dateUtilMixin';
    import Calendar from './Calendar.vue'
    import CalendarTime from './CalendarTime.vue'
    import CalendarRanges from './CalendarRanges.vue'
    import DateUtil from './date_util/native'

    let props = defineProps({
        styles: {
            type: Object,
        },
        modelValue: {
            type: Object,
        },
        /**
         * minimum date allowed to be selected
         * @default null
         */
        minDate: {
            type: [String, Date],
            default() {
                return null
            }
        },
        /**
         * maximum date allowed to be selected
         * @default null
         */
        maxDate: {
            type: [String, Date],
            default() {
                return null
            }
        },
        /**
         * Show the week numbers on the left side of the calendar
         */
        showWeekNumbers: {
            type: Boolean,
            default: false,
        },
        /**
         * Each calendar has separate navigation when this is false
         */
        linkedCalendars: {
            type: Boolean,
            default: true,
        },
        /**
         * Only show a single calendar, with or without ranges.
         *
         * Set true or 'single' for a single calendar with no ranges, single dates only.
         * Set 'range' for a single calendar WITH ranges.
         * Set false for a double calendar with ranges.
         */
        singleDatePicker: {
            type: [Boolean, String],
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
         * Show the dropdowns for time (hour/minute) selection below the calendars
         */
        timePicker: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines the increment of minutes in the minute dropdown
         */
        timePickerIncrement: {
            type: Number,
            default: 5,
        },
        /**
         * Use 24h format for the time
         */
        timePicker24Hour: {
            type: Boolean,
            default: true,
        },
        /**
         * Allows you to select seconds except hour/minute
         */
        timePickerSeconds: {
            type: Boolean,
            default: false,
        },
        /**
         * Auto apply selected range. If false you need to click an apply button
         */
        autoApply: {
            type: Boolean,
            default: false,
        },
        /**
         * Object containing locale data used by the picker. See example below the table
         *
         * @default *see below
         */
        localeData: {
            type: Object,
            default() {
                return {}
            },
        },
        /**
         * This is the v-model prop which the component uses. This should be an object containing startDate and endDate props.
         * Each of the props should be a string which can be parsed by Date, or preferably a Date Object.
         * @default {
         * startDate: null,
         * endDate: null
         * }
         */
        dateRange: { // for v-model
            type: [Object],
            default: null,
            required: true
        },
        /**
         * You can set this to false in order to hide the ranges selection. Otherwise it is an object with key/value. See below
         * @default *see below
         */
        ranges: {
            type: [Object, Boolean],
            default() {
                let today = new Date()
                today.setHours(0, 0, 0, 0)
                let todayEnd = new Date()
                todayEnd.setHours(11, 59, 59, 999);

                let yesterdayStart = new Date()
                yesterdayStart.setDate(today.getDate() - 1)
                yesterdayStart.setHours(0, 0, 0, 0);

                let yesterdayEnd = new Date()
                yesterdayEnd.setDate(today.getDate() - 1)
                yesterdayEnd.setHours(11, 59, 59, 999);

                let thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
                let thisMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0, 11, 59, 59, 999);

                return {
                    'Today': [today, todayEnd],
                    'Yesterday': [yesterdayStart, yesterdayEnd],
                    'This month': [thisMonthStart, thisMonthEnd],
                    'This year': [
                        new Date(today.getFullYear(), 0, 1),
                        new Date(today.getFullYear(), 11, 31, 11, 59, 59, 999)
                    ],
                    'Last month': [
                        new Date(today.getFullYear(), today.getMonth() - 1, 1),
                        new Date(today.getFullYear(), today.getMonth(), 0, 11, 59, 59, 999)
                    ],
                }
            }
        },
        /**
         * which way the picker opens - "center", "left", "right" or "inline"
         */
        opens: {
            type: String,
            default: 'center'
        },
        /**
         function(classes, date) - special prop type function which accepts 2 params:
         "classes" - the classes that the component's logic has defined,
         "date" - tha date currently processed.
         You should return Vue class object which should be applied to the date rendered.
         */
        dateFormat: Function,
        /**
         * If set to false and one of the predefined ranges is selected then calendars are hidden.
         * If no range is selected or you have clicked the "Custom ranges" then the calendars are shown.
         */
        alwaysShowCalendars: {
            type: Boolean,
            default: true
        },
        /**
         * Disabled state. If true picker do not popup on click.
         */
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * Class of html picker control container
         */
        controlContainerClass: {
            type: [Object, String],
            default: ''
        },
        /**
         * Append the dropdown element to the end of the body
         * and size/position it dynamically. Use it if you have
         * overflow or z-index issues.
         * @type {Boolean}
         */
        appendToBody: {
            type: Boolean,
            default: false
        },
        /**
         * When `appendToBody` is true, this function is responsible for
         * positioning the drop down list.
         *
         * If a function is returned from `calculatePosition`, it will
         * be called when the drop down list is removed from the DOM.
         * This allows for any garbage collection you may need to do.
         *
         * @since v0.5.1
         */
        calculatePosition: {
            type: Function,
            /**
             * @param dropdownList {HTMLUListElement}
             * @param component {Vue} current instance of vue date range picker
             * @param width {int} calculated width in pixels of the dropdown menu
             * @param top {int} absolute position top value in pixels relative to the document
             * @param left {int} absolute position left value in pixels relative to the document
             * @param right {int} absolute position right value in pixels relative to the document
             * @return {function|void}
             */
            default(dropdownList, component, {width, top, left, right}) {
                // which way the picker opens - "center", "left" or "right"
                if (component.opens === 'center') {
                    // console.log('center open', left, width)
                    dropdownList.style.left = (left + width / 2) + 'px'
                } else if (component.opens === 'left') {
                    // console.log('left open', right, width)
                    dropdownList.style.right = (window.innerWidth - right) + 'px'
                } else if (component.opens === 'right') {
                    // console.log('right open')
                    dropdownList.style.left = (left) + 'px'
                }
                dropdownList.style.top = top + 'px'
                // dropdownList.style.width = width + 'px'
            }
        },
        /**
         * Whether to close the dropdown on "esc"
         */
        closeOnEsc: {
            type: Boolean,
            default: true
        },
        /**
         * Makes the picker readonly. No button in footer. No ranges. Cannot change.
         */
        readonly: {
            type: Boolean
        }
    });

    const emits = defineEmits(['update:modelValue', 'toggle', 'hoverDate', 'startSelection', 'select', 'change-month', 'finishSelection']);

    let data = ref(null);
    console.log('data', data);

    const { $dateUtil } = useDateUtil();

    let showRanges = computed(() => {
        return props.ranges !== false && !props.readonly
    });

    let showCalendars = computed(() => {
        return props.alwaysShowCalendars || this.showCustomRangeCalendars
    });

    let startText = computed(() => {
        if (this.start === null)
            return ''
        return $dateUtil.value.format(this.start, this.locale.format)
    });

    let endText = computed(() => {
        if (this.end === null)
            return ''
        return $dateUtil.value.format(this.end, this.locale.format)
    });

    let rangeText = computed(() => {
        let range = startText.value;
        if (!props.singleDatePicker || props.singleDatePicker === 'range') {
            range += this.locale.separator + endText.value;
        }
        return range;
    });

    let min = computed(() => {
        return props.minDate ? new Date(props.minDate) : null
    });

    let max = computed(() => {
        return props.maxDate ? new Date(props.maxDate) : null
    });

    let pickerStyles = computed(() => {
        return {
            'show-calendar': this.open || this.opens === 'inline',
            'show-ranges': showRanges.value,
            'show-weeknumbers': props.showWeekNumbers,
            single: props.singleDatePicker,
            ['opens' + this.opens]: true,
            linked: props.linkedCalendars,
            'hide-calendars': !showCalendars.value
        }
    });

    let isClear = computed(() => {
        return !props.dateRange.startDate || !props.dateRange.endDate
    });

    let isDirty = computed(() => {
        let origStart = new Date(props.dateRange.startDate)
        let origEnd = new Date(props.dateRange.endDate)

        return !isClear.value && (this.start.getTime() !== origStart.getTime() || this.end.getTime() !== origEnd.getTime())
    });

    function getData() {
        //copy locale data object
        const util = DateUtil;
        let data = {locale: util.localeData({...props.localeData})}

        let startDate = props.dateRange.startDate || null;
        let endDate = props.dateRange.endDate || null;

        data.monthDate = startDate ? new Date(startDate) : new Date()
        //get next month date
        data.nextMonthDate = util.nextMonth(data.monthDate)

        data.start = startDate ? new Date(startDate) : null
        if (props.singleDatePicker && props.singleDatePicker !== 'range') {
            // ignore endDate for singleDatePicker
            data.end = data.start
        } else {
            data.end = endDate ? new Date(endDate) : null
        }
        data.in_selection = false
        data.open = false
        //When alwaysShowCalendars = false and custom range is clicked
        data.showCustomRangeCalendars = false

        // update day names order to firstDay
        if (data.locale.firstDay !== 0) {
            let iterator = data.locale.firstDay
            let weekDays = [...data.locale.daysOfWeek]
            while (iterator > 0) {
                weekDays.push(weekDays.shift())
                iterator--
            }
            data.locale.daysOfWeek = weekDays
        }
        return data;
    }

    function dateFormatFn(classes, date) {
        let dt = new Date(date)
        dt.setHours(0, 0, 0, 0)
        let start = new Date(this.start)
        start.setHours(0, 0, 0, 0)
        let end = new Date(this.end)
        end.setHours(0, 0, 0, 0)

        classes['in-range'] = dt >= start && dt <= end

        return props.dateFormat ? props.dateFormat(classes, date) : classes
    }

    function changeLeftMonth(value) {
        let newDate = new Date(value.year, value.month - 1, 1);
        this.monthDate = newDate
        if (props.linkedCalendars || ($dateUtil.value.yearMonth(this.monthDate) >= $dateUtil.value.yearMonth(this.nextMonthDate))) {
            this.nextMonthDate = $dateUtil.value.validateDateRange($dateUtil.value.nextMonth(newDate), props.minDate, props.maxDate);
            if ((!props.singleDatePicker || props.singleDatePicker === 'range') && $dateUtil.value.yearMonth(this.monthDate) === $dateUtil.value.yearMonth(this.nextMonthDate)) {
                this.monthDate = $dateUtil.value.validateDateRange($dateUtil.value.prevMonth(this.monthDate), props.minDate, props.maxDate)
            }
        }
        /**
         * Emits event when the viewing month is changes. The second param is the index of the calendar.
         *
         * @param {monthDate} date displayed (first day of the month)
         * @param calendarIndex int 0 - first(left) calendar, 1 - second(right) calendar
         */
        emit('change-month', this.monthDate, 0)
    }

    function changeRightMonth(value) {
        let newDate = new Date(value.year, value.month - 1, 1);
        this.nextMonthDate = newDate
        if (props.linkedCalendars || ($dateUtil.value.yearMonth(this.nextMonthDate) <= $dateUtil.value.yearMonth(this.monthDate))) {
            this.monthDate = $dateUtil.value.validateDateRange($dateUtil.value.prevMonth(newDate), props.minDate, props.maxDate);
            if ($dateUtil.value.yearMonth(this.monthDate) === $dateUtil.value.yearMonth(this.nextMonthDate)) {
                this.nextMonthDate = $dateUtil.value.validateDateRange($dateUtil.value.nextMonth(this.nextMonthDate), props.minDate, props.maxDate)
            }
        }
        emit('change-month', this.monthDate, 1)
    }

    function normalizeDatetime(value, oldValue) {
        let newDate = new Date(value);
        if (props.timePicker && oldValue) {
            newDate.setHours(oldValue.getHours());
            newDate.setMinutes(oldValue.getMinutes());
            newDate.setSeconds(oldValue.getSeconds());
            newDate.setMilliseconds(oldValue.getMilliseconds());
        }

        return newDate;
    }

    function dateClick(value) {
        if (props.readonly)
            return false
        if (this.in_selection) {
            this.in_selection = false
            this.end = normalizeDatetime(value, this.end);

            if (this.end < this.start) {
                this.in_selection = true
                this.start = normalizeDatetime(value, this.start);
                /**
                 * Emits event when the user clicks the first date and starts selection
                 *
                 * @param {Date} date the date clicked
                 */
                emit('startSelection', this.start)
            }
            if (!this.in_selection) {
                /**
                 * Emits event when the user clicks the second date and finishes selection
                 *
                 * @param {Date} date the date clicked
                 */
                emit('finishSelection', this.end)
                onSelect();
                if (props.autoApply)
                    clickedApply();
            }
        } else {
            this.start = normalizeDatetime(value, this.start);
            this.end = normalizeDatetime(value, this.end);
            if (!props.singleDatePicker || props.singleDatePicker === 'range') {
                this.in_selection = true
                emit('startSelection', this.start)
            } else {
                onSelect();
                if (props.autoApply)
                    clickedApply();
            }
        }
    }

    function hoverDate(value) {
        if (props.readonly)
            return false
        let dt = normalizeDatetime(value, this.end);
        if (this.in_selection && dt >= this.start)
            this.end = dt
        /**
         * Emits event when the mouse hovers a date
         * @param {Date} value the date that is being hovered
         */
        emit('hoverDate', value);
    }

    function onClickPicker() {
        if (!props.disabled) {
            togglePicker(null, true)
        }
    }

    function togglePicker(value, event) {
        if (typeof value === 'boolean') {
            this.open = value
        } else {
            this.open = !this.open
        }

        if (event === true)
            /**
             * Emits whenever the picker opens/closes
             * @param {boolean} open - the current state of the picker
             * @param {Function} togglePicker - function (show, event) which can be used to control the picker. where "show" is the new state and "event" is boolean indicating whether a new event should be raised
             */
            emit('toggle', this.open, togglePicker)

    }

    function clickedApply() {
        // this.open = false
        togglePicker(false, true)
        /**
         * Emits when the user selects a range from the picker and clicks "apply" (if autoApply is true).
         * @param {json} value - json object containing the dates: {startDate, endDate}
         */
        emit('update:modelValue', {
            startDate: this.start,
            endDate: props.singleDatePicker && props.singleDatePicker !== 'range' ? this.start : this.end
        })
    }

    function clickCancel() {
        if (this.open) {
            // reset start and end
            let startDate = props.dateRange.startDate
            let endDate = props.dateRange.endDate
            this.start = startDate ? new Date(startDate) : null
            this.end = endDate ? new Date(endDate) : null
            // this.open = false
            this.in_selection = false;
            togglePicker(false, true)
        }
    }

    function onSelect() {
        /**
         * Emits when the user selects a range from the picker.
         * @param {json} value - json object containing the dates: {startDate, endDate}
         */
        emit('select', {startDate: this.start, endDate: this.end})
    }

    function clickAway($event) {
        if ($event && $event.target &&
            !this.$el.contains($event.target) &&
            this.$refs.dropdown &&
            !this.$refs.dropdown.contains($event.target)) {
            clickCancel()
        }
    }

    function clickRange(value) {
        this.in_selection = false;

        if ($dateUtil.value.isValidDate(value[0]) && $dateUtil.value.isValidDate(value[1])) {
            this.start = $dateUtil.value.validateDateRange(new Date(value[0]), props.minDate, props.maxDate)
            this.end = $dateUtil.value.validateDateRange(new Date(value[1]), props.minDate, props.maxDate)
            changeLeftMonth({
                month: this.start.getMonth() + 1,
                year: this.start.getFullYear()
            })

            if (props.linkedCalendars === false) {
                changeRightMonth({
                    month: this.end.getMonth() + 1,
                    year: this.end.getFullYear()
                })
            }
        } else {
            this.start = null
            this.end = null
        }

        onSelect();

        if (props.autoApply)
            clickedApply()
    }

    function onUpdateStartTime(value) {
        let start = new Date(this.start);
        start.setHours(value.hours);
        start.setMinutes(value.minutes);
        start.setSeconds(value.seconds);

        this.start = $dateUtil.value.validateDateRange(start, props.minDate, props.maxDate);

        // if autoapply is ON we should update the value on time selection change
        if (props.autoApply) {
            emit('update:modelValue', {
                startDate: this.start,
                endDate: props.singleDatePicker && props.singleDatePicker !== 'range' ? this.start : this.end
            })
        }
    }

    function onUpdateEndTime(value) {
        let end = new Date(this.end);
        end.setHours(value.hours);
        end.setMinutes(value.minutes);
        end.setSeconds(value.seconds);

        this.end = $dateUtil.value.validateDateRange(end, props.minDate, props.maxDate);

        // if autoapply is ON we should update the value on time selection change
        if (props.autoApply) {
            emit('update:modelValue', {startDate: this.start, endDate: this.end})
        }
    }

    function handleEscape(e) {
        if (this.open && e.keyCode === 27 && props.closeOnEsc) {
            clickCancel()
        }
    }

    watch(() => props.minDate, () => {
        let dt = $dateUtil.value.validateDateRange(this.monthDate, props.minDate || new Date(), props.maxDate)
        changeLeftMonth({year: dt.getFullYear(), month: dt.getMonth() + 1})
    });

    watch(() => props.maxDate , () => {
        let dt = $dateUtil.value.validateDateRange(this.nextMonthDate, props.minDate, props.maxDate || new Date())
        changeRightMonth({year: dt.getFullYear(), month: dt.getMonth() + 1})
    });

    watch(() => props.dateRange.startDate, (value) => {
        if (!$dateUtil.value.isValidDate(new Date(value)))
            return

        this.start = (!!value && !isClear.value && $dateUtil.value.isValidDate(new Date(value))) ? new Date(value) : null
        if (isClear.value) {
            this.start = null
            this.end = null
        } else {
            this.start = new Date(props.dateRange.startDate)
            this.end = new Date(props.dateRange.endDate)
            //set new monthDate after change of start Date
            // console.log('new monthdate', this.start)
            // this.monthDate = this.start
        }
    });

    watch(() => props.dateRange.endDate, (value) => {
        if (!$dateUtil.value.isValidDate(new Date(value)))
            return

        this.end = (!!value && !isClear.value) ? new Date(value) : null
        if (isClear.value) {
            this.start = null
            this.end = null
        } else {
            this.start = new Date(props.dateRange.startDate)
            this.end = new Date(props.dateRange.endDate)
        }
    });

    watch(() => open, (value) => {
        if (typeof document === "object") {
            this.$nextTick(() => {
                value ? document.body.addEventListener('click', this.clickAway) : document.body.removeEventListener('click', this.clickAway)
                value ? document.addEventListener('keydown', this.handleEscape) : document.removeEventListener('keydown', this.handleEscape)

                if (!props.alwaysShowCalendars && props.ranges) {
                    this.showCustomRangeCalendars = !Object.keys(props.ranges)
                        .find(key => $dateUtil.value.isSame(this.start, props.ranges[key][0], 'date') && $dateUtil.value.isSame(this.end, props.ranges[key][1], 'date'));
                }
            })
        }
    });
</script>