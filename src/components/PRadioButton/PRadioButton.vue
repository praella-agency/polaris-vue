<template>
  <PChoice :label="label" :label-hidden="labelHidden" :help-text="helpText" :id="id">
    <!-- @slot Label content -->
    <slot slot="label" name="label" />
    <template v-if="$slots.helpText" slot="helpText">
      <!-- @slot Help text content -->
      <slot name="helpText"></slot>
    </template>

    <div class="Polaris-RadioButton">
      <input :id="id"
             :name="name"
             :value="value"
             type="radio"
             :checked="checked"
             :disabled="disabled"
             class="Polaris-RadioButton__Input"
             @change="onChange"
             @focus="onFocus"
             @blur="onBlur"
             :aria-describedby="helpText ? id+'HelpText' : ''">

      <div class="Polaris-RadioButton__Backdrop"></div>
      <div class="Polaris-RadioButton__Icon"></div>
    </div>

  </PChoice>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames } from '@/utilities/css';
import { PChoice } from '@/components/PChoice/index.js';

/**
 * <br/>
 * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
 *  sans-serif;">Use radio buttons to present each item in a list of options where merchants must make a single
 *  selection.</h4>
 */
@Component({
  components: {
      PChoice,
  },
})
export default class PRadioButton extends Vue {
  /**
   * Id for the radio button.
   */
  @Prop({
    type: [String, Number],
    default: `PolarisRadioButton${new Date().getUTCMilliseconds()}`,
    required: true,
  }) public id!: string | number;

  /**
   * Label for the radio button.
   */
  @Prop({type: String, default: null}) public label!: string;

  /**
   * Additional text to display.
   */
  @Prop({type: String, default: null}) public helpText!: string;

  /**
   * Name for the radio button.
   */
  @Prop({type: String, default: null}) public name!: string;

  /**
   * Value for the form input.
   */
  @Prop({type: [String, Boolean]}) public value!: string|boolean;

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
   * Selected radio butto
   * @values true | false
   */
  @Prop({type: Boolean, default: false}) public checked!: boolean;

  public get className() {
    return classNames(
      'Polaris-RadioButton',
      this.labelHidden && 'Polaris-Choice--labelHidden',
      this.disabled && 'Polaris-RadioButton--disabled',
    );
  }
  public onChange(e: any) {
    const target = e.target || e.srcElement;

    /**
     * Callback when radio button is triggered.
     * @param e
     */
    this.$emit('change', {checked: target.checked, value: target.value});
  }

  public onFocus() {
    /**
     * Callback when radio button is focused.
     */
    this.$emit('focus');
  }

  public onBlur() {
    /**
     * Callback when focus is removed.
     */
    this.$emit('blur');
  }
}
</script>
