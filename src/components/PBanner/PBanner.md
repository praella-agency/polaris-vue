PBanner example:

Default banner
```vue
<PBanner>Default banner</PBanner>
```

Banner with title
```vue
<PBanner title="Title">Content</PBanner>
```

Banner with status
```vue
<PBanner status='success'>Success banner</PBanner>
<PBanner status='info'>Info banner</PBanner>
<PBanner status='warning'>Warning banner</PBanner>
<PBanner status='critical'>Critical banner</PBanner>
```

Banner with dismiss action
```vue
<template>
    <PBanner 
        status='success' 
        @dismiss="handleDismissAction"
    >Success banner</PBanner>
</template>

<script>
export default {
  methods: {
    handleDismissAction() {
        alert('Dismiss the banner');
    }
  }
}
</script>
```

Banner with Loadable Action
```vue
<template>
    <PBanner 
        title="Action Banner" 
        :action="{content:'Do Action', onAction: handleAction}"
    >Banner with action</PBanner>
</template>

<script>
export default {
  methods: {
    handleAction() {
        alert('Action triggered');
    }
  }
}
</script>
```

Banner with Disabled Action
```vue
<template>
    <PBanner 
        title="Action Banner" 
        :action="{content:'Do Action', disabled:true}"
    >Banner with disabled action</PBanner>
</template>
```
