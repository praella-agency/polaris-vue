import PLink from './PLink';
import StoryRouter from "storybook-vue-router";

export default {
    title: 'Navigation / Link',
    decorators: [StoryRouter()],
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
