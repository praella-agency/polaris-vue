<template>
    <div class="Polaris-PageActions">
        <PStack :distribution="distribution" spacing="tight">
            <PButtonGroup>
                <PButton v-for="(secondaryAction, secondaryActionIndex) in secondaryActions" :key="`secondaryAction-${secondaryActionIndex}`" @click="secondaryAction.onAction()" v-bind="secondaryAction">
                    {{secondaryAction.content}}
                </PButton>
            </PButtonGroup>
            <PButton @click="primaryAction.onAction()" v-bind="primaryAction" primary>
                {{primaryAction.content}}
            </PButton>
        </PStack>
    </div>
</template>

<script lang="ts">

    import {Vue, Component, Prop} from 'vue-property-decorator';
    import {
        ComplexAction,
        DisableableAction,
        LoadableAction,
    } from '@/types';
    import {PStack} from '@/components/PStack';
    import {PButtonGroup} from '@/components/PButtonGroup';
    import {PButton} from '@/components/PButton';

    export interface PageActionsProps {
        primaryAction?: DisableableAction & LoadableAction;
        secondaryActions?: ComplexAction[];
    }

    @Component({
        components: {
            PStack,
            PButtonGroup,
            PButton,
        },
    })
    export default class PPageActions extends Vue {

        @Prop(Object) public primaryAction!: DisableableAction & LoadableAction;
        @Prop({type: Array, default: () => []}) public secondaryActions!: ComplexAction[];

        public get distribution() {
            return this.secondaryActions ? 'equalSpacing' : 'trailing';
        }
    }
</script>
