<template>
    <div :class="className">
        <progress class="Polaris-ProgressBar__Progress" :value="parsedProgress" max="100"/>
        <div class="Polaris-ProgressBar__Indicator" :style="{width: `${parsedProgress}%`}">
            <span class="Polaris-ProgressBar__Label">{{ parsedProgress }}%</span>
        </div>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { classNames, variationName } from '../../utilities/css';
    import StringValidator from '../../utilities/validators/StringValidator';
    import { ProgressBarSize } from '../variables';

    let props = defineProps({
        /**
         * The progression of certain tasks.
         */
        progress: {
            type: Number,
            default: 10,
        },

        /**
         * Size of Progressbar.
         */
        size: {
            type: String,
            default: 'medium',
            ...StringValidator('size', ProgressBarSize)
        }
    });

    let className = computed(() => {
        return classNames(
            'Polaris-ProgressBar',
            props.size && `Polaris-ProgressBar--${variationName('size', props.size)}`,
        );
    });

    let parsedProgress = computed(() => {
        let progressWidth;

        if (props.progress < 0) {
            progressWidth = 0;
        } else if (props.progress > 100) {
            progressWidth = 100;
        } else {
            progressWidth = props.progress;
        }

        return progressWidth;
    });
</script>
