<template>
  <ExampleContainer title="Form">
    <ExampleContent :code="example1">
      <PFormLayout>
        <PTextField label="Store name" helpText="Your current store name."/>
        <PTextField label="Description" v-model="val" multiline @input="handleInput"></PTextField>
        <PTextField error="Please enter valid email" type="email" label="Account email"/>
        <PTextField type="number" label="Number" v-model="number" @input="handleNumberChange"/>
        <PTextField type="date" label="Date Picker"/>
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

        <PCheckbox id="checkbox_1" value="Checkbox val 1" label="Checkbox 1" indeterminate/>
        <PCheckbox id="checkbox_2" helpText="Help text for checkbox" value="Checkbox val 2" label="Checkbox 2"/>
        <PRadioButton id="radio_1" name="layout_mode" value="standard" label="Standard" />
        <PRadioButton id="radio_2" name="layout_mode" value="standard 2" label="Standard 2" />
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
import { PFormLayout, PFormLayoutItem, PFormLayoutGroup } from '@/components/PFormLayout';
import { PMultiSelect } from '@/components/PMultiSelect';

@Component({
  components: {
    PMultiSelect,
    PRadioButton,
    ExampleContainer, ExampleContent,
    PFormLayout, PFormLayoutItem, PFormLayoutGroup,
    PSelect, PTextField, PCheckbox,
  },
})
export default class FormExample extends Vue {
  public selectedValue1 = 'today';
  public selectedValue2 = '';
  public number = 0;
  public selectedMultiValue = [];
  public selectedMultiValue2 = [];
  public val = '';
  public checkboxValue = true;
  public options = [{label: 'Today', value: 'today', disabled: true}, {label: 'Yesterday', value: 'yesterday'}, {label: 'Last 7 days', value: 'lastWeek'}];
  public arrayOptions = [ 'Today', 'Yesterday', 'Last 7 days'];
  public example1 = `
  <PFormLayout>
    <PTextField label="Store name"/>

    <PTextField error="Please enter valid email" type="email" label="Account email"/>

    <PTextField type="date" label="Date Picker"/>

    <PTextField type="number" label="Number" v-model="number" @input="handleNumberChange"/>

    <PSelect
      label="Date range"
      :options="[{label: 'Today', value: 'today'},
                 {label: 'Yesterday', value: 'yesterday'},
                 {label: 'Last 7 days', value: 'lastWeek'}
                ]"
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

  public handleInput(val) {

    this.val = val;
  }

  public handleNumberChange(val) {
    this.number = val;
  }
}
</script>

<style lang="scss" scoped>

</style>
