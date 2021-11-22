<template>
  <div class="Polaris-SettingAction">
    <div class="Polaris-SettingAction__Setting">
      <slot name="children"></slot>
    </div>
    <div v-if="$slots.action || action" class="Polaris-SettingAction__Action">
      <slot name="action">
        <PButton v-if="action"
                        primary
                        @click="handleAction(action)"
                        :url="action.url"
                        :destructive="action.destructive"
                        :disabled="action.disabled"
                        :icon="action.icon"
                        :accessibility-label="action.accessibilityLabel">
          {{ action.content }}
        </PButton>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { PCard } from '@/components/PCard';
  import { PButton } from '@/components/PButton/index.js';

  @Component({
    components: {
        PCard, PButton,
    },
  })
  export default class PSettingAction extends Vue {
    @Prop(String) public label!: string;
    @Prop() public action!: any;
    @Prop(String) public propsClass!: string;

    public handleAction(action: any) {
      if (action.onAction) {
        action.onAction();
      }
    }
  }
</script>


<style scoped>

</style>
