<template>
    <div :class="className">
        <label
            :id="id"
            :for="id"
            :class="labelClassName"
        >
            <slot/>
        </label>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { classNames } from '../../utilities/css';

    let props = defineProps({
        /**
         * A unique identifier for the label
         */
        id: {
            type: [String, Number],
            required: true,
            default: 'polaris-label',
        },
        /**
         * Visually hide the label
         */
        hidden: {
            type: Boolean,
            default: false,
        },
        /**
         * Visual required indicator for the label
         */
        requiredIndicator: {
            type: Boolean,
            default: false,
        },
    });

    let className = computed(() => {
        return classNames(
            'Polaris-Label',
            props.hidden && 'Polaris-Label--hidden',
        );
    });

    let labelClassName = computed(() => {
        return classNames(
            'Polaris-Label__Text',
            props.requiredIndicator && 'Polaris-Label__RequiredIndicator',
        );
    });
</script>
