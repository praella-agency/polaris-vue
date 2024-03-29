import { POptionList } from './index';

export default {
    title: 'Lists & Tables / Option List',
    component: POptionList,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        selected: {
            control: {
                type: null,
            },
        },
        options: {
            table: {
                defaultValue: {
                    summary: '[]',
                    detail: `[{
    value: string,
    label: string,
    disabled?: boolean,
    active?: boolean,
    id?: string,
}]`,
                },
            },
        },
        sections: {
            table: {
                defaultValue: {
                    summary: '[]',
                    detail: `[{
    title?: string,
    options: options[],
}]`,
                },
            },
        },
        id: {
            control: {
                type: 'text'
            },
            table: {
                type: {
                    summary: 'string | number',
                },
            },
        },
        change: {
            table: {
                defaultValue: {
                    summary: '()',
                    detail: '(selectedValue)',
                },
            },
            control: {
                type: null,
            },
        },
        click: {
            table: {
                defaultValue: {
                    summary: '()',
                    detail: '(selectedOption)',
                },
            },
            control: {
                type: null,
            },
        },
        media: {
            table: {
                type: {
                    summary: null,
                },
            },
            control: {
                type: null,
            },
        },
    },
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        POptionList,
    },
    data() {
        return {
            selectedStatus: [],
        };
    },
    template:`
        <POptionList 
            v-bind="$props"
            :selected="selectedStatus"
            @change="updateStatusFilter"
            @click="handleClick"
        >
            <template v-slot:media="{item}">
                {{ item.icon }}
            </template>
        </POptionList>
    `,
    methods: {
        updateStatusFilter(selected) {
            this.selectedStatus = selected;
        },
        handleClick(selected, option) {
            console.log('click', selected, option);
        }
    },
});

export const OptionList = Template.bind({});

OptionList.args = {
    options: [
        {value: 'byward_market', label: 'Byward Market'},
        {value: 'centretown', label: 'Centretown'},
        {value: 'hintonburg', label: 'Hintonburg'},
        {value: 'westboro', label: 'Westboro'},
        {value: 'downtown', label: 'Downtown'},
    ],
    sections: [
        {
            title: 'Traffic',
            options: [
                {value: 'source', label: 'Traffic referrer source'},
                {value: 'host', label: 'Traffic referrer host'},
                {value: 'path', label: 'Traffic referrer path'},
            ],
        },
    ],
}
