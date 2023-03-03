<template>
    <section :class="className">
        <slot/>
    </section>
</template>

<script setup>
    import { computed } from 'vue';
    import { classNames } from '../../../../utilities/css';

    let props = defineProps({
        flush: {
            type: Boolean,
        },
        subdued: {
            type: Boolean,
        },
    });

    let className = computed(() => {
        return classNames(
            'Polaris-Modal-Section',
            props.flush && 'Polaris-Modal-Section--flush',
            props.subdued && 'Polaris-Modal-Section--subdued',
        );
    });
</script>
