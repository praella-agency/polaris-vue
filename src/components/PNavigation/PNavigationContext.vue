<template>

</template>

<script lang="ts">
  import { Vue, Component, Provide } from 'vue-property-decorator';

  interface NavigationContextType {
    location: string;
    onNavigationDismiss?(): void;
    withinContentContainer?: boolean;
  }

  @Component
  export default class PNavigationContext extends Vue {
    @Provide() location!: NavigationContextType['location'];
    @Provide() onNavigationDismiss!: NavigationContextType['onNavigationDismiss'];
    @Provide() withinContentContainer!: NavigationContextType['withinContentContainer'];
  }
</script>

<style scoped>

</style>