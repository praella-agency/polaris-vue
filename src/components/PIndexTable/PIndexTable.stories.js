import { PIndexTable } from './index';
import { PCard } from '../PCard';
import argTypes from './args';

export default {
    title: 'Lists & Tables / Index Table',
    component: PIndexTable,
    argTypes: argTypes,
}

const Template = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PIndexTable, PCard,
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
                    amountSpent: '$3,500',
                },
            ],
        };
    },
    template: `
        <PCard>
            <PIndexTable
                v-bind="args"
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

export const Default = Template.bind({});

Default.args = {
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
}

Default.parameters = {
    docs: {
        source: {
            code: `
<PCard>
    <PIndexTable/>
</PCard>`
        },
    },
};

const Template1 = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PIndexTable, PCard,
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
                    amountSpent: '$3,500',
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
        };
    },
    template: `
        <PCard>
            <PIndexTable
                v-bind="args"
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

export const BulkActions = Template1.bind({});

BulkActions.args = {
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
                },
            ],
        },
        {
            content: 'Edit customers',
            onAction: () => console.log('Todo: implement bulk edit'),
        },
    ],
    lastColumnSticky: true,
}

BulkActions.parameters = {
    docs: {
        source: {
            code: `
<PCard>
    <PIndexTable/>
</PCard>`
        },
    },
};

const Template2 = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PIndexTable, PCard,
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
                    amountSpent: '$3,500',
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
        };
    },
    template: `
        <div style="width: 430px;">
            <PCard>
                <PIndexTable
                    v-bind="args"
                    :rows="customers"
                    :itemCount="customers.length"
                    @selectionChange="handleSelectionChange"
                />
            </PCard>
        </div>`,
    methods: {
        handleSelectionChange(selectionType, toggleType, selection) {
            console.log(selectionType, toggleType, selection);
        }
    }
});

export const SmallScreen = Template2.bind({});

SmallScreen.args = {
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
    condensed: true,
}

SmallScreen.parameters = {
    docs: {
        source: {
            code: `
<PCard>
    <PIndexTable/>
</PCard>`
        },
    },
};
