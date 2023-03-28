<template>
    <div :class="className"></div>
</template>

<script setup>
    import { computed } from 'vue';
    import { classNames, variationName } from '../../utilities/css';
    import StringValidator from '../../utilities/validators/StringValidator';
    import { SkeletonThumbnailSize } from '../variables';

    let props = defineProps({
        /**
         * Size of Skeleton.
         */

        size: {
            type: String,
            default: 'medium',
            ...StringValidator('size', SkeletonThumbnailSize)
        }
    });

    let className = computed(() => {
        return classNames(
            'Polaris-SkeletonThumbnail',
            props.size && `Polaris-SkeletonThumbnail--${variationName('size', props.size)}`,
        );
    });
</script>
