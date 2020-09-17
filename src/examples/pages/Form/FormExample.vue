<template>
  <ExampleContainer title="Form">
    <ExampleContent :code="example1">
      <PFormLayout>
        <PTextField label="Store name" helpText="Your current store name."/>
        <PTextField type="email" label="Account email"/>
        <PSelect
          label="Date range"
          :options="[{label: 'Today', value: 'today'}, {label: 'Yesterday', value: 'yesterday'}, {label: 'Last 7 days', value: 'lastWeek'}]"
          v-model="selectedValue1"
        />
        <PSelect
          label="Date range"
          id="day"
          :options="['Today', 'Yesterday', 'Last 7 days']"
          v-model="selectedValue2"
          placeholder="Select Day"
        />
        <PMultiSelect
          label="Date Range Multi Select"
          :options="options"
          v-model="selectedMultiValue"
          :taggable="true"
          :searchable="true"
        />
        <PMultiSelect
          label="Date Range Multi Select"
          :options="arrayOptions"
          v-model="selectedMultiValue2"
          :taggable="true"
          :searchable="true"
        />
        <PCheckbox label="Checkbox 1" indeterminate/>
        <PCheckbox v-model="checkboxValue" label="Checkbox 2"/>
        <PRadioButton id="layout_mode_1" name="layout_mode" value="standard" label="Standard" />
      </PFormLayout>
    </ExampleContent>
  </ExampleContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { ExampleContainer, ExampleContent } from '@/examples/components';
import { PSelect } from '@/components/PSelect';
import { PTextField } from '@/components/PTextField';
import { PCheckbox } from '@/components/PCheckbox';
import { PRadioButton } from '@/components/PRadioButton';
import { PFormLayout, PFormLayoutItem } from '@/components/PFormLayout';
import { PMultiSelect } from '@/components/PMultiSelect';

@Component({
  components: {
    PMultiSelect,
    PRadioButton,
    ExampleContainer, ExampleContent,
    PFormLayout, PFormLayoutItem,
    PSelect, PTextField, PCheckbox,
  },
})
export default class FormExample extends Vue {
  public selectedValue1 = 'today';
  public selectedValue2 = '';
  public selectedMultiValue = [];
  public selectedMultiValue2 = [];
  public checkboxValue = true;
  public options = [{label: 'Today', value: 'today', disabled: true}, {label: 'Yesterday', value: 'yesterday'}, {label: 'Last 7 days', value: 'lastWeek'}];
  public arrayOptions = [ 'Today', 'Yesterday', 'Last 7 days'];
  public example1 = `
  <PFormLayout>
    <PTextField label="Store name"/>
    <PTextField type="email" label="Account email"/>
    <PSelect
      label="Date range"
      :options="[{label: 'Today', value: 'today'},{label: 'Yesterday', value: 'yesterday'},{label: 'Last 7 days', value: 'lastWeek'}]"
      v-model="selectedValue1"
    />
    <PSelect
      label="Date range"
      id="day"
      :options="['Today', 'Yesterday', 'Last 7 days']"
      v-model="selectedValue2"
      placeholder="Select Day"
    />
    <PMultiSelect
      label="Date Range Multi Select"
      :options="options"
      v-model="selectedMultiValue"
      :taggable="true"
      :searchable="true"
    />
    <PMultiSelect
      label="Date Range Multi Select"
      :options="arrayOptions"
      v-model="selectedMultiValue2"
      :taggable="true"
      :searchable="true"
    />
    <PCheckbox label="Checkbox 1" indeterminate/>
    <PCheckbox v-model="cbVal" label="Checkbox 2"/>
    <PRadioButton id="layout_mode_1" name="layout_mode" value="standard" label="Standard" />
  </PFormLayout>
  `;
}
</script>

<style lang="scss" scoped>

</style>
