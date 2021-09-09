import PTooltipMDX from './PTooltip.mdx';
import { PTextStyle } from '../PTextStyle';

export default {
    title: 'Tooltip',
    parameters: {
        docs: {
            page: PTooltipMDX,
        },
        options: {
            showPanel: false,
        },
        controls: {
            disable: true,
        },
    },
}

const Template = (arg, {argTypes}) => ({
    components: {
        PTextStyle,
    },
    template: `
        <PTextStyle
            style="position: fixed;top: 0;"
            variation="strong"
            v-p-tooltip.mostSpace="'This order has shipping labels.'"
        >
          Order #1001 Order #1001 Order #1001 Order #1001 Order #1001 Order #1001 
        </PTextStyle>`,
});

export const Tooltip = Template.bind({});
