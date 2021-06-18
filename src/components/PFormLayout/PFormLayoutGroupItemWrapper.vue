<script lang="tsx">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import {PFormLayoutItem} from '@/components/PFormLayout/index';
    import ComponentHelpers from '../../ComponentHelpers';

    @Component
    export default class PFormLayoutGroupItemWrapper extends Vue {

        public render(createElement: any) {
            return createElement('div', {
                    class: 'Polaris-FormLayout__Items',
                },
                ComponentHelpers.wrapNodesWithComponent(createElement,
                    this.$slots.default,
                    PFormLayoutItem));

        }
    }
</script>
