<script lang="tsx">
import { Component, Vue, Prop } from 'vue-property-decorator';

import PFormLayoutItem from './PFormLayoutItem.vue';

@Component
export default class PFormLayout extends Vue {
  public render(h: any) {
    return (
      <div class='Polaris-FormLayout'>
        {(this.$slots.default || []).map((item: any) => (
          <PFormLayoutItem>{item}</PFormLayoutItem>
        ))}
      </div>
    );
  }
}
</script>
