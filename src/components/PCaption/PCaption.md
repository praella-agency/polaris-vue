PCaption example:

```vue
<template>
    <PList>
      <PListItem>
        Order #1001 <PCaption>Received April 21, 2017</PCaption>
      </PListItem>
      <PListItem>
        Order #1002 <PCaption>Received April 22, 2017</PCaption>
      </PListItem>
    </PList>
</template>

<script>
import PListItem from "../PList/PListItem";
export default {
  components:{
    PListItem
  }
}
</script>
```
