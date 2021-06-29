<template>
  <div :class="className">
    <!-- @slot TextContainer content -->
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
   * The amount of vertical spacing children will get between them.
   * @values tight | loose
   */
  @Prop({type: String, default: null}) public spacing!: Spacing;

  public get className() {
    return classNames(
      'Polaris-TextContainer',
      this.spacing && `Polaris-TextContainer--${variationName('spacing', this.spacing)}`,
    );
  }
}
</script>
