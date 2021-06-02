PColorPicker example:

```vue
<template>
  <div>
      <PColorPicker id="color-picker" label="Color Picker" :color.sync="color" />
      <PBadge :color="color">{{color}}</PBadge>  
  </div>
</template>

<script>
export default {
  data() {
    return {
      color: '#FF0000'
    }
  }
}
</script>
```