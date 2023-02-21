<script>
  import { defineComponent, computed, ref, onMounted, onBeforeUnmount } from 'vue'
  import Plyr from 'plyr'
  export default defineComponent({
      name: 'PVuePlyr',
      props: {
        /** Options object for plyr config. **/
        options: {
          type: Object,
          required: false,
          default() {
            return {}
          }
        }
      },
      setup(props, { slots }) {
        let player = ref({});
        let el = ref(null);
        const opts = computed(() => {
          const options = props.options;
          if (
              !Object.prototype.hasOwnProperty.call(
                  props.options,
                  'hideYouTubeDOMError'
              )
          ) {
            options.hideYouTubeDOMError = true
          }
          return options
        });
        onMounted(() => {
          player.value = new Plyr(el.value, opts.value);
        });
        onBeforeUnmount(() => {
          try {
            player.value = {};
          } catch (e) {
            if (!(opts.value.hideYouTubeDOMError && e.message === 'The YouTube player is not attached to the DOM.')
            ) {
              // eslint-disable-next-line no-console
              console.error(e)
            }
          }
        });
        return { player, opts, slots, el };
      },
      render() {
        const slots = this.slots.default
        return typeof slots === 'function' ? slots()[0] : slots
      }
  })
</script>

