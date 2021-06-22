import PCheckbox from './PCheckbox';

export default {
    title: 'Forms / Checkbox',
    component: PCheckbox,
    argTypes: {
        label: {
            control: {
                type: 'text',
            },
        },
        helpText: {
            control: {
                type: 'text',
            },
        },
    },
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        PCheckbox,
    },
    template: `
        <PCheckbox 
            v-bind="$props" 
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
