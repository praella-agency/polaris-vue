PDataTable example:

```vue
<template>
  <PDataTable
    :sort="sort"
    hasPagination
    :pagination="{
        hasPrevious: true,
        hasNext: true,
        onNext: handleNext,
        onPrevious: handlePrevious
    }"
    @sort-changed="handleSortChange"
      :actions="[
        {
          accessibilityLabel: 'Secondary action label',
          onAction: handleUpdate,
          icon: 'DuplicateMinor'
        },{
          accessibilityLabel: 'Secondary action label',
          onAction: handleDelete,
          icon: 'DuplicateMinor',
          destructive: true
        }
      ]"
    :headings="[{
        content: 'Product',
        value: 'product',
        type: 'text',
        sortable: true,
      },{
        content: 'Price',
        value: 'price',
        type: 'numeric',
        sortable: true,
      },{
        content: 'SKU Number',
        value: 'sku',
        type: 'numeric',
        sortable: true,
      },{
        content: 'Net quantity',
        value: 'qty',
        type: 'numeric',
        sortable: true,
      },{
        content: 'Net sales',
        value: 'sales',
        type: 'numeric',
        sortable: true,
      }]"
    :rows="[
      [
        {action:{link: 'https://www.google.com/', content: 'Emerald Silk Gown'}},
        {content:'$875.00'},
        {badge: {status:'success',content: 121212, progress:'incomplete'}},
        {content:140},
        {content:'$122,500.00'},
      ],[
        {action:{link: 'https://www.google.com/', content: 'Mauve Cashmere Scarf'}},
        {content:'$230.00'},
        {badge: {status:'success',content: 1313131, progress:'incomplete'}},
        {content:83},
        {content:'$19,090.00'},
      ],[
        {action:{link: 'https://www.google.com/', content: 'Navy Merino Wool Blazer with khaki chinos and yellow belt'}},
        {content:'$445.00'},
        {badge: {status:'success',content: 1414141, progress:'incomplete'}},
        {content:32},
        {content:'$14,240.00'},
      ],
    ]"
    :ids="[1,2,3]"
    :totals="['', '', '', 255, '$155,830.00']"
    footerContent="Showing 3 of 3 results">
    <template slot="filter">
    <PPopover :active="active" @close="toggleRatingFilter" id="popover_1">
      <PButton slot="activator" @click="toggleRatingFilter" :disclosure="active ? 'up' : 'down'">Filter Options</PButton>
      <POptionList
              slot="content"
              allowMultiple
              :selected="selected"
              :options="[
              {label: 'Rating 1', value: '1'},
              {label: 'Rating 2', value: '2'},
              {label: 'Rating 3', value: '3'},
              {label: 'Rating 4', value: '4'},
            ]"
          @change="updateRatingFilter"
      ></POptionList>
    </PPopover>
    <PPopover :active="active2" @close="toggleRatingFilter" id="popover_2">
      <PButton slot="activator" @click="toggleRatingFilter2" :disclosure="active2 ? 'up' : 'down'">Status</PButton>
      <POptionList
              slot="content"
              allowMultiple
              :selected="status"
              :options="[
              {label: 'Active', value: 'Active'},
              {label: 'Pending', value: 'Pending'},
              {label: 'Deleted', value: 'Deleted'},
            ]"
          @change="updateStatusFilter"
      ></POptionList>
    </PPopover>
    </template>
  </PDataTable>
</template>
<script>
export default {
  data() {
    return {
      sort : {value:'price',direction:'ascending'},
      active: false,
      active2: false,
      selected: [],
      status: ["Active"],
    }
  },
  methods: {
    handleSortChange(sort,direction) {
       this.sort = {value: sort,direction: direction};
    },
    handleUpdate(id) {
      alert('Handle update for id '+id);
    },
    handleDelete(id) {
      alert('Handle delete for id '+id);
    },
    handleCellAction(id) {
      alert('Handle cell action for '+id);
    },
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
    updateRatingFilter(selected) {
      this.selected= selected
      console.log('selected rating',selected)
    },
    updateStatusFilter(selected) {
      this.status = selected
      console.log('selected status',selected)
    },
    handleNext() {
      alert('Go to next page')
    },
    handlePrevious() {
      alert('Go to previous page')
    }
  }
}
</script>
```

