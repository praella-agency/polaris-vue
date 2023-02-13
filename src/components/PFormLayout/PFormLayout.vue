<script>
    import { vue } from '../../ComponentHelpers';
    import { PFormLayoutItem } from '../../components/PFormLayout/components/PFormLayoutItem';
    import { PFormLayoutGroup } from '../../components/PFormLayout/components/PFormLayoutGroup';
    import { wrapNodesWithComponent } from '../../ComponentHelpers';

    let render = {};
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
