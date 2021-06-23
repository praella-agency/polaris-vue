import PToggle from './PToggle.vue';

export default {
    title: 'Forms / Toggle',
    component: PToggle,
    argTypes: {
        label: {
            control: {
                type: 'text',
            },
            table: {
                type: {
                    summary: 'string',
                },
            },
        },
    },
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {PToggle},
    template: '<PToggle v-bind="$props"/>'
});

export const Toggle = Template.bind({});

Toggle.args = {
    label: 'Toggle Switch'
}
