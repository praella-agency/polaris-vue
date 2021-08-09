import {PChoiceList} from './index';
import {PTextField} from '../PTextField';

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
    },
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PChoiceList, PTextField,
    },
    data() {
        return {
            selectedData: ["hidden"],
        };
    },
    template: `
        <PChoiceList
            v-bind="$props"
            :selected="selectedData"
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
