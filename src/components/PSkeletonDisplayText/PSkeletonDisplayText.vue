<template>
    <div :class="className"></div>
</template>

<script setup>
    import { computed } from 'vue';
    import { classNames, variationName } from '../../utilities/css';
    import StringValidator from '../../utilities/validators/StringValidator';
    import { SkeletonDisplayTextSize } from '../variables';

    let props = defineProps({
        /**
         * Size of Skeleton.
         */
        size: {
            type: String,
            default: 'medium',
            ...StringValidator('size', SkeletonDisplayTextSize)
        }
    });

    let className = computed(() => {
        return classNames(
            'Polaris-SkeletonDisplayText__DisplayText',
            props.size && `Polaris-SkeletonDisplayText--${variationName('size', props.size)}`,
        );
    });
</script>
