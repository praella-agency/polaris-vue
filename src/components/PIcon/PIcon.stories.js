import PIcon from './PIcon';
import ShopifyIcons from './ShopifyIcons';
import IconMDX from './PIcon.mdx';

export default {
    title: 'Images & Icons / Icon',
    component: PIcon,
    parameters: {
        options: {
            showPanel: false,
        },
        controls: {
            disable: true,
        },
        actions: {
            disable: true,
        },
        docs: {
            page: IconMDX,
        },
    },
}

const Template1 = () => ({
    components: {
        ShopifyIcons,
    },
    template: `
        <shopify-icons />`,
});

export const Icon = Template1.bind({});
