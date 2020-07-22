<template>
  <div class="">
    <div class="Polaris-Labelled__LabelWrapper">
      <div class="Polaris-Label">
        <label :id="`${id}Label`" :for="id" class="Polaris-Label__Text">
          {{ label }}
        </label>
      </div>
    </div>
    <div class="Polaris-Connected">
      <div class="Polaris-Connected__Item Polaris-Connected__Item--primary">
        <div :class="className">
          <input
            :id="id"
            :type="inputType"
            class="Polaris-TextField__Input"
            :value="computedValue"
            :disabled="disabled"
            :readonly="readOnly"
            :placeholder="placeholder"
            @input="onInput">
          <div class="Polaris-TextField__Backdrop"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { classNames, variationName } from '@/utilities/css';

type Type =
  | 'text'
  | 'email'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'url'
  | 'date'
  | 'datetime-local'
  | 'month'
  | 'time'
  | 'week'
  | 'currency';

@Component
export default class PTextField extends Vue {
  @Prop(String) public label!: string;
  @Prop(String) public value!: string;
  @Prop(String) public type!: Type;
  @Prop(String) public placeholder!: string;
  @Prop(Boolean) public disabled!: boolean;
  @Prop(Boolean) public readOnly!: boolean;

  public id = `PolarisTextField${new Date().getUTCMilliseconds()}`;
  public selected = this.value !== null ? this.value : '';

  public get inputType() {
    return this.type === 'currency' ? 'text' : this.type;
  }

  public get className() {
    return classNames(
      'Polaris-TextField',
      Boolean(this.computedValue) && 'Polaris-TextField--hasValue',
      this.disabled && 'Polaris-TextField--disabled',
      this.readOnly && 'Polaris-TextField--readOnly',
    );
  }

  public get computedValue() {
    return this.selected;
  }

  public set computedValue(value: string) {
    this.selected = value;
    this.$emit('input', value);
  }

  @Watch('value')
  public onValueChanged(value: any) {
    this.selected = value;
  }

  public onInput(event: any) {
    this.$nextTick(() => {
      if (event.target) {
        this.computedValue = event.target.value;
      }
    });
  }
}
</script>
