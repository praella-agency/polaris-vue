import { PSubheading } from './index';

export default {
    title: 'Titles & Text / Subheading',
    component: PSubheading,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        element: {
            options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'],
            control: {
                type: 'select',
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
        PSubheading,
    },
    template: `
        <PSubheading
            v-bind="args"
        >
            Sample Sub Heading
        </PSubheading>`,
});

export const Subheading = Template.bind({});

Subheading.args = {
    element: 'h2',
}
