<template>
  <div class="Polaris-Layout__AnnotatedSection">
    <div class="Polaris-Layout__AnnotationWrapper">
      <div class="Polaris-Layout__Annotation">
        <PTextContainer>
          <!-- @slot Short Description content for the layout  -->
          <slot name="title" />
          <PHeading v-if="title">{{ title }}</PHeading>
          <div v-if="description" class="Polaris-Layout__AnnotationDescription">
            <p>{{ description }}</p>
          </div>
        </PTextContainer>
      </div>

      <div class="Polaris-Layout__AnnotationContent">
        <!-- @slot Default slot for content  -->
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
  /**
   * Title of layout
   */
  @Prop({type: String, default: null}) public title!: string;
  /**
   * Description of layout
   */
  @Prop({type: String, default: null}) public description!: string;
}
</script>
