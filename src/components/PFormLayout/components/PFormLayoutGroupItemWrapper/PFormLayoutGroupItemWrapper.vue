<script>
    import { PFormLayoutItem } from '../../../../components/PFormLayout/components/PFormLayoutItem';
    import ComponentHelpers from '../../../../ComponentHelpers';

    export default {
        name: 'PFormLayoutGroupItemWrapper',
        components: {
            PFormLayoutItem,
        },
        render(createElement) {
            return createElement('div', {
                    class: 'Polaris-FormLayout__Items',
                },
                ComponentHelpers.wrapNodesWithComponent(
                    createElement,
                    this.$slots.default,
                    PFormLayoutItem,
                ),
            );
        },
    }
</script>
