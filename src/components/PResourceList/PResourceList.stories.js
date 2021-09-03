import { PCard, PCardHeader, PCardSection } from '../PCard';
import PResourceListItem from './components/PResourceListItem';
import PResourceList from './PResourceList';
import { PPopover } from '../PPopover';
import PButton from '../PButton/PButton.vue';
import { PAvatar } from '../PAvatar';
import { PBadge } from '../PBadge';
import { PTextStyle } from '../PTextStyle';
import { PPagination } from '../PPagination';
import { PStack, PStackItem } from '../PStack';
import { PTextField } from '../PTextField';

export default {
    title: 'Lists & Tables / Resource List',
    component: PResourceList,
    argTypes: {
        selected: {
            control: {
                type: null,
            },
        },
        default: {
            table: {
                disable: true,
            },
        },
        bulkActions: {
            table: {
                defaultValue: {
                    summary: '[]',
                    detail: `[{
    content: string,
    onAction: void,
}]`,
                },
            },
        },
        promotedBulkActions: {
            table: {
                defaultValue: {
                    summary: '[]',
                    detail: `[{
    content: string,
    onAction: void,
}]`,
                },
            },
        },
        resourceName: {
            table: {
                defaultValue: {
                    summary: '{}',
                    detail: `{
    singular: string,
    plural: string,
}`,
                },
            },
        },
        sortOptions: {
            table: {
                defaultValue: {
                    summary: '[]',
                    detail: `[{
    label: string,
    value: string,
    disabled?: boolean,
    hidden?: boolean,
}]`,
                },
            },
        },
    },
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PResourceList, PCard, PPopover, PButton, PResourceListItem, PBadge, PPagination,
        PCardSection, PCardHeader, PStack, PStackItem, PTextField, PAvatar, PTextStyle
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
            ],
            taggedValue: 'Vue',
            selectModeStatus: false,
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
              v-bind="$props"
              :appliedFilters="[
                { value: 'Tagged with ' + this.taggedValue, key: 'tag_' + this.taggedValue},
              ]"
              @filter-removed="removeTag"
              @change="toggleSelected"
              @sort-change="handleSortChange"
              @select-mode="handleSelectMode"
          >
            <template slot="filter">
              <PPopover
                  id="resource_list_popover"
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
                <PCard slot="content" @change="updateStatusFilter">
                  <PCardSection>
                    <PStack vertical spacing="tight">
                      <PStackItem>
                        <PTextField
                            label="Tagged with"
                            v-model="taggedValue"
                            labelHidden
                        />
                      </PStackItem>
                      <PStackItem>
                        <PButton plain @click="removeTag">
                          Clear
                        </PButton>
                      </PStackItem>
                    </PStack>
                  </PCardSection>
                </PCard>
              </PPopover>
              <PButton @click="handleButtonClick">
                Save
              </PButton>
            </template>
            <template v-bind="{selectable}">
              <PResourceListItem
                  v-for="(item, key) in items"
                  :key="key"
                  :id="item.id"
                  :checked="selectedItems.indexOf(item.id) >= 0"
                  :selectable="selectable"
                  :selectMode="selectModeStatus"
                  :loading="loading"
                  persistActions
                  :shortcutActions="[
                      {
                          content: 'View latest order',
                          onAction: () => {},
                      }
                  ]"
                  @change="updateSelected"
              >
                <PAvatar slot="media" customer size="medium" :name="item.name" />
                <div class="resource-list-item">
                  <div class="resource-list-item__book--name">
                    <p>{{ item.name }}</p>
                  </div>
                  <div class="resource-list-item__resource--status">
                      <h3>
                          <PTextStyle v-if="item.status === true" variation="positive">Published</PTextStyle>
                          <PTextStyle v-if="item.status === null" variation="subdued">Pending</PTextStyle>
                          <PTextStyle v-if="item.status === false" variation="negative">Archived</PTextStyle>
                      </h3>
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
        removeTag(tag) {
            alert('Removed:- ' + tag);
        },
        handleButtonClick() {
            console.log('Saved');
        },
        handleSortChange(value) {
            console.log('Sorting value:- ' + value);
        },
        handleSelectMode(selectMode) {
            this.selectModeStatus = selectMode;
        },
    },
});

export const ResourceList = Template.bind({});

ResourceList.args = {
    selectable: true,
    resourceName: {singular: 'Book', plural: 'Books'},
    hasMore: true,
    loading: false,
    sortOptions: [
        {label: 'Newest update', value: 'DATE_MODIFIED_DESC', disabled: false,},
        {label: 'Oldest update', value: 'DATE_MODIFIED_ASC', disabled: false},
    ],
    promotedBulkActions: [
        {
            content: 'Edit customers',
            onAction: () => {
                console.log('Edit Customer');
            },
        }
    ],
    bulkActions: [
        {
            content: 'Publish',
            onAction: () => {
                alert('Publish');
            }
        },
        {
            content: 'Unpublish',
            onAction: () => {
                alert('Unpublish');
            }
        },
        {
            content: 'Archive',
            onAction: () => {
                alert('Archived');
            }
        },
        {
            content: 'Delete',
            onAction: () => {
                alert('Deleted');
            }
        },
    ],
}
