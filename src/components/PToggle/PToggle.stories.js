import { PToggle } from './index';

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
        change: {
            table: {
                defaultValue: {
                    summary: '()',
                    detail: '({checked: target.checked, value: target.value})',
                },
            },
            control: {
                type: null,
            },
        },
        value: {
            control: {
                type: 'text',
            },
        },
    },
}

const Template = (args) => ({
    setup() {
    return { args };
},
    components: {PToggle},
    template: '<PToggle v-bind="args"/>'
});

export const Toggle = Template.bind({});

Toggle.args = {
    label: 'Toggle Switch'
}
