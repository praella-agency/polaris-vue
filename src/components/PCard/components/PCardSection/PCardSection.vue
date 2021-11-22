<template>
  <div :class="className">
    <div v-if="title || $slots.hasOwnProperty('title')" class="Polaris-Card__SectionHeader">
      <PSubheading v-bind="$attrs">
        <slot name="title">
          {{ title }}
        </slot>
      </PSubheading>
    </div>
    <!-- @slot Body of Card section -->
    <slot/>
  </div>
</template> 

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames } from '@/utilities/css';

import { PSubheading } from '@/components/PSubheading/index.js';

@Component({
  components: { PSubheading },
})
export default class PCardSection extends Vue {

  /**
   * Title content for the card section
   */
  @Prop(String) public title!: string;

  /**
   * Title content for the card section
   */
  @Prop(Boolean) public subdued!: boolean;

  /**
   * Card will stretch/shrink to occupy the full width
   */
  @Prop(Boolean) public fullWidth!: boolean;

  public get className() {
    return classNames(
      'Polaris-Card__Section',
      this.subdued && 'Polaris-Card__Section--subdued',
      this.fullWidth && 'Polaris-Card__Section--fullWidth',
    );
  }
}
</script>
