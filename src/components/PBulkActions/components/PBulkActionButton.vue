<template>
    <div
        class="Polaris-BulkActions__BulkActionButton"
        ref="bulkActionButton"
    >
        <PButton
            :external="external"
            :url="url"
            :aria-label="accessibilityLabel"
            @click="$emit('action')"
            :disabled="disabled"
            :disclosure="disclosure"
        >
            {{ content }}
        </PButton>
        <span
            v-if="indicator"
            class="Polaris-Indicator"
        />
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from 'vue-property-decorator';
    import { PButton } from '../../PButton';

    @Component({
      components: {
        PButton,
      }
    })
    export default class PBulkActionButton extends Vue {
      @Prop({type: String}) public url!: string;
      @Prop({type: Boolean, default: false}) public external!: boolean;
      @Prop({type: String, default: null}) public content!: string;
      @Prop({type: Boolean, default: false}) public disclosure!: boolean;
      @Prop({type: String, default: null}) public accessibilityLabel!: string;
      @Prop({type: Boolean, default: false}) public disabled!: boolean;
      @Prop({type: Boolean, default: false}) public indicator!: boolean;

      public mounted() {
        if (this.$refs.bulkActionButton) {
          let width = (this.$refs.bulkActionButton as HTMLDivElement).getBoundingClientRect().width;
          this.$emit('handleMeasurement', width);
        }
      }
    }
</script>

<style scoped>

</style>