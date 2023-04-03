<template>
    <div v-if="active" :is="tag">
        <slot/>
    </div>
</template>

<script setup>
    let props = defineProps({
        tag: {
            type: String,
            required: true,
        },
        active: {
            type: Boolean,
            required: true,
        },
    });
</script>
