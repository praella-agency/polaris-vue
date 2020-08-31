<template>
  <div class="Polaris-Connected__Item Polaris-Connected__Item--primary">

    <div :class="className" v-show="showInput">
      <div class="Polaris-TextField__Prefix" :id="id+'Prefix'" v-if="showPrefix"
           :class="prefixClass">
        {{prefix}}
      </div>
      <input

              :tag="multiline?'textarea':'input'"
              ref="input"
              :is="multiline ? 'textarea' : 'input'"
              :name="name"
              class="Polaris-TextField__Input"
              :id="id"
              :disabled="disabled"
              :readonly="readOnly"
              :autofocus="autoFocus"
              :value="computedValue"
              :placeholder="placeholder"
              :autocomplete="normalizeAutoComplete(autoComplete)"
              :class="inputClass"
              :min="min"
              :max="max"
              :step="step"
              :minlength="minLength"
              :maxlength="maxLength"
              :type="inputType"
              :aria-describedby="describedBy"
              :aria-labelledby="labelledBy"
              :aria-invalid="hasError"
              @input="onInput"
      />
      <div class="Polaris-TextField__Suffix" :id="id+'Prefix'" v-if="showSuffix">
        {{suffix}}
      </div>
      <PSpinner @change="handleNumberChange" v-if="type === 'number'"></PSpinner>
      <div class="Polaris-TextField__Backdrop"></div>
    </div>
  </div>
</template>


<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
  import {classNames} from '@/utilities/css';
  import PSpinner from './PSpinner.vue';

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

  @Component({
    components: {PSpinner},
  })
  export default class PInput extends Vue {
    @Prop(String) public label!: string;
    @Prop({type: String, default: `PolarisTextField${new Date().getUTCMilliseconds()}`}) public id!: string;
    @Prop() public value!: any;
    @Prop(String) public type!: Type;
    @Prop(String) public placeholder!: string;
    @Prop(Boolean) public multiline!: boolean;
    @Prop(Boolean) public disabled!: boolean;
    @Prop(Boolean) public readOnly!: boolean;
    @Prop({type: Boolean, default: true}) public showInput!: boolean;
    @Prop(Boolean) public showSuffix!: boolean;
    @Prop(Boolean) public showPrefix!: boolean;
    @Prop(String) public prefixClass!: string;
    @Prop(Boolean) public autoFocus!: boolean;
    @Prop(Boolean) public autoComplete!: boolean;
    @Prop(String) public labelClass!: string;
    @Prop(String) public inputClass!: string;
    @Prop(String) public suffix!: string;
    @Prop(String) public prefix!: string;
    @Prop(String) public name!: string;
    @Prop(Boolean) public hasError!: string;
    @Prop([String, Number]) public maxLength!: string | number;
    @Prop([String, Number]) public minLength!: string | number;
    @Prop(Number) public step!: number;
    @Prop(Number) public min!: number;
    @Prop(Number) public max!: number;
    @Prop(String) public describedBy!: string;

    public content = this.value !== null ? this.value : '';

    public get inputType() {
      return this.type === 'currency' ? 'text' : this.type;
    }

    public get className() {
      return classNames(
              'Polaris-TextField',
              Boolean(this.content) && 'Polaris-TextField--hasValue',
              this.disabled && 'Polaris-TextField--disabled',
              this.readOnly && 'Polaris-TextField--readOnly',
              this.hasError && 'Polaris-TextField--error',
      );
    }

    public get labelledBy() {
      const label = [this.id + 'Label'];
      if (this.showPrefix) {
        label.push(this.id + 'Prefix');
      }
      if (this.showSuffix) {
        label.push(this.id + 'Suffix');
      }
      return label.join(' ');
    }

    public get computedValue() {
      return this.content;
    }

    public set computedValue(value: any) {
      this.content = value;
      this.$emit('input', value);
    }

    @Watch('value')
    public onValueChanged(value: any) {
      this.content = value;
    }

    public onInput(event: any) {
      this.$nextTick(() => {
        if (event.target) {
          this.computedValue = event.target.value;
        }
      });
    }

    public handleNumberChange(steps: number) {
      const numericValue = this.computedValue ? parseFloat(this.computedValue) : 0;
      if (isNaN(numericValue)) { return; }

      const min = this.min || -Infinity;
      const max = this.max || +Infinity;
      const step = this.step || 1;

      const newValue = Math.min(max, Math.max(min, numericValue + (steps * step)));
      this.$nextTick(() => {
        if (!isNaN(newValue)) {
          this.computedValue = newValue;
        }
      });
    }

    public normalizeAutoComplete(autoComplete?: boolean | string) {
      if (autoComplete === true) {
        return 'on';
      } else if (autoComplete === false) {
        return 'off';
      } else {
        return autoComplete;
      }
    }
  }
</script>


<style scoped>

</style>
