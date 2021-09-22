<template>
  <div>
    <input
        ref="fileInputNode"
        :id="id"
        :accept="accept"
        :disabled="disabled"
        type="file"
        :multiple="multiple"
        autocomplete="off"
        @change="$emit('change', $event)"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
        :openFileDialog="openFileDialog"
        :onFileDialogClose="onFileDialogClose"
    />
    {{type}}
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';

  @Component({})
  export default class PDropZoneInput extends Vue {
    @Prop({type: [String, Number], default: null}) public id!: string | number;
    @Prop({type: String, default: null}) public accept!: string;
    @Prop({type: Boolean, default: false}) public disabled!: boolean;
    @Prop({type: String, default: 'file'}) public type!: string;
    @Prop({type: Boolean, default: false}) public multiple!: boolean;
    @Prop({type: Boolean, default: false}) public openFileDialog!: boolean;
    @Prop({type: Function}) public onFileDialogClose!: any;

    public mounted() {
      // tslint:disable-next-line:no-unused-expression
      this.openFileDialog && this.triggerFileDialog();
    }

    public updated() {
      // tslint:disable-next-line:no-unused-expression
      this.openFileDialog && this.triggerFileDialog();
    }

    private triggerFileDialog() {
      this.open();
      // tslint:disable-next-line:no-unused-expression
      this.onFileDialogClose && this.onFileDialogClose();
    }

    private open() {
      if (!this.$refs.fileInputNode) {
        return;
      }
      (this.$refs.fileInputNode as HTMLInputElement).click();
    }
  }
</script>

<style scoped>

</style>