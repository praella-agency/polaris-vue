PFilter example

```vue

<template>
  <PFilter resourceTitle="Search" @remove-tag="onRemoveFilter" @input="onFilterInputChanged">
    <PButton>Change Order</PButton>
    <PButton>Submit</PButton>
    <PPopover
        :active="popoverActive"
        @close="popoverActive = !popoverActive"
        full-width
        preferredAlignment="center"
    >
      <PButton
          slot="activator"
          :disclosure="popoverActive ? 'up' : 'down'"
          @click="popoverActive = !popoverActive"
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
  </PFilter>
</template>

<script>
export default {
  data() {
    return {
      popoverActive: false,
      status: [],
    };
  },
  methods: {
    onRemoveFilter() {
      alert("Hello");
    },
    onFilterInputChanged() {
      alert("Hello");
    },
    updateStatusFilter() {
      alert("Hello");
    }
  },
}
</script>
```