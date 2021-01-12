PCheckbox example:

```vue
<template>
  <PCheckbox name="basic_checkbox" id="basic_checkbox_1" value="Checked" :checked="is_checked" 
    @change="handleChange" label="Basic checkbox"/>
</template>

<script>
export default {
  data() {
    return {
      is_checked: false
    }
  },
  methods: {
    handleChange($event) {
      alert('check console for event payload');
      this.is_checked = $event.checked
      console.log($event)
    }
  }
}
</script>
```

Disabled checkbox
```vue
<template>
  <PCheckbox name="disabled_checkbox" id="disabled_checkbox_1" disabled label="Disabled checkbox"/>
</template>
```

Checkbox with Error
```vue
<template>
  <PCheckbox name="errored_checkbox" id="errored_checkbox_1" label="Checkbox with error" error="This field is required"/>
</template>
```

Checkbox with helpText
```vue
<template>
  <PCheckbox helpText="Checkbox help text goes here" name="helptext_checkbox" id="helptext_checkbox_1" label="Checkbox" />
</template>
```

Indeterminate Checkbox
```vue
<template>
  <PCheckbox indeterminate name="indeterminate_checkbox" id="indeterminate_checkbox_1" label="Indeterminate Checkbox" />
</template>
```