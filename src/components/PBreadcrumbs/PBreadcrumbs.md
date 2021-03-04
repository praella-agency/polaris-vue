PBreadcrumbs example:

Breadcrumb with url
```vue
<PBreadcrumbs :breadcrumbs="[{id:'breadcrumb_1', content:'Products', url:'#', accessibilityLabel:'product page url'}]" />
```

Breadcrumb with callable
```vue
<template>
    <PBreadcrumbs :breadcrumbs="[{id:'breadcrumb_1', content:'Products', onAction:handleAction, accessibilityLabel:'product page url'}]" />
</template>
<script>
export default {
  methods: {
    handleAction() {
        alert('Action triggered')
    }
  }
}
</script>
```
