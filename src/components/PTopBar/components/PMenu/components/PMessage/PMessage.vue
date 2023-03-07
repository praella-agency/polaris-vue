<template>
    <div class="Polaris-Menu-Message__Section">
        <div class="Polaris-Popover__Section">
            <PStack vertical spacing="tight">
                <PStackItem>
                    <PTextContainer>
                        <PHeading>
                            {{ title }}
                            <PBadge v-if="Object.keys(badge).length > 0" :status="badge.status">
                                {{ badge.content }}
                            </PBadge>
                        </PHeading>
                        <p>
                            {{ description }}
                        </p>
                    </PTextContainer>
                </PStackItem>
                <PStackItem>
                    <PLink v-if="typeof link.to === 'string'" :url="link.to" :external="link.external">
                        {{ link.content }}
                    </PLink>
                    <PLink v-else :to="link.to" :external="link.external">
                        {{ link.content }}
                    </PLink>
                </PStackItem>
                <PStackItem>
                    <PButton plain @click="action.onClick !== undefined ? action.onClick() : {}">
                        {{ action.content }}
                    </PButton>
                </PStackItem>
            </PStack>
        </div>
    </div>
</template>

<script setup>
    import { PStack } from '../../../../../../components/PStack';
    import { PStackItem } from '../../../../../../components/PStack/components/PStackItem';
    import { PButton } from '../../../../../../components/PButton';
    import { PBadge } from '../../../../../../components/PBadge';
    import { PTextContainer } from '../../../../../../components/PTextContainer';
    import { PHeading } from '../../../../../../components/PHeading';
    import { PLink } from '../../../../../../components/PLink';
    import { MessageActionProps, MessageLinkProps, MessageBadgeProps } from '../../../../../../types';
    import ObjectValidator from '../../../../../../utilities/validators/ObjectValidator';

    let props = defineProps({
        title: {
            type: String,
            default: null,
            required: true,
        },
        description: {
            type: String,
            default: null,
            required: true,
        },
        action: {
            type: Object,
            default: () => ({}),
            ...ObjectValidator('action', MessageActionProps, true),
        },
        link: {
            type: Object,
            default: () => ({}),
            ...ObjectValidator('link', MessageLinkProps),
        },
        badge: {
            type: Object,
            default: () => ({}),
            ...ObjectValidator('badge', MessageBadgeProps),
        }
    });
</script>
