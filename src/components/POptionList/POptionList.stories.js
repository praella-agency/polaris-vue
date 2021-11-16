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
                    detail: '([selectedValue])',
                },
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
            slot="content"
            :selected="selectedStatus"
            @change="updateStatusFilter"
        ></POptionList>`,
    methods: {
        updateStatusFilter(selected) {
            this.selectedStatus = selected;
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
