import { PPopover } from './index';
import { PButton } from '../PButton/index.js';
import { POptionList } from '../POptionList';

export default {
    title: 'Overlays / Popover',
    component: PPopover,
    parameters: {
        docs: {
            inlineStories: false,
            iframeHeight: 500,
        },
        layout: 'centered',
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
        activator: {
            table: {
                type: {
                    summary: null,
                },
            },
        },
        content: {
            table: {
                type: {
                    summary: null,
                },
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

Popover.parameters = {
    docs: {
        source: {
            code: `
<template>
  <PPopover id="items-status-filter" :active="false">
    <PButton slot="activator" disclosure="down">More Actions</PButton>
    <POptionList
      slot="content"
      :options='[{"label":"Pending","value":"0"},{"label":"Published","value":"1"},{"label":"Archived","value":"-1"}]'
      :selected="[]"
    />
  </PPopover>
</template>`,
        },
    },
}
