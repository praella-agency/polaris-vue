PActionList example:

```vue
<template>
    <PActionList :items="bulkActions" />
</template>
<script>

export default {
  data() {
    return { 
        bulkActions : [{
            content: 'Action 1',
            onAction: this.handleAction1
        },{
            content: 'Action 2',
            onAction: this.handleAction2
        },]
    }
  },
  methods: {
    handleAction1() {
        alert('action 1 handled')
    },
    handleAction2() {
        alert('action 1 handled')
    }
  }
}
</script>
```