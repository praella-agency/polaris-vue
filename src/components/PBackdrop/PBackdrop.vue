<template>
  <div
      :class="className"
      @click="$emit('click', $event)"
      @touchStart="$emit('touchStart', $event)"
  />
</template>

<script>
  import { classNames } from '../../utilities/css';

  export default {
    name: 'PBackdrop',
    props: {
      belowNavigation: {
        type: Boolean,
        default: false
      },
      transparent: {
        type: Boolean,
        default: false
      },
    },
    computed: {
      className() {
        return classNames(
            'Polaris-Backdrop',
            this.belowNavigation && 'Polaris-Backdrop--belowNavigation',
            this.transparent && 'Polaris-Backdrop--transparent',
        );
      }
    }
  }
</script>

<style scoped>

</style>