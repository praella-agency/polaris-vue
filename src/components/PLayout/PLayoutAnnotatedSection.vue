<template>
  <div class="Polaris-Layout__AnnotatedSection">
    <div class="Polaris-Layout__AnnotationWrapper">
      <div class="Polaris-Layout__Annotation">
        <PTextContainer>
          <PHeading v-if="title">{{ title }}</PHeading>
          <div v-if="description" class="Polaris-Layout__AnnotationDescription">
            <p>{{ description }}</p>
          </div>
        </PTextContainer>
      </div>

      <div class="Polaris-Layout__AnnotationContent">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { PHeading } from '@/components/PHeading';
import { PTextContainer } from '@/components/PTextContainer';

@Component({
  components: {
    PHeading, PTextContainer,
  },
})
export default class PLayoutAnnotatedSection extends Vue {
  @Prop(String) public title!: string;
  @Prop(String) public description!: string;
}
</script>
