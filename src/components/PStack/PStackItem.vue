<template>
  <div :class="className">
    <slot/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames } from '@/utilities/css';

@Component
export default class PStackItem extends Vue {
  @Prop(Boolean) public fill!: boolean;

  public get className() {
    return classNames(
      'Polaris-Stack__Item',
      this.fill && 'Polaris-Stack__Item--fill',
    );
  }
}
</script>
