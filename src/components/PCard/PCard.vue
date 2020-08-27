<template>
  <div :class="className">
    <template v-if="title">
      <PCardHeader>
        <slot slot="title" name="title"/>
        <slot slot="short_description" name="short_description"/>
      </PCardHeader>
    </template>

    <template v-if="sectioned">
      <PCardSection v-for="(slot,name) in $slots" :key="name" v-if="sectioned && ['title','short_description','footer'].indexOf(name) === -1">
        <slot :name="name" />
      </PCardSection>
    </template>

    <template>
      <PCardFooter>
        <slot name="footer" />
      </PCardFooter>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames, variationName } from '@/utilities/css';

import PCardHeader from './PCardHeader.vue';
import PCardSection from './PCardSection.vue';
import PCardFooter from '@/components/PCard/PCardFooter.vue';

@Component({
  components: {
    PCardFooter,
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

