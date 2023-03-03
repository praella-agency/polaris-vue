<template>
    <button :class="className" @click="emit('click', $event)">
        <PIcon source="MobileCancelMajor" color="base"/>
    </button>
</template>

<script setup>
    import { computed } from 'vue';
    import { classNames } from '../../../../utilities/css';
    import { PIcon } from '../../../../components/PIcon';

    let props = defineProps({
        title: {
            type: Boolean,
            default: true,
        },
    });

    const emit = defineEmits(['click']);

    let className = computed(() => {
        return classNames(
            'Polaris-Modal-CloseButton',
            !props.title && 'Polaris-Modal-CloseButton--withoutTitle',
        );
    });
</script>
