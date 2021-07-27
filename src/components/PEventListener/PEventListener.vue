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

  export default class PEventListener extends Vue {
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

    render() {
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