<script>
    const vue = require('vue');
    import utils from '../../utilities';
    import { PFormLayoutItem } from '../../components/PFormLayout/components/PFormLayoutItem';
    import { PFormLayoutGroup } from '../../components/PFormLayout/components/PFormLayoutGroup';
    import { wrapNodesWithComponent } from '../../ComponentHelpers';

    let render = {};
    if (utils.isVue3) {
        render = function render() {
            return vue.h('div', {
                    class: 'Polaris-FormLayout',
                    id: this.id,
                },
                wrapNodesWithComponent(
                    vue.h,
                    this.$slots.default(), PFormLayoutItem,
                    [PFormLayoutGroup]
                ),
            );
        }
    } else {
        render = function render(createElement) {
            return createElement('div', {
                    class: 'Polaris-FormLayout',
                    attrs: {
                        id: this.id,
                    },
                },
                wrapNodesWithComponent(
                    createElement,
                    this.$slots.default, PFormLayoutItem,
                    [PFormLayoutGroup]
                ),
            );
        }
    }

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Use form layout to arrange fields within a form using standard spacing. By default it stacks fields
     *  vertically but also supports horizontal groups of fields.</h4>
     */
    export default {
        name: 'PFormLayout',
        components: {
            PFormLayoutItem, PFormLayoutGroup,
        },
        props: {
            /**
             * Id for the element
             */
            id: {
                type: [String, Number],
                default: 'PFormLayout',
            },
        },
        render,
    }
</script>
