<template>
  <div class="Polaris-Card__Footer">
    <slot />
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import { classNames, variationName } from '@/utilities/css';

  import { PHeading } from '@/components/PHeading';

  @Component
  export default class PCardPFooter extends Vue {
  }
</script>
