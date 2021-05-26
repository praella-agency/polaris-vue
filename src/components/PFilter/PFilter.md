PFilter example

```vue

<template>
  <PFilter @remove-tag="onRemoveFilter" @input="onFilterInputChanged">
    <PPopover
        id="status_popover"
        :active="popoverActive"
        @close="popoverActive = !popoverActive"
        full-width
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
              {label: 'Active', value: 1},
              {label: 'In-Active', value: 0},
          ]"
          :selected="status"
          @change="updateStatusFilter"
      ></POptionList>
    </PPopover>
    <PButton>Test</PButton>
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