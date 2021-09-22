<template>
  <div :class="labelHidden && 'Polaris-Labelled--hidden'">
    <div class="Polaris-Labelled__LabelWrapper" v-if="label || emptyLabel">
      <div class="Polaris-Label">
        <label :id="`${id}Label`" :for="id" class="Polaris-Label__Text" v-html="emptyLabel ? '&nbsp' : label"/>
      </div>
    </div>
    <div :class="className">
      <select
          :id="id"
          :name="name"
          v-model="computedValue"
          class="Polaris-Select__Input"
          :disabled="disabled"
          aria-invalid="false"
      >
        <option
            v-for="(option, key) in computedOptions"
            :key="key"
            :value="option[valueField]"
            :disabled="option[disabledField]"
            :hidden="option[hiddenField]"
        >
          {{ option[textField] }}
        </option>
      </select>
      <div class="Polaris-Select__Content" aria-hidden="true" :aria-disabled="disabled">
        <span v-if="inlineLabel" class="Polaris-Select__InlineLabel">{{ inlineLabel }}</span>
        <span class="Polaris-Select__SelectedOption">{{ selectedOption }}</span>
        <span class="Polaris-Select__Icon">
          <PIcon source="SelectMinor"/>
        </span>
      </div>
      <div class="Polaris-Select__Backdrop"></div>
    </div>
    <PFieldError v-if="error" :error="error"/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
  import { classNames } from '@/utilities/css';
  import { PIcon } from '@/components/PIcon';
  import { PFieldError } from '@/components/PFieldError';

  const PLACEHOLDER_VALUE = '';

  /**
   * <br/>
   * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
   *  sans-serif;">Select lets merchants choose one option from an options menu. Consider select when you have 4 or more
   *  options, to avoid cluttering the interface.</h4>
   */
  @Component({
    components: {PIcon, PFieldError},
  })
  export default class PSelect extends Vue {
    /**
     * ID for form input.
     */
    @Prop({type: [String, Number], default: `PolarisSelect${new Date().getUTCMilliseconds()}`}) public id!: string | number;

    /**
     * Name for form input.
     */
    @Prop({type: String, default: null}) public name!: string;

    /**
     * Disable input.
     * @values true | false
     */
    @Prop({type: Boolean, default: false}) public disabled!: boolean;

    /**
     * Visually hide the label.
     * @values true | false
     */
    @Prop({type: Boolean, default: false}) public labelHidden!: boolean;

    /**
     * Empty label.
     * @values true | false
     */
    @Prop({type: Boolean, default: false}) public emptyLabel!: boolean;

    /**
     * Label for the select.
     */
    @Prop({type: String, default: null}) public label!: string;

    /**
     * List of Options or option to choose from.
     */
    @Prop({type: Array, default: []}) public options!: [];

    /**
     * Field name in the `options` array that should be used for the text label
     */
    @Prop({type: String, default: 'label'}) public textField!: string;

    /**
     * Field name in the `options` array that should be used for the value
     */
    @Prop({type: String, default: 'value'}) public valueField!: string;

    /**
     * Field name in the `options` array that should be used for the disabled state
     */
    @Prop({type: String, default: 'disabled'}) public disabledField!: string;

    /**
     * Field name in the `options` array that should be used for the hidden state
     */
    @Prop({type: String, default: 'hidden'}) public hiddenField!: string;

    /**
     * Value for form input.
     */
    @Prop() public value!: any;

    /**
     * Example text to display as placeholder.
     */
    @Prop({type: String, default: null}) public placeholder!: string;

    /**
     * Display an error state.
     */
    @Prop({type: String, default: null}) public error!: string;

    /**
     * Show the label to the left of the value, inside the control
     * @values true | false
     */
    @Prop({type: [Boolean, String], default: false}) public inlineLabel!: boolean | string;

    public selected = this.value;

    public get computedOptions() {
      const options: any[] = [];
      if (this.placeholder) {
        options.push({
          [this.textField]: this.placeholder,
          [this.valueField]: PLACEHOLDER_VALUE,
          [this.disabledField]: true,
        });
      }
      this.options.map((value) => {

        if (typeof value === 'object') {
          options.push(value);
        } else {
          options.push({[this.textField]: value, [this.valueField]: value});
        }
      });

      return options;
    }

    public get computedValue() {
      return this.selected;
    }

    public set computedValue(value: string | number) {
      this.selected = value;
      /**
       * Callback when selection is changed
       * @property {event}
       */
      this.$emit('change', value);
      /**
       * Callback when input is triggered
       * @property {event}
       */
      this.$emit('input', value);
    }

    public get selectedOption() {
      let selectedOption = this.computedOptions.find((option) => this.computedValue === option[this.valueField]);

      if (selectedOption === undefined) {
        selectedOption = this.computedOptions.find((option) => !option[this.hiddenField]);
      }

      return selectedOption ? selectedOption[this.textField] : '';
    }

    public get className() {
      return classNames(
        'Polaris-Select',
        this.disabled && 'Polaris-Select--disabled',
        this.error && 'Polaris-Select--error',
      );
    }

    @Watch('value')
    public onValueChanged(value: any) {
      this.selected = value;
    }
  }
</script>
