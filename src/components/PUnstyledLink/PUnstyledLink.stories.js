import PUnstyledLink from './PUnstyledLink';
import StoryRouter from "storybook-vue-router";

export default {
    title: 'Navigation / Unstyled Link',
    decorators: [StoryRouter()],
    component: PUnstyledLink,
    argTypes: {
        default: {
            table: {
                disable: true,
            },
        },
    },
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        PUnstyledLink,
    },
    template: `
        <PUnstyledLink
            v-bind="$props"
        >HulkApps</PUnstyledLink>`,
});

export const UnstyledLink = Template.bind({});

UnstyledLink.args = {
    url: 'https://www.hulkapps.com',
}
