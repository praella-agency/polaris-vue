import { PPopover } from './index';
import { PButton } from '../PButton';
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
            control: {
                type: null,
            },
        },
        content: {
            table: {
                type: {
                    summary: null,
                },
            },
            control: {
                type: null,
            },
        },
        active: {
            name: 'active.sync',
        },
        activate: {
            control: {
                type: null,
            },
        },
        close: {
            control: {
                type: null,
            },
        },
    },
}

const Template = (args) => ({
    setup() {
    return { args };
},
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
            v-bind="args"
            @close="() => {this.statusFilterActive = false}"
        >
            <template #activator>
                <PButton
                    :disclosure="statusFilterActive ? 'up' : 'down'"
                    @click="toggleStatusFilter"
                >
                    More Actions
                </PButton>
            </template>
            <template #content>
                <POptionList
                    :selected="queryParams.status"
                    :options="[
                        {label: 'Pending', value: '0'},
                        {label: 'Published', value: '1'},
                        {label: 'Archived', value: '-1'},
                    ]"
                    @change="updateStatusFilter"
                ></POptionList>
            </template>
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
    <template #activator>
        <PButton disclosure="down">More Actions</PButton>
    </template>
    <template #content>
        <POptionList
          :options='[{"label":"Pending","value":"0"},{"label":"Published","value":"1"},{"label":"Archived","value":"-1"}]'
          :selected="[]"
        />
    </template>
  </PPopover>
</template>`,
        },
    },
}
