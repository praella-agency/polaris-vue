PPopover example:

PPopover

```vue

<template>
  <PPopover
      :active="active"
      :activate="activator"
  ></PPopover>
</template>

<script>
export default {
  data() {
    return {
      active: false,
      activator: '<PButton>My</PButton>',
    }
  },
}
</script>
```
