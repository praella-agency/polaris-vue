<template>
    <div class="Polaris-Card__Header">
        <PStack alignment="baseline">
            <PStackItem fill>
                <slot name="title">
                    <PHeading>{{ title }}</PHeading>
                </slot>
            </PStackItem>
            <PStackItem>
                <PButtonGroup v-if="actions" connectedTop>
                    <component
                        v-for="(action, key) in actions" :key="key"
                        :is="(action.to ? 'PLink' : 'PButton')"
                        plain
                        :href="action.url ? action.url : null"
                        :to="action.to ? action.to : null"
                        v-on="action.onAction ? { click: action.onAction } : {}"
                    >
                        {{ action.content }}
                    </component>
                </PButtonGroup>
            </PStackItem>
            <PStackItem v-if="hasSlot($slots.children)">
                <slot name="children"/>
            </PStackItem>
        </PStack>
        <PStack>
            <PStackItem>
        <span class="Polaris-Card__TagLine">
            <template>
              <slot name="short_description">
                {{ shortDescription }}
              </slot>
            </template>
        </span>
            </PStackItem>
        </PStack>
    </div>
</template>

<script>
    import utils from '../../../../utilities';
    import { hasSlot } from '../../../../ComponentHelpers';
    import { PStack } from '../../../../components/PStack';
    import { PStackItem } from '../../../../components/PStack/components/PStackItem';
    import { PHeading } from '../../../../components/PHeading';
    import { PButtonGroup } from '../../../../components/PButtonGroup';
    import { PButton } from '../../../../components/PButton';
    import { PLink } from '../../../../components/PLink';

    export default {
        name: 'PCardHeader',
        components: {
            PStack, PStackItem, PHeading, PButtonGroup, PButton, PLink,
        },
        props: {
            title: {
                type: String,
                default: null,
            },
            shortDescription: {
                type: String,
                default: null,
            },
            actions: {
                type: [Array, String],
                default: null,
            },
        },
        computed: {
            util() {
                return utils;
            },
            hasSlot() {
                return hasSlot;
            },
        }
    }
</script>
