<script>
    import utils from '../../utilities';

    const BaseEventProps = {
        event: {
            type: String,
            required: true
        },
        capture: Boolean,
        handler: (event) => {
            return 0;
        },
    }

    export const EventListenerProps = {
        ...BaseEventProps,
        passive: Boolean,
    }

    export default {
        name: 'PEventListener',
        props: {
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
        },
        methods: {
            attachListener() {
                const {event, handler, capture, passive} = this.$props;
                window.addEventListener(event, handler, {capture, passive});
            },
            detachListener(prevProps) {
                const {event, handler, capture} = prevProps || this.$props;
                window.removeEventListener(event, handler, capture);
            },
        },
        render() {
            return null;
        },
        mounted() {
            this.attachListener();
        },
        updated({passive, ...detachProps}) {
            this.detachListener(detachProps);
            this.attachListener();
        },
        [utils.destroyed]() {
            this.detachListener();
        },
    }
</script>

<style scoped>

</style>