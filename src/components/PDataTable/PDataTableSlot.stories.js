import { PDataTable } from './index';
import { PDataTableRow } from './components/PDataTableRow';
import { PDataTableCol } from './components/PDataTableCol';
import { PPopover } from '../PPopover';
import { PButton } from '../PButton';
import { PLink } from '../PLink';
import { PBadge } from '../PBadge';
import { PIcon } from '../PIcon';
import { PToggle } from '../PToggle';
import { POptionList } from '../POptionList';
import { PCard } from '../PCard';
import { PStack } from '../PStack';
import { PStackItem } from '../PStack/components/PStackItem';
import { PButtonGroup } from '../PButtonGroup';
import argTypes from './args';

export default {
    title: 'Lists & Tables / Data Table / Slot',
    component: PDataTable,
    argTypes
}

const Template = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PDataTable, PPopover, PButton, POptionList, PCard, PLink, PBadge, PToggle, PIcon, PStack, PStackItem,
        PDataTableRow, PDataTableCol, PButtonGroup,
    },
    data() {
        return {
            active1: false,
            active2: false,
            selected: [],
            status: ['Active'],
        };
    },
    template: `
        <PCard>
            <PDataTable
                v-bind="args"
                @sort-changed="handleSortChange"
                @input-filter-changed="handleSearch"
            >
                <template v-slot:item="{item}">
                    <PDataTableRow>
                        <PDataTableCol firstColumn>
                            <PLink :url="item.product_link">
                                {{item.product}}
                            </PLink>
                        </PDataTableCol>
                        <PDataTableCol numeric>{{item.price}}</PDataTableCol>
                        <PDataTableCol numeric>
                            <PBadge :status="item.sku_status" :progress="item.sku_progress">
                                {{item.sku}}
                            </PBadge>
                        </PDataTableCol>
                        <PDataTableCol numeric>{{item.qty}}</PDataTableCol>
                        <PDataTableCol>
                            <PToggle :checked="item.status"/>
                        </PDataTableCol>
                        <PDataTableCol>
                            <PStack>
                                <PStackItem>
                                    <PIcon source="EditMinor" @click="editItem(item.product)"/>
                                </PStackItem>
                                <PStackItem>
                                    <PIcon source="DeleteMinor" color="critical" @click="deleteItem(item.product)"/>
                                </PStackItem>
                            </PStack>
                        </PDataTableCol>
                    </PDataTableRow>
                </template>

                <template #filter>
                    <PButtonGroup segmented>
                        <PPopover
                            id="popover_1"
                            :active="active1"
                            preferred-alignment="right"
                            @close="() => {this.active1 = false;}"
                            full-width
                        >
                            <template #activator>
                                <PButton @click="toggleRatingFilter"
                                         :disclosure="active1 ? 'up' : 'down'">
                                    Filter Options
                                </PButton>
                            </template>
                            <template #content>
                                <POptionList
                                    allowMultiple
                                    :selected="selected"
                                    :options="[
                                        {label: 'Rating 1 with a long text', value: '1'},
                                        {label: 'Rating 2', value: '2'},
                                        {label: 'Rating 3', value: '3'},
                                        {label: 'Rating 4', value: '4'},
                                    ]"
                                    @change="updateRatingFilter"
                                ></POptionList>
                            </template>
                        </PPopover>
                        <PPopover
                            id="popover_2"
                            :active="active2"
                            @close="() => {this.active2 = false;}"
                            preferred-alignment="right"
                        >
                            <template #activator>
                                <PButton @click="toggleRatingFilter2" :disclosure="active2 ? 'up' : 'down'">
                                    Status
                                </PButton>
                            </template>
                            <template #content>
                                <POptionList
                                    allowMultiple
                                    :selected="status"
                                    :options="[
                                        {label: 'Active', value: 'Active'},
                                        {label: 'Pending', value: 'Pending'},
                                        {label: 'Deleted', value: 'Deleted'},
                                    ]"
                                    @change="updateStatusFilter"
                                ></POptionList>
                            </template>
                        </PPopover>
                    </PButtonGroup>
                </template>
            </PDataTable>
        </PCard>`,
    methods: {
        toggleRatingFilter() {
            this.active1 = !this.active1;
            this.active2 = false;
        },
        toggleRatingFilter2() {
            this.active2 = !this.active2;
            this.active1 = false;
        },
        handleSearch(val) {
            alert('handle search ' + val);
            this.search = val;
        },
        handleSortChange(sort, direction) {
            this.sort = {value: sort, direction: direction};
            console.log(this.sort);
        },
        updateRatingFilter(selected) {
            this.selected = selected;
            console.log('selected rating', selected);
        },
        updateStatusFilter(selected) {
            this.status = selected;
            console.log('selected status', selected);
        },
        editItem(item) {
            alert('Edit: ' + item);
        },
        deleteItem(item) {
            alert('Delete: ' + item);
        },
    }
});

