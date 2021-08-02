import PSelect from './PSelect';
import {PBadge} from "../PBadge";

export default {
    title: 'Forms / Select',
    component: PSelect,
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        PSelect, PBadge
    },
    data() {
        return {
            selectedOption: null,
        };
    },
    template: `
        <div>
          <PSelect
              v-model="selectedOption"
              v-bind="$props"
              @input="valueData"
              @change="getData"
          ></PSelect>
          <br />
          <p v-if="selectedOption">Selected Value: <PBadge>{{selectedOption}}</PBadge></p>
        </div>`,
    methods: {
        getData(value) {
            console.log('getData', typeof value)
        },
        valueData(value) {
            console.log('============>', typeof value)
        },
    }
});

export const Select = Template.bind({});

Select.args = {
    label: 'Sort by',
    options: [
        {label: 'Newest update', value: '1'},
        {label: 'Oldest update', value: 2},
        {label: 'Most spent', value: 3},
        {label: 'Most orders', value: 4, disabled: true},
        {label: 'Last name A–Z', value: 5, hidden: true},
        {label: 'Last name Z–A', value: 6},
    ],
    // options: [
    //     {label: 'Newest update', value: 'newestUpdate'},
    //     {label: 'Oldest update', value: 'oldestUpdate'},
    //     {label: 'Most spent', value: 'mostSpent'},
    //     {label: 'Most orders', value: 'mostOrders', disabled: true},
    //     {label: 'Last name A–Z', value: 'lastNameAlpha', hidden: true},
    //     {label: 'Last name Z–A', value: 'lastNameReverseAlpha'},
    // ],
    placeholder: "Select",
}
