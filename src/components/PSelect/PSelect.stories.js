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
            v-model="selectedOption"
            v-bind="$props"
            @input="getSelectedOptionValue"
        ></PSelect>`,
    methods: {
        getSelectedOptionValue() {
            alert('You have selected '+this.selectedOption);
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
        {label: 'Most orders', value: 'mostOrders'},
        {label: 'Last name A–Z', value: 'lastNameAlpha'},
        {label: 'Last name Z–A', value: 'lastNameReverseAlpha'},
    ],
}
