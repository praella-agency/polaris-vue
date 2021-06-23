import PCaption from './PCaption';
import { PList, PListItem } from '../PList';

export default {
    title: 'Titles & Text / Caption',
    component: PCaption,
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
