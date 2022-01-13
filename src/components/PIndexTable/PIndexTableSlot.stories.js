import { PIndexTable } from './index';
import { PCard } from '../PCard';
import { PLink } from '../PLink';
import { PThumbnail } from '../PThumbnail';
import { PPopover } from '../PPopover';
import { PButton } from '../PButton';
import { POptionList } from '../POptionList';
import { PBadge } from '../PBadge';
import { PStack } from '../PStack';
import { PStackItem } from '../PStack/components/PStackItem';
import { PRadioButton } from '../PRadioButton';
import { PTextField } from '../PTextField';
import { PButtonGroup } from '../PButtonGroup';
import argTypes from './args';

export default {
    title: 'Lists & Tables / Index Table / Slot',
    component: PIndexTable,
    argTypes: argTypes,
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PIndexTable, PCard, PLink, PThumbnail, PPopover, PButton, POptionList, PBadge, PStack, PStackItem, PRadioButton,
        PTextField, PButtonGroup,
    },
    data() {
        return {
            customers: [
                {
                    id: '3417',
                    url: 'customers/341',
                    name: 'Ring Bell',
                    inventory: '10 in stock',
                    vendor: 'demo-admin',
                    price: '$2,400',
                    product_status: 'Active',
                    status: 'success',
                },
                {
                    id: '2567',
                    url: 'customers/256',
                    name: 'Magic Belt',
                    inventory: '5 in stock',
                    vendor: 'demo-user',
                    price: '$3,500',
                    product_status: 'Draft',
                    status: 'subdued',
                },
                {
                    id: '1925',
                    url: 'customers/192',
                    name: 'Glue Gun',
                    inventory: '7 in stock',
                    vendor: 'demo-admin',
                    price: '$14,000',
                    product_status: 'Archived',
                    status: 'success',
                },
            ],
            active: false,
            active1: false,
            selected: [],
            tag: 'Andres',
        };
    },
    template: `
        <PCard sectioned>
            <PIndexTable
                v-bind="$props"
                :rows="customers"
                :itemCount="customers.length"
                :appliedFilters="[
                    {
                        'value': tag,
                        'key': 'test'
                    },
                ]"
                @navigation="handleNavigation"
                @selectionChange="handleSelectionChange"
            >
                <template v-slot:item.image="{item}">
                    <div style="height: 93px; display: block; padding: 15px 0 15px 0;">
                        <PThumbnail 
                            source="https://hulkapps.nyc3.digitaloceanspaces.com/polaris-vue/placeholder.png"
                            :alt="item.name"
                        />
                    </div>
                </template>
                <template v-slot:item.product="{item}">
                    <PLink url="javascript:void(0)">
                        {{ item.name }}
                    </PLink>
                </template>
                <template v-slot:item.product_status="{item}">
                    <PBadge v-if="item.product_status === 'Draft'" status="info">
                        {{ item.product_status }}
                    </PBadge>
                    <PBadge v-else-if="item.product_status === 'Active'" status="success">
                        {{ item.product_status }}
                    </PBadge>
                    <PBadge v-else>
                        {{ item.product_status }}
                    </PBadge>
                </template>
                
                <PButtonGroup slot="filterOptions" segmented>
                    <PPopover
                        id="popover_1"
                        :active="active"
                        preferred-alignment="right"
                        @close="() => {this.active = false;}"
                        full-width
                    >
                        <PButton slot="activator" @click="toggleRatingFilter"
                                 :disclosure="active ? 'up' : 'down'">
                            Product Vendor
                        </PButton>
                        <PCard 
                            sectioned
                            slot="content"
                        >
                            <PStack
                                vertical
                            >
                                <PStackItem>
                                    <PRadioButton id="demo-admin" name="vendor" label="demo-admin"/>
                                </PStackItem>
                                <PStackItem>
                                    <PRadioButton id="demo-user" name="vendor" label="demo-user"/>
                                </PStackItem>
                                <PStackItem>
                                    <PButton plain monochrome remove-underline>Clear</PButton>
                                </PStackItem>
                            </PStack>
                        </PCard>
                    </PPopover>                    

                    <PPopover
                        id="popover_2"
                        :active="active1"
                        preferred-alignment="right"
                        @close="() => {this.active1 = false;}"
                        full-width
                    >
                        <PButton slot="activator" @click="toggleRatingFilter1"
                                 :disclosure="active1 ? 'up' : 'down'">
                            Tagged With
                        </PButton>
                        <PCard 
                            sectioned                                 
                            slot="content"
                        >
                            <PStack
                                vertical
                                spacing="tight"
                            >
                                <PStackItem>
                                    <PTextField id="tag" type="text" v-model="tag"/>
                                </PStackItem>
                                <PStackItem>
                                    <PButton plain monochrome remove-underline>Clear</PButton>
                                </PStackItem>
                            </PStack>
                        </PCard>
                    </PPopover>
                </PButtonGroup>

                <template slot="auxiliaryContainer">
                    <div style="padding-left: 8px;">
                        <PButton 
                            disabled
                            icon="StarFilledMinor"
                        >
                            Saved
                        </PButton>
                    </div>
                </template>
            </PIndexTable>
        </PCard>`,
    methods: {
        handleSelectionChange(selectionType, toggleType, selection) {
            console.log(selectionType, toggleType, selection);
        },
        handleNavigation(id) {
            console.log(id)
        },
        toggleRatingFilter() {
            this.active = !this.active;
            this.active1 = false;
        },
        toggleRatingFilter1() {
            this.active1 = !this.active1;
            this.active = false;
        },
    }
});

