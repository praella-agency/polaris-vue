import PIcon from './PIcon';
import ShopifyIcons from './ShopifyIcons';
import IconMDX from './PIcon.mdx';

export default {
    title: 'Images & Icons / Icon',
    component: PIcon,
    parameters: {
        docs: {
            page: IconMDX,
        },
    },
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

const Template1 = () => ({
    components: {
        ShopifyIcons,
    },
    template: `
        <shopify-icons></shopify-icons>`,
})

export const AllIcons = Template1.bind({});