export const CustomisableRow = Template.bind({});

CustomisableRow.args = {
    resourceName: {singular: 'Product', plural: 'Products'},
    headings: [
        {
            content: 'Product',
            value: 'product',
            type: 'text',
            width: '30%'
        },
        {
            content: 'Price',
            value: 'price',
            type: 'numeric',
        },
        {
            content: 'SKU Number',
            value: 'sku',
            type: 'numeric',
        },
        {
            content: 'Net quantity',
            value: 'qty',
            type: 'numeric',
        },
        {
            content: 'Status',
            value: 'status',
            type: 'text',
            sortable: false,
        },
        {
            content: 'Actions',
            value: 'actions',
            type: 'text',
            sortable: false,
        },
    ],
    rows: [
        {
            product: 'Emerald Silk Gown',
            product_link: 'javascript:void(0);',
            price: '$875.00',
            sku: 124689,
            sku_status: 'critical',
            sku_progress: 'incomplete',
            qty: 140,
            status: true,
        },
        {
            product: 'Mauve Cashmere Scarf',
            product_link: "javascript:void(0);",
            price: '$230.00',
            sku: 124533,
            sku_status: 'warning',
            sku_progress: 'partiallyComplete',
            qty: 83,
            status: false,
        },
        {
            product: 'Navy Merino Wool Blazer with khaki chinos and yellow belt',
            product_link: "javascript:void(0);",
            price: '$445.00',
            sku: 124518,
            sku_status: 'success',
            sku_progress: 'complete',
            qty: 32,
            status: true,
        },
    ],
    totals: [
        '', '', '', 255, '', '',
    ],
    hasPagination: true,
    pagination: {
        hasPrevious: true,
        hasNext: true,
        onNext: () => {
            alert('Next');
        },
        onPrevious: () => {
            alert('Previous');
        }
    },
}

