<template>
  <div
      :class="className"
      @click="$emit('click', $event)"
      @touchStart="$emit('touchStart', $event)"
  />
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { classNames } from '@/utilities/css';

  @Component
  export default class PBackdrop extends Vue {
    @Prop({type: Boolean, default: false}) public belowNavigation!: boolean;
    @Prop({type: Boolean, default: false}) public transparent!: boolean;

    public get className() {
      return classNames(
        'Polaris-Backdrop',
        this.belowNavigation && 'Polaris-Backdrop--belowNavigation',
        this.transparent && 'Polaris-Backdrop--transparent',
      );
    }
  }
</script>

<style scoped>

</style>