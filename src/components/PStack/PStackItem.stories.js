import { PStack } from './index';
import { PStackItem } from './components/PStackItem';

export default {
    title: 'Structure / Stack Item',
    component: PStackItem,
    argTypes: {
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
        width: {
            control: 'text',
        },
    },
}

const Template = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PStack, PStackItem,
    },
    template: `
        <PStack>
            <PStackItem
                v-bind="args"
            >
                Item 1
            </PStackItem>
            <PStackItem
                v-bind="args"
                :fill="false"
                :width="0"
            >
                Item 2
            </PStackItem>
        </PStack>`,
});

export const StackItem = Template.bind({});

StackItem.args = {
    fill: false,
}

StackItem.parameters= {
    docs: {
        source: {
            code: `
<PStack>
    <PStackItem>
        <PTextStyle>Item 1</PTextStyle>
    </PStackItem>
    <PStackItem>
        <PTextStyle>Item 2</PTextStyle>
    </PStackItem>
</PStack>`
        },
    },
};
