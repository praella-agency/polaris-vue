<template>

</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';

  interface BaseEventProps {
    event: string;
    capture?: boolean;
    handler(event: Event): void;
  }

  export interface EventListenerProps extends BaseEventProps {
    passive?: boolean;
  }

  @Component
  export default class PEventListener extends Vue {
    @Prop({type: String, required: true}) public event!: string;

    @Prop({type: Boolean, default: false}) public capture!: boolean;

    /* tslint:disable-next-line */
    @Prop({type: Function, default: (event: Event):void => {}}) public handler!: any;

    @Prop({type: Boolean, default: false}) public passive!: boolean;

    public mounted() {
      this.attachListener();
    }

    public updated({passive, ...detachProps}: EventListenerProps) {
      this.detachListener(detachProps);
      this.attachListener();
    }

    public destroyed() {
      this.detachListener();
    }

    public render() {
      return null;
    }

    private attachListener() {
      const {event, handler, capture, passive} = this.$props;
      window.addEventListener(event, handler, {capture, passive});
    }

    private detachListener(prevProps?: BaseEventProps) {
      const {event, handler, capture} = prevProps || this.$props;
      window.removeEventListener(event, handler, capture);
    }
  }
</script>

<style scoped>

</style>