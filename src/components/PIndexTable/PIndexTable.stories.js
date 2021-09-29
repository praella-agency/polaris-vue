import { PIndexTable } from './index';
import { PCell } from './components/PCell';
import { PRow } from './components/PRow';

export default {
    title: 'Index Table',
    component: PIndexTable,
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PIndexTable, PCell, PRow,
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
                },
                {
                    id: '2567',
                    url: 'customers/256',
                    name: 'Ellen Ochoa',
                    location: 'Los Angeles, USA',
                    orders: 30,
                    amountSpent: '$140',
                },
            ],
            selectedResources: [],
        }
    },
    template: `
        <PIndexTable
            v-bind="$props"
            :itemCount="customers.length"
        >
            <PRow
                v-for="(customer, key) in customers"
                :key="customer.id"
                :id="customer.id"
                :selected="selectedResources.includes(customer.id)"
                :position="key"
            >
                <PCell>
                    {{ customer.name }}
                </PCell>
                <PCell>
                    {{ customer.location }}
                </PCell>
                <PCell>
                    {{ customer.orders }}
                </PCell>
                <PCell>
                    {{ customer.amountSpent }}
                </PCell>
            </PRow>
        </PIndexTable>`,
    methods: {
        test() {
            console.log(1)
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
            title: 'Name'
        },
        {
            title: 'Location'
        },
        {
            title: 'Order count'
        },
        {
            title: 'Amount spent'
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
            content: 'Edit customers',
            onAction: () => console.log('Todo: implement bulk edit'),
        },
    ],
}
