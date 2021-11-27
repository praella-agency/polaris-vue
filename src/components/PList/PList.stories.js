import { PList } from './index.js';
import { PListItem } from './components/PListItem/index.js';

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
        },
    },
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        PList, PListItem,
    },
    template: `
      <PList v-bind="$props">
          <PListItem>Item 1</PListItem>
          <PListItem>Item 2</PListItem>
          <PListItem>Item 3</PListItem>
          <PListItem>Item 4</PListItem>
      </PList>`,
});

export const List = Template.bind({});
