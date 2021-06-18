<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator';
import {PFormLayoutItem} from '@/components/PFormLayout/index';
import ComponentHelpers from '../../ComponentHelpers';

@Component({

    components: {
        PFormLayoutItem,
    },
})
export default class PFormLayout extends Vue {

    /**
     * Id for the element
     */
    @Prop({type: String, default: 'PFormLayout'}) public id!: string;

    public render(createElement: any) {
        return createElement('div', {
          class: 'Polaris-FormLayout',
        },
        ComponentHelpers.wrapNodesWithComponent(createElement,
            this.$slots.default, PFormLayoutItem),
        );
    }
}
</script>
