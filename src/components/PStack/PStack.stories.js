import PStack from './PStack'
import PStackItem from './PStackItem';
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

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        PStack, PStackItem, PThumbnail, PTextStyle, PButton,
    },
    template: `
      <PStack v-bind = "$props">
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
