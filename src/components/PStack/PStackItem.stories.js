import PStack from './PStack';
import PStackItem from './PStackItem';

export default {
    title: 'Structure / Stack Item',
    component: PStackItem,
    argTypes: {
        default: {
            table: {
                disable: true,
            },
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
