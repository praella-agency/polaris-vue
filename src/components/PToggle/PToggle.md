PToggle example:

```vue
<template>
  <PToggle @change="handleToggleEvent" value="is_active" label="Toggle Button"/>
</template>

<script>
export default {
  methods: {
    handleToggleEvent(event) {
      alert(`Toggle changed`)
      console.log(event)
    }
  }
}
</script>
```

Disabled toggle
```vue
<template>
  <PToggle disabled label="Disabled Toggle Button"/>
</template>
```