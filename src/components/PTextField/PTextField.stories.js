import { PTextField } from './index';
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
                'email', 'file'],
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
        input: {
            table: {
                type: {
                    summary: null,
                },
                defaultValue: {
                    summary: '()',
                    detail: '(value)',
                },
            },
            control: {
                type: null,
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
        label: {
            description: `**Props**: Label for the select.
             \n**Slots**: Customize label.`,
            control: {
                type: 'text',
            },
            table: {
                category: 'Props | Slots',
                type: {
                    summary: null,
                },
            },
        },
        error: {
            description: `**Props**: Text field has error.
             \n**Slots**: Customize Error.`,
            control: {
                type: 'text',
            },
            table: {
                category: 'Props | Slots',
                type: {
                    summary: null,
                },
            },
        },
        connectedLeft: {
            table: {
                type: {
                    summary: null,
                },
            },
            control: {
                type: null,
            },
        },
        connectedRight: {
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

const Template = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PTextField,
    },
    data() {
        return {
            formData: 'Hello There!'
        };
    },
    template: `
        <PTextField
            v-bind="args"
            v-model="formData"
        />
    {{formData}}`,
});

export const TextField = Template.bind({});

TextField.args = {
    id: 'input_field',
    label: 'Input Field',
    disabled: false,
    type: 'text',
    multiline: false,
    minHeight: 0,
}

const Template1 = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PTextField, PButton, PIcon,
    },
    template: `
        <PTextField v-bind="args">
            <template #suffix>
                <PIcon source="EmailMajor"/>
            </template>
        </PTextField>`,
});

export const IconPrefix = Template1.bind({});

IconPrefix.args = {
    type: 'email',
    id: 'input_field',
    label: 'User email',
    placeholder: 'Enter email',
}

const Template2 = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PTextField, PButton, PSelect,
    },
    data() {
        return {
            selectedOption: null,
        };
    },
    template: `
        <PTextField v-bind="args">
            <template #connectedRight>
                <PButton>Submit</PButton>
            </template>
            <template #connectedLeft>
                <PSelect v-model="selectedOption" :options="['%','$']"/>
            </template>
        </PTextField>`,
});

export const ConnectedTextField = Template2.bind({});

ConnectedTextField.args = {
    id: 'input_field',
    label: 'First Name',
    connected: true,
    type: 'number',
}

const Template3 = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PTextField, PButton, PSelect,
    },
    data() {
        return {
            files: null,
        };
    },
    template: `
        <PTextField
            v-bind="args"
            v-model="files"
            @input="getFiles"
        />`,
    methods: {
        getFiles(value) {
            console.log(value)
        }
    },
});

export const FileInput = Template3.bind({});

FileInput.args = {
    id: 'input_field_file',
    label: 'Upload file',
    type: 'file',
    multiple: false,
    accept: 'image/png, image/jpeg',
}

const Template4 = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PTextField,
    },
    data() {
        return {
            formData: '',
        };
    },
    template: `
        <PTextField
            v-bind="args"
            v-model="formData"
        />
    `
});

export const FloatingLabels = Template4.bind({});

FloatingLabels.args = {
    floatingLabel: true,
    label: 'Sort By'
}
