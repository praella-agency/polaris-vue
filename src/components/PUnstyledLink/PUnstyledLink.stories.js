import PUnstyledLink from './PUnstyledLink';

export default {
    title: 'Navigation / Unstyled Link',
    component: PUnstyledLink,
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
