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
    template:`
      <PMultiSelect
          v-bind="$props"
          @change="getSelectedOptionsValue"
      />`,
    methods: {
        getSelectedOptionsValue(value) {
            console.log(value);
        },
    },
});

export const MultiSelect = Template.bind({});

MultiSelect.args = {
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
        },
        {
            label: 'Phoenix',
            language: 'phoenix',
            disabled: true
        },
    ],
    textField: 'label',
}

