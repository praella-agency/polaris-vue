<template>
    <div
        :class="className"
        :id="id"
        :tabIndex="-1"
    >
        <slot/>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { classNames } from '../../../../utilities/css';

    let props = defineProps({
        id: {
            type: [String, Number],
        },
        hidden: {
            type: Boolean,
        },
    });

    let className = computed(() => {
        return classNames(
            'Polaris-Tabs__Panel',
            props.hidden && `Polaris-Tabs__Panel--hidden`,
        );
    });
</script>
