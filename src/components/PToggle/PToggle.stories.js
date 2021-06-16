import PToggle from './PToggle.vue';

export default {
    title: 'Forms / Toggle',
    component: PToggle
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { PToggle },
    template: '<PToggle v-bind="$props"/>'
});

export const Toggle = Template.bind({});