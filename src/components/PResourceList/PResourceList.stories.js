import { PCard, PCardSection } from '../PCard';
import PResourceListItem from './components/PResourceListItem';
import PResourceList from './PResourceList';
import { PPopover } from '../PPopover';
import PButton from '../PButton/PButton.vue';
import { POptionList } from '../POptionList';
import { PBadge } from '../PBadge';
import { PPagination } from '../PPagination';
import { PStack } from '../PStack';

export default {
    title: 'Lists & Tables / Resource List',
    component: PResourceList,
    argTypes: {
        selected: {
            control: {
                type: 'none'
            }
        }
    }
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PResourceList, PCard, PPopover, PButton, POptionList, PResourceListItem, PBadge, PPagination,
        PCardSection, PStack
    },
    data() {
        return {
            selectedItems: [],
            selectedAllItems: false,
            statusFilterActive: false,
            status: [],
            pagination: {
                total: 12,
                hasPrevious: true,
                hasNext: true,
                onNext: () => {
                    alert('Next');
                },
                onPrevious: () => {
                    alert('Previous');
                }
            },
            queryParams: {
                page: null,
                search: null,
                statuses: [],
                id: null,
            },
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
            ]
        };
    },
    template: `
      <PCard>
          <PResourceList
              :selectable="selectable"
              :hasMore="hasMore"
              :totalCount="pagination.total"
              :selected="selectedItems"
              :resourceName="resourceName"
              :loading="loading"
              :bulkActions="[
                    {content: 'Publish', onAction: 'toggleStatusToPublished'},
                    {content: 'Unpublish', onAction: 'toggleStatusToUnpublished'},
                    {content: 'Archive', onAction: 'toggleStatusToArchived'},
                    {content: 'Delete', onAction: 'deleteSelected'},
                ]"
              @change="toggleSelected"
          >
            <template slot="filter">
              <PPopover
                  @close="statusFilterActive = false"
                  :active="statusFilterActive"
                  full-width
                  preferredPosition="mostSpace"
                  preferredAlignment="right"
              >
                <PButton
                    slot="activator"
                    :disclosure="statusFilterActive ? 'up' : 'down'"
                    @click.stop="statusFilterActive = !statusFilterActive"
                >
                  Status
                </PButton>
                <POptionList
                    slot="content"
                    :options="[
                          {label: 'Active', value: 1},
                          {label: 'In-Active', value: 0},
                        ]"
                    :selected="status"
                    @change="updateStatusFilter"
                ></POptionList>
              </PPopover>
            </template>
            <template v-slot:default="{selectable}">
              <PResourceListItem
                  v-for="(item, key) in items"
                  :key="key"
                  :id="item.id"
                  :checked="selectedItems.indexOf(item.id) >= 0"
                  @change="updateSelected"
                  :selectable="selectable"
              >
                <div class="resource-list-item">
                  <div class="resource-list-item__book--name">
                    <p>{{ item.name }}</p>
                  </div>
                  <div class="resource-list-item__resource--status">
                    <PBadge v-if="item.status === true" status="success">Published</PBadge>
                    <PBadge v-if="item.status === null" status="warning">Pending</PBadge>
                    <PBadge v-if="item.status === false" status="critical">Archived</PBadge>
                  </div>
                </div>
              </PResourceListItem>
            </template>
          </PResourceList>
    
          <PCardSection>
            <PStack v-if="pagination.hasPrevious || pagination.hasNext" distribution="center">
              <PPagination v-bind="pagination"/>
            </PStack>
          </PCardSection>
      </PCard>`,
    methods: {
        toggleSelected(item) {
            this.selectedItems = item.selected ? this.items.map(book => book.id) : [];
            this.selectedAllItems = item.selectedMore;
            console.log(this.selectedItems, this.selectedAllItems);
        },
        updateSelected(id, checked) {
            if (checked) this.selectedItems.push(id);
            if (!checked) this.selectedItems.splice(this.selectedItems.indexOf(id), 1);
        },
        toggleStatusFilter() {
            this.statusFilterActive = !this.statusFilterActive;
        },
        updateStatusFilter(selected) {
            this.queryParams.statuses = selected;
            this.toggleStatusFilter();

        },
        onPrevious() {
            this.queryParams.page--;
        },
        onNext() {
            this.queryParams.page++;
        },
    },
});

export const ResourceList = Template.bind({});

ResourceList.args = {
    selectable: true,
    resourceName: {singular: 'Book', plural: 'Books'},
    hasMore: true,
    loading: false,
}
