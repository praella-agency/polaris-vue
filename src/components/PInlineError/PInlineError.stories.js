import { PInlineError } from './index';

export default {
    title: 'Forms / Inline Error',
    component: PInlineError,
    argTypes: {
        fieldID: {
            table: {
                type: {
                    summary: 'string | number',
                },
            },
        },
    }
}

const Template = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PInlineError,
    },
    template: `
        <PInlineError
            v-bind="args"
        />`,
});

export const InlineError = Template.bind({});

InlineError.args = {
    message: 'Store name is required',
    fieldID: 'MyFieldID'
}

InlineError.parameters = {
    docs: {
        source: {
            code: `<PInlineError message="Store name is required"/>`
        },
    },
};
