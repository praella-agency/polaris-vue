<template>
  <div :class="className">
    <PStackItem v-for="item in $slots" :key="key">
      <slot/>
    </PStackItem>
  </div>
</template>
<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames, variationName } from '@/utilities/css';

import PStackItem from './PStackItem.vue';

type Spacing = 'extraTight' | 'tight' | 'loose' | 'extraLoose' | 'none';
type Alignment = 'leading' | 'trailing' | 'center' | 'fill' | 'baseline';
type Distribution =
  | 'equalSpacing'
  | 'leading'
  | 'trailing'
  | 'center'
  | 'fill'
  | 'fillEvenly';

@Component({
  components: {PStackItem},
})
export default class PStack extends Vue {
  @Prop(Boolean) public vertical!: boolean;
  @Prop({ type: Boolean, default: true }) public wrap!: boolean;
  @Prop(String) public spacing!: Spacing;
  @Prop(String) public distribution!: Distribution;
  @Prop(String) public alignment!: Alignment;

  public get className() {
    return classNames(
      'Polaris-Stack',
      this.vertical && 'Polaris-Stack--vertical',
      this.spacing && `Polaris-Stack--${variationName('spacing', this.spacing)}`,
      this.distribution && `Polaris-Stack--${variationName('distribution', this.distribution)}`,
      this.alignment && `Polaris-Stack--${variationName('alignment', this.alignment)}`,
      this.wrap === false && 'Polaris-Stack--noWrap',
    );
  }
}
</script>
