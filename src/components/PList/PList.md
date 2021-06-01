PList example:

Bullet list

```vue

<template>
  <PList>
    <PListItem>Item 1</PListItem>
    <PListItem>Item 2</PListItem>
    <PListItem>Item 3</PListItem>
    <PListItem>Item 4</PListItem>
  </PList>
</template>

<script>
import PListItem from "./PListItem";
export default {
  components:{
    PListItem
  }
}
</script>
```

Number list

```vue

<template>
<PList type="number">
    <PListItem>Item 1</PListItem>
    <PListItem>Item 2</PListItem>
    <PListItem>Item 3</PListItem>
    <PListItem>Item 4</PListItem>
</PList>
</template>

<script>
import PListItem from "./PListItem";
export default {
  components:{
    PListItem
  }
}
</script>
```