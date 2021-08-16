<template>
  <span class="Polaris-VisuallyHidden">
    <slot/>
  </span>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class PVisuallyHidden extends Vue {
  }
</script>

<style scoped>

</style>