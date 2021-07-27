import PMultiSelect from './PMultiSelect';

export default {
    title: 'Forms / Multi Select',
    component: PMultiSelect,
};

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PMultiSelect,
    },
    data() {
        return {
            selectedValue: null
        }
    },
    template: `
      <PMultiSelect
          v-bind="$props"
          v-model="selectedValue"
      />`,
});

export const MultiSelect = Template.bind({});

MultiSelect.args = {
    placeholder: 'Select',
    options: [
        {
            label: 'Vue.js',
            language: 'vue.js',
        },
        {
            label: 'Rails',
            language: 'rails',
        },
        {
            label: 'Laravel',
            language: 'laravel',
            hidden: true,
        },
        {
            label: 'Phoenix',
            language: 'phoenix',
            disabled: true
        },
    ],
    label: 'Sort by',
    textField: 'label',
    valueField: 'language'
}

