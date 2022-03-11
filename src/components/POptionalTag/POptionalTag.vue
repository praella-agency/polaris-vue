<script>
    import { h } from 'vue';
    import utils from '../../utilities';
    let render = {};

    if (utils.isVue3) {
        render = function render() {
            const validSlot = this.$slots.default();
            const child = validSlot ? validSlot[0] : h('div');
            if (this.active) {
                return h(this.tag, {}, [child]);
            }
            return child;
        }
    } else {
        render = function render(createElement) {
            const validSlot = this.$slots.default;
            const child = validSlot ? validSlot[0] : createElement('div');
            if (this.active) {
                return createElement(this.tag, {}, [child]);
            }
            return child;
        }
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
