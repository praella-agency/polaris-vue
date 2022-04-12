import { PCheckbox } from './index';

export default {
    title: 'Forms / Checkbox',
    component: PCheckbox,
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
        helpText: {
            control: {
                type: 'text',
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
        blur: {
            control: {
                type: null,
            },
        },
        change: {
            control: {
                type: null,
            },
        },
        focus: {
            control: {
                type: null,
            },
        },
    },
}

const Template = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PCheckbox,
    },
    template: `
        <PCheckbox
            v-bind="args"
            @change="handleChange"
        >
        </PCheckbox>`,
    methods: {
        handleChange() {
            alert('Changed');
        },
    },
});

export const Checkbox = Template.bind({});

Checkbox.args = {
    id: 'PCheckbox',
    label: 'Polaris Vue Checkbox',
}
