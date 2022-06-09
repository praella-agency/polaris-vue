import { PResourceList } from './index';
import { PResourceListItem } from './components/PResourceListItem';
import { PCard } from '../PCard';
import { PCardSection } from '../PCard/components/PCardSection';
import { PCardHeader } from '../PCard/components/PCardHeader';
import { PPopover } from '../PPopover';
import { PButton } from '../PButton';
import { PAvatar } from '../PAvatar';
import { PBadge } from '../PBadge';
import { PTextStyle } from '../PTextStyle';
import { PPagination } from '../PPagination';
import { PStack } from '../PStack';
import { PStackItem } from '../PStack/components/PStackItem';
import { PTextField } from '../PTextField';
import { PButtonGroup } from '../PButtonGroup';

export default {
    title: 'Lists & Tables / Resource List',
    component: PResourceList,
    argTypes: {
        selected: {
            control: {
                type: null,
            },
            table: {
                defaultValue: {
                    summary: '[]',
                },
            },
        },
        default: {
            table: {
                type: {
                    summary: null,
                },
            },
            control: {
                type: null,
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
        change: {
            table: {
                defaultValue: {
                    summary: '()',
                    detail: '(items)',
                },
            },
            control: {
                type: null,
            },
        },
        'filter-removed': {
            table: {
                defaultValue: {
                    summary: '()',
                    detail: '(tag)',
                },
            },
            control: {
                type: null,
            },
        },
        'input-filter-changed': {
            table: {
                defaultValue: {
                    summary: '()',
                    detail: '(value)',
                },
            },
            control: {
                type: null,
            },
        },
        'select-mode': {
            table: {
                defaultValue: {
                    summary: '()',
                    detail: '(selectionMode)',
                },
            },
            control: {
                type: null,
            },
        },
        emptySearchState: {
            table: {
                type: {
                    summary: null,
                },
            },
            control: {
                type: null,
            },
        },
        filter: {
            table: {
                type: {
                    summary: null,
                },
            },
            control: {
                type: null,
            },
        },
    },
}

const Template = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PResourceList, PCard, PPopover, PButton, PResourceListItem, PBadge, PPagination, PButtonGroup,
        PCardSection, PCardHeader, PStack, PStackItem, PTextField, PAvatar, PTextStyle
    },
    data() {
        return {
            ...args,
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
                v-bind="args"
                :selectable="selectable"
                :hasMore="hasMore"
                :totalCount="pagination.total"
                :selected="selectedItems"
                :appliedFilters="[
                    { value: 'Tagged with ' + this.taggedValue, key: 'tag_' + this.taggedValue},
                ]"
                @filter-removed="removeTag"
                @change="toggleSelected"
                @sort-change="handleSortChange"
                @select-mode="handleSelectMode"
            >
                <template #filter>
                    <PButtonGroup segmented>
                        <PPopover
                            id="resource_list_popover"
                            @close="() => {this.statusFilterActive = false;}"
                            :active="statusFilterActive"
                            full-width
                            preferredPosition="mostSpace"
                            preferredAlignment="right"
                        >
                            <template #activator>
                                <PButton
                                    :disclosure="statusFilterActive ? 'up' : 'down'"
                                    @click.stop="statusFilterActive = !statusFilterActive"
                                >
                                    Status
                                </PButton>
                            </template>
                            <template #content>
                                <PCard @change="updateStatusFilter">
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
                            </template>
                        </PPopover>
                        <PButton @click="handleButtonClick">
                            Save
                        </PButton>
                    </PButtonGroup>
                </template>
                <template #default v-slot="args">
                    <PResourceListItem
                        v-for="(item, key) in items"
                        :key="key"
                        :id="item.id"
                        :checked="selectedItems.indexOf(item.id) >= 0"
                        :selectable="args.selectable"
                        :selectMode="selectModeStatus"
                        :loading="args.loading"
                        persistActions
                        :shortcutActions="[
                            {
                              content: 'View latest order',
                              onAction: () => {},
                            }
                        ]"
                        @change="updateSelected"
                    >
                        <template #media>
                            <PAvatar customer size="medium" :name="item.name"/>
                        </template>
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
            this.selectedAllItems = item.selectedAll;
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

ResourceList.parameters= {
    docs: {
        source: {
            code: `
<PResourceList>
    <template>
        <PButtonGroup segmented>
            <PPopover>
                <template>
                    <PButton>Status</PButton>
                </template>
                <template>
                    <PCard>
                        <PCardSection>
                            <PStack>
                                <PStackItem>
                                    <PTextField/>
                                </PStackItem>
                                <PStackItem>
                                    <PButton>Clear</PButton>
                                </PStackItem>
                            </PStack>
                        </PCardSection>
                    </PCard>
                </template>
            </PPopover>
            <PButton>Save</PButton>
        </PButtonGroup>
    </template>
    <template>
         <PResourceListItem>
             <template>
                 <PAvatar/>
             </template>
             <div>
                 <div>
                     <p>Javascript</p>
                 </div>
                 <div>
                     <h3>
                         <PTextStyle>Published</PTextStyle>
                         <PTextStyle>Pending</PTextStyle>
                         <PTextStyle>Archived</PTextStyle>
                     </h3>
                 </div>
             </div>
         </PResourceListItem>
    </template>
</PResourceList>`
        },
    },
};
