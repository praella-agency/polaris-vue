import { PHeading } from './index.js';

export default {
    title: 'Titles & Text / Heading',
    component: PHeading,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        default: {
            table: {
                type: {
                    summary: null,
                },
            },
        },
        element: {
            options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'],
            control: {
                type: 'select',
            },
        },
    },
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        PHeading,
    },
    template: `
        <PHeading v-bind="$props">Online store dashboard</PHeading>`,
});

export const Heading = Template.bind({});

Heading.args = {
    element: 'h1',
}
