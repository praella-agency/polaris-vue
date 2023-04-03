<template>
    <div
        :class="className"
        :id="`${id}-panel`"
        role="tabpanel"
        :aria-labelledby="id"
        :tabindex="-1"
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
            'Polaris-VerticalTabs__Panel',
            props.hidden && `Polaris-VerticalTabs__Panel--hidden`,
        );
    });
</script>
