PDataTable example:

```vue
<template>
  <PDataTable
    loading
    :sort="sort"
    hasPagination
    @input-filter-changed="handleSearch"
    :pagination="{
        hasPrevious: true,
        hasNext: true,
        onNext: handleNext,
        onPrevious: handlePrevious
    }"
    @sort-changed="handleSortChange"
      :actions="[
        {
          onAction: handleUpdate,
          icon: 'EditMajorMonotone'
        },{
          onAction: handleDelete,
          icon: 'DeleteMajorMonotone',
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
      }]"
    :rows="[
      [
        {content: 'Emerald Silk Gown', url: 'https://www.google.com/'},
        '$875.00',
        {content: 121212, status:'success', progress:'incomplete'},
        140,
      ],
      [
        {content: 'Mauve Cashmere Scarf', url: 'https://www.google.com/'},
        '$230.00',
        {content: 'A-1234', status:'success', progress:'incomplete'},
        2,
      ],
      [
        {content: 'Mauve Cashmere', url: 'https://www.google.com/'},
        '$230.00',
        {content: 'A-1234', status:'success', progress:'incomplete'},
        {content: 299},
      ],
    ]"
    :ids="[1,2,3]"
    footerContent="Showing 3 of 3 results">
    <template slot="filter">
    <PPopover :active="active" full-width @close="toggleRatingFilter" id="popover_1" zIndex="999">
      <PButton slot="activator" @click="toggleRatingFilter" :disclosure="active ? 'up' : 'down'">Filter Options</PButton>
      <POptionList
              slot="content"
              allowMultiple
              :selected="selected"
              :options="[
              {label: 'Rating 1 with a long text', value: '1'},
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
      this.selected= selected;
      console.log('selected rating',selected)
    },
    updateStatusFilter(selected) {
      this.status = selected;
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

