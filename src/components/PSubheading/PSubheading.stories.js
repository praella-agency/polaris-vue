import { PSubheading } from './index.js';

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
        },
    },
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PSubheading,
    },
    template: `
      <PSubheading 
          v-bind="$props"
      > 
        Sample Sub Heading 
      </PSubheading>`,
});

export const Subheading = Template.bind({});

Subheading.args = {
    element: 'h2',
}
