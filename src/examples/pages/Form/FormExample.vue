<template>
  <ExampleContainer title="Form">
    <ExampleContent :code="example1">
      <PFormLayout>
        <PTextField label="Store name"/>
        <PTextField type="email" label="Account email"/>
        <PSelect
          label="Date range"
          :options="[{label: 'Today', value: 'today'},{label: 'Yesterday', value: 'yesterday'},{label: 'Last 7 days', value: 'lastWeek'}]"
          v-model="selectedValue1"
        />
        <PCheckbox label="Checkbox 1" indeterminate/>
        <PCheckbox v-model="checkboxValue" label="Checkbox 2"/>
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
import { PFormLayout, PFormLayoutItem } from '@/components/PFormLayout';

@Component({
  components: {
    ExampleContainer, ExampleContent,
    PFormLayout, PFormLayoutItem,
    PSelect, PTextField, PCheckbox,
  },
})
export default class FormExample extends Vue {
  public selectedValue1 = 'today';
  public checkboxValue = true;

  public example1 = `
  <PFormLayout>
    <PTextField label="Store name"/>
    <PTextField type="email" label="Account email"/>
    <PSelect
      label="Date range"
      :options="[{label: 'Today', value: 'today'},{label: 'Yesterday', value: 'yesterday'},{label: 'Last 7 days', value: 'lastWeek'}]"
      v-model="selectedValue1"
    />
    <PCheckbox label="Checkbox 1" indeterminate/>
    <PCheckbox v-model="cbVal" label="Checkbox 2"/>
  </PFormLayout>
  `;
}
</script>

<style lang="scss" scoped>

</style>
