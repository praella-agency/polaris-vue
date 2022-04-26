<script>
    const vue = require('vue');
    import utils from '../../../../utilities';
    import { classNames } from '../../../../utilities/css';
    import { wrapNodesWithComponent } from '../../../../ComponentHelpers';
    import { PFilterItem } from '../../../../components/PFilter/components/PFilterItem';

    let render = {};
    if (utils.isVue3) {
        render = function render() {
            return vue.h('div', {
                    class: this.className,
                },
                wrapNodesWithComponent(
                    vue.h,
                    this.$slots.default(), PFilterItem
                ),
            );
        }
    } else {
        render = function render(createElement) {
            return createElement('div', {
                    class: this.className,
                },
                wrapNodesWithComponent(
                    createElement,
                    this.$slots.default, PFilterItem
                ),
            );
        }
    }

    export default {
        name: 'PFilterItemWrapper',
        props: {
            position: {
                type: String,
            },
        },
        computed: {
            className() {
                return classNames(
                    this.position === 'center' && 'Polaris-Filters-ConnectedFilterControl__CenterContainer',
                    this.position === 'right' && 'Polaris-Filters-ConnectedFilterControl__RightContainer',
                );
            },
        },
        render,
    }
</script>
