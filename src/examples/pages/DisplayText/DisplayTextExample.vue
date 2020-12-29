<template>
  <ExampleContainer title="Display Text">
    <ExampleContent :code="example1">
      <PDisplayText size="small">Online store dashboard</PDisplayText>
      <PDisplayText size="medium">Online store dashboard</PDisplayText>
      <PDisplayText size="large">Online store dashboard</PDisplayText>
      <PDisplayText element="h1">Online store dashboard</PDisplayText>
      <PDisplayText size="medium" element="p">Online store dashboard</PDisplayText>
      <PDisplayText size="small" element="span">Online store dashboard</PDisplayText>
    </ExampleContent>
  </ExampleContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { ExampleContainer, ExampleContent } from '@/examples/components';
import {PDisplayText} from '@/components/PDisplayText';

@Component({
  components: {
    ExampleContainer, ExampleContent,
    PDisplayText
  },
})
export default class TitlesAndTextExample extends Vue {
  public example1 = `
    <PDisplayText size="small">Online store dashboard</PDisplayText>
    <PDisplayText size="medium">Online store dashboard</PDisplayText>
    <PDisplayText size="large">Online store dashboard</PDisplayText>
    <PDisplayText element="h1">Online store dashboard</PDisplayText>
    <PDisplayText size="medium" element="p">Online store dashboard</PDisplayText>
    <PDisplayText size="small" element="span">Online store dashboard</PDisplayText>
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
