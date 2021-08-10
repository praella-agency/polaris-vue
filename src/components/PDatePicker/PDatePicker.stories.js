import PDatePicker from './PDatePicker';

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
                category: ['props', 'slots']
            }
        }
    },
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
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
          v-bind="$props"
          v-model="data"
      ></PDatePicker>`,
});

export const DatePicker = Template.bind({});

DatePicker.args = {
    id: "pDatePicker",
    singleDatePicker: true,
}
