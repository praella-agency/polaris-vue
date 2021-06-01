<template>
  <PChoice :label="label" :label-hidden="labelHidden" :help-text="helpText" :id="id">
    <slot slot="label" name="label" />
    <template v-if="$slots.helpText" slot="helpText">
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
import { classNames, variationName } from '@/utilities/css';
import PChoice from '@/components/PChoice/PChoice.vue';
@Component({
  components: {PChoice},
})

export default class PRadioButton extends Vue {
  /**
   * Id for the radio button.
   */
  @Prop({
    type: String,
    default: `PolarisRadioButton${new Date().getUTCMilliseconds()}`,
    required: true,
  }) public id!: string;

  /**
   * Label for the radio button.
   */
  @Prop(String) public label!: string;

  /**
   * Additional text to display.
   */
  @Prop(String) public helpText!: string;

  /**
   * Name for the radio button.
   */
  @Prop(String) public name!: string;

  /**
   * Value for the form input.
   */
  @Prop({type: [String, Boolean]}) public value!: string|boolean;

  /**
   * Disable input.
   */
  @Prop(Boolean) public disabled!: boolean;

  /**
   * Visually hide the label.
   */
  @Prop(Boolean) public labelHidden!: boolean;

  /**
   * Selected radio button.
   */
  @Prop({type: Boolean, default: false}) public checked!: boolean;

  public get className() {
    return classNames(
      'Polaris-RadioButton',
      this.labelHidden && 'Polaris-Choice--labelHidden',
      this.disabled && 'Polaris-RadioButton--disabled',
    );
  }

  /**
   * Callback when radio button is triggered.
   * @param e
   */
  public onChange(e: any) {
    const target = e.target || e.srcElement;
    this.$emit('change', {checked: target.checked, value: target.value});
  }

  /**
   * Callback when radio button is focused.
   */
  public onFocus() {
    this.$emit('focus');
  }

  /**
   * Callback when focus is removed.
   */
  public onBlur() {
    this.$emit('blur');
  }
}
</script>
