export default {
    title: 'Tooltip',
}

const Template = (arg, {argTypes}) => ({
    template: `
      <span v-p-tooltip="1 + 1">Hi</span>`,
});

export const Tooltip = Template.bind({});
