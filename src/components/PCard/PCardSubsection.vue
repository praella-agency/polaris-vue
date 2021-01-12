<template>
  <div class="Polaris-Card__Subsection">
    <!-- @slot Body of Card subsection -->
    <slot/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class PCardSubsection extends Vue {
}
</script>
