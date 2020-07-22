<template functional>
  <div class="Polaris-FormLayout__Item">
    <slot/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class PFormLayoutItem extends Vue {
}
</script>
