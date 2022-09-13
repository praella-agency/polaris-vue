import { PCollapsible } from './index';
import { PCard } from '../PCard';
import { PStack } from '../PStack';
import { PStackItem } from '../PStack/components/PStackItem';
import { PButton } from '../PButton';
import { PTextContainer } from '../PTextContainer';
import { PLink } from '../PLink';

export default {
    title: 'Behavior / Collapsible',
    component: PCollapsible,
    argTypes: {
        transition: {
            table: {
                defaultValue: {
                    summary: '{}',
                    detail: `{
    /** Assign a transition duration to the collapsible animation. */
    duration?: string,
    /** Assign a transition timing function to the collapsible animation */
    timingFunction?: string,
}`,
                },
            },
        },
        id: {
            control: {
                type: 'text'
            },
            table: {
                type: {
                    summary: 'string | number',
                },
            },
        },
        default: {
            table: {
                type: {
                    summary: null,
                },
            },
            control: {
                type: null,
            },
        },
    },
}

const Template = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PCollapsible, PCard, PStack, PStackItem, PButton, PTextContainer, PLink
    },
    data() {
        return {
            isOpen: true,
        };
    },
    template: `
        <div style="height: 200px;">
            <PCard sectioned>
                <PStack vertical>
                    <PStackItem>
                        <PButton
                            @click="handleToggle"
                            :aria-expanded="isOpen"
                            aria-controls="basic-collapsible"
                        >
                            Toggle
                        </PButton>
                    </PStackItem>
                    <PStackItem>
                        <PCollapsible
                            :open="isOpen"
                            id="basic-collapsible"
                            :transition="{duration: '500ms', timingFunction: 'ease-in-out'}"
                            :expandOnPrint="true"
                        >
                            <PTextContainer>
                                <p>
                                    Your mailing list lets you contact customers or visitors who
                                    have shown an interest in your store. Reach out to them with
                                    exclusive offers or updates about your products.
                                </p>
                                <PLink url="javascript:void(0)">Test link</PLink>
                            </PTextContainer>
                        </PCollapsible>
                    </PStackItem>
                </PStack>
            </PCard>
        </div>`,
    methods: {
        handleToggle() {
            this.isOpen = !this.isOpen;
        }
    }
})

export const Collapsible = Template.bind({});

Collapsible.parameters = {
    docs: {
        source: {
            code: `
<PCard sectioned>
    <PStack vertical>
        <PStackItem>
            <PButton>Toggle</PButton>
        </PStackItem>
        <PStackItem>
            <PCollapsible id="basic-collapsible">
                <PTextContainer>
                    <p>
                        Your mailing list lets you contact customers or visitors who
                        have shown an interest in your store. Reach out to them with
                        exclusive offers or updates about your products.
                    </p>
                    <PLink>Test link</PLink>
                </PTextContainer>
            </PCollapsible>
        </PStackItem>
    </PStack>
</PCard>`
        },
    },
};