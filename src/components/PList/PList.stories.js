import PList from './PList';
import PListItem from './PListItem';

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
                disable: true,
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
