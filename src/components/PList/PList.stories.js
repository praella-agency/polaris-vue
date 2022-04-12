import { PList } from './index';
import { PListItem } from './components/PListItem';

export default {
    title: 'Lists & Tables / List',
    component: PList,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        type: {
            options: ['bullet', 'number'],
            control: {
                type: 'select',
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
    },
}

const Template = (args) => ({
    setup() {
    return { args };
},
    components: {
        PList, PListItem,
    },
    template: `
      <PList v-bind="args">
          <PListItem>Item 1</PListItem>
          <PListItem>Item 2</PListItem>
          <PListItem>Item 3</PListItem>
          <PListItem>Item 4</PListItem>
      </PList>`,
});

export const List = Template.bind({});
