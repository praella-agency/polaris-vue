import PToggle from './PToggle.vue';

export default {
    title: 'Forms / Toggle',
    component: PToggle,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        label: {
            control: {
                type: 'text',
                readonly: true,
            },
            table: {
                type: {
                    summary: 'string',
                },
            },
        },
        id: {
            table: {
                type: {
                    summary: 'string | number',
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
