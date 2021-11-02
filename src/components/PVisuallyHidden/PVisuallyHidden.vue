<template>
  <span class="Polaris-VisuallyHidden" :id="id">
    <!-- @slot Slot to add content -->
    <slot/>
  </span>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';

  /**
   * <br/>
   * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
   *  sans-serif;">Use when an element needs to be available to assistive technology (for example, a screen reader) but
   *  otherwise hidden.</h4>
   */
  @Component
  export default class PVisuallyHidden extends Vue {
    /**
     * Id for the element
     */
    @Prop({type: [String, Number], default: null}) public id!: string | number;
  }
</script>

<style scoped>

</style>