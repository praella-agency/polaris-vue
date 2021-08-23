import PTextField from './PTextField';
import { PButton } from '../PButton';
import { PSelect } from '../PSelect';
import { PIcon } from '../PIcon';

export default {
    title: 'Forms / Text Field',
    component: PTextField,
    argTypes: {
        type: {
            type: {
                name: 'select'
            },
            description: 'Determine type of input',
            options: ['text', 'password', 'number', 'date', 'time', 'datetime-local', 'week', 'month',
                'email'],
            control: {
                type: 'select',
            },
        },
        suffix: {
            control: {
                type: 'text',
            },
            table: {
                type: {
                    summary: 'string',
                },
            },
        },
        prefix: {
            control: {
                type: 'text',
            },
            table: {
                type: {
                    summary: 'string',
                },
            },
        },
        label: {
            control: {
                type: 'text',
            },
            table: {
                type: {
                    summary: 'string',
                },
            },
        },
        input: {
            description: 'Get inserted data',
            table: {
                type: {
                    summary: null,
                },
                category: 'events',
            },
        },
        disabled: {
            type: {
                name: 'boolean',
            },
            description: 'Disable the input',
        },
        minHeight: {
            type: {
                name: 'number',
            },
            description: 'Minimum height for the input (If `multiline` is true)',
        },
        maxLength: {
            type: {
                name: 'number',
            },
            description: 'Maximum character length for an input!',
        },
        multiline: {
            type: {
                name: 'boolean',
            },
            description: 'Allow for multiple lines of input',
        },
        showCharacterCount: {
            type: {
                name: 'boolean',
            },
            description: 'Indicates whether or not the character count should be displayed',
        },
    },
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PTextField,
    },
    data() {
        return {
            formData: 'Hello World!'
        };
    },
    template: `
      <PTextField 
          v-bind="$props" 
          v-model="formData"
      />`,
});

export const TextField = Template.bind({});

TextField.args = {
    id: "input_field",
    label: "Input Field",
    disabled: false,
    type: "text",
    multiline: false,
    minHeight: 0,
}

const Template1 = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PTextField, PButton, PIcon,
    },
    template: `
      <PTextField v-bind="$props">
        <PIcon source="EmailMajor" slot="prefix" />
      </PTextField>`,
});

export const IconPrefix = Template1.bind({});

IconPrefix.args = {
    type: "email",
    id: "input_field",
    label: "User email",
}

const Template2 = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PTextField, PButton, PSelect,
    },
    template: `
      <PTextField v-bind="$props">
          <PButton slot="connectedRight">Submit</PButton>
          <PSelect :options="['%','$']" slot="connectedLeft" />
      </PTextField>`,
});

export const ConnectedTextField = Template2.bind({});

ConnectedTextField.args = {
    id: "input_field",
    label: "First Name",
    connected: true,
    type: "number",
}
