import { PLink } from './index';

export default {
    title: 'Navigation / Link',
    component: PLink,
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
        id: {
            table: {
                type: {
                    summary: 'string | number',
                },
            },
        },
    },
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        PLink,
    },
    template: `
      <PLink v-bind="$props">Click here</PLink>`,
});

export const Link = Template.bind({});

Link.args = {
    url: 'javascript:void(0);',
}
