<script>
    import { defineComponent } from "vue";
    import { vue } from '../../ComponentHelpers';

    export default defineComponent({
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
        setup(props) {
            function render() {
                const validSlot = this.$slots.default();
                const child = validSlot ? validSlot[0] : vue.h('div');
                if (props.active) {
                  return vue.h(props.tag, {}, [child]);
                }
                return child;
            }
          return { render };
        }
    })
</script>
