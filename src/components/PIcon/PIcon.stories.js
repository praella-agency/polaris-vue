import PIcon from './PIcon';

export default {
    title: 'Images & Icons / Icon',
    component: PIcon,
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        PIcon,
    },
    template: `
        <PIcon v-bind="$props" />`,
});

export const Icon = Template.bind({});

Icon.args = {
    source: "CodeMajorTwotone",
    color: "red",
}
