import { PStack } from './index';
import { PStackItem } from './components/PStackItem';
import { PThumbnail } from '../PThumbnail';
import { PTextStyle } from '../PTextStyle';
import { PButton } from '../PButton';

export default {
    title: 'Structure / Stack',
    component: PStack,
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
        spacing: {
            options: ['extraTight', 'tight', 'loose', 'extraLoose', 'none', null],
            control: {
                type: 'select',
                labels: {
                    null: 'default',
                },
            },
        },
        distribution: {
            options: ['equalSpacing', 'leading', 'trailing', 'center', 'fill', 'fillEvenly', null],
            control: {
                type: 'select',
                labels: {
                    null: 'default',
                },
            },
        },
        alignment: {
            options: ['leading', 'trailing', 'center', 'fill', 'baseline', null],
            control: {
                type: 'select',
                labels: {
                    null: 'default',
                },
            },
        },
    },
}

const Template = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PStack, PStackItem, PThumbnail, PTextStyle, PButton,
    },
    template: `
        <PStack v-bind="args">
            <PStackItem>
                <PThumbnail/>
            </PStackItem>
            <PStackItem fill>
                <PTextStyle>Item 1</PTextStyle>
            </PStackItem>
            <PStackItem>
                <PButton plain>Delete</PButton>
            </PStackItem>
        </PStack>`,
});

export const Stack = Template.bind({});

Stack.parameters= {
    docs: {
        source: {
            code: `
<PStack>
    <PStackItem>
        <PThumbnail/>
    </PStackItem>
    <PStackItem>
        <PTextStyle>Item 1</PTextStyle>
    </PStackItem>
</PStack>`
        },
    },
};
