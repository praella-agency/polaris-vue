import PMultiSelect from './PMultiSelect';
import {PBadge} from "../PBadge";

export default {
    title: 'Forms / Multi Select',
    component: PMultiSelect,
    argTypes: {
        options: {
            table: {
                defaultValue: {
                    summary: '[]',
                    detail: `[{
    key: 'text',
    value: 'text'
}]`,
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
};

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PMultiSelect,PBadge
    },
    data() {
        return {
            selectedValue: null,
            searchValue: null
        }
    },
    template: `
      <div>
      <PMultiSelect
          v-bind="$props"
          v-model="selectedValue"
          @searchChange="search"
      />
      <br />
      <p v-if="selectedValue">Selected Value: <PBadge>{{selectedValue}}</PBadge></p>
      <br />
      <p v-if="searchValue">Search Value: <PBadge>{{searchValue}}</PBadge></p>
      </div>`,
    methods: {
        search(query) {
            this.searchValue = query;
        }
    }
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

