import { PDatePicker } from './index';

export default {
    title: 'Forms / Date Picker',
    component: PDatePicker,
    argTypes: {
        singleDatePicker: {
            options: [true, false],
            control: {
                type: 'boolean',
            },
        },
        opens: {
            options: ['left', 'center', 'right', 'inline'],
            control: {
                type: 'select',
            },
        },
        label: {
            control: {
                type: 'text',
            },
            table: {
                type: {
                    summary: null,
                },
            },
        },
        ranges: {
            table: {
                type: {
                    summary: 'boolean | object',
                },
                defaultValue: {
                    summary: '{}',
                    detail: `{
    text: 'value',
}`,
                },
            },
        },
        helpText: {
            table: {
                category: 'Props | Slots',
                type: {
                    summary: null,
                },
            },
            control: {
                type: 'text',
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
            control: {
                type: null,
            },
        },
        checkOpen: {
            control: {
                type: null,
            },
        },
        input: {
            control: {
                type: null,
            },
        },
        updateValues: {
            control: {
                type: null,
            },
        },
    },
}

const Template = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PDatePicker
    },
    data() {
        return {
            data: null,
        };
    },
    template: `
        <PDatePicker
            v-bind="args"
            v-model="data"
        />
    `,
});

export const DatePicker = Template.bind({});

DatePicker.args = {
    id: "pDatePicker",
    singleDatePicker: true,
    placeholder: "Select Date",
    label: "Date Picker",
}
