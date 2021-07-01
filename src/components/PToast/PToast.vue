<template>

</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { Action } from '@/types';

  @Component
  export default class PToast extends Vue {

    /**
     * Id for the element
     */
    @Prop({type: String, default: null}) public id!: string;

    /**
     * The content that should appear in the toast message
     */
    @Prop({type: String, default: null, required: true}) public content!: string;

    /**
     * The length of time in milliseconds the toast message should persist
     * @default 5000
     */
    @Prop({type: Number, default: 5000}) public duration!: number;

    /**
     *  Display an error toast.
     */
    @Prop({type: Boolean, default: false}) public error!: string;

    /**
     *  Callback when the dismiss icon is clicked
     */
    @Prop({type: Function}) public onDismiss!: void;

    /**
     * Adds an action next to the message
     */
    @Prop({type: Object, default: {}}) public action!: Action;

    public showToast!: boolean;
  }
</script>

<style scoped>

</style>