CustomisableRow.parameters = {
    docs: {
        source: {
            code: `
<PCard>
    <PDataTable
        :resourceName="{singular: 'Product', plural: 'Products'}"
        :headings="[
            {
                content: 'Product',
                value: 'product',
                type: 'text',
                width: '30%'
            },
            {
                content: 'Price',
                value: 'price',
                type: 'numeric',
            },
            {
                content: 'SKU Number',
                value: 'sku',
                type: 'numeric',
            },
            {
                content: 'Net quantity',
                value: 'qty',
                type: 'numeric',
            },
            {
                content: 'Status',
                value: 'status',
                type: 'text',
                sortable: false,
            },
            {
                content: 'Actions',
                value: 'actions',
                type: 'text',
                sortable: false,
            },
        ]"
        :rows="[
            {
                product: 'Emerald Silk Gown',
                product_link: 'javascript:void(0);',
                price: '$875.00',
                sku: 124689,
                sku_status: 'critical',
                sku_progress: 'incomplete',
                qty: 140,
                status: true,
            },
            {
                product: 'Mauve Cashmere Scarf',
                product_link: 'javascript:void(0);',
                price: '$230.00',
                sku: 124533,
                sku_status: 'warning',
                sku_progress: 'partiallyComplete',
                qty: 83,
                status: false,
            },
            {
                product: 'Navy Merino Wool Blazer with khaki chinos and yellow belt',
                product_link: 'javascript:void(0);',
                price: '$445.00',
                sku: 124518,
                sku_status: 'success',
                sku_progress: 'complete',
                qty: 32,
                status: true,
            },
        ]"
        :totals="[
            '', '', '', 255, '', '',
        ]"
        :hasPagination="true"
        :pagination="{
            hasPrevious: true,
            hasNext: true,
            onNext: () => {
                alert('Next');
            },
            onPrevious: () => {
                alert('Previous');
            }
        }"
    >    
        <template v-slot:item="{item}">
            <PDataTableRow>
                <PDataTableCol firstColumn>
                    <PLink :url="item.product_link">
                    {{item.product}}
                    </PLink>
                </PDataTableCol>
                <PDataTableCol numeric>{{item.price}}</PDataTableCol>
                <PDataTableCol numeric>
                    <PBadge :status="item.sku_status" :progress="item.sku_progress">
                    {{item.sku}}
                    </PBadge>
                </PDataTableCol>
                <PDataTableCol numeric>{{item.qty}}</PDataTableCol>
                <PDataTableCol>
                    <PToggle :checked="item.status"/>
                </PDataTableCol>
                <PDataTableCol>
                    <PStack>
                        <PStackItem>
                            <PIcon source="EditMinor"/>
                        </PStackItem>
                        <PStackItem>
                            <PIcon source="DeleteMinor" color="critical"/>
                        </PStackItem>
                    </PStack>
                </PDataTableCol>
            </PDataTableRow>
        </template>
        <template #filter>        
            <PButtonGroup segmented>
                <PPopover
                    id="popover_1"
                    :active="active"
                    preferred-alignment="right"
                    full-width
                >
                    <template #activator>
                        <PButton
                            :disclosure="active ? 'up' : 'down'">
                            Filter Options
                        </PButton>
                    </template>
                    <template #content>
                        <POptionList
                            allowMultiple
                            :selected="selected"
                            :options="[
                                {label: 'Rating 1 with a long text', value: '1'},
                                {label: 'Rating 2', value: '2'},
                                {label: 'Rating 3', value: '3'},
                                {label: 'Rating 4', value: '4'},
                            ]"
                        />
                    </template>
                </PPopover>
                <PPopover
                    id="popover_2"
                    :active="active2"
                    preferred-alignment="right"
                >
                    <template #activator>
                        <PButton :disclosure="active2 ? 'up' : 'down'">
                            Status
                        </PButton>
                    </template>
                    <template #content>
                        <POptionList
                            allowMultiple
                            :selected="status"
                            :options="[
                                {label: 'Active', value: 'Active'},
                                {label: 'Pending', value: 'Pending'},
                                {label: 'Deleted', value: 'Deleted'},
                            ]"
                        />
                    </template>
                </PPopover>
            </PButtonGroup>
        </template>
    </PDataTable>
</PCard>`
        }
    }
}

