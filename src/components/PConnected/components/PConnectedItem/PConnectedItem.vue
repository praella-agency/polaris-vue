<template>
    <div
        @blur="updateFocused(false)"
        @focus="updateFocused(true)"
        :class="className"
    >
        <slot>
            {{ children }}
        </slot>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { Position } from '../../../variables'
    import { classNames } from '../../../../utilities/css';
    import StringValidator from '../../../../utilities/validators/StringValidator';

    let props = defineProps({
        position: {
            type: String,
            ...StringValidator('position', Position)
        },
        children: {
            type: String,
        },
        focused: {
            type: Boolean,
        },
    });

    const emit = defineEmits(['update:focused']);

    const className = computed(() => {
        return classNames(
            'Polaris-Connected__Item',
            props.focused && 'Polaris-Connected__Item--focused',
            props.position === 'Primary' && 'Polaris-Connected__Item--primary',
            props.position !== 'Primary' && 'Polaris-Connected__Item--connection',
        );
    });

    function updateFocused(value) {
        emit('update:focused', value);
    }
</script>
