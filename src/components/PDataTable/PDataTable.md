PDataTable example:

```vue
<PDataTable
  :columnContentTypes="['text', 'numeric', 'numeric', 'numeric', 'numeric']"
  :headings="['Product', 'Price', 'SKU Number', 'Net quantity', 'Net sales']"
  :rows="[
    ['Emerald Silk Gown', '$875.00', 124689, 140, '$122,500.00'],
    ['Mauve Cashmere Scarf', '$230.00', 124533, 83, '$19,090.00'],
    ['Navy Merino Wool Blazer with khaki chinos and yellow belt', '$445.00', 124518, 32, '$14,240.00'],
  ]"
  :totals="['', '', '', 255, '$155,830.00']"
  footerContent="Showing 3 of 3 results"/>
```

```vue
<template>
    <PDataTable
      @input-filter-changed="handleSearch"
      :columnContentTypes="['text', 'numeric', 'numeric', 'numeric', 'numeric']"
      :headings="['Product', 'Price', 'SKU Number', 'Net quantity', 'Net sales']"
      hasPagination
      :pagination="{
        hasPrevious: true,
        hasNext: true,
        onNext: handleNext,
        onPrevious: handlePrevious
      }"
      :rows="[
        ['Emerald Silk Gown', '$875.00', 124689, 140, '$122,500.00'],
        ['Mauve Cashmere Scarf', '$230.00', 124533, 83, '$19,090.00'],
        ['Navy Merino Wool Blazer with khaki chinos and yellow belt', '$445.00', 124518, 32, '$14,240.00'],
      ]"
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
      active: false,
      active2: false,
      selected: [],
      status: ["Active"],
    } 
  },
  methods: {
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
