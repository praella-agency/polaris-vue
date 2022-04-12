import { PHeading } from './index';

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
            control: {
                type: null,
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

const Template = (args) => ({
    setup() {
    return { args };
},
    components: {
        PHeading,
    },
    template: `
        <PHeading v-bind="args">Online store dashboard</PHeading>`,
});

export const Heading = Template.bind({});

Heading.args = {
    element: 'h1',
}
