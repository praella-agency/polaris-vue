import PLink from './PLink';

export default {
    title: 'Navigation / Link',
    component: PLink,
    argTypes: {
        default: {
            table: {
                disable: true,
            }
        }
    }
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
    url: 'https://www.hulkapps.com',
}
