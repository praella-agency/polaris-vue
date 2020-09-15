<template>
  <ExampleContainer title="Color Picker">
    <ExampleContent :code="example">
      <PColorPicker label="Color Picker" :color.sync="color" />
    </ExampleContent>
  </ExampleContainer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { ExampleContainer, ExampleContent } from '@/examples/components';
import { PColorPicker } from '@/components/PColorPicker';

@Component({
  components: {
    ExampleContainer, ExampleContent,
    PColorPicker,
  },
  data() {
    return {
      color: '#FFF',
    };
  },
})
export default class ActionsExample extends Vue {
  public example = `
  <PColorPicker label="Color Picker" :color.sync="color" />
  `;
}
</script>
