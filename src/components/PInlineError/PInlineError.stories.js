import PInlineError from './PInlineError';

export default {
    title: 'Forms / Inline Error',
    component: PInlineError,
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        PInlineError,
    },
    template: `
      <PInlineError
          v-bind="$props"
      />`,
});

export const InlineError = Template.bind({});

InlineError.args = {
    message: 'Store name is required',
    fieldID: 'MyFieldID'
}
