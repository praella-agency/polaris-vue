<template>
    <table class="table-condensed">
        <thead>
        <tr>
            <th class="prev available" @click="prevMonthClick" tabindex="0"><span/></th>
            <th
                v-if="showDropdowns"
                :colspan="showWeekNumbers ? 6 : 5"
                class="month"
            >
                <div class="row mx-1">
                    <select v-model="computedMonth" class="monthselect col">
                        <option v-for="(m, idx) in months" :key="idx" :value="m.value + 1" :disabled="!m.enabled">{{
                            m.label }}
                        </option>
                    </select>
                    <input ref="yearSelect" type="number" v-model="year" @blur="checkYear" class="yearselect col"/>
                </div>
            </th>
            <th v-else :colspan="showWeekNumbers ? 6 : 5" class="month">{{ monthName }} {{ year }}</th>
            <th class="next available" @click="nextMonthClick" tabindex="0"><span/></th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <th v-if="showWeekNumbers" class="week">{{ locale.weekLabel }}</th>
            <th v-for="(weekDay, idx) in locale.daysOfWeek" :key="idx">{{ weekDay }}</th>
        </tr>
        <tr
            v-for="(dateRow, index) in calendar"
            :key="index"
        >
            <td v-if="showWeekNumbers && (index%7 || index===0)" class="week">
                {{ $dateUtil.weekNumber(dateRow[0]) }}
            </td>
            <td
                v-for="(date, idx) in dateRow"
                :class="dayClass(date)"
                @click="$emit('date-click', date)"
                @mouseover="$emit('hover-date', date)"
                :key="idx"
                :data-date="date.toISOString().substring(0, 10)"
            >
                <slot name="date-slot" :date="date">
                    {{ date.getDate() }}
                </slot>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script setup>
    import { computed, nextTick, onMounted, ref, watch } from 'vue';
    import useDateUtil from './dateUtilMixin';

    let props = defineProps({
        monthDate: Date,
        localeData: Object,
        start: Date,
        end: Date,
        minDate: Date,
        maxDate: Date,
        showDropdowns: {
            type: Boolean,
            default: false,
        },
        showWeekNumbers: {
            type: Boolean,
            default: false,
        },
        dateFormat: {
            type: Function,
            default: null
        }
    });
    const emit = defineEmits(['date-click', 'hover-date', 'change-month']);

    let currentMonthDate = ref(props.monthDate || props.start || new Date());
    let year_text = ref(currentMonthDate.value.getFullYear());
    let yearSelect = ref(null);
    const { $dateUtil } = useDateUtil();


    let locale = computed(() => {
        return $dateUtil.value.localeData(props.localeData);
    });

    let monthName = computed(() => {
        return locale.value.monthNames[currentMonthDate.value.getMonth()];
    });

    let computedMonth = computed({
        get() {
            return currentMonthDate.value.getMonth() + 1;
        },
        set(value) {
            let newDate = $dateUtil.value.validateDateRange(new Date(year.value, value - 1, 1), props.minDate, props.maxDate);

            emit('change-month', {
                month: newDate.getMonth() + 1,
                year: newDate.getFullYear(),
            });
        }
    });

    let year = computed({
        get() {
            //return currentMonthDate.value.getFullYear()
            return year_text.value;
        },
        set(value) {
            year_text.value = value;
            let newDate = $dateUtil.value.validateDateRange(new Date(value, computedMonth.value, 1), props.minDate, props.maxDate)
            if ($dateUtil.value.isValidDate(newDate)) {
                emit('change-month', {
                    month: newDate.getMonth(),
                    year: newDate.getFullYear(),
                });
            }
        }
    });

    let calendar = computed(() => {
        let month = computedMonth.value;
        let year = currentMonthDate.value.getFullYear()
        let firstDay = new Date(year, month - 1, 1)
        let lastMonth = $dateUtil.value.prevMonth(firstDay).getMonth() + 1
        let lastYear = $dateUtil.value.prevMonth(firstDay).getFullYear()
        let daysInLastMonth = new Date(lastYear, month - 1, 0).getDate()

        let dayOfWeek = firstDay.getDay()

        let calendar = []

        for (let i = 0; i < 6; i++) {
            calendar[i] = [];
        }

        let startDay = daysInLastMonth - dayOfWeek + locale.value.firstDay + 1
        if (startDay > daysInLastMonth)
            startDay -= 7

        if (dayOfWeek === locale.value.firstDay)
            startDay = daysInLastMonth - 6;

        let curDate = new Date(lastYear, lastMonth - 1, startDay, 12, 0, 0);
        for (let i = 0, col = 0, row = 0; i < 6 * 7; i++, col++, curDate.setDate(curDate.getDate() + 1)) {
            if (i > 0 && col % 7 === 0) {
                col = 0;
                row++;
            }
            calendar[row][col] = new Date(curDate.getTime())
        }

        return calendar;
    });

    let months = computed(() => {
        return locale.value.monthNames.map((m, idx) => ({
            label: m,
            value: idx,
            enabled:
                (!props.maxDate || (props.maxDate >= new Date(year.value, idx, 1))) &&
                (!props.minDate || (props.minDate <= new Date(year.value, idx + 1, 0)))
        }));
    });

    function prevMonthClick() {
        changeMonthDate($dateUtil.value.prevMonth(currentMonthDate.value))
    }

    function nextMonthClick() {
        changeMonthDate($dateUtil.value.nextMonth(currentMonthDate.value))
    }

    function changeMonthDate(date, isEmit = true) {
        let year_month = $dateUtil.value.yearMonth(currentMonthDate.value)
        currentMonthDate.value = $dateUtil.value.validateDateRange(date, props.minDate, props.maxDate)
        if (isEmit && year_month !== $dateUtil.value.yearMonth(currentMonthDate.value)) {
            emit('change-month', {
                month: currentMonthDate.value.getMonth() + 1,
                year: currentMonthDate.value.getFullYear(),
            })
        }
        checkYear();
    }

    function dayClass(date) {
        let dt = new Date(date)
        dt.setHours(0, 0, 0, 0)
        let start = new Date(props.start)
        start.setHours(0, 0, 0, 0)
        let end = new Date(props.end)
        end.setHours(0, 0, 0, 0)

        let dt_min_compare = new Date(dt);
        dt_min_compare.setHours(23, 59, 59, 999)

        let classes = {
            off: date.getMonth() + 1 !== computedMonth.value,
            weekend: date.getDay() === 6 || date.getDay() === 0,
            today: dt.setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0),
            active: dt.setHours(0, 0, 0, 0) === new Date(props.start).setHours(0, 0, 0, 0) || dt.setHours(0, 0, 0, 0) === new Date(props.end).setHours(0, 0, 0, 0),
            'in-range': dt >= start && dt <= end,
            'start-date': dt.getTime() === start.getTime(),
            'end-date': dt.getTime() === end.getTime(),
            disabled: (props.minDate && dt_min_compare.getTime() < props.minDate.getTime()) || (props.maxDate && dt.getTime() > props.maxDate.getTime()),
        }
        return props.dateFormat ? props.dateFormat(classes, date) : classes
    }

    function checkYear() {
        if (yearSelect !== document.activeElement) {
            nextTick().then(() => {
                year_text.value = props.monthDate.getFullYear();
            });
        }
    }

    onMounted(() => {
        yearSelect = yearSelect.value;
    });

    watch(() => props.monthDate, (value) => {
        if (currentMonthDate.value.getTime() !== value.getTime()) {
            changeMonthDate(value, false);
        }
    });
</script>

