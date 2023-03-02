<template>
    <img :src="`data:image/svg+xml;utf8,${spinnerSVG}`" :class="className" alt="">
</template>

<script setup>
    import { computed } from 'vue';
    import { classNames, variationName } from '../../utilities/css';
    import { encode as encodeSVG } from '../../utilities/svg';
    import { spinnerLarge, spinnerSmall } from './images';
    import StringValidator from '../../utilities/validators/StringValidator';
    import { SpinnerColor, SpinnerSize } from '../variables';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Spinners are used to notify merchants that their action is being processed. For loading states,
     *  spinners should only be used for content that can’t be represented with skeleton loading components, like for data
     *  charts.</h4>
     */
    let props = defineProps({
        /**
         * Color for spinner.
         */
        color: {
            type: String,
            default: 'teal',
            ...StringValidator('color', SpinnerColor)
        },
        /**
         * Size of spinner.
         */
        size: {
            type: String,
            default: 'large',
            ...StringValidator('size', SpinnerSize)
        }
    });

    let className = computed(() => {
        return classNames(
            'Polaris-Spinner',
            props.color && `Polaris-Spinner--${variationName('color', props.color)}`,
            props.size && `Polaris-Spinner--${variationName('size', props.size)}`,
        );
    });

    let spinnerSVG = computed(() => {
        const svg = props.size === 'large' ? spinnerLarge : spinnerSmall;
        if (typeof svg === 'string') {
            return encodeSVG(svg);
        }
    });
</script>
