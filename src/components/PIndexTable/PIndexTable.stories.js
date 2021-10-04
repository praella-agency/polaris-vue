import { PIndexTable } from './index';
import { PCell } from './components/PCell';
import { PRow } from './components/PRow';
import { PCard } from '../PCard';

export default {
    title: 'Index Table',
    component: PIndexTable,
    argTypes: {
        selectedItemsCount: {
            control: {
                type: 'number',
            },
        },
    },
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PIndexTable, PCell, PRow, PCard,
    },
    data() {
        return {
            customers: [
                {
                    id: '3417',
                    url: 'customers/341',
                    name: 'Mae Jemison',
                    location: 'Decatur, USA',
                    orders: 20,
                    amountSpent: '$2,400',
                    status: 'success',
                },
                {
                    id: '2567',
                    url: 'customers/256',
                    name: 'Ellen Ochoa',
                    location: 'Los Angeles, USA',
                    orders: 30,
                    amountSpent: '$140',
                    status: 'subdued',
                },
                {
                    id: '1925',
                    url: 'customers/192',
                    name: 'Berlin Andres',
                    location: 'Las Vegas, USA',
                    orders: 45,
                    amountSpent: '$14,000',
                    status: 'success',
                },
            ],
        }
    },
    template: `
        <PCard>
            <PIndexTable
                v-bind="$props"
                :rows="customers"
                :itemCount="customers.length"
                @selectionChange="handleSelectionChange"
            />
        </PCard>`,
    methods: {
        handleSelectionChange(selectionType, toggleType, selection) {
            console.log(selectionType, toggleType, selection);
        }
    }
});

export const IndexTable = Template.bind({});

IndexTable.args = {
    resourceName: {
        singular: 'customer',
        plural: 'customers',
    },
    headings: [
        {
            title: 'Name',
            value: 'name',
        },
        {
            title: 'Location',
            value: 'location',
        },
        {
            title: 'Order count',
            value: 'orders',
        },
        {
            title: 'Amount spent',
            value: 'amountSpent',
        },
    ],
    bulkActions: [
        {
            content: 'Add tags',
            onAction: () => console.log('Todo: implement bulk add tags'),
        },
        {
            content: 'Remove tags',
            onAction: () => console.log('Todo: implement bulk remove tags'),
        },
        {
            content: 'Delete customers',
            onAction: () => console.log('Todo: implement bulk delete'),
        },
    ],
    hasMoreItems: true,
    promotedBulkActions: [
        {
            title: 'Menu',
            actions: [
                {
                    helpText: 'Promoted BulkActions Menu',
                    onAction: () => console.log('Todo: implement promoted bulk actions menu'),
                }
            ],
        },
        {
            content: 'Edit customers',
            onAction: () => console.log('Todo: implement bulk edit'),
        },
    ],
    lastColumnSticky: true,
}
