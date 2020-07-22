<template>
  <div class="example-content">
    <PLayout>
      <PLayoutSection oneHalf>
        <slot/>
      </PLayoutSection>
      <PLayoutSection oneHalf>
        <PCard>
          <pre><code>{{ code }}</code></pre>
        </PCard>
      </PLayoutSection>
    </PLayout>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { PLayout, PLayoutSection } from '@/components/PLayout';
import { PCard } from '@/components/PCard';

@Component({
  components: {
    PCard,
    PLayout, PLayoutSection,
  },
})
export default class ExampleContent extends Vue {
  @Prop(String) public code!: string;
}
</script>

<style lang="scss" scoped>
.example-content {
  margin-bottom: 10px;
}
</style>
