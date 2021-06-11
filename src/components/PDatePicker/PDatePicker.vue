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
        :opens="computedOpens"
        :controlContainerClass="containerClass"
        :readonly="readOnly"
        :disabled="disabled"
        :locale-data="{ firstDay: 1, format: 'dd-mm-yyyy HH:mm:ss' }"
        :minDate="minDate" :maxDate="maxDate"
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
    >
      <template #ranges="ranges">
        <PStack>
          <PStackItem fill>
            <PSelect label="Date range" returnKey="returnValue" :options="rangeOptions(ranges.ranges)"  @change="(range) => changeRange(range, ranges)" />
          </PStackItem>
        </PStack>
      </template>
      <template v-slot:input="picker" style="min-width: 100%">
        <PTextField v-if="!button" readOnly aria-readonly="true" :value="computedTextValue(picker)" style="min-width:100%" labelHidden>
          <template  slot="suffix">
            <PIcon slot="suffix" source="CalendarMajorMonotone"/>
          </template>
          <template v-if="showPrefix" slot="prefix">
            {{ prefix }}
          </template>
        </PTextField>
        <PButton icon="CalendarMajorMonotone" v-else>
          {{computedTextValue(picker)}}
        </PButton>
      </template>
      <template slot="footer" slot-scope="data" class="slot">
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
    <PFieldError v-if="error" :error="error"/>

  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop, Emit, Watch} from 'vue-property-decorator';
import {classNames, variationName} from '@/utilities/css';
import DateRangePicker from 'vue2-daterange-picker';
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';
import {PIcon} from '@/components/PIcon';
import dayjs from 'dayjs';
import {PFieldError} from '@/components/PFieldError';
import {PButton} from '@/components/PButton';
import {PButtonGroup} from '@/components/PButtonGroup';
import {PStack, PStackItem} from '@/components/PStack';
import {PCard} from '@/components/PCard';
import {PSelect} from '@/components/PSelect';
import {PTextField} from '@/components/PTextField';

type DateType = Date | null | string;

interface DateRange {
  startDate?: DateType;
  endDate?: DateType;
}

@Component({
  components: {DateRangePicker, PIcon, PFieldError, PButton,PButtonGroup, PStack, PStackItem, PCard, PSelect},
})
export default class PDatePicker extends Vue {

  /**
   *  Show button as picker instead of input field
   *  @values true | false
   */
  @Prop({type: Boolean, default: false}) public button!: boolean;

  /**
   *  Which way the picker opens. Works without button attribute
   *  @values left | center | right | inline
   */
  @Prop({type: String, default: 'center'}) public opens!: string;

  /**
   * ID for the element
   */
  @Prop({type: String, required: true}) public id!: string;

  /**
   * Makes the picker readonly. No button in footer. No ranges. Cannot change.
   */
  @Prop({type: Boolean, default: false}) public readOnly!: boolean;

  /**
   * Disabled state. If true picker do not popup on click.
   *  @values true | false
   */
  @Prop({type: Boolean, default: false}) public disabled!: boolean;

  /**
   * Whether to close the dropdown on "esc"
   *  @values true | false
   */
  @Prop({type: Boolean, default: true}) public closeOnEsc!: boolean;

  /**
   * Visually hide the label
   *  @values true | false
   */
  @Prop({type: Boolean, default: false}) public labelHidden!: boolean;

  /**
   * Label for the element
   */
  @Prop({type: String, default: null}) public label!: string;

  /**
   * Label class for the element
   */
  @Prop({type: String, default: null}) public labelClass!: string;

  /**
   * Empty Label for the element
   *  @values true | false
   */
  @Prop({type: Boolean, default: false}) public emptyLabel!: boolean;

  /**
   * Display an error message
   */
  @Prop({type: String, default: null}) public error!: string;

  /**
   * Define prefix for the element. Works without button attribute
   */
  @Prop({type: String, default: null}) public prefix!: string;

  /**
   * Minimum date allowed to be selected
   */
  @Prop({type: String, default: null}) public minDate!: string;

  /**
   * Maximum date allowed to be selected
   */
  @Prop({type: String, default: null}) public maxDate!: string;

  /**
   * Date format for the element
   */
  @Prop({type: String, default: 'MM/DD/YYYY'}) public format!: string;

