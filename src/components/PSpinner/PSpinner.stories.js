import PSpinner from './PSpinner';

export default {
    title: 'Feedback indicators / Spinner',
    component: PSpinner,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        size: {
            options: ['small', 'large'],
            control: {
                type: 'select',
            },
        },
        color: {
            options: ['white', 'teal', 'inkLightest'],
            control: {
                type: 'select',
            },
        },
    },
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        PSpinner,
    },
    template: `
        <PSpinner 
            v-bind="$props"
        ></PSpinner>`,
});

export const Spinner = Template.bind({});

Spinner.args = {
    accessibilityLabel: 'Spinner Example',
}
