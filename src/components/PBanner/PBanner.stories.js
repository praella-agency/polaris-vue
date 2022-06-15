import { PBanner } from './index';

export default {
    title: 'Feedback indicators / Banner',
    component: PBanner,
    argTypes: {
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
        status: {
            options: ['success', 'info', 'warning', 'critical', null],
            control: {
                type: 'select',
                labels: {
                    null: 'default',
                },
            },
        },
        action: {
            table: {
                defaultValue: {
                    summary: '{}',
                    detail: `[{
    /** Visually hidden text for screen readers */
    accessibilityLabel?: string,
    /** Content the action displays */
    content?: string,
    /** Whether or not the action is disabled */
    disabled?: boolean,
    /** Forces url to open in a new tab */
    external?: boolean,
    /** A unique identifier for the action */
    id?: string,
    /** A destination to link to, rendered in the action */
    url?: string,
    /** Icon support */
    icon?: string,
    /** Spinner for the element */
    loading?: boolean,
    /** Callback when an action takes place */
    onAction()?: void,
}]`,
                },
            },
        },
        dismiss: {
            table: {
                type: {
                    summary: null,
                },
                defaultValue: {
                    summary: '()',
                    detail: '(event)',
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
        PBanner,
    },
    template: `
        <PBanner
            v-bind="args"
            @dismiss="handleDismissAction"
        >
            Add weights to show accurate rates at checkout and when buying shipping
            labels in Shopify.Add weights to show accurate rates at checkout and when buying shipping
            labels in Shopify.Add weights to show accurate rates at checkout and when buying shipping
            labels in Shopify.
        </PBanner>`,
    methods: {
        handleDismissAction() {
            alert('Dismiss');
        },
    },
});

export const Banner = Template.bind({});

Banner.args = {}

Banner.parameters = {
    docs: {
        source: {
            code: `
<PBanner>
    Add weights to show accurate rates at checkout and when buying shipping
    labels in Shopify.Add weights to show accurate rates at checkout and when buying shipping
    labels in Shopify.Add weights to show accurate rates at checkout and when buying shipping
    labels in Shopify.
</PBanner>`
        },
    },
};