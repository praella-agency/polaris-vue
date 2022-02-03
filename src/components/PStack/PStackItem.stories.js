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

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        PStack, PStackItem,
    },
    template: `
      <PStack>
          <PStackItem
              v-bind = "$props"
          >
            Item 1
          </PStackItem>
          <PStackItem
              v-bind = "$props"
              :fill= "false"
              :width = "0"
          >
            Item 2
          </PStackItem>
      </PStack>`,
});

export const StackItem = Template.bind({});

StackItem.args = {
    fill: false,
}
