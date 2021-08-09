import PDataTableNew from './PDataTableNew.vue';
import { PDataTableRow } from '../PDataTable/components/';
import { PDataTableCol } from '../PDataTable/components/components';
import { PPopover } from '../PPopover';
import { PButton } from '../PButton';
import { PLink } from '../PLink';
import { PBadge } from '../PBadge';
import { PIcon } from '../PIcon';
import { PToggle } from '../PToggle';
import { POptionList } from '../POptionList';
import { PCard } from '../PCard';
import { PStack, PStackItem } from '../PStack';

export default {
    title: 'Lists & Tables / Data Table New / Slot ',
    component: PDataTableNew,
    argTypes: {
        verticalAlign: {
            options: ['top', 'bottom', 'middle', 'baseline'],
            control: {
                type: 'select',
            }
        },
        defaultSortDirection: {
            options: ['ascending', 'descending', 'none'],
            control: {
                type: 'select',
                labels: {
                    'none': 'Default',
                },
            }
        },
        default: {
            name: 'item.<header-value>',
        },
    },
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PDataTableNew, PPopover, PButton, POptionList, PCard, PLink, PBadge, PToggle, PIcon, PStack, PStackItem,
        PDataTableRow, PDataTableCol,
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
      <PCard sectioned>
        <PDataTableNew
            v-bind="$props"
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

          <template slot="filter">
            <PPopover
                id="popover_1"
                :active="active"
                preferred-alignment="right"
                @close="toggleRatingFilter"
                full-width
            >
              <PButton slot="activator" @click="() => {this.active = !this.active}"
                       :disclosure="active ? 'up' : 'down'">
                Filter Options
              </PButton>
              <POptionList
                  slot="content"
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
            </PPopover>
            <PPopover
                id="popover_2"
                :active="active2"
                @close="toggleRatingFilter2"
                preferred-alignment="right"
            >
              <PButton slot="activator" @click="toggleRatingFilter2" :disclosure="active2 ? 'up' : 'down'">Status
              </PButton>
              <POptionList
                  slot="content"
                  allowMultiple
                  :selected="status"
                  :options="[
                          {label: 'Active', value: 'Active'},
                          {label: 'Pending', value: 'Pending'},
                          {label: 'Deleted', value: 'Deleted'},
                      ]"
                  @change="updateStatusFilter"
              ></POptionList>
            </PPopover>
          </template>
        </PDataTableNew>
      </PCard>`,
    methods: {
        toggleRatingFilter() {
            this.active = !this.active;
        },
        toggleRatingFilter2() {
            this.active2 = !this.active2;
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

export const RowSlot = Template.bind({});

RowSlot.args = {
    resourceName: {singular: 'Product', plural: 'Products'},
    columnContentTypes: [],
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
        '', '', '', 441, '', '',
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

const Template1 = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PDataTableNew, PPopover, PButton, POptionList, PCard, PLink, PBadge, PToggle, PIcon, PStack, PStackItem,
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
      <PCard sectioned>
        <PDataTableNew
            v-bind="$props"
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

          <template slot="filter">
            <PPopover
                id="popover_1"
                :active="active"
                preferred-alignment="right"
                @close="toggleRatingFilter"
                full-width
            >
              <PButton slot="activator" @click="() => {this.active = !this.active}"
                       :disclosure="active ? 'up' : 'down'">
                Filter Options
              </PButton>
              <POptionList
                  slot="content"
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
            </PPopover>
            <PPopover
                id="popover_2"
                :active="active2"
                @close="toggleRatingFilter2"
                preferred-alignment="right"
            >
              <PButton slot="activator" @click="toggleRatingFilter2" :disclosure="active2 ? 'up' : 'down'">Status
              </PButton>
              <POptionList
                  slot="content"
                  allowMultiple
                  :selected="status"
                  :options="[
                          {label: 'Active', value: 'Active'},
                          {label: 'Pending', value: 'Pending'},
                          {label: 'Deleted', value: 'Deleted'},
                      ]"
                  @change="updateStatusFilter"
              ></POptionList>
            </PPopover>
          </template>
        </PDataTableNew>
      </PCard>`,
    methods: {
        toggleRatingFilter() {
            this.active = !this.active;
        },
        toggleRatingFilter2() {
            this.active2 = !this.active2;
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

export const ColumnSlot = Template1.bind({});

ColumnSlot.args = {
    resourceName: {singular: 'Product', plural: 'Products'},
    columnContentTypes: [],
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
        '', '', '', 441, '', '',
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
