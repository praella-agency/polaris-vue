import PCard from './PCard';
import PCardSection from './PCardSection';
import { PList } from '../PList';
import { PListItem } from '../PList';
import { PButtonGroup } from '../PButtonGroup';
import { PButton } from '../PButton';

export default {
    title: 'Structure / Card',
    component: PCard,
}

const Template = (arg, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PCard,
    },
    template: `
      <PCard v-bind="$props">
        View a summary of your online store’s performance.
      </PCard>`,
});

export const Card = Template.bind({});

Card.args = {
    sectioned: true,
    title: "Online store dashboard",
    shortDescription: "Store performance",
    actions: [
        {
            content: 'Test1',
            url: 'https://www.goggle.com'
        },
        {
            content: 'Test2',
            url: 'https://www.goggle.com'
        }
    ],
}

const Template1 = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PCard, PCardSection, PList, PListItem,
    },
    template: `
      <PCard v-bind="$props">
          <PCardSection>
            <PList>
              <PListItem>Mobile</PListItem>
              <PListItem>TV</PListItem>
            </PList>
          </PCardSection>
      </PCard>`,
});

export const CardWithSubdued = Template1.bind({});

CardWithSubdued.args = {
    title: 'Products',
    subdued: true,
    sectioned: true,
}
