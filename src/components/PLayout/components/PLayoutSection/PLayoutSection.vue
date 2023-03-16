<template>
  <div :class="className">
    <!-- @slot Default -->
    <slot/>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { classNames } from '../../../../utilities/css';

let props = defineProps({
    /**
     * Set it true to make it secondary.
     */
    secondary: {
        type: Boolean,
        default: false,
    },
    /**
     * Set it true to make it full width.
     */
    fullWidth: {
        type: Boolean,
        default: false,
    },
    /**
     * Set it true to make it one half.
     */
    oneHalf: {
        type: Boolean,
        default: false,
    },
    /**
     * Set it true to make it one third.
     */
    oneThird: {
        type: Boolean,
        default: false,
    },
});

let className = computed(() => {
    return classNames(
        'Polaris-Layout__Section',
        props.secondary && 'Polaris-Layout__Section--secondary',
        props.fullWidth && 'Polaris-Layout__Section--fullWidth',
        props.oneHalf && 'Polaris-Layout__Section--oneHalf',
        props.oneThird && 'Polaris-Layout__Section--oneThird',
    );
});
</script>
