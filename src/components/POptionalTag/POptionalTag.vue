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
        setup(props, { slots }) {
          return { slots };
        },
        render() {
          try {
            const validSlot = this.slots.default();
            const child = validSlot ? validSlot[0] : vue.h('div');
            if (this.active) {
              return vue.h(this.tag, {}, [child]);
            }
            return child;
          }catch (e) {
            console.log('Optional Tag is not rendered', e.message)
          }
        }
    })
</script>
