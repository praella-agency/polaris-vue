import PSubheading from './PSubheading';

export default {
    title: 'Titles & Text / Subheading',
    component: PSubheading,
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PSubheading,
    },
    template: `
      <PSubheading v-bind="$props"> Sample Sub Heading </PSubheading>`,
});

export const Subheading = Template.bind({});

Subheading.args = {
    element: "h2",
}
