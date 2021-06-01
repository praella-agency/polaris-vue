PSelect example:

PSelect

```vue

<template>
  <PSelect
      label="Select Theme"
      :options="[
        'One', 'Two', 'Three', 'Four', 'Five'
      ]"
      :value="selectedOption"
      @change="getSelectedOptionValue"
  />
</template>

<script>
export default {
  data() {
    return {
      selectedOption: '',
    };
  },
  methods: {
    getSelectedOptionValue(value) {
      this.selectedOption = value;
    },
  },
}
</script>
```