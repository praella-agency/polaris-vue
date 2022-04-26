<script>
    const vue = require('vue');
    import utils from '../../../../utilities';
    import { PFormLayoutItem } from '../../../../components/PFormLayout/components/PFormLayoutItem';
    import { wrapNodesWithComponent } from '../../../../ComponentHelpers';

    let render = {};
    if (utils.isVue3) {
        render = function render() {
            return vue.h(this.child, {
                    class: 'Polaris-FormLayout__Items',
                },
                wrapNodesWithComponent(
                    vue.h,
                    this.$slots.default(), PFormLayoutItem,
                ),
            );
        }
    } else {
        render = function render(createElement) {
            return createElement('div', {
                    class: 'Polaris-FormLayout__Items',
                },
                wrapNodesWithComponent(
                    createElement,
                    this.$slots.default, PFormLayoutItem,
                ),
            );
        }
    }

    export default {
        name: 'PFormLayoutGroupItemWrapper',
        components: {
            PFormLayoutItem,
        },
        props: {
            child: {
                type: HTMLElement,
            }
        },
        render,
    }
</script>
