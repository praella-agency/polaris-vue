PResourceList example:

```vue

<template>
  <PCard>
    <PResourceList
        selectable
        :hasMore="pagination.hasPrevious || pagination.hasNext"
        :totalCount="pagination.total"
        :selected="selected"
        :resourceName="{singular: 'book', plural: 'books'}"
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
            preferredAlignment="left"
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
                  {label: 'Active Little Long Content', value: 1},
                  {label: 'In-Active', value: 0},
              ]"
              :selected="status"
              @change="updateStatusFilter"
          ></POptionList>
        </PPopover>
      </template>

      <PResourceListItem
          v-for="(item, key) in items"
          :key="key"
          :id="item.id"
          :checked="selected.indexOf(item.id) >= 0"
          @change="updateSelected"
          selectable
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
    </PResourceList>
  </PCard>
<!--  <PCardSection v-if="pagination.hasPrevious || pagination.hasNext">-->
<!--    <div class="resource-list-pagination">-->
<!--      <PPagination :hasPrevious="pagination.hasPrevious" :hasNext="pagination.hasNext" :onPrevious="onPrevious" :onNext="onNext"></PPagination>-->
<!--    </div>-->
<!--  </PCardSection>-->
</template>
<script>
import PResourceListItem from "./components/PResourceListItem";

export default {
  components: {
    PResourceListItem,
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
        // {
        //   id: 300,
        //   name: 'React',
        //   status: false,
        // },
        // {
        //   id: 400,
        //   name: 'Python',
        //   status: false,
        // },
        // {
        //   id: 500,
        //   name: 'Node',
        //   status: true,
        // },
        // {
        //   id: 600,
        //   name: 'Shopify',
        //   status: false,
        // },
        // {
        //   id: 700,
        //   name: 'Ruby',
        //   status: null,
        // },
        // {
        //   id: 800,
        //   name: 'Laravel',
        //   status: null,
        // },
        // {
        //   id: 900,
        //   name: 'Javascript',
        //   status: true,
        // },
        // {
        //   id: 1000,
        //   name: 'Angular',
        //   status: true,
        // },
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
    },
  },
}
</script>
```