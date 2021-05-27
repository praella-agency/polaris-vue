PResourceList example:

```vue

<PResourceList resource-name="{{singular: 'customer', plural: 'customers'}}"

>
<PResourceListHeader resource-title="Mae Ochoa" promoted-bulk-actions="{
      content: 'Edit customers',
      onAction: () => console.log('Todo: implement bulk edit'),
    }"></PResourceListHeader>
</PResourceList>

<script>
import PResourceListHeader from "./components/PResourceListHeader";

export default {
  components:{
    PResourceListHeader,
  },
}
</script>
```