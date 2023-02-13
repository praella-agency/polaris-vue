<script>
    import { vue3 } from '../../ComponentHelpers';
    let render = {};

    render = function render() {
        const validSlot = this.$slots.default();
        const child = validSlot ? validSlot[0] : vue3.h('div');
        if (this.active) {
            return vue3.h(this.tag, {}, [child]);
        }
        return child;
    }

    export default {
        name: 'POptionalTag',
        props: {
            tag: {
                type: String,
                required: true,
            },
            active: {
                type: Boolean,
                required: true,
            },
        },
        render,
    }
</script>
