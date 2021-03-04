<template>
  <div class="Polaris-Card__Footer">
    <slot />
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';

  @Component
  export default class PCardFooter extends Vue {
  }
</script>
