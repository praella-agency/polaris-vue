<template>
  <ExampleContainer title="Progress Bar">
    <ExampleContent :code="example1">
      <PProgressBar size="small" :progress="20"></PProgressBar>
    </ExampleContent>
    <ExampleContent :code="example2">
      <PProgressBar size="medium" :progress="30"></PProgressBar>
    </ExampleContent>
    <ExampleContent :code="example3">
      <PProgressBar size="large" :progress="80"></PProgressBar>
    </ExampleContent>
  </ExampleContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { ExampleContainer, ExampleContent } from '@/examples/components';
import { PProgressBar } from '@/components/PProgressBar';

@Component({
  components: {
    ExampleContainer, ExampleContent,
    PProgressBar,
  },
})
export default class TitlesAndTextExample extends Vue {
  public example1 = `
  <PProgressBar size="small" :progress="20"></PProgressBar>
  `;

  public example2 = `
  <PProgressBar size="medium" :progress="30"></PProgressBar>
  `;

  public example3 = `
  <PProgressBar size="large" :progress="80"></PProgressBar>
  `;
}
</script>

<style lang="scss" scoped>

</style>
