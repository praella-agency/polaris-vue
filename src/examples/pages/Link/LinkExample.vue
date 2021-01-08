<template>
  <ExampleContainer title="Links">
    <ExampleContent :code="example1">
      <PLink url="https://www.google.com/">Click here</PLink>
    </ExampleContent>
    <ExampleContent :code="example2">
      <PLink url="https://www.google.com/" external>Click here</PLink>
    </ExampleContent>
    <ExampleContent :code="example3">
      <PLink url="https://www.google.com/" monochrome>Click here</PLink>
    </ExampleContent>
  </ExampleContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { ExampleContainer, ExampleContent } from '@/examples/components';
import { PLink } from '@/components/PLink';

@Component({
  components: {
    ExampleContainer, ExampleContent,
    PLink,
  },
})
export default class TitlesAndTextExample extends Vue {
  public example1 = `
  <PLink url="https://www.google.com/">Click here</PLink>
  `;

  public example2 = `

  <PLink url="https://www.google.com/" external>Click here</PLink>
  `;

  public example3 = `
  <PLink url="https://www.google.com/" monochrome>Click here</PLink>
  `;
}
</script>

<style lang="scss" scoped>

</style>
