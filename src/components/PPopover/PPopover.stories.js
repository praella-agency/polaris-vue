import PPopover from './PPopover';
import { PButton } from '../PButton';
import { POptionList } from '../POptionList';
import PopoverMDX from "./PopoverMDX.mdx";

export default {
    title: 'Overlays / Popover',
    component: PPopover,
    parameters: {
        docs: {
            page: PopoverMDX,
        },
    },
    argTypes: {
        preferredAlignment: {
            options: ['center', 'left', 'right'],
            control: {
                type: 'select',
            },
        },
        preferredPosition: {
            options: ['below', 'above', 'mostSpace'],
            control: {
                type: 'select',
            },
        },
    },
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        PPopover, PButton, POptionList
    },
    data() {
        return {
            statusFilterActive: false,
            queryParams: {
                page: null,
                search: null,
                ratings: [],
                status: [],
                id: null,
            },
        };
    },
    template: `
        <PPopover
            :active="statusFilterActive"
            v-bind="$props"
            @change="toggleStatusFilter"
        >
          <PButton
              slot="activator"
              :disclosure="statusFilterActive ? 'up' : 'down'"
              @click="toggleStatusFilter"
          >
            More Actions
          </PButton>
          <POptionList
              slot="content"
              :selected="queryParams.status"
              :options="[
                {label: 'Pending', value: '0'},
                {label: 'Published', value: '1'},
                {label: 'Archived', value: '-1'},
              ]"
              @change="updateStatusFilter"
          ></POptionList>
        </PPopover>`,
    methods: {
        toggleStatusFilter() {
            this.statusFilterActive = !this.statusFilterActive;
        },
        updateStatusFilter(selected) {
            this.queryParams.status.push(selected);
        },
    },
});

export const Popover = Template.bind({});

Popover.args = {
    id: 'items-status-filter',
}
