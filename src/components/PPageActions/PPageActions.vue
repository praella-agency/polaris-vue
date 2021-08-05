<template>
  <div class="Polaris-PageActions">
    <PStack :distribution="distribution" spacing="tight">
<!--      <PStackItem class="Polaris-Stack__Item">-->
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
import {Component, Prop, Vue} from 'vue-property-decorator';
import {ComplexAction, DisableableAction, LoadableAction} from '@/types';
import {PStack, PStackItem} from '@/components/PStack';
import {PButtonGroup} from '@/components/PButtonGroup';
import {PButton} from '@/components/PButton';

export interface PageActionsProps {
  primaryAction?: DisableableAction & LoadableAction;
  secondaryActions?: ComplexAction[];
}

@Component({
  components: {
    PStack,
    PStackItem,
    PButtonGroup,
    PButton,
  },
})
export default class PPageActions extends Vue {

  @Prop(Object) public primaryAction!: DisableableAction & LoadableAction;
  @Prop(Object) public secondaryAction!: ComplexAction;
  @Prop({type: Array, default: () => []}) public secondaryActions!: ComplexAction[];

  public get distribution() {
    return this.secondaryActions ? 'equalSpacing' : 'trailing';
  }
}
</script>
