import PToggle from './PToggle.vue';

export default {
    title: 'Example/PToggle',
    component: PToggle,
    argTypes: {
       label: {
           control: {
               type: 'text',
           }
       }
    }
};

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { PToggle },
    template: '<PToggle v-bind="$props"/>'
});

export const Default = Template.bind({});

Default.args = {
    label: 'Toggle Switch'
}
