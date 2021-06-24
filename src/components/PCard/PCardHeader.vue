<template>
    <div class="Polaris-Card__Header">
        <PStack distribution="baseline">
            <PStackItem fill>
                <PHeading>{{title}}</PHeading>
            </PStackItem>
            <PStackItem>
              <PButtonGroup  connectedTop>
                <PButton v-for="(action, key) in actions" :key="key" plain @click="action.onAction()">
                  {{ action.content }}
                </PButton>
              </PButtonGroup>
            </PStackItem>
            <PStackItem>
              <slot name="children" />
            </PStackItem>
        </PStack>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';

    import { PStack, PStackItem } from '@/components/PStack';
    import { PHeading } from '@/components/PHeading';
    import { PButtonGroup } from '@/components/PButtonGroup';
    import { PButton } from '@/components/PButton';

    @Component({
        components: {
          PStack, PStackItem, PHeading, PButtonGroup, PButton
        },
    })
    export default class PCardHeader extends Vue {

      @Prop({type: String, default: null}) public title!: string;

      @Prop({type: Array, default: () => []}) public actions!: [];
    }
</script>
