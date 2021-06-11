<template>
    <div class="Polaris-Card__Header">
        <PStack distribution="baseline">
            <PStackItem fill>
                <slot name="title" />
            </PStackItem>
            <PStackItem>
                <slot name="actions" />
            </PStackItem>
        </PStack>
        <PStack>
            <PStackItem>
                <span class="Polaris-Card__TagLine">
                    <template>
                      <slot name="short_description"/>
                    </template>
                </span>
            </PStackItem>
        </PStack>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { classNames, variationName } from '@/utilities/css';

    import { PHeading } from '@/components/PHeading';

    @Component({
        components: { PHeading },
    })
    export default class PCardHeader extends Vue {
    }
</script>
