import PDataTableNew from './PDataTableNew.vue';
import { PPopover } from '../PPopover';
import { PButton } from '../PButton';
import { POptionList } from '../POptionList';
import { PCard } from '../PCard';

export default {
    title: 'Lists & Tables / Data Table New',
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
        body: {
            table: {
                disable: true,
            },
        },
        emptyState: {
            table: {
                disable: true,
            },
        },
        filter: {
            table: {
                disable: true,
            },
        },
        head: {
            table: {
                disable: true,
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

        };
    },
    template: `
      <PCard sectioned>
          <PDataTableNew
            v-bind="$props"
            :column-content-types="[]"
          >
          </PDataTableNew>
      </PCard>`,
    methods: {}
});

export const DataTableNew = Template.bind({});

DataTableNew.args = {
    headings: [{
        content: 'Product',
        value: 'product',
        type: 'text',
        sortable: true,
        width: '30%'
    }, {
        content: 'Price',
        value: 'price',
        type: 'numeric',
        sortable: true,
    }, {
        content: 'SKU Number',
        value: 'sku',
        type: 'numeric',
        sortable: true,
    }, {
        content: 'Net quantity',
        value: 'qty',
        type: 'numeric',
        sortable: true,
    }, {
        content: 'Status',
        value: 'status',
        type: 'string',
        sortable: false,
    }],
    rows: [
        {
            product: 'Apple',
            price: 78,
            sku: 'well',
            qty: 12,
            status: 0,
        },
        {
            product: 'Google',
            price: 78,
            sku: 'well',
            qty: 12,
            status: 0,
        },
    ],
}
