POptionList example:

POptionList

```vue

<template>
<POptionList
    slot="content"
    :selected="selectedStatus"
    :options="[
      {value: 'byward_market', label: 'Byward Market'},
      {value: 'centretown', label: 'Centretown'},
      {value: 'hintonburg', label: 'Hintonburg'},
      {value: 'westboro', label: 'Westboro'},
      {value: 'downtown', label: 'Downtown'},    
    ]"
    @change="updateStatusFilter" />
</template>

<script>
export default {
  data() {
    return {
      selectedStatus: [],
    };
  },
  methods: {
    updateStatusFilter(selected) {
      this.selectedStatus = selected
    }
  },
}
</script>
```

POptionList with Sections and Checkbox

```vue

<template>
<POptionList
    slot="content"
    allow-multiple
    :selected="selectedStatus"
    :sections="[
      {
        options: [
          {value: 'type', label: 'Sale item type'},
          {value: 'kind', label: 'Sale kind'},
        ],
      },
      {
        title: 'Traffic',
        options: [
          {value: 'source', label: 'Traffic referrer source'},
          {value: 'host', label: 'Traffic referrer host'},
          {value: 'path', label: 'Traffic referrer path'},
        ],
      },
    ]"
    @change="updateStatusFilter" />
</template>

<script>
export default {
  data() {
    return {
      selectedStatus: [],
    };
  },
  methods: {
    updateStatusFilter(selected) {
      this.selectedStatus = selected
    }
  },
}
</script>
```