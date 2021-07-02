<template>
    <div
        v-on="message ? (active ? {click: openToast} : {click: closeToast}) : {}"
    ></div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { PButton } from '@/components/PButton';

  import VueToast from 'vue-toast-notification';
  // Import one of the available themes
  // import 'vue-toast-notification/dist/theme-default.css';
  import './PToast.css';
  Vue.use(VueToast);

  type position = 'bottom-right' | 'top-right' | 'top' | 'top-left' | 'bottom' | 'bottom-left' | undefined;

  type type = 'success' | 'info' | 'warning' | 'error' | 'default';

  @Component({
    components: {
      PButton,
    },
  })
  export default class PToast extends Vue {

    /**
     * Id for the element
     */
    @Prop({type: String, default: null}) public id!: string;

    /**
     * The message that should appear in the toast message
     */
    @Prop({type: String, required: true}) public message!: string;

    /**
     * Toast type
     */
    @Prop({type: String, default: 'success'}) public type!: string;

    /**
     * Toast Position
     */
    @Prop({type: String, default: 'bottom-right'}) public position!: position;

    /**
     * The length of time in milliseconds the toast message should persist
     */
    @Prop({type: Number, default: 3000}) public duration!: number;

    /**
     * Allow user dismiss by clicking
     */
    @Prop({type: Boolean, default: true}) public dismissible!: boolean;

    /**
     * Wait for existing to dismiss before showing new
     */
    @Prop({type: Boolean, default: false}) public queue!: boolean;

    /**
     * Pause the timer when mouse on over a toast
     */
    @Prop({type: Boolean, default: true}) public pauseOnHover!: boolean;

    /**
     * Do something when user clicks
     */
    @Prop({type: Function}) public onClick!: any;

    /**
     * Do something after toast gets dismissed
     */
    @Prop({type: Function}) public onDismiss!: any;

    public active = true;

    public openToast() {
      Vue.$toast.open({
        message: this.message,
        type: this.type,
        position: this.position,
        duration: this.duration,
        dismissible: this.dismissible,
        queue: this.queue,
        pauseOnHover: this.pauseOnHover,
        onClick: this.onClick,
        onDismiss: this.onDismiss,
      });
      this.active = false;
    };

    public closeToast() {
      Vue.$toast.clear();
      this.active = true;
    }
  }
</script>

<style scoped>

</style>
