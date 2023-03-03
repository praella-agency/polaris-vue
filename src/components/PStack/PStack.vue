<template>
    <div :class="className">
        <!-- @slot Elements to display inside stack -->
        <slot/>
    </div>
</template>
<script setup>
    import { computed } from 'vue';
    import { classNames, variationName } from '../../utilities/css';
    import { Alignment, Distribution, Spacing } from '../variables';
    /**
     * @requires PStackItem
     */
    import { PStackItem } from './components/PStackItem';
    import StringValidator from '../../utilities/validators/StringValidator';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Use to lay out a horizontal row of components or to achieve no-fuss vertical centering. A stack is made
     *  of flexible items that wrap each of the stack’s children. Options provide control of the wrapping, spacing, and
     *  relative size of the items in the stack.</h4>
     */

    let props = defineProps({
        /**
         * Set it true of you need items in vertical.
         */
        vertical: {
            type: Boolean,
        },
        /**
         * Set it true for Word-Wrap.
         */
        wrap: {
            type: Boolean,
            default: true,
        },
        /**
         * Space between two items.
         */
        spacing: {
            type: String,
            default: null,
            ...StringValidator('spacing', Spacing),
        },
        /**
         * Distribution of free space among items.
         */
        distribution: {
            type: String,
            default: null,
            ...StringValidator('distribution', Distribution),
        },
        /**
         * Alignment of items.
         */
        alignment: {
            type: String,
            default: null,
            ...StringValidator('alignment', Alignment),
        },
    });

    let className = computed(() => {
        return classNames(
            'Polaris-Stack',
            props.vertical && 'Polaris-Stack--vertical',
            props.spacing && `Polaris-Stack--${variationName('spacing', props.spacing)}`,
            props.distribution && `Polaris-Stack--${variationName('distribution', props.distribution)}`,
            props.alignment && `Polaris-Stack--${variationName('alignment', props.alignment)}`,
            !props.wrap && 'Polaris-Stack--noWrap',
        );
    });
</script>
