<template>
  <div :class="className" v-bind:style="style">
    <slot/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames } from '@/utilities/css';

@Component
export default class PStackItem extends Vue {
  @Prop(Boolean) public fill!: boolean;
  @Prop([String, Number]) public width!: string | number;

  public get className() {
    return classNames(
      'Polaris-Stack__Item',
      this.fill && 'Polaris-Stack__Item--fill',
    );
  }

  public get style() {
    if (this.width) {
      return {width: this.width};
    } else { return null; }
  }
}
</script>
