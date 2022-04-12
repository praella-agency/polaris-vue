import { PFieldError } from './index';

export default {
    title: 'Forms / Field Error',
    component: PFieldError,
}

const Template = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PFieldError,
    },
    template: `
        <PFieldError v-bind="args"></PFieldError>`,
});

export const FieldError = Template.bind({});

FieldError.args = {
    error: 'Validation Error',
}
