<template>
  <div :class="className">
    <PPageHeader
      v-if="hasHeaderContent"
      :title="title"
      :subtitle="subtitle"
      :titleHidden="titleHidden"
      :separator="separator"
      :breadcrumbs="breadcrumbs">
    </PPageHeader>
    <div class="Polaris-Page__Content">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames, variationName } from '@/utilities/css';

import PPageHeader from './PPageHeader.vue';
type BreadcrumbsData = string | number;

@Component({
  components: { PPageHeader },
})

export default class PPage extends Vue {
  @Prop(String) public title!: string;
  @Prop(String) public subtitle!: string;
  @Prop(Boolean) public titleHidden!: boolean;
  @Prop(Boolean) public separator!: boolean;
  @Prop(Boolean) public fullWidth!: boolean;
  @Prop(Boolean) public narrowWidth!: boolean;
  @Prop(Array) public breadcrumbs!: BreadcrumbsData;

  public get className() {
    return classNames(
      'Polaris-Page',
      this.fullWidth && 'Polaris-Page--fullWidth',
      this.narrowWidth && 'Polaris-Page--narrowWidth',
    );
  }

  public get hasHeaderContent() {
    return (this.title != null && this.title !== '');
  }
}
</script>
