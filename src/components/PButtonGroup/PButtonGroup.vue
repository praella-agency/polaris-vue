<template>
  <div :class="className" >
    <div v-for="item in $slots" class="Polaris-ButtonGroup__Item">
      <slot/>
    </div>
  </div>
</template>
<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames } from '@/utilities/css';

import { PButton } from '@/components/PButton';

@Component({
  components: {
    PButton,
  },
})
export default class PButtonGroup extends Vue {
  @Prop(Boolean) public segmented!: boolean;
  @Prop(Boolean) public fullWidth!: boolean;
  @Prop(Boolean) public connectedTop!: boolean;

  public get className() {
    return classNames(
      'Polaris-ButtonGroup',
      this.segmented && 'Polaris-ButtonGroup--segmented',
      this.fullWidth && 'Polaris-ButtonGroup--fullWidth',
      this.connectedTop && 'Polaris-ButtonGroup--connectedTop',
    );
  }
}
</script>
