PResourceList example:

```vue

<template>
  <PCard>
    <PResourceList
        selectable
        :selected="selected"
        :resourceName="{singular: 'book', plural: 'books'}"
        :bulkActions="[
            {content: 'Publish', onAction: 'toggleStatusToPublished'},
            {content: 'Unpublish', onAction: 'toggleStatusToUnpublished'},
            {content: 'Archive', onAction: 'toggleStatusToArchived'},
            {content: 'Delete', onAction: 'deleteSelected'}
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
      items: [
        {
          id: 100,
          url: 'customers/341',
          name: 'PHP',
          location: 'Decatur, USA',
          status: true,
        },
        {
          id: 200,
          url: 'customers/256',
          name: 'Vue',
          location: 'Los Angeles, USA',
          status: null,
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
    },
  },
}
</script>
```