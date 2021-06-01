PSkeletonBodyText example:

```vue

<template>
    <PCard sectioned>
        <PSkeletonBodyText :lines="lines"/>
    </PCard>
</template>

<script>
export default {
    data() {
        return {
            lines: 5    
        } 
    }
}
</script>
```