import PIcon from './PIcon';
import ShopifyIcons from './ShopifyIcons';
import PIconMDX from './PIcon.mdx';

export default {
    title: 'Images & Icons / Icon',
    component: PIcon,
    argTypes: {
        color: {
            options: [null, 'base', 'subdued', 'critical', 'interactive', 'warning', 'highlight', 'success', 'primary'],
            control: {
                type: 'select',
                labels: {
                    null: 'default',
                },
            },
        },
        source: {
            options: [null, 'placeholder'],
            control: {
                type: 'select',
                labels: {
                    null: 'default',
                },
            },
        },
    },
    parameters: {
        layout: 'fullscreen',
        docs: {
            page: PIconMDX,
        },
    },
}

const Template1 = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        ShopifyIcons,
    },
    template: `
        <shopify-icons 
            v-bind="$props"
        />`,
});

export const Icon = Template1.bind({});
