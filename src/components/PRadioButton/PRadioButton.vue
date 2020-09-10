<template>
  <PChoice :label="label" :label-hidden="labelHidden" :help-text="helpText" :id="id">
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
import PChoice from "@/components/PChoice/PChoice.vue";
@Component({
  components: {PChoice}
})
export default class PRadioButton extends Vue {
  @Prop({type: String, default: `PolarisRadioButton${new Date().getUTCMilliseconds()}`}) public id!: string;
  @Prop(String) public label!: string;
  @Prop(String) public helpText!: string;
  @Prop(String) public name!: string;
  @Prop({type: [String,Boolean]}) public value!: string|boolean;
  @Prop(Boolean) public disabled!: boolean;
  @Prop(Boolean) public labelHidden!: boolean;
  @Prop(Boolean) public checked!: boolean;

  public get className() {
    return classNames(
      'Polaris-RadioButton',
      this.labelHidden && 'Polaris-Choice--labelHidden',
      this.disabled && 'Polaris-RadioButton--disabled',
    );
  }

  public onChange(e: any) {
    var target = e.target || e.srcElement;
    this.$emit('change', target.checked);
  }

  public onFocus() {
    this.$emit('focus');
  }

  public onBlur() {
    this.$emit('blur');
  }
}
</script>
