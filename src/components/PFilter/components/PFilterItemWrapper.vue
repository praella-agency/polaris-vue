<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ComponentHelpers from '../../../ComponentHelpers.js';
import PFilterItem from '@/components/PFilter/components/PFilterItem.vue';
import {classNames, variationName} from '@/utilities/css';

@Component
export default class PFilterItemWrapper extends Vue {

    @Prop(String) public position!: string;

    public get className() {
        return classNames(
            this.position === 'center' && 'Polaris-Filters-ConnectedFilterControl__CenterContainer',
            this.position === 'right' && 'Polaris-Filters-ConnectedFilterControl__RightContainer',
        );
    }

    public render(createElement: any) {
        return createElement('div', {
                class: this.className,
            },
            ComponentHelpers.wrapNodesWithComponent(createElement,
                this.$slots.default,
                PFilterItem));
    }
}
</script>
