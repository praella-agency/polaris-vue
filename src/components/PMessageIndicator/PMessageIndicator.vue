<template>
    <div class="Polaris-MessageIndicator__MessageIndicatorWrapper">
        <div v-show="active" class="Polaris-MessageIndicator" testID="indicator"/>
        <slot/>
    </div>
</template>

<script setup>
    let props = defineProps({
        active: {
            type: Boolean,
            default: true,
        },
    });
</script>
