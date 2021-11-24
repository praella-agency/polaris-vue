import { PFormLayout } from './index.js';
import { PFormLayoutGroup } from './components/PFormLayoutGroup/index.js';
import { PTextField } from '../PTextField';

export default {
    title: 'Forms / Form Layout / Group',
    component: PFormLayoutGroup,
    argTypes: {
        helpText: {
            control: {
                type: 'text',
            },
            table: {
                type: {
                    summary: 'string',
                },
            },
        },
        default: {
            table: {
                type: {
                    summary: null,
                },
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
