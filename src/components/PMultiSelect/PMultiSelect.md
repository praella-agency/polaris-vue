PMultiSelect example:

PMultiSelect with simple array in option

```vue

<template>
  <PMultiSelect
      :options="options"
      @change="getSelectedOptionsValue"
  />
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

PMultiSelect with array of object in option

```vue

<template>
  <PMultiSelect
      :options="options"
      @change="getSelectedOptionsValue"
  />
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
            label: 'Option 1',
            value: 'option_1',
        },  
        {
            label: 'Option 2',
            value: 'option_2',
        },  
        {
            label: 'Option 3',
            value: 'option_3',
        },  
        {
            label: 'Option 4',
            value: 'option_4',
            disabled: true
        },   
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