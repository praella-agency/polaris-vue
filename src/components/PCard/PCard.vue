<template>
  <div :class="className">
    <template>
      <PCardHeader>
        <slot slot="title" name="title"/>
        <slot slot="short_description" name="short_description"/>
      </PCardHeader>
    </template>

    <template v-if="sectioned">
      <PCardSection v-for="(slot,name) in $slots" :key="name" v-if="sectioned && name !== 'title' && name !== 'short_description'">
        <slot :name="name" />
      </PCardSection>
    </template>
    <template v-else>
      <PCardSection v-for="(slot,name) in $slots" :key="name" v-if="sectioned && name !== 'title' && name !== 'short_description'">
        <slot :name="name" />
      </PCardSection>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames, variationName } from '@/utilities/css';

import PCardHeader from './PCardHeader.vue';
import PCardSection from './PCardSection.vue';
import PCardSubsection from './PCardSubsection.vue';

@Component({
  components: {
    PCardHeader, PCardSection,
  },

})
export default class PCard extends Vue {
  @Prop(String) public title!: string;
  @Prop(Boolean) public subdued!: boolean;
  @Prop(Boolean) public sectioned!: boolean;

  public get className() {
    return classNames(
      'Polaris-Card',
      this.subdued && 'Polaris-Card--subdued',
    );
  }
}
</script>

