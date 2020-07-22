<template>
  <ExampleContainer title="Actions">
    <ExampleContent :code="example1">
      <PButton plain destructive @click="test1()" @focus="test2()" @blur="test3()">
        Add product
      </PButton>
    </ExampleContent>

    <ExampleContent :code="example2">
      <PButton destructive loading>
        Add product
      </PButton>
    </ExampleContent>

    <ExampleContent :code="example3">
      <PButtonGroup>
        <PButton>Cancel</PButton>
        <PButton primary>Save</PButton>
      </PButtonGroup>
    </ExampleContent>

    <ExampleContent :code="example4">
      <PButtonGroup segmented>
        <PButton>Bold</PButton>
        <PButton>Italic</PButton>
        <PButton>Underline</PButton>
      </PButtonGroup>
    </ExampleContent>
  </ExampleContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { ExampleContainer, ExampleContent } from '@/examples/components';
import { PButton } from '@/components/PButton';
import { PButtonGroup } from '@/components/PButtonGroup';

@Component({
  components: {
    ExampleContainer, ExampleContent,
    PButton, PButtonGroup,
  },
})
export default class ActionsExample extends Vue {
  public example1 = `
  <PButton plain destructive @click="test1()" @focus="test2()" @blur="test3()">
    Add product
  </PButton>
  `;

  public example2 = `
  <PButton destructive loading>
    Add product
  </PButton>
  `;

  public example3 = `
  <PButtonGroup>
    <PButton>Cancel</PButton>
    <PButton primary>Save</PButton>
  </PButtonGroup>
  `;

  public example4 = `
  <PButtonGroup segmented>
    <PButton>Bold</PButton>
    <PButton>Italic</PButton>
    <PButton>Underline</PButton>
  </PButtonGroup>
  `;

  public test1() {
    /* tslint:disable-next-line */
    console.log('1asd');
  }
  public test2() {
    /* tslint:disable-next-line */
    console.log('2asd');
  }
  public test3() {
    /* tslint:disable-next-line */
    console.log('3asd');
  }
}
</script>
