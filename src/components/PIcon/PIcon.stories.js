import { PIcon } from './index';
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

const Template1 = (args) => ({
    setup() {
        return {args};
    },
    components: {
        ShopifyIcons,
    },
    template: `
        <shopify-icons
            v-bind="args"
        />`,
});

export const Icon = Template1.bind({});
