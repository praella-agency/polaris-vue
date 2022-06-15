import { PUnstyledLink } from './index';
export default {
    title: 'Navigation / Unstyled Link',
    component: PUnstyledLink,
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
    },
}

const Template = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PUnstyledLink,
    },
    template: `
        <PUnstyledLink
            v-bind="args"
        >
            HulkApps
        </PUnstyledLink>`,
});

export const UnstyledLink = Template.bind({});

UnstyledLink.args = {
    url: 'javascript:void(0);',
}
UnstyledLink.parameters = {
    docs: {
        source: {
            code: `<PUnstyledLink>HulkApps</PUnstyledLink>`
        },
    },
};

