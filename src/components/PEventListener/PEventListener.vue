<template>
<!--    <div></div>-->
</template>
<script setup>
    import { onMounted, onUnmounted, onUpdated } from 'vue';

    let props = defineProps({
        event: {
            type: String,
            required: true
        },
        capture: {
            type: Boolean,
            default: false
        },
        /* tslint:disable-next-line */
        handler: {
            type: Function,
            default: (event) => {
            }
        },
        passive: {
            type: Boolean,
            default: false
        }
    });

    function attachListener() {
        const {event, handler, capture, passive} = props;
        window.addEventListener(event, handler, {capture, passive});
    }

    function detachListener(prevProps) {
        const {event, handler, capture} = prevProps || props;
        window.removeEventListener(event, handler, capture);
    }

    onMounted(() => {
        attachListener();
    });

    onUpdated(({passive, ...detachProps}) => {
        detachListener(detachProps);
        attachListener();
    });

    onUnmounted(() => {
        detachListener();
    });
</script>
