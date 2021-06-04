<template>
  <PCard sectioned>
    <PSettingAction>
      <template slot="children">
        <!-- @slot SettingAction child content -->
        <slot></slot>
      </template>
      <PButton slot="action"
          :primary="!enabled"
          @click="handleAction(action)"
          :url="action.url"
          :accessibility-label="action.accessibilityLabel"
          :disabled="action.disabled"
          :destructive="action.destructive"
          :icon="action.icon"
      > {{ action.contentStatus }}
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
    /**
     * Label for form input.
     */
    @Prop({type: String, default: null}) public label!: string;

    /**
     * Card header actions.
     */
    @Prop({type: Object, default: () => ({})}) public action!: object;

    /**
     * Sets toggle state.
     * @values true|false
     */
    @Prop({type: Boolean, default: false}) public enabled!: boolean;

    /**
     * @ignore
     */
    @Prop({type: String, default: null}) public propsClass!: string;

    public handleAction(action: any) {
      if (action.onAction) {
        action.onAction();
      }
    }
  }
</script>