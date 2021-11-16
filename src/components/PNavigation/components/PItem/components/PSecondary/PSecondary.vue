<template>
  <PCollapsible
      :id="id || uid"
      :open="expanded"
      :transition="{duration: '0ms', timingFunction: 'linear'}"
  >
    <ul class="Polaris-Navigation__List">
      <slot />
    </ul>
  </PCollapsible>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { PCollapsible } from '@/components/PCollapsible';

  @Component({
    components: {
      PCollapsible,
    },
  })
  export default class PSecondary extends Vue {
    @Prop({type: Boolean, required: true}) public expanded!: boolean;

    @Prop({type: String, default: null}) public id!: string;

    public uid = `SecondaryNavigation${new Date().getUTCMilliseconds()}`;
  }
</script>

<style scoped>

</style>