  /**
   * Only show a single calendar, with or without ranges.
   * Set true or 'single' for a single calendar with no ranges, single dates only.
   * Set 'range' for a single calendar WITH ranges.
   * Set false for a double calendar with ranges.
   */
  @Prop([Boolean, String]) public singleDatePicker!: boolean | string;

  /**
   * Show the dropdown for time (hour/minute) selection below the calendars
   *  @values true | false
   */
  @Prop({type: Boolean, default: false}) public timePicker!: boolean;

  /**
   * Use 24h format for the time
   *  @values true | false
   */
  @Prop({type: Boolean, default: true}) public timePicker24Hour!: boolean;

  /**
   * Show the week numbers on the left side of the calendar
   *  @values true | false
   */
  @Prop({type: Boolean, default: false}) public showWeekNumbers!: boolean;

  /**
   * Show the dropdowns for month and year selection above the calendars
   *  @values true | false
   */
  @Prop({type: Boolean, default: false}) public showDropdowns!: boolean;

  /**
   * You can set this to false in order to hide the ranges selection.
   * Otherwise it is an object with key/value.
   */
  @Prop({
    type: [Boolean, Object], default: () => {
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
  }) public ranges!: boolean | object;

  /**
   * Auto apply selected range. If false you need to click an apply button
   */
  @Prop({type: Boolean, default: false}) public autoApply!: boolean;

  /**
   * This should be an object containing startDate and endDate.
   */
  @Prop(Object) public dateRange!: DateRange;

  /**
   * Each calendar has separate navigation when this is false
   */
  @Prop({type: Boolean, default: true}) public linkedCalendars!: boolean;

  /**
   * Object containing locale data used by the picker
   */
  @Prop(Object) public localeData!: object;

  public content: DateRange = (this.dateRange !== null && this.dateRange !== undefined) ?
      this.dateRange : {startDate: new Date(), endDate: new Date()};

  public get className() {
    return classNames(
        'Polaris-TextField__Input',
    );
  }

  public get computedOpens() {
    return this.button ? 'right' : this.opens;
  }

  public get computedRanges() {
    return !this.singleDatePicker ? this.ranges : false;
  }

  public computedTextValue(picker) {
    //
    return !this.singleDatePicker ? `${this.formatDate(picker.startDate)} - ${this.formatDate(picker.endDate)}` : this.formatDate(picker.startDate);
  }

  public get hasError() {
    return this.error && this.error.length > 0;
  }

  public get containerClass() {
    return classNames(
        'Polaris-TextField',
        this.hasError && 'Polaris-TextField--error',
        Boolean(this.content) && 'Polaris-TextField--hasValue',
        this.disabled && 'Polaris-TextField--disabled',
        this.readOnly && 'Polaris-TextField--readOnly',
    );
  }

  /**
   * Emits when the user selects a range from the picker
   * and clicks "apply" (if autoApply is true).
   * @param values {startDate, endDate}
   */
  @Emit('updateValues')
  public updateValues(values) {
    this.$emit('change', values);
  }

  @Emit('checkOpen')
  public checkOpen() {
    /**
     * Emits whenever the picker opens/closes
     */
    this.$emit('checkOpen');
  }

  public get computedValue(): DateRange {
    return this.content;
  }

  public set computedValue(dateRange: DateRange) {

    this.content = dateRange;
    /**
     * Change date range
     * @property {Object} { startDate: DateType, endDate: DateType }
     */
    this.$emit('change', dateRange);
  }

  public formatDate(date) {
    return dayjs(date).format(this.format);
  }

  @Watch('dateRange')
  public onValueChanged(dateRange: DateRange) {
    this.content = dateRange;
  }

  public get showPrefix() {
    return this.prefix || this.$slots.prefix;
  }

  public rangeOptions(ranges) {
    return Object.keys(ranges);
  }

  public changeRange(range, ranges) {
    if(typeof ranges.ranges[range] !== 'undefined') {
      ranges.clickRange(ranges.ranges[range])
    }
  }
}
</script>

<style scoped>
.vue-daterange-picker {
  min-width: 100%;
}
</style>
<style>
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
  border-bottom: 1px solid #ddd;
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

.daterangepicker td.start-date {border-radius: 3rem 0 0 3rem;}

.daterangepicker td.end-date {
  border-radius: 0 3rem 3rem 0;
}
</style>