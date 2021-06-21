import PCard from './PCard';
import PCardSection from './PCardSection';
import { PList } from '../PList';
import { PListItem } from '../PList';
import { PButtonGroup } from '../PButtonGroup';
import { PButton } from '../PButton';
import { PPopover } from '../PPopover';
import { PActionList } from '../PActionList';
import { PCardHeader } from './index';
import { PTextContainer } from '../PTextContainer';
import { PResourceList } from '../PResourceList';
import { PResourceListItem } from '../PResourceList';
import { PStack } from '../PStack';
import { PStackItem } from '../PStack';

export default {
    title: 'Structure / Card',
    component: PCard,
    argTypes: {
        default: {
            table: {
                disable: true,
            },
        },
        footer: {
            table: {
                disable: true,
            },
        },
        title: {
            control: {
                type: 'text',
            },
        },
        short_description: {
            table: {
                disable: true,
            },
        },
        actions: {
            control: {
                type: 'array',
            },
        },
    },
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
              <PListItem>Samsung</PListItem>
              <PListItem>Apple</PListItem>
            </PList>
          </PCardSection>
          
          <PCardSection :subdued="subdued" title="New Products">
            <PList>
              <PListItem>Google</PListItem>
              <PListItem>Oneplus</PListItem>
            </PList>
          </PCardSection>
      </PCard>`,
});

export const CardWithSubdued = Template1.bind({});

CardWithSubdued.args = {
    title: 'Products',
    subdued: true,
}

const Template2 = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PCard, PCardHeader, PPopover, PButton, PButtonGroup, PActionList, PCardSection, PTextContainer, PResourceList,
        PResourceListItem, PStack, PStackItem, PList, PListItem,
    },
    data() {
        return {
            statusFilterActive: false,
            items: [
                {
                    sales: 'Orders',
                    amount: 'USD$0.00',
                    url: 'reports/orders',
                },
                {
                    sales: 'Returns',
                    amount: '-USD$250.00',
                    url: 'reports/returns',
                },
            ],
        };
    },
    template: `
        <PCard v-bind="$props">
            <PCardHeader>
              <div slot="actions">
                  <PPopover
                      :active="false",
                      @close="statusFilterActive = false"
                  >
                    <PButton
                        slot="activator"
                        :disclosure="statusFilterActive ? 'up' : 'down'"
                        @click.stop="statusFilterActive = !statusFilterActive"
                    >
                      Status
                    </PButton>
                  </PPopover>
              </div>
            </PCardHeader>
            
            <PCardSection>
              <PTextContainer>
                You can use sales reports to see information about your customers’ orders 
                based on criteria such as sales over time, by channel, or by staff.
              </PTextContainer>
            </PCardSection>
            
            <PCardSection title="Total Sales Breakdown">
<!--              <PResourceList-->
<!--                  :resource-name="{singular: 'Sale', plural: 'Sales'}"-->
<!--              >-->
<!--                <PResourceListItem-->
<!--                    v-for="(item, key) in items"-->
<!--                    :key="key"-->
<!--                    :id="item.id"-->
<!--                >-->
<!--                  <PStack>-->
<!--                    <PStackItem>-->
<!--                      -->
<!--                    </PStackItem>-->
<!--                  </PStack>-->
<!--                </PResourceListItem>-->
<!--              </PResourceList>-->
            </PCardSection>
            
            <PButtonGroup slot="footer">
              <PButton @click="handleSecondaryButton">Dismiss</PButton>
              <PButton primary @click="handlePrimaryButton">Export Report</PButton>
            </PButtonGroup>
        </PCard>`,
    methods: {
        handleSecondaryButton() {
            alert('Dismiss');
        },
        handlePrimaryButton() {
            alert('Export Report');
        },
    },
});

export const AllElements = Template2.bind({});

AllElements.args = {
    title: 'Sales',
    actions: [
        {
            content: 'Total Sales',
        }
    ],
}
