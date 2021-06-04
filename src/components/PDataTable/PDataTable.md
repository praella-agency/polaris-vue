PDataTable example:

```vue
<template>
  <PDataTable
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
        width: '30%'
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
        content: 'Status',
        value: 'status',
        type: 'string',
        sortable: false,
      }]"
    :rows="[
      [
        {content: 'Emerald Silk Gown', url: 'https://www.google.com/'},
        '$875.00',
        {content: 121212, status:'success', progress:'incomplete'},
        140,
        {status: false,onAction:handleToggle,id: 1},

      ],
      [
        {content: 'Mauve Cashmere Scarf', url: 'https://www.google.com/'},
        '$230.00',
        {content: 'A-1234', status:'success', progress:'incomplete'},
        2,
        {status: true,onAction:handleToggle,id: 3},
      ],
      [
        {content: 'Mauve Cashmere', url: 'https://www.google.com/'},
        '$230.00',
        {content: 'A-1234', status:'success', progress:'incomplete'},
        {content: 299},
        {status: true,onAction:handleToggle,id: 2},
      ],
    ]"
    :ids="[1,2,3]"
    footerContent="Showing 3 of 3 results">
    <template slot="filter">
    <PPopover
        id="popover_1"
        :active="active"
        preferred-alignment="right"
        @close="toggleRatingFilter" 
        full-width 
    >
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
    <PPopover
        id="popover_2"
        :active="active2"
        @close="toggleRatingFilter2"
        preferred-alignment="right"
    >
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
      console.log(this.sort);
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
      console.log('selected rating',selected);
    },
    updateStatusFilter(selected) {
      this.status = selected;
      console.log('selected status',selected);
    },
    handleNext() {
      alert('Go to next page');
    },
    handlePrevious() {
      alert('Go to previous page');
    },
    handleToggle($val) {
      console.log($val);
    }
  }
}
</script>
```

