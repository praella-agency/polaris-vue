PResourceList example:

```vue
<template>
  <PCard>
    <PResourceList
        loading
        selectable
        :hasMore="pagination.hasPrevious || pagination.hasNext"
        :totalCount="pagination.total"
        :selected="selected"
        :resourceName="{singular: 'Book', plural: 'Books'}"
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
            :checked="selected.indexOf(item.id) >= 0"
            @change="updateSelected"
            :selectable="selectable"
        >
          <div class="resource-list-item">
            <div class="resource-list-item__book--name">
              <p>{{item.name}}</p>
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
        <PStack v-if="pagination.hasPrevious || pagination.hasNext" distribution="center" >
            <PPagination v-bind="pagination" />
        </PStack>
    </PCardSection>
  </PCard>
</template>
<script>
import { PCard, PCardSection } from "../PCard";
import PResourceListItem from "./components/PResourceListItem";
import {PPagination} from "../PPagination";

export default {
  components: {
    PResourceListItem,
    PPagination,
    PCard,
    PCardSection,
  },
  data() {
    return {
      selected: [],
      selectedAll: false,
      statusFilterActive: false,
      status: [],
      pagination: {
        total: 12,
        hasPrevious: false,
        hasNext: true,
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
  methods: {
    toggleSelected(item) {
      this.selected = item.selected ? this.items.map(book => book.id) : [];
      this.selectedAll = item.selectedMore;
      console.log(this.selected, this.selectedAll);
    },
    updateSelected(id, checked) {
      if (checked) this.selected.push(id);
      if (!checked) this.selected.splice(this.selected.indexOf(id), 1);
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
}
</script>
```
