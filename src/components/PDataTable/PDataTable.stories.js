import PDataTableNew from './PDataTable.vue';
import { PPopover } from '../PPopover';
import { PButton } from '../PButton';
import { POptionList } from '../POptionList';
import { PCard } from '../PCard';

export default {
    title: 'Lists & Tables / Data Table',
    component: PDataTableNew,
    argTypes: {
        verticalAlign: {
            options: ['top', 'bottom', 'middle', 'baseline'],
            control: {
                type: 'select',
            },
        },
        defaultSortDirection: {
            options: ['ascending', 'descending', 'none'],
            control: {
                type: 'select',
                labels: {
                    'none': 'Default',
                },
            },
        },
        footerContent: {
            control: {
                type: 'text',
            },
        },
        default: {
            name: 'item.<heading-value>',
        },
        actions: {
            table: {
                defaultValue: {
                    summary: '[]',
                    detail: `
[{
    /** stringVisually hidden text for screen readers */
    accessibilityLabel?: string,
    /** stringContent the action displays */
    content?: string,
    /** booleanWhether or not the action is disabled */
    disabled?: boolean,
    /** booleanForces url to open in a new tab */
    external?: boolean,
    /** stringA unique identifier for the action */
    id?: string,
    /** stringA destination to link to, rendered in the action */
    url?: string,
    /** Destructive action */
    destructive?: boolean,
    /** Icon support */
    icon?: string,
    /** Spinner for the element */
    loading?: boolean,
    /** voidCallback when an action takes place */
    onAction()?: void,
}]`,
                },
            },
        },
        columnContentTypes: {
            table: {
                defaultValue: {
                    summary: '[]',
                    detail: `
Array of type: ("text" | "numeric")[]

text
type: "text"
numeric
type: "numeric"`,
                },
            },
        },
        headings: {
            table: {
                defaultValue: {
                    summary: '[]',
                    detail: `
[{
    /** Header title */
    content: string,
    /** Header value */
    value: string,
    /** Value type */
    type: string,
    /** Sortable values. @default true */
    sortable?: boolean,
    /** Header Column width */
    width?: string,
}]`,
                },
            },
        },
        ids: {
            table: {
                defaultValue: {
                    summary: '[]',
                    detail: `
/** Contains numeric value */
[1, 2, 3, ...]`,
                },
            },
        },
        pagination: {
            table: {
                defaultValue: {
                    summary: '{}',
                    detail: `{
    nextURL?: string,
    previousURL?: string,
    hasNext?: boolean,
    hasPrevious?: boolean,
    accessibilityLabel?: string,
    onNext?(): void,
    onPrevious?(): void,
}`
                },
            },
        },
        rows: {
            table: {
                defaultValue: {
                    summary: '[]',
                    detail: `[{
    headingValue: 'value',
}]`,
                },
            },
        },
        sort: {
            table: {
                defaultValue: {
                    summary: '{}',
                    detail: `{
    value: string,
    direction: 'ascending' | 'descending' | 'none',
}`,
                },
            },
        },
        totals: {
            table: {
                defaultValue: {
                    summary: '[]',
                    detail: `
Array of type: ("text" | "numeric")[]

text
type: "text"
numeric
type: "numeric"
`,
                },
            },
        },
        totalsName: {
            table: {
                defaultValue: {
                    summary: '{}',
                    detail: `{
    /** Singular label */
    singular: string;
    /** Plural label */
    plural: string;
}`
                },
            },
        },
    },
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PDataTableNew, PPopover, PButton, POptionList, PCard
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
            footer-content="Showing 3 of 3"
            @sort-changed="handleSortChange"
            @input-filter-changed="handleSearch"
        />
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

export const Default = Template.bind({});

Default.args = {
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
            content: 'Net sales',
            value: 'netSales',
            type: 'numeric',
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
            netSales: '$121,500.00',
        },
        {
            product: 'Mauve Cashmere Scarf',
            product_link: "javascript:void(0);",
            price: '$230.00',
            sku: 124533,
            sku_status: 'warning',
            sku_progress: 'partiallyComplete',
            qty: 83,
            netSales: '$19,090.00',
        },
        {
            product: 'Navy Merino Wool Blazer with khaki chinos and yellow belt',
            product_link: "javascript:void(0);",
            price: '$445.00',
            sku: 124518,
            sku_status: 'success',
            sku_progress: 'complete',
            qty: 32,
            netSales: '$14,240.00',
        },
    ],
    totals: [
        '', '', '', 255, '$155,830.00',
    ],
}
