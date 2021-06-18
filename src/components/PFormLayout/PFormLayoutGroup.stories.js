import PFormLayout from './PFormLayout';
import PFormLayoutGroup from './PFormLayoutGroup';
import { PTextField } from '../PTextField';

export default {
    title: 'Forms / Form Layout / Group',
    component: PFormLayoutGroup,
    argTypes: {
        helpText: {
            control: {
                type: 'text',
            },
        },
        default: {
            table: {
                disable: true,
            },
        },
    },
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PFormLayout, PFormLayoutGroup, PTextField,
    },
    template: `
      <PFormLayout>
      <PFormLayoutGroup v-bind="$props">
        <PTextField type='currency' label="Price" align="right" suffix="$"/>
        <PTextField type='number' label="Minimum order"/>
        <PTextField type='number' label="Maximum order"/>
        <PTextField type='text' label="Product"/>
      </PFormLayoutGroup>
      </PFormLayout>`,
});

export const Group = Template.bind({});

Group.args = {
    helpText: "Order details",
}
