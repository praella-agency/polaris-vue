import { PDisplayText } from './index';

export default {
    title: 'Titles & Text / Display Text',
    component: PDisplayText,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        size: {
            options: ['small', 'medium', 'large', 'extraLarge'],
            control: {
                type: 'select',
            },
        },
        element: {
            options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'],
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
        PDisplayText,
    },
    template: `
        <PDisplayText
            v-bind="args"
        >
            Default Example Usage
        </PDisplayText>`,
});

export const DisplayText = Template.bind({});

DisplayText.parameters = {
    docs: {
        source: {
            code: `<PDisplayText>Default Example Usage</PDisplayText>`
        },
    },
};
