<template>
  <div class="">
    <div class="Polaris-Labelled__LabelWrapper">
      <div class="Polaris-Label">
        <label :id="`${id}Label`" :for="id" class="Polaris-Label__Text">
          {{ label }}
        </label>
      </div>
    </div>
    <div :class="className">
      <select
        :id="id"
        v-model="computedValue"
        class="Polaris-Select__Input"
        :disabled="disabled"
        aria-invalid="false">
        <option v-for="({value, label}) in options" :key="value" :value="value">{{ label }}</option>
      </select>
      <div class="Polaris-Select__Content" aria-hidden="true" :aria-disabled="disabled">
        <span class="Polaris-Select__SelectedOption">{{ selectedOption }}</span>
        <span class="Polaris-Select__Icon">
          <PIcon :source="ArrowUpDownMinor"></PIcon>
        </span>
      </div>
      <div class="Polaris-Select__Backdrop"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { ArrowUpDownMinor } from '@/assets/shopify-polaris-icons';
import { classNames } from '@/utilities/css';

import { PIcon } from '@/components/PIcon';

interface StrictOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface HideableStrictOption extends StrictOption {
  hidden?: boolean;
}

type SelectOption = string | StrictOption;

const PLACEHOLDER_VALUE = '';

function getSelectedOption(
  options: HideableStrictOption[],
  value: string,
): string {
  let selectedOption = options.find((option) => value === option.value);

  if (selectedOption === undefined) {
    selectedOption = options.find((option) => !option.hidden);
  }

  return selectedOption ? selectedOption.label : '';
}

@Component({
  components: { PIcon },
  mixins: [
    { data() { return { ArrowUpDownMinor }; } },
  ],
})
export default class PSelect extends Vue {
  @Prop(Boolean) public disabled!: boolean;
  @Prop(String) public label!: string;
  @Prop() public options!: HideableStrictOption[];
  @Prop({ type: String, default: PLACEHOLDER_VALUE }) public value!: string;
  @Prop(String) public placeholder!: string;

  public id = `PolarisSelect${new Date().getUTCMilliseconds()}`;
  public selected = this.value;

  public mounted() {
    if (this.placeholder) {
      this.options = [
        {
          label: this.placeholder,
          value: PLACEHOLDER_VALUE,
          disabled: true,
        },
        ...this.options,
      ];
    }
  }

  public get computedValue() {
    return this.selected;
  }

  public set computedValue(value: string) {
    this.selected = value;
    this.$emit('input', value);
  }

  public get selectedOption() {
    return getSelectedOption(this.options, this.computedValue);
  }

  public get className() {
    return classNames(
      'Polaris-Select',
      this.disabled && 'Polaris-Select--disabled',
    );
  }

  @Watch('value')
  public onValueChanged(value: any) {
    this.selected = value;
  }
}
</script>
