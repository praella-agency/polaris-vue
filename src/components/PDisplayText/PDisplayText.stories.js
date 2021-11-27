import { PDisplayText } from './index.js';

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
        },
    },
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        PDisplayText,
    },
    template: `
      <PDisplayText
          v-bind="$props"
      >
        Default Example Usage
      </PDisplayText>`,
});

export const DisplayText = Template.bind({});
