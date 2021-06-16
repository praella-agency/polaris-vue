import { PCard, PCardSection } from "../PCard";
import PResourceListItem from "./components/PResourceListItem";
import PResourceList from "./PResourceList";
import {PPopover} from "../PPopover";
import PButton from "../PButton/PButton.vue";
import {POptionList} from "../POptionList";
import {PBadge} from "../PBadge";
import {PPagination} from "../PPagination";
import {PStack} from "../PStack";

export default {
    title: 'Example/PResourceList',
    component: PResourceList,
    parameters: {
        docs: {
            source: {
                type: 'dynamic',
            }
        }
    }
}

let statusFilterActivate = false;
const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {PResourceList, PCard, PPopover, PButton, POptionList, PResourceListItem, PBadge, PPagination,
        PCardSection, PStack},
    template: '<PCard><PResourceList v-bind="$props" @change="toggleSelected">' +
            '<template slot="filter">' +
                '<PPopover v-bind="$props" @close="statusFilterActive">' +
                    '<PButton slot="activator" v-bind="$props" @click.stop="toggleStatusButton">' +
                        'Status' +
                    '</PButton>' +
                    '<POptionList slot="content" ' +
                        ':options="[\n' +
                        '{label: \'Active\', value: 1},\n' +
                        '{label: \'In-Active\', value: 0},\n' +
                        ']" ' +
                        ':selected="[]">' +
                    '</POptionList>' +
                '</PPopover>' +
            '</template>' +
            '<template v-slot:default="{selectable}">' +
                '<PResourceListItem ' +
                'v-for="(item, key) in items" :id="item.id" :key="key" :selectable="selectable"' +
                '>' +
                    '<div class="resource-list-item">' +
                        '<div class="resource-list-item__book--name">' +
                            '<p>{{item.name}}</p>' +
                        '</div>' +
                        '<div class="resource-list-item__resource--status">' +
                            '<PBadge v-if="item.status === true" status="success">Published</PBadge>' +
                            '<PBadge v-if="item.status === null" status="warning">Pending</PBadge>' +
                            '<PBadge v-if="item.status === false" status="critical">Archived</PBadge>' +
                        '</div>' +
                    '</div>' +
                '</PResourceListItem>' +
            '</template>' +
        '</PResourceList>' +
        '<PCardSection>' +
            '<PStack v-if="pagination.hasPrevious || pagination.hasNext" distribution="center" >' +
                '<PPagination v-bind="pagination" />' +
            '</PStack>' +
        '</PCardSection></PCard>',
    methods: {
        toggleSelected(item) {
            this.selected = item.selected ? this.items.map(book => book.id) : [];
            this.selectedAll = item.selectedMore;
            console.log(this.selected, this.selectedAll);
        },
        statusFilterActive() {
            statusFilterActivate = false;
        },
        toggleStatusButton() {
            statusFilterActivate = !statusFilterActivate;
        }
    },
});

export const Default = Template.bind({});
let selected = [];

let pagination = {
    total: 12,
    hasPrevious: false,
    hasNext: true,
};

Default.args = {
    selectable: true,
    resourceName: {singular: 'Book', plurals: 'Books'},
    hasMore: pagination.hasPrevious || pagination.hasNext,
    totalCount: pagination.total,
    selected: selected,
    selectedAll: false,
    bulkActions: [
        {content: 'Publish', onAction: 'toggleStatusToPublished'},
        {content: 'Unpublish', onAction: 'toggleStatusToUnpublished'},
        {content: 'Archive', onAction: 'toggleStatusToArchived'},
        {content: 'Delete', onAction: 'deleteSelected'},
    ],
    items: [
        {
            id: 100,
            name: 'PHP',
            status: true,
        },
        {
            id: 200,
            name: 'Vue',
            status: null,
        },
        {
            id: 300,
            name: 'React',
            status: false,
        },
        {
            id: 400,
            name: 'Python',
            status: false,
        },
        {
            id: 500,
            name: 'Node',
            status: true,
        },
        {
            id: 600,
            name: 'Shopify',
            status: false,
        },
        {
            id: 700,
            name: 'Ruby',
            status: null,
        },
        {
            id: 800,
            name: 'Laravel',
            status: null,
        },
        {
            id: 900,
            name: 'Javascript',
            status: true,
        },
        {
            id: 1000,
            name: 'Angular',
            status: true,
        },
    ],
    statusFilterActivate: false,
    active: false,
    fullWidth: true,
    preferredPosition: "mostSpace",
    preferredAlignment: "right",
    disclosure: "down",
    pagination: {
        total: 12,
        hasPrevious: false,
        hasNext: true,
    },
}

Default.parameters = {

}
