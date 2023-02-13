<script>
    import { vue } from '../../../../ComponentHelpers';
    import { classNames } from '../../../../utilities/css';
    import { wrapNodesWithComponent } from '../../../../ComponentHelpers';
    import { PFilterItem } from '../../../../components/PFilter/components/PFilterItem';

    let render = {};
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
