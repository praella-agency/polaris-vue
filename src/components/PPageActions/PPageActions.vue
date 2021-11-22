<template>
  <div class="Polaris-PageActions">
    <PStack :distribution="distribution" spacing="tight">
      <PStackItem>
        <PButtonGroup>
          <PButton v-for="(secondaryAction, secondaryActionIndex) in secondaryActions"
                   :key="`secondaryAction-${secondaryActionIndex}`" @click="secondaryAction.onAction()"
                   v-bind="secondaryAction">
            {{ secondaryAction.content }}
          </PButton>
        </PButtonGroup>
      </PStackItem>
      <PStackItem>
        <PButtonGroup v-if="secondaryAction">
          <PButton @click="secondaryAction.onAction()" v-bind="secondaryAction">
            {{ secondaryAction.content }}
          </PButton>
          <PButton @click="primaryAction.onAction()" v-bind="primaryAction" primary>
            {{ primaryAction.content }}
          </PButton>
        </PButtonGroup>
        <PButton v-else @click="primaryAction.onAction()" v-bind="primaryAction" primary>
          {{ primaryAction.content }}
        </PButton>
      </PStackItem>
    </PStack>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ComplexAction, DisableableAction, LoadableAction } from '@/types';
import { PStack } from '@/components/PStack';
import { PStackItem } from '@/components/PStack/components/PStackItem';
import { PButtonGroup } from '@/components/PButtonGroup';
import { PButton } from '@/components/PButton/index.js';

export interface PageActionsProps {
  primaryAction?: DisableableAction & LoadableAction;
  secondaryActions?: ComplexAction[];
}

/**
 * <br/>
 * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
 *  sans-serif;">Page actions let merchants take key actions at the bottom of specific pages in the interface. This is
 *  important because sometimes the primary call to action is hard to access when merchants are at the bottom of a page.
 *  </h4>
 */
@Component({
  components: {
    PStack, PStackItem, PButtonGroup, PButton,
  },
})
export default class PPageActions extends Vue {

  /**
   * The primary action for the page
   */
  @Prop(Object) public primaryAction!: DisableableAction & LoadableAction;

  /**
   * The secondary action for the page
   */
  @Prop(Object) public secondaryAction!: ComplexAction;

  /**
   * The secondary actions for the page
   */
  @Prop({type: Array, default: () => []}) public secondaryActions!: ComplexAction[];

  public get distribution() {
    return this.secondaryActions ? 'equalSpacing' : 'trailing';
  }
}
</script>
