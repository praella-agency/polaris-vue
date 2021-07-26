import PSelect from './PSelect';

export default {
    title: 'Forms / Select',
    component: PSelect,
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        PSelect,
    },
    data() {
        return {
            selectedOption: '',
        };
    },
    template: `
        <PSelect 
            :value="selectedOption"
            v-bind="$props"
            @change="getSelectedOptionValue"
        ></PSelect>`,
    methods: {
        getSelectedOptionValue(value) {
            this.selectedOption = value;
        },
    },
});

export const Select = Template.bind({});

Select.args = {
    label: 'Sort by',
    options: [
        {label: 'Newest update', value: 'newestUpdate'},
        {label: 'Oldest update', value: 'oldestUpdate'},
        {label: 'Most spent', value: 'mostSpent'},
        {label: 'Most orders', value: 'mostOrders', disabled: true},
        {label: 'Last name A–Z', value: 'lastNameAlpha', hidden: true},
        {label: 'Last name Z–A', value: 'lastNameReverseAlpha'},
    ],
    textField: 'label',
    valueField: 'value',
    disabledField: 'disabled',
    hiddenField: 'hidden',
}
