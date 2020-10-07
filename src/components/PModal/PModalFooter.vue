<template>
    <div class="Polaris-Modal-Footer">
        <div class="Polaris-Modal-Footer__FooterContent">
            <PStack alignment="center">
                <PStackItem fill><slot /></PStackItem>
                <PButtonGroup v-if="primaryAction || secondaryActions">
                    <PButton v-if="secondaryActions" v-for="(secondaryAction, secondaryActionIndex) in secondaryActions" :key="`secondaryAction-${secondaryActionIndex}`" :disabled="secondaryAction.disabled" @click="secondaryAction.onAction()">{{secondaryAction.content}}</PButton>
                    <PButton v-if="primaryAction" :disabled="primaryAction.disabled" primary @click="primaryAction.onAction()">{{primaryAction.content}}</PButton>
                </PButtonGroup>
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
