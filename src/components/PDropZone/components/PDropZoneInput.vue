<template>
    <div>
        <input
            ref="fileInputNode"
            :id="id"
            :accept="accept"
            :disabled="disabled"
            :type="type"
            :multiple="multiple"
            autocomplete="off"
            @change="$emit('change', $event)"
            @focus="$emit('focus', $event)"
            @blur="$emit('blur', $event)"
        >
    </div>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Emit} from 'vue-property-decorator';

  @Component({})
  export default class PDropZoneInput extends Vue {
    @Prop({type: String, default: null}) public id!: string;
    @Prop({type: String, default: null}) public accept!: string;
    @Prop({type: Boolean, default: false}) public disabled!: boolean;
    @Prop({type: String, default: 'file'}) public type!: string;
    @Prop({type: Boolean, default: false}) public multiple!: boolean;
    @Prop({type: Boolean, default: false}) public openFileDialog!: boolean;

    public mounted() {
      this.openFileDialog && this.triggerFileDialog();
    }

    public updated() {
      this.openFileDialog && this.triggerFileDialog();
    }

    private triggerFileDialog() {
      this.open();
      this.onFileDialogClose && this.onFileDialogClose();
    }

    private open() {
      if (!this.$refs.fileInputNode) {
        return;
      }
      this.$refs.fileInputNode.$el.click();
    }

    @Emit()
    public onFileDialogClose() {
      this.$emit('')
    }
  }
</script>

<style scoped>

</style>