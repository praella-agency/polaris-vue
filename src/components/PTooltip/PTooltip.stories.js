export default {
    title: 'Tooltip',
}

const Template = (arg, {argTypes}) => ({
    template: `
      <span id="tooltip" 
      style="position: fixed;top: 50%;left: 50%;"
      v-p-tooltip.above="'This order has shipping labels.'">Order #1001 Order #1001 Order #1001 Order #1001 Order #1001 Order #1001 </span>`,
});

export const Tooltip = Template.bind({});
