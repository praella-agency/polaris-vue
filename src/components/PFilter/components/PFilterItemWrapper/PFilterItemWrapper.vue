<script>
    import { classNames } from '../../../../utilities/css';
    import ComponentHelpers from '../../../../ComponentHelpers';
    import { PFilterItem } from '../../../../components/PFilter/components/PFilterItem';

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
        render(createElement) {
            return createElement('div', {
                    class: this.className,
                }, ComponentHelpers.wrapNodesWithComponent(
                    createElement,
                    this.$slots.default,
                    PFilterItem
                ),
            );
        },
    }
</script>
