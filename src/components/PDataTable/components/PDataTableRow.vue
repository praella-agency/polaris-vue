<template>
  <tr class="Polaris-DataTable__TableRow">
    <slot />
  </tr>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';

  @Component
  export default class PDataTableRow extends Vue {

  }
</script>

<style scoped>

</style>