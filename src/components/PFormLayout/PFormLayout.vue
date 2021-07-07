<script lang="tsx">
import {Component, Vue, Prop} from 'vue-property-decorator';
import PFormLayoutItem from '@/components/PFormLayout/PFormLayoutItem.vue';
import PFormLayoutGroup from '@/components/PFormLayout/PFormLayoutGroup.vue';
import ComponentHelpers from '../../ComponentHelpers';

@Component({
  components: {
    PFormLayoutItem,
    PFormLayoutGroup,
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
          attrs: {
            id: this.id,
          },
        },
        ComponentHelpers.wrapNodesWithComponent(
            createElement,
            this.$slots.default,
            PFormLayoutItem,
            [PFormLayoutGroup]),
    );
  }
}
</script>
