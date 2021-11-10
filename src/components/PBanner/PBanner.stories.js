import PBanner from './PBanner';

export default {
    title: 'Feedback indicators / Banner',
    component: PBanner,
    argTypes: {
        default: {
            table: {
                disable: true,
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
        },
    },
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        PBanner,
    },
    template: `
        <PBanner 
            v-bind="$props"
            @dismiss="handleDismissAction"
        >
            Add weights to show accurate rates at checkout and when buying shipping
            labels in Shopify.
        </PBanner>`,
    methods: {
        handleDismissAction() {
            alert('Dismiss');
        },
    },
});

export const Banner = Template.bind({});

Banner.args = {
    title: 'Some of your product variants are missing weights',
    action: {
        content: 'Edit variant weights',
        onAction: () => {
            alert('Edit variant weights');
        },
        disabled: false,
    },
}
