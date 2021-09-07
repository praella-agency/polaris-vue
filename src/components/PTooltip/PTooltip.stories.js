import PTooltipMDX from './PTooltip.mdx';
import { PTextStyle } from '../PTextStyle';

export default {
    title: 'Tooltip',
    parameters: {
        docs: {
            page: PTooltipMDX,
        },
    },
}

const Template = (arg, {argTypes}) => ({
    components: {
        PTextStyle,
    },
    template: `
        <PTextStyle
            id="tooltip"
            style="position: fixed;top: 50%;"
            variation="strong"
            v-p-tooltip="'This order has shipping labels.'"
        >
          Order #1001 Order #1001 Order #1001 Order #1001 Order #1001 Order #1001 
        </PTextStyle>`,
});

export const Tooltip = Template.bind({});
