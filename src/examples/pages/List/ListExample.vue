<template>
  <ExampleContainer title="List">
    <ExampleContent :code="example1">
      <PList>
        <PListItem>Item 1</PListItem>
        <PListItem>Item 2</PListItem>
        <PListItem>Item 3</PListItem>
        <PListItem>Item 4</PListItem>
      </PList>
    </ExampleContent>
    <ExampleContent :code="example1">
      <PList type="number">
        <PListItem>Item 1</PListItem>
        <PListItem>Item 2</PListItem>
        <PListItem>Item 3</PListItem>
        <PListItem>Item 4</PListItem>
      </PList>
    </ExampleContent>
  </ExampleContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { ExampleContainer, ExampleContent } from '@/examples/components';
import { PListItem, PList } from "@/components/PList";

@Component({
  components: {
    ExampleContainer, ExampleContent,
    PList, PListItem
  },
})
export default class TitlesAndTextExample extends Vue {
  public example1 = `
  <PList>
    <PListItem>Item 1</PListItem>
    <PListItem>Item 2</PListItem>
    <PListItem>Item 3</PListItem>
    <PListItem>Item 4</PListItem>
  </PList>
  `;

  public example2 = `
  <PList type="number">
    <PListItem>Item 1</PListItem>
    <PListItem>Item 2</PListItem>
    <PListItem>Item 3</PListItem>
    <PListItem>Item 4</PListItem>
  </PList>
  `;

  public example3 = `
  <PTextStyle variation="subdued">No supplier listed</PTextStyle><br>
  <PTextStyle variation="strong">Total</PTextStyle><br>
  <PTextStyle variation="positive">Orders increased</PTextStyle><br>
  <PTextStyle variation="negative">Orders decreased</PTextStyle><br>
  <p>
    New URL that visitors should be forwarded to. If you want your store’s
    homepage, enter <PTextStyle variation="code"> / </PTextStyle> (a forward slash).
  </p>
  `;
}
</script>

<style lang="scss" scoped>

</style>