const Template1 = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PDataTable, PPopover, PButton, POptionList, PCard, PLink, PBadge, PToggle, PIcon, PStack, PStackItem,
        PButtonGroup
    },
    data() {
        return {
            active: false,
            active2: false,
            selected: [],
            status: ["Active"],
        };
    },
    template: `
        <PCard>
            <PDataTable
                v-bind="args"
                @sort-changed="handleSortChange"
                @input-filter-changed="handleSearch"
            >
                <template v-slot:item.product="{item}">
                    <PLink :url="item.product_link">
                        {{item.product}}
                    </PLink>
                </template>
                <template v-slot:item.sku="{item}">
                    <PBadge :status="item.sku_status" :progress="item.sku_progress">
                        {{item.sku}}
                    </PBadge>
                </template>
                <template v-slot:item.status="{item}">
                    <PToggle :checked="item.status"/>
                </template>
                <template v-slot:item.actions="{item}">
                    <PStack>
                        <PStackItem>
                            <PIcon source="EditMinor" @click="editItem(item.product)"/>
                        </PStackItem>
                        <PStackItem>
                            <PIcon source="DeleteMinor" color="critical" @click="deleteItem(item.product)"/>
                        </PStackItem>
                    </PStack>
                </template>

                <template #filter>
                    <PButtonGroup segmented>
                        <PPopover
                            id="popover_1"
                            :active="active"
                            preferred-alignment="right"
                            @close="() => {this.active = false;}"
                            full-width
                        >
                            <template #activator>
                                <PButton @click="toggleRatingFilter"
                                         :disclosure="active ? 'up' : 'down'">
                                    Filter Options
                                </PButton>
                            </template>
                            <template #content>
                                <POptionList
                                    allowMultiple
                                    :selected="selected"
                                    :options="[
                                        {label: 'Rating 1 with a long text', value: '1'},
                                        {label: 'Rating 2', value: '2'},
                                        {label: 'Rating 3', value: '3'},
                                        {label: 'Rating 4', value: '4'},
                                    ]"
                                    @change="updateRatingFilter"
                                />
                            </template>
                        </PPopover>
                        <PPopover
                            id="popover_2"
                            :active="active2"
                            @close="() => {this.active2 = false;}"
                            preferred-alignment="right"
                        >
                            <template #activator>
                                <PButton @click="toggleRatingFilter2" :disclosure="active2 ? 'up' : 'down'">
                                    Status
                                </PButton>
                            </template>
                            <template #content>
                                <POptionList
                                    allowMultiple
                                    :selected="status"
                                    :options="[
                                        {label: 'Active', value: 'Active'},
                                        {label: 'Pending', value: 'Pending'},
                                        {label: 'Deleted', value: 'Deleted'},
                                    ]"
                                    @change="updateStatusFilter"
                                />
                            </template>
                        </PPopover>
                    </PButtonGroup>
                </template>
            </PDataTable>
        </PCard>`,
    methods: {
        toggleRatingFilter() {
            this.active = !this.active;
            this.active2 = false;
        },
        toggleRatingFilter2() {
            this.active2 = !this.active2;
            this.active = false;
        },
        handleSearch(val) {
            alert('handle search ' + val);
            this.search = val;
        },
        handleSortChange(sort, direction) {
            this.sort = {value: sort, direction: direction};
            console.log(this.sort);
        },
        updateRatingFilter(selected) {
            this.selected = selected;
            console.log('selected rating', selected);
        },
        updateStatusFilter(selected) {
            this.status = selected;
            console.log('selected status', selected);
        },
        editItem(item) {
            alert('Edit: ' + item);
        },
        deleteItem(item) {
            alert('Delete: ' + item);
        },
    }
});

export const CustomisableColumn = Template1.bind({});

