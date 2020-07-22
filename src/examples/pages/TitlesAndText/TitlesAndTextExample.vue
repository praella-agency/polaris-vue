<template>
  <ExampleContainer title="Titles And Text">
    <ExampleContent :code="example1">
      <PHeading element="h1">Online store dashboard</PHeading>
    </ExampleContent>

    <ExampleContent :code="example2">
      <PTextContainer>
        <PHeading>Install the Shopify POS App</PHeading>
        <p>
          Shopify POS is the easiest way to sell your products in person. Available
          for iPad, iPhone, and Android.
        </p>
      </PTextContainer>
    </ExampleContent>

    <ExampleContent :code="example3">
      <PTextStyle variation="subdued">No supplier listed</PTextStyle><br>
      <PTextStyle variation="strong">Total</PTextStyle><br>
      <PTextStyle variation="positive">Orders increased</PTextStyle><br>
      <PTextStyle variation="negative">Orders decreased</PTextStyle><br>
      <p>
        New URL that visitors should be forwarded to. If you want your store’s
        homepage, enter <PTextStyle variation="code"> / </PTextStyle> (a forward slash).
      </p>
    </ExampleContent>
  </ExampleContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { ExampleContainer, ExampleContent } from '@/examples/components';
import { PHeading } from '@/components/PHeading';
import { PTextContainer } from '@/components/PTextContainer';
import { PTextStyle } from '@/components/PTextStyle';

@Component({
  components: {
    ExampleContainer, ExampleContent,
    PHeading, PTextContainer, PTextStyle,
  },
})
export default class TitlesAndTextExample extends Vue {
  public example1 = `
  <PHeading element="h1">Online store dashboard</PHeading>
  `;

  public example2 = `
  <PTextContainer>
    <PHeading>Install the Shopify POS App</PHeading>
    <p>
      Shopify POS is the easiest way to sell your products in person. Available
      for iPad, iPhone, and Android.
    </p>
  </PTextContainer>
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
