import PFilter from './PFilter';
import { PButton } from '../PButton';
import { PPopover } from '../PPopover';
import { POptionList } from '../POptionList';

export default {
    title: 'Lists & Tables / Filter',
    component: PFilter,
    argTypes: {
        default: {
            table: {
                disable: true,
            },
        },
    },
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PFilter, PButton, PPopover, POptionList
    },
    data() {
        return {
            popoverActive: false,
            status: [],
        };
    },
    template: `
      <PFilter v-bind="$props" @remove-tag="onRemoveFilter" @input="onFilterInputChanged">
          <PButton>Change Order</PButton>
          <PButton>Submit</PButton>
          <PPopover
              :active="popoverActive"
              @close="popoverActive = !popoverActive"
              full-width
              preferredAlignment="right"
          >
            <PButton
                slot="activator"
                :disclosure="popoverActive ? 'up' : 'down'"
                @click="popoverActive = !popoverActive"
            >
              Status
            </PButton>
            <POptionList
                slot="content"
                :options="[
                      {label: 'Active Little Long Content', value: 1},
                      {label: 'In-Active', value: 0},
                  ]"
                :selected="status"
                @change="updateStatusFilter"
            ></POptionList>
          </PPopover>
      </PFilter>`,
    methods: {
        onRemoveFilter() {
            alert("Removed");
        },
        onFilterInputChanged() {
            alert("Changed");
        },
        updateStatusFilter() {
            alert("Updated");
        },
    },
});

export const Filter = Template.bind({});

Filter.args = {
    resourceTitle: "Search",
    appliedFilters: [
        { value: 'Test', key: 'test'},
    ],
}
