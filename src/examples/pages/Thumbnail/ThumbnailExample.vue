<template>
  <ExampleContainer title="Thumbnail small">
    <ExampleContent :code="example">
      <PThumbnail source="/logo.png" alt="Logo" size="small" />
    </ExampleContent>

    <ExampleContent :code="example2">
      <PThumbnail source="/logo.png" alt="Logo" size="medium" />
    </ExampleContent>

    <ExampleContent :code="example3">
      <PThumbnail source="/logo.png" alt="Logo" size="large" />
    </ExampleContent>
  </ExampleContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { ExampleContainer, ExampleContent } from '@/examples/components';
import {PThumbnail} from '@/components/PThumbnail';

@Component({
  components: {
    PThumbnail, ExampleContent,
    ExampleContainer,
  },
  data() {
    return {
      color: '#FFF',
    };
  },
})
export default class ActionsExample extends Vue {
  public example = `
  <PThumbnail source="/logo.png" alt="Logo" size="small" />
  `;

  public example2 = `
  <PThumbnail source="/logo.png" alt="Logo" size="medium" />
  `;

  public example3 = `
  <PThumbnail source="/logo.png" alt="Logo" size="large" />
  `;
}
</script>
