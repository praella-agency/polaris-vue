<template>
  <span v-p-tooltip="`Hello`"></span>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class PTooltip extends Vue {

  }
</script>

<style scoped>

</style>