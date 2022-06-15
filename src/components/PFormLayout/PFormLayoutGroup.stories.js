import { PFormLayout } from './index';
import { PFormLayoutGroup } from './components/PFormLayoutGroup';
import { PTextField } from '../PTextField';

export default {
    title: 'Forms / Form Layout',
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
            control: {
                type: null,
            },
        },
        id: {
            control: {
                type: 'text',
            },
        },
    },
}

const Template = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PFormLayout, PFormLayoutGroup, PTextField,
    },
    template: `
        <PFormLayout>
            <PFormLayoutGroup v-bind="args">
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

Group.parameters = {
    docs: {
        source: {
            code: `
<PFormLayout>
    <PFormLayoutGroup>
        <PTextField type='currency' label="Price" align="right" suffix="$"/>
        <PTextField type='number' label="Minimum order"/>
        <PTextField type='number' label="Maximum order"/>
        <PTextField type='text' label="Product"/>
    </PFormLayoutGroup>
</PFormLayout>`
        },
    },
};
