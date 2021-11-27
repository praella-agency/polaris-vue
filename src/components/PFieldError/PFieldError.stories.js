import { PFieldError } from './index';

export default {
    title: 'Forms / Field Error',
    component: PFieldError,
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        PFieldError,
    },
    template: `
        <PFieldError v-bind="$props"></PFieldError>`,
});

export const FieldError = Template.bind({});

FieldError.args = {
    error: 'Validation Error',
}
