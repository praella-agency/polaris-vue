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
    status: 'warning',
    action: {
        content: 'Edit variant weights',
        onAction: () => {
            alert('Edit variant weights');
        },
        disabled: false,
    },
}
