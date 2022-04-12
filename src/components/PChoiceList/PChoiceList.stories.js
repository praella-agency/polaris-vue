import { PChoiceList } from './index';
import { PTextField } from '../PTextField';

export default {
    title: 'Forms / Choice List',
    component: PChoiceList,
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
        selected: {
            table: {
                defaultValue: {
                    summary: '[]',
                },
            },
            control: {
                type: null,
            },
        },
        default: {
            table: {
                type: {
                    summary: null,
                },
            },
            control: {
                type: null,
            },
        },
        change: {
            table: {
                defaultValue: {
                    summary: '()',
                    detail: '(choice, checked, selected[], allowMultiple)',
                },
            },
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
        PChoiceList, PTextField,
    },
    data() {
        return {
            selectedData: ["hidden"],
            data: null,
        };
    },
    template: `
        <PChoiceList
            v-bind="args"
            :selected="selectedData"
            v-model="data"
        >
            <PTextField />
        </PChoiceList>`,
});

export const ChoiceList = Template.bind({});

ChoiceList.args = {
    options: [
        {label: 'Hidden', value: 'hidden', disable: false, error: true},
        {label: 'Optional', value: 'optional', helpText: 'Reduces the number of fields required to check out. The billing address can still be edited.'},
        {label: 'Required', value: 'required'},
    ],
    textField: 'label',
    valueField: 'value',
    disabledField: 'disable',
    helpTextField: 'helpText',
    describedByErrorField: 'error',
    renderChildrenField: 'renderChildren'
}
