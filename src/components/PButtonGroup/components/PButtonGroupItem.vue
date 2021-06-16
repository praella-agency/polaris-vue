<template functional>
  <div class="Polaris-ButtonGroup__Item">
    <slot/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class PButtonGroupItem extends Vue {
}
</script>
