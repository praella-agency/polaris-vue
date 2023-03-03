<template>
    <div :class="className" :style="style">
        <!-- @slot Elements to display inside stack item -->
        <slot/>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { classNames } from '../../../../utilities/css';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">The stack component will treat multiple elements wrapped in a stack item component as one item. By
     *  default, each individual element is treated as one stack item. Use the fill prop on a single stack item component to
     *  make it fill the rest of the available horizontal space.</h4>
     */

    let props = defineProps({
        /**
         * Fill the available horizontal space in the stack with the item.
         */
        fill: {
            type: Boolean,
            default: false,
        },
        /**
         * Width of Item.
         */
        width: {
            type: [String, Number],
        }
    });

    let className = computed(() => {
        return classNames(
            'Polaris-Stack__Item',
            props.fill && 'Polaris-Stack__Item--fill',
        );
    });

    let style = computed(() => {
        if (props.width) {
            return {width: /^\d+$/.test(props.width) ? `${props.width}px` : props.width};
        } else {
            return null;
        }
    });
</script>
