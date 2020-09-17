<template>
  <div :class="className">
    <PStack spacing="tight" :distribution="spacing">
      <PStackItem v-if="$slots.primaryAction || primaryAction">
        <slot name="primaryAction">
          <PButton v-if="primaryAction"
                   primary
                   @click="handleAction(primaryAction)"
                   :url="primaryAction.url"
                   :destructive="primaryAction.destructive"
                   :disabled="primaryAction.disabled"
                   :icon="primaryAction.icon"
                   :accessibility-label="primaryAction.accessibilityLabel">
            {{ primaryAction.content }}
          </PButton>
        </slot>
      </PStackItem>

        <PStackItem v-if="$slots.secondaryAction || secondaryAction">
          <slot name="secondaryAction">
            <PButton v-if="secondaryAction"
                     primary
                     @click="handleAction(secondaryAction)"
                     :url="secondaryAction.url"
                     :destructive="secondaryAction.destructive"
                     :disabled="secondaryAction.disabled"
                     :icon="secondaryAction.icon"
                     :accessibility-label="secondaryAction.accessibilityLabel">
              {{ secondaryAction.content }}
            </PButton>
          </slot>
        </PStackItem>
    </PStack>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames } from '@/utilities/css';

import PPageHeader from './PPageHeader.vue';
import { PStack, PStackItem } from '@/components/PStack';
import PButton from '@/components/PButton/PButton.vue';

@Component({
  components: { PPageHeader, PStack, PStackItem, PButton },
})

export default class PPageActions extends Vue {
  @Prop(Object) public primaryAction!: object;
  @Prop(Object) public secondaryAction!: object;

  public get className() {
    return classNames(
      'Polaris-PageActions',
    );
  }

  public get spacing() {
    return (this.$slots.hasOwnProperty('primaryAction') || this.primaryAction) &&
    (this.$slots.hasOwnProperty('secondaryAction') || this.secondaryAction) ? "equalSpacing":"trailing"
  }

  public handleAction(action: any) {
    if (action.onAction) {
      action.onAction();
    }
  }
}
</script>
