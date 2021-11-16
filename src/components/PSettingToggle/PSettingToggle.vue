<template>
  <PCard sectioned>
    <PSettingAction>
      <template slot="children">
        <!-- @slot Inner content of the card -->
        <slot/>
      </template>
      <PButton slot="action"
         :accessibility-label="action.accessibilityLabel"
         :destructive="action.destructive"
         :disabled="action.disabled"
         :external="action.external"
         :icon="action.icon"
         :id="action.id ? action.id : `Polaris-Setting-Toggle${this['_uid']}`"
         :loading="action.loading"
         :outline="action.outline"
         :url="action.url"
         :primary="!enabled"
         @click="action.onAction"
      > {{ action.contentStatus }}
      </PButton>
    </PSettingAction>
  </PCard>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { PCard } from '@/components/PCard';
  import { PButton } from '@/components/PButton';
  import { PSettingAction } from '@/components/PSettingToggle/PSettingAction';

  interface Action {
    accessibilityLabel?: string;
    destructive?: boolean;
    disabled?: boolean;
    external?: boolean;
    icon?: string;
    id?: string | number;
    loading?: boolean;
    outline?: boolean;
    url?: string;
    contentStatus?: string;

    onAction(): void;
  }

  /**
   * <br/>
   * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
   *  sans-serif;">Use to give merchants control over a feature or option that can be turned on or off.</h4>
   */
  @Component({
    components: {
        PSettingAction, PCard, PButton,
    },
  })
  export default class PSettingToggle extends Vue {
    /**
     * Card header actions.
     */
    @Prop({type: Object, default: Object}) public action!: Action;

    /**
     * Sets toggle state.
     * @values true|false
     */
    @Prop({type: Boolean, default: false}) public enabled!: boolean;

    /**
     * @ignore
     */
    @Prop({type: String, default: null}) public propsClass!: string;
  }
</script>
