PMultiSelect example:

PMultiSelect

```vue

<template>
  <PMultiSelect
      :options="options"
      @change="getSelectedOptionsValue"
  ></PMultiSelect>
</template>

<script>
export default {
  data() {
    return {
      options: [
        'Vue.js', 'Rails', 'Sinatra', 'Laravel', 'Phoenix'
      ],
      selectedOptions: [],
    };
  },
  methods: {
    getSelectedOptionsValue(value) {
      console.log(value);
    },
  },
}
</script>
```