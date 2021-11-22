<template>
  <div class="Polaris-Layout__AnnotatedSection">
    <div class="Polaris-Layout__AnnotationWrapper">
      <div class="Polaris-Layout__Annotation">
        <PTextContainer>
          <!-- @slot Title for the section  -->
          <slot name="title">
            <PHeading v-if="title">{{ title }}</PHeading>
          </slot>
          <div v-if="description || $slots.hasOwnProperty('description')" class="Polaris-Layout__AnnotationDescription">
            <!-- @slot Short Description content for the layout  -->
            <slot name="description">
              <p>{{ description }}</p>
            </slot>
          </div>
        </PTextContainer>
      </div>

      <div class="Polaris-Layout__AnnotationContent">
        <!-- @slot The content to display inside the annotated section layout -->
        <slot/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { PHeading } from '@/components/PHeading/index.js';
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
