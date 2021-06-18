import PTextField from './PTextField';
import { PButton } from '../PButton';
import { PSelect } from '../PSelect';
import { PIcon } from '../PIcon';

export default {
    title: 'Forms / Text Field',
    component: PTextField,
    argTypes: {
        type: {
            options: ['text', 'password', 'number', 'currency', 'date', 'time', 'datetime-local', 'week', 'month',
                'email'],
            control: {
                type: 'select',
            },
        },
        suffix: {
            control: {
                type: 'text',
            },
        },
        prefix: {
            control: {
                type: 'text',
            },
        },
        label: {
            control: {
                type: 'text',
            },
        },
        connectedLeft: {
            table: {
                disable: true,
            },
        },
        connectedRight: {
            table: {
                disable: true,
            },
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
            formData: ''
        };
    },
    template: `
      <PTextField v-bind="$props" :value="this.formData" @input="getData"/>`,
    methods: {
        getData(value) {
            this.formData = value;
            console.log(this.formData);
        },
    },
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
        <PIcon source="CustomersMajorFilled" slot="prefix" />
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
