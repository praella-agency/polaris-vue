<script lang="tsx">
    import { Component, Vue } from 'vue-property-decorator';
    import { PFormLayoutItem } from '@/components/PFormLayout/components/PFormLayoutItem';
    import ComponentHelpers from '../../../../ComponentHelpers';

    @Component
    export default class PFormLayoutGroupItemWrapper extends Vue {

        public render(createElement: any) {
            return createElement('div', {
                    class: 'Polaris-FormLayout__Items',
                },
                ComponentHelpers.wrapNodesWithComponent(
                    createElement,
                    this.$slots.default,
                    PFormLayoutItem,
                ),
            );
        }
    }
</script>
