import PToggle from './PToggle.vue';

export default {
    title: 'Example/PToggle',
    component: PToggle
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { PToggle },
    template: '<PToggle v-bind="$props"/>'
});

export const Default = Template.bind({});

//
// export const Secondary = Template.bind({});
// Secondary.args = {
//     label: 'Button',
// };
//
// export const Large = Template.bind({});
// Large.args = {
//     size: 'large',
//     label: 'Button',
// };
//
// export const Small = Template.bind({});
// Small.args = {
//     size: 'small',
//     label: 'Button',
// };
