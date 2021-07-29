<template>
  <PNavigationContext.Provider>

  </PNavigationContext.Provider>
</template>

<script lang="ts">
  import { Vue, Component, Inject } from 'vue-property-decorator';
  import PNavigationContext from './PNavigationContext.vue';

  @Component({
    components: {
      PNavigationContext,
    }
  })
  export default class PNavigation extends Vue {
    @Inject() readonly location!: string;
    @Inject() readonly onNavigationDismiss!: void;
    @Inject() readonly withinContentContainer!: boolean;
  }
</script>

<style scoped>

</style>