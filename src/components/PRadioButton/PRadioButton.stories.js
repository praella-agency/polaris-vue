import { PRadioButton } from './index';
import { PStack } from '../PStack';
import { PStackItem } from '../PStack/components/PStackItem';

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
        id: {
            table: {
                type: {
                    summary: 'string | number',
                },
            },
        },
        blur: {
            table: {
                defaultValue: {
                    summary: '()',
                },
            },
            control: {
                type: null,
            },
        },
        focus: {
            table: {
                defaultValue: {
                    summary: '()',
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
                    detail: '({checked: target.checked, value: target.value})',
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
        return {args};
    },
    components: {
        PRadioButton, PStack, PStackItem,
    },
    template: `
        <PStack vertical>
            <PStackItem>
                <PRadioButton
                    id="disabled"
                    label="Customers will only be able to check out as guests."
                    help-text="Customers will only be able to check out as guests."
                    :checked="true"
                    v-bind="args"
                />
            </PStackItem>
            <PStackItem>
                <PRadioButton
                    id="optional"
                    label="Accounts are optional"
                    help-text="Customers will be able to check out with a customer account or as a guest."
                    v-bind="args"
                />
            </PStackItem>
        </PStack>`,
});

export const RadioButton = Template.bind({});

RadioButton.args = {
    name: 'accounts',
}

RadioButton.parameters = {
    docs: {
        source: {
            code: `
<PStack vertical>
    <PStackItem>
        <PRadioButton
            id="disabled"
            label="Customers will only be able to check out as guests."
            help-text="Customers will only be able to check out as guests."
        />
    </PStackItem>
    <PStackItem>
        <PRadioButton
            id="optional"
            label="Accounts are optional"
            help-text="Customers will be able to check out with a customer account or as a guest."
            checked
        />
    </PStackItem>
</PStack>`
        },
    },
};