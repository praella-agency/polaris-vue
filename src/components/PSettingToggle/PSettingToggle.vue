<template>
  <PCard sectioned>
    <PSettingAction>
      <template slot="children">
        <slot></slot>
      </template>
      <PButton slot="action"
                      :primary="!enabled"
                      @click="handleAction(action)"
                      :url="action.url"
                      :accessibility-label="action.accessibilityLabel"
                      :disabled="action.disabled"
                      :destructive="action.destructive"
                      :icon="action.icon">
        {{ enabled ? 'Disable' : 'Enable' }}
      </PButton>
    </PSettingAction>
  </PCard>
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
  import {PCard} from '@/components/PCard';
  import {PButton} from '@/components/PButton';
  import PSettingAction from '@/components/PSettingToggle/PSettingAction.vue';

  @Component({
    components: {PSettingAction, PCard, PButton },
  })

  export default class PSettingToggle extends Vue {
    @Prop(String) public label!: string;
    @Prop(Object) public action!: object;
    @Prop(Boolean) public enabled!: boolean;
    @Prop(String) public propsClass!: string;

    private handleAction(action: object) {
      if (action.onAction) {
        action.onAction();
      }
    }
  }

</script>


<style scoped>

</style>
