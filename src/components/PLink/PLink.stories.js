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

const Template = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PLink,
    },
    template: `
        <PLink v-bind="args">Click here</PLink>`,
});

export const Link = Template.bind({});

Link.args = {
    url: 'javascript:void(0);',
}

Link.parameters = {
    docs: {
        source: {
            code: `<PLink>Click here</PLink>`
        },
    },
};
