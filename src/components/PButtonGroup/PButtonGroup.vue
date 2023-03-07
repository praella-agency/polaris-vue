<template>
    <div :class="className"
         :data-buttongroup-segmented="segmented"
         :data-buttongroup-full-width="fullWidth"
         :data-buttongroup-connected-top="connectedTop"
    >
        <slot/>
    </div>
</template>
<script setup>
    import { computed, useSlots } from 'vue';
    import { classNames } from '../../utilities/css';
    import { ButtonGroupSpacing } from '../variables';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Button group displays multiple related actions stacked or in a horizontal row to help with arrangement
     *  and spacing.</h4>
     */

    let props = defineProps({
        /**
         * Remove top left and right border radius
         */
        segmented: {
            type: Boolean,
            default: false,
        },
        /**
         * Buttons will stretch/shrink to occupy the full width
         */
        fullWidth: {
            type: Boolean,
            default: false,
        },
        /**
         * Remove top left and right border radius
         */
        connectedTop: {
            type: Boolean,
            default: false,
        },
        /**
         * Remove top left and right border radius
         */
        spacing: {
            type: [String, ButtonGroupSpacing],
            default: null,
        },
    });

    let slots = useSlots();

    let className = computed(() => {
        return classNames(
            'Polaris-ButtonGroup',
            props.segmented && 'Polaris-ButtonGroup--segmented',
            props.fullWidth && 'Polaris-ButtonGroup--fullWidth',
            props.connectedTop && 'Polaris-ButtonGroup--connectedTop',
            props.spacing && `Polaris-ButtonGroup--${props.spacing}`,
        );
    });
</script>
