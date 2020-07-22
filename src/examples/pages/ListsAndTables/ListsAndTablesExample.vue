<template>
  <ExampleContainer title="Lists And Tables">
    <ExampleContent :code="example1">
      <PCard>
        <PDataTable
          :columnContentTypes="['text', 'numeric', 'numeric', 'numeric', 'numeric']"
          :headings="['Product', 'Price', 'SKU Number', 'Net quantity', 'Net sales']"
          :rows="[
            ['Emerald Silk Gown', '$875.00', 124689, 140, '$122,500.00'],
            ['Mauve Cashmere Scarf', '$230.00', 124533, 83, '$19,090.00'],
            ['Navy Merino Wool Blazer with khaki chinos and yellow belt', '$445.00', 124518, 32, '$14,240.00'],
          ]"
          :totals="['', '', '', 255, '$155,830.00']"
          footerContent="Showing 3 of 3 results"/>
      </PCard>
    </ExampleContent>
  </ExampleContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { ExampleContainer, ExampleContent } from '@/examples/components';
import { PPage } from '@/components/PPage';
import { PCard } from '@/components/PCard';
import { PDataTable } from '@/components/PDataTable';

@Component({
  components: {
    ExampleContainer, ExampleContent,
    PPage, PCard, PDataTable,
  },
})
export default class ListsAndTablesExample extends Vue {
  public selectedValue1 = 'today';

  public example1 = `
  <PCard>
    <PDataTable
      :columnContentTypes="['text', 'numeric', 'numeric', 'numeric', 'numeric']"
      :headings="['Product', 'Price', 'SKU Number', 'Net quantity', 'Net sales']"
      :rows="[
        ['Emerald Silk Gown', '$875.00', 124689, 140, '$122,500.00'],
        ['Mauve Cashmere Scarf', '$230.00', 124533, 83, '$19,090.00'],
        ['Navy Merino Wool Blazer with khaki chinos and yellow belt', '$445.00', 124518, 32, '$14,240.00'],
      ]"
      :totals="['', '', '', 255, '$155,830.00']"
      footerContent="Showing 3 of 3 results"/>
  </PCard>
  `;
}
</script>

<style lang="scss" scoped>

</style>
