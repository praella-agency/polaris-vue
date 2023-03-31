<template>
  <div
      :class="className"
      @click="$emit('click', $event)"
      @touchStart="$emit('touchStart', $event)"
  />
</template>

<script setup>
    import { computed } from 'vue';
    import { classNames } from '../../utilities/css';

    let props = defineProps({
        belowNavigation: {
            type: Boolean,
            default: false
        },
        transparent: {
            type: Boolean,
            default: false
        },
    });

    let className = computed(() => {
        return classNames(
            'Polaris-Backdrop',
            props.belowNavigation && 'Polaris-Backdrop--belowNavigation',
            props.transparent && 'Polaris-Backdrop--transparent',
        );
    });
</script>
