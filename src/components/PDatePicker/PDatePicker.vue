<template>
  <div :class="labelHidden && 'Polaris-Labelled--hidden'">
    <div class="Polaris-Labelled__LabelWrapper" v-if="label || emptyLabel || $slots.hasOwnProperty('label')"
         :class="labelClass">
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
        :minDate="minDate" :maxDate="maxDate"
        :singleDatePicker="singleDatePicker"
        :timePicker="timePicker"
        :timePicker24Hour="timePicker24Hour"
        :showWeekNumbers="showWeekNumbers"
        :showDropdowns="showDropdowns"
        :autoApply="autoApply"
        :closeOnEsc="closeOnEsc"
        :localeData="localeData"
        :ranges="ranges"
        v-model="computedValue"
        @update="updateValues"
        @toggle="checkOpen"
        :linkedCalendars="linkedCalendars"
    >
      <template v-slot:input="picker" style="min-width: 100%">
        <div class="Polaris-TextField__Prefix" :id="id+'Prefix'" v-if="showPrefix">
          {{ prefix }}
          <slot v-if="$slots.prefix" name="prefix"></slot>
        </div>
        <div :class="className">
          <template v-if="ranges !== false">
            {{ formatDate(picker.startDate) }} - {{ formatDate(picker.endDate) }}
          </template>
          <template v-else>
            {{ formatDate(picker.startDate) }}
          </template>
        </div>
        <div class="Polaris-TextField__Suffix" :id="id+'Suffix'">
          {{ suffix }}
          <slot name="suffix">
            <PIcon slot="suffix" source="CalendarMajorMonotone"/>
          </slot>
        </div>
        <div class="Polaris-TextField__Backdrop"></div>
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

type DateType = Date | null | string;

interface DateRange {
  startDate?: DateType;
  endDate?: DateType;
}

@Component({
  components: {DateRangePicker, PIcon, PFieldError},
})
export default class PDatePicker extends Vue {

  @Prop({type: String, default: 'center'}) public opens!: string;
  @Prop({type: String, required: true}) public id!: string;
  @Prop(Boolean) public readOnly!: boolean;
  @Prop(Boolean) public disabled!: boolean;
  @Prop(Boolean) public closeOnEsc!: boolean;
  @Prop(Boolean) public labelHidden!: boolean;
  @Prop(String) public label!: string;
  @Prop(String) public labelClass!: string;
  @Prop(Boolean) public emptyLabel!: boolean;
  @Prop(String) public error!: string;
  @Prop(String) public prefix!: string;
  @Prop(String) public suffix!: string;
  @Prop(String) public minDate!: string;
  @Prop(String) public maxDate!: string;
  @Prop({type: String, default: 'MM/DD/YYYY'}) public format!: string;
  @Prop([Boolean, String]) public singleDatePicker!: boolean | string;
  @Prop(Boolean) public timePicker!: boolean;
  @Prop(Boolean) public timePicker24Hour!: boolean;
  @Prop({type: Boolean, default: false}) public showWeekNumbers!: boolean;
  @Prop(Boolean) public showDropdowns!: boolean;
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
  @Prop({type: Boolean, default: true}) public autoApply!: boolean;
  @Prop(Object) public dateRange!: DateRange;
  @Prop(Boolean) public linkedCalendars!: boolean;
  @Prop(Object) public localeData!: object;

  public content: DateRange = (this.dateRange !== null && this.dateRange !== undefined) ?
      this.dateRange : {startDate: new Date(), endDate: new Date()};

  public get className() {
    return classNames(
        'Polaris-TextField__Input',
    );
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

  @Emit('updateValues')
  public updateValues(values) {
    this.$emit('change', values);
  }

  @Emit('checkOpen')
  public checkOpen() {
    this.$emit('checkOpen');
  }

  public get computedValue(): DateRange {
    return this.content;
  }

  public set computedValue(dateRange: DateRange) {

    this.content = dateRange;
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
}
</script>

<style scoped>
.vue-daterange-picker {
  min-width: 100%;
}
</style>