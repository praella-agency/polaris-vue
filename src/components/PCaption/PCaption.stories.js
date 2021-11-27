import { PCaption } from './index';
import { PList } from '../PList';
import { PListItem } from '../PList/components/PListItem';

export default {
    title: 'Titles & Text / Caption',
    component: PCaption,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        default: {
            table: {
                type: {
                    summary: null,
                },
            },
        },
        id: {
            control: {
                type: 'text',
            },
            table: {
                type: {
                    summary: 'string | number',
                },
            },
        },
    },
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        PCaption, PList, PListItem,
    },
    template: `
      <PList>
          <PListItem>
            Order #1001 <PCaption v-bind="$props">Received April 21, 2017</PCaption>
          </PListItem>
          <PListItem>
            Order #1002 <PCaption v-bind="$props">Received April 22, 2017</PCaption>
          </PListItem>
      </PList>`,
});

export const Caption = Template.bind({});
