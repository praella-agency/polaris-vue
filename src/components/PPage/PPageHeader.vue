<template>
  <div :class="className">
    <PPageBreadcrumb v-if="breadcrumbs" :breadcrumbs="breadcrumbs"></PPageBreadcrumb>
    <div class="Polaris-Page-Header__MainContent">
      <div class="Polaris-Page-Header__TitleActionMenuWrapper">
        <PPageHeaderTitle :title="title" :subtitle="subtitle"></PPageHeaderTitle>
        <PPageHeaderActionMenu :secondaryActions="secondaryActions"></PPageHeaderActionMenu>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames, variationName } from '@/utilities/css';

import PPageHeaderTitle from './PPageHeaderTitle.vue';
import PPageBreadcrumb from './PPageBreadcrumb.vue';
import PPageHeaderActionMenu from './PPageHeaderActionMenu.vue';

@Component({
  components: { PPageHeaderTitle, PPageBreadcrumb, PPageHeaderActionMenu },
})
export default class PPageHeader extends Vue {
  @Prop(String) public title!: string;
  @Prop(String) public subtitle!: string;
  @Prop(Boolean) public titleHidden!: boolean;
  @Prop(Boolean) public separator!: boolean;
  @Prop(Object) public breadcrumbs!: object;
  @Prop(Array) public secondaryActions!: [];


  public get className() {
    return classNames(
      'Polaris-Page-Header',
      this.titleHidden && 'Polaris-Page-Header--titleHidden',
      this.separator && 'Polaris-Page-Header--separator',
    );
  }
}
</script>
