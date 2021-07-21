<template>
    <div class="Polaris-Modal-Footer">
        <div class="Polaris-Modal-Footer__FooterContent">
            <PStack alignment="center">
                <PStackItem fill><slot /></PStackItem>
                <PStackItem v-if="primaryAction || secondaryActions">
                  <PButtonGroup v-if="primaryAction || secondaryActions">
                    <PButton v-if="secondaryActions.length > 0" v-for="(secondaryAction, secondaryActionIndex) in secondaryActions" :key="`secondaryAction-${secondaryActionIndex}`" :destructive="secondaryAction.destructive" :disabled="secondaryAction.disabled" @click="secondaryAction.onAction()">{{secondaryAction.content}}</PButton>
                    <PButton v-if="Object.keys(primaryAction).length > 0" :disabled="primaryAction.disabled" :destructive="primaryAction.destructive" :primary="!primaryAction.destructive" @click="primaryAction.onAction()">{{primaryAction.content}}</PButton>
                  </PButtonGroup>
                </PStackItem>
            </PStack>
        </div>
    </div>
</template>

<script lang="ts">
  import {Vue, Component, Prop} from 'vue-property-decorator';
  import { PStack, PStackItem } from '@/components/PStack';
  import { PButtonGroup } from '@/components/PButtonGroup';
  import { PButton } from '@/components/PButton';

  @Component({
    components: {
        PStack, PStackItem,
        PButtonGroup,
        PButton,
    },
  })
  export default class PModelFooter extends Vue {
    @Prop(Object) public primaryAction!: object;
    @Prop(Array) public secondaryActions!: [];
  }
</script>
