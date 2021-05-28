<template>
  <div :class="className">
    <slot/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames, variationName } from '@/utilities/css';

type Spacing = 'tight' | 'loose';

@Component
export default class PTextContainer extends Vue {
  /**
   * The amount of vertical spacing children will get between them - Can be 'tight' | 'loose'
   */
  @Prop(String) public spacing!: Spacing;

  public get className() {
    return classNames(
      'Polaris-TextContainer',
      this.spacing && `Polaris-TextContainer--${variationName('spacing', this.spacing)}`,
    );
  }
}
</script>
