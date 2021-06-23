import PRadioButton from './PRadioButton';
import { PStack, PStackItem } from '../PStack';

export default {
    title: 'Forms / Radio Button',
    component: PRadioButton,
    argTypes: {
        helpText: {
            control: {
                type: 'text'
            },
            table: {
                type: {
                    summary: 'string',
                },
            },
        },
        label: {
            control: {
                type: 'text'
            },
            table: {
                type: {
                    summary: 'string',
                },
            },
        },
    },
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        PRadioButton, PStack, PStackItem,
    },
    template: `
      <PStack vertical>
        <PStackItem>
            <PRadioButton
                v-bind="$props"
            ></PRadioButton>
        </PStackItem>
        <PStackItem>
            <PRadioButton
                id="optional"
                label="Accounts are optional"
                help-text="Customers will be able to check out with a customer account or as a guest."
                v-bind="$props"
            ></PRadioButton>
        </PStackItem>
      </PStack>`,
});

export const RadioButton = Template.bind({});

RadioButton.args = {
    label: 'Accounts are disabled',
    helpText: 'Customers will only be able to check out as guests.',
    checked: true,
    id: 'disabled',
    name: 'accounts',
}
