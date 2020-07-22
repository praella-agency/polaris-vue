<template>
  <label :class="className" :for="id" @click="$emit('click', $event)">
    <span class="Polaris-Choice__Control"><slot/></span>
    <span class="Polaris-Choice__Label">{{ label }}</span>
  </label>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames, variationName } from '@/utilities/css';

@Component
export default class PChoice extends Vue {
  @Prop(String) public id!: string;
  @Prop(String) public label!: string;
  @Prop(Boolean) public disabled!: boolean;
  @Prop(Boolean) public labelHidden!: boolean;
  @Prop(Boolean) public vertical!: boolean;

  public get className() {
    return classNames(
      'Polaris-Choice',
      this.labelHidden && 'Polaris-Choice--labelHidden',
      this.disabled && 'Polaris-Choice--disabled',
    );
  }
}
</script>
