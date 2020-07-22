<template>
  <PChoice
    :id="id"
    :label="label"
    :labelHidden="labelHidden"
    :disabled="disabled">
    <span :class="wrapperClassName">
      <input
        v-model="computedValue"
        :id="id"
        type="checkbox"
        :checked="isChecked"
        :disabled="disabled"
        :class="inputClassName"
        :value="nativeValue"
        role="checkbox"/>
      <span class="Polaris-Checkbox__Backdrop"></span>
      <span class="Polaris-Checkbox__Icon">
        <PIcon :source="iconSource"></PIcon>
      </span>
    </span>
  </PChoice>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { classNames, variationName } from '@/utilities/css';

import { PIcon } from '@/components/PIcon';
import { PChoice } from '@/components/PChoice';
import { MinusMinor, TickSmallMinor } from '@/assets/shopify-polaris-icons';

@Component({
  components: {
    PIcon, PChoice,
  },
})
export default class PCheckbox extends Vue {
  @Prop(String) public label!: string;
  @Prop(Boolean) public labelHidden!: boolean;
  @Prop(Boolean) public indeterminate!: boolean;
  @Prop() public nativeValue!: any;
  @Prop(Boolean) public disabled!: boolean;

  public checked = this.nativeValue;
  public id = `PolarisCheckbox${new Date().getUTCMilliseconds()}`;

  public get wrapperClassName() {
    return classNames(
      'Polaris-Checkbox',
    );
  }

  public get inputClassName() {
    return classNames(
      'Polaris-Checkbox__Input',
      this.indeterminate && 'Polaris-Checkbox__Input--indeterminate',
    );
  }

  public get isChecked() {
    return !this.indeterminate && Boolean(this.checked);
  }

  public get iconSource() {
    return this.indeterminate ? MinusMinor : TickSmallMinor;
  }

  public get computedValue() {
    return this.checked;
  }

  public set computedValue(value: string) {
    this.checked = value;
    this.$emit('input', value);
  }

  @Watch('value')
  public onValueChanged(value: any) {
    this.checked = value;
  }
}
</script>
