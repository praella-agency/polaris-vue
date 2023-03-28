<template>
    <div class="Polaris-SkeletonBodyText__SkeletonBodyTextContainer">
        <div v-for="(line, i) in lines" :key="i" class="Polaris-SkeletonBodyText"/>
    </div>
</template>

<script setup>
    let props = defineProps({
        /**
         * Number of line of skeleton
         */
        lines: {
            type: Number,
            default: 3
        }
    });
</script>