CustomisableColumn.args = {
    resourceName: {singular: 'Product', plural: 'Products'},
    headings: [
        {
            content: 'Product',
            value: 'product',
            type: 'text',
            width: '30%'
        },
        {
            content: 'Price',
            value: 'price',
            type: 'numeric',
        },
        {
            content: 'SKU Number',
            value: 'sku',
            type: 'numeric',
        },
        {
            content: 'Net quantity',
            value: 'qty',
            type: 'numeric',
        },
        {
            content: 'Status',
            value: 'status',
            type: 'text',
            sortable: false,
        },
        {
            content: 'Actions',
            value: 'actions',
            type: 'text',
            sortable: false,
        },
    ],
    rows: [
        {
            product: 'Emerald Silk Gown',
            product_link: 'javascript:void(0);',
            price: '$875.00',
            sku: 124689,
            sku_status: 'critical',
            sku_progress: 'incomplete',
            qty: 140,
            status: true,
        },
        {
            product: 'Mauve Cashmere Scarf',
            product_link: "javascript:void(0);",
            price: '$230.00',
            sku: 124533,
            sku_status: 'warning',
            sku_progress: 'partiallyComplete',
            qty: 83,
            status: false,
        },
        {
            product: 'Navy Merino Wool Blazer with khaki chinos and yellow belt',
            product_link: "javascript:void(0);",
            price: '$445.00',
            sku: 124518,
            sku_status: 'success',
            sku_progress: 'complete',
            qty: 32,
            status: true,
        },
    ],
    totals: [
        '', '', '', 255, '', '',
    ],
    hasPagination: true,
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
<PCard>
    <PDataTable
        :resourceName="{singular: 'Product', plural: 'Products'}"
        :headings="[
            {
                content: 'Product',
                value: 'product',
                type: 'text',
                width: '30%'
            },
            {
                content: 'Price',
                value: 'price',
                type: 'numeric',
            },
            {
                content: 'SKU Number',
                value: 'sku',
                type: 'numeric',
            },
            {
                content: 'Net quantity',
                value: 'qty',
                type: 'numeric',
            },
            {
                content: 'Status',
                value: 'status',
                type: 'text',
                sortable: false,
            },
            {
                content: 'Actions',
                value: 'actions',
                type: 'text',
                sortable: false,
            },
        ]"
        :rows="[
            {
                product: 'Emerald Silk Gown',
                product_link: 'javascript:void(0);',
                price: '$875.00',
                sku: 124689,
                sku_status: 'critical',
                sku_progress: 'incomplete',
                qty: 140,
                status: true,
            },
            {
                product: 'Mauve Cashmere Scarf',
                product_link: 'javascript:void(0);',
                price: '$230.00',
                sku: 124533,
                sku_status: 'warning',
                sku_progress: 'partiallyComplete',
                qty: 83,
                status: false,
            },
            {
                product: 'Navy Merino Wool Blazer with khaki chinos and yellow belt',
                product_link: 'javascript:void(0);',
                price: '$445.00',
                sku: 124518,
                sku_status: 'success',
                sku_progress: 'complete',
                qty: 32,
                status: true,
            },
        ]"
        :totals="[
            '', '', '', 255, '', '',
        ]"
        :hasPagination="true"
        :pagination="{
            hasPrevious: true,
            hasNext: true,
            onNext: () => {
                alert('Next');
            },
            onPrevious: () => {
                alert('Previous');
            }
        }"
    >    
        <template v-slot:item.product="{item}">
            <PLink :url="item.product_link">
                {{item.product}}
            </PLink>
        </template>
        <template v-slot:item.sku="{item}">
            <PBadge :status="item.sku_status" :progress="item.sku_progress">
                {{item.sku}}
            </PBadge>
        </template>
        <template v-slot:item.status="{item}">
            <PToggle :checked="item.status"/>
        </template>
        <template v-slot:item.actions="{item}">
            <PStack>
                <PStackItem>
                    <PIcon source="EditMinor"/>
                </PStackItem>
                <PStackItem>
                    <PIcon source="DeleteMinor" color="critical"/>
                </PStackItem>
            </PStack>
        </template>
    
        <template #filter>
            <PButtonGroup segmented>
                <PPopover
                    id="popover_1"
                    :active="active"
                    preferred-alignment="right"
                    full-width
                >
                    <template #activator>
                        <PButton
                            :disclosure="active ? 'up' : 'down'">
                            Filter Options
                        </PButton>
                    </template>
                    <template #content>
                        <POptionList
                            allowMultiple
                            :selected="selected"
                            :options="[
                                {label: 'Rating 1 with a long text', value: '1'},
                                {label: 'Rating 2', value: '2'},
                                {label: 'Rating 3', value: '3'},
                                {label: 'Rating 4', value: '4'},
                            ]"
                        />
                    </template>
                </PPopover>
                <PPopover
                    id="popover_2"
                    :active="active2"
                    preferred-alignment="right"
                >
                    <template #activator>
                        <PButton :disclosure="active2 ? 'up' : 'down'">
                            Status
                        </PButton>
                    </template>
                    <template #content>
                        <POptionList
                            allowMultiple
                            :selected="status"
                            :options="[
                                {label: 'Active', value: 'Active'},
                                {label: 'Pending', value: 'Pending'},
                                {label: 'Deleted', value: 'Deleted'},
                            ]"
                        />
                    </template>
                </PPopover>
            </PButtonGroup>
        </template>
    </PDataTable>
</PCard>`
        },
    },
}
