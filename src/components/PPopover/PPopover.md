PPopover example:

PPopover

```vue

<template>
  <PPopover id="items-status-filter" :active="statusFilterActive" @close="toggleStatusFilter">
    <PButton slot="activator" @click="toggleStatusFilter" :disclosure="statusFilterActive ? 'up' : 'down'">
      Filter by Status
    </PButton>
    <POptionList
        slot="content"
        allowMultiple
        :selected="queryParams.statuses"
        :options="[
            {label: 'Pending', value: '0'},
            {label: 'Published', value: '1'},
            {label: 'Archived', value: '-1'},
        ]"
        @change="updateStatusFilter" 
    />
  </PPopover>
</template>

<script>
export default {
  data() {
    return {
      statusFilterActive: false,
      queryParams: {
        page: null,
        search: null,
        ratings: [],
        statuses: [],
        id: null,
      },    
    };
  },
  methods: {
    toggleStatusFilter() {
      this.statusFilterActive = !this.statusFilterActive;
    },
    updateStatusFilter(selected) {
      this.queryParams.statuses = selected
    }
  },
}
</script>
```