export const CustomisableColumn = Template.bind({});

CustomisableColumn.args = {
    resourceName: {
        singular: 'product',
        plural: 'products',
    },
    headings: [
        {
            title: '',
            value: 'image',
        },
        {
            title: 'Product',
            value: 'product',
        },
        {
            title: 'Status',
            value: 'product_status',
        },
        {
            title: 'Inventory',
            value: 'inventory',
        },
        {
            title: 'Price',
            value: 'price',
        },
        {
            title: 'Vendor',
            value: 'vendor',
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
    pagination: {
        hasPrevious: true,
        hasNext: true,
        onNext: () => {
            alert('Next');
        },
        onPrevious: () => {
            alert('Previous');
        },
    },
}

CustomisableColumn.parameters = {
    docs: {
        source: {
            code: `
<PCard sectioned>
    <PIndexTable
        :rows="[
            {
                id: '3417',
                url: 'customers/341',
                name: 'Ring Bell',
                inventory: '10 in stock',
                vendor: 'demo-admin',
                price: '$2,400',
                product_status: 'Active',
                status: 'success',
            },
            {
                id: '2567',
                url: 'customers/256',
                name: 'Magic Belt',
                inventory: '5 in stock',
                vendor: 'demo-user',
                price: '$3,500',
                product_status: 'Draft',
                status: 'subdued',
            },
            {
                id: '1925',
                url: 'customers/192',
                name: 'Glue Gun',
                inventory: '7 in stock',
                vendor: 'demo-admin',
                price: '$14,000',
                product_status: 'Archived',
                status: 'success',
            },
        ]"
        :itemCount="rows.length"
        :appliedFilters="[
            {
                'value': tag,
                'key': 'test'
            },
        ]"
        :resourceName="{
            singular: 'product',
            plural: 'products',
        }"
        :headings="[
            {
                title: '',
                value: 'image',
            },
            {
                title: 'Product',
                value: 'product',
            },
            {
                title: 'Status',
                value: 'product_status',
            },
            {
                title: 'Inventory',
                value: 'inventory',
            },
            {
                title: 'Price',
                value: 'price',
            },
            {
                title: 'Vendor',
                value: 'vendor',
            },
        ]"
        :bulkActions="[
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
        ]"
        :hasMoreItems="true"
        :promotedBulkActions="[
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
        ]"
        :lastColumnSticky="true"
        :pagination="{
            hasPrevious: true,
            hasNext: true,
            onNext: () => {
                alert('Next');
            },
            onPrevious: () => {
                alert('Previous');
            },
        }"
    >
        <template v-slot:item.image="{ item }">
            <div style="height: 93px; display: block; padding: 15px 0 15px 0;">
                <PThumbnail 
                    source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
                    :alt="item.name"
                />
            </div>
        </template>
        <template v-slot:item.product="{item}">
            <PLink url="javascript:void(0)">
                {{ item.name }}
            </PLink>
        </template>
        <template v-slot:item.product_status="{item}">
            <PBadge v-if="item.product_status === 'Draft'" status="info">
                {{ item.product_status }}
            </PBadge>
            <PBadge v-else-if="item.product_status === 'Active'" status="success">
                {{ item.product_status }}
            </PBadge>
            <PBadge v-else>
                {{ item.product_status }}
            </PBadge>
        </template>
        
        <template slot="filterOptions">
            <PPopover
                id="popover_1"
                :active="active"
                preferred-alignment="right"
                full-width
            >
                <PButton 
                    slot="activator"
                    :disclosure="active ? 'up' : 'down'"
                >
                    Product Vendor
                </PButton>
                <PCard 
                    sectioned
                    slot="content"
                >
                    <PStack
                        vertical
                    >
                        <PStackItem>
                            <PRadioButton id="demo-admin" name="vendor" label="demo-admin"/>
                        </PStackItem>
                        <PStackItem>
                            <PRadioButton id="demo-user" name="vendor" label="demo-user"/>
                        </PStackItem>
                        <PStackItem>
                            <PButton plain monochrome>Clear</PButton>
                        </PStackItem>
                    </PStack>
                </PCard>
            </PPopover>                    

            <PPopover
                id="popover_2"
                :active="active1"
                preferred-alignment="right"
                full-width
            >
                <PButton
                    slot="activator"
                    :disclosure="active1 ? 'up' : 'down'"
                >
                    Tagged With
                </PButton>
                <PCard 
                    sectioned                                 
                    slot="content"
                >
                    <PStack
                        vertical
                        spacing="tight"
                    >
                        <PStackItem>
                            <PTextField id="tag" type="text" v-model="tag"/>
                        </PStackItem>
                        <PStackItem>
                            <PButton plain monochrome>Clear</PButton>
                        </PStackItem>
                    </PStack>
                </PCard>
            </PPopover>
        </template>

        <template slot="auxiliaryContainer">
            <div style="padding-left: 8px;">
                <PButton 
                    disabled
                    icon="StarFilledMinor"
                >
                    Saved
                </PButton>
            </div>
        </template>
    </PIndexTable>
</PCard>`
        },
    },
}
