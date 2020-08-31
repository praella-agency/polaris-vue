<template>
  <div :class="className">
    <div v-if="title" class="Polaris-Card__SectionHeader">
      <PSubheading v-bind="$attrs">{{ title }}</PSubheading>
    </div>
    <slot/>
  </div>
</template> 

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames } from '@/utilities/css';

import { PSubheading } from '@/components/PSubheading';

@Component({
  components: { PSubheading },
})
export default class PCardHeader extends Vue {
  @Prop(String) public title!: string;
  @Prop(Boolean) public subdued!: boolean;
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
