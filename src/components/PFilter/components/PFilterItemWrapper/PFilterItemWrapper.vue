<template>
    <div :class="className">
        <PFilterItem>
            <slot />
        </PFilterItem>
    </div>
</template>
<script setup>
    import { computed } from 'vue';
    import { classNames } from '../../../../utilities/css';
    import PFilterItem from '../PFilterItem/PFilterItem.vue';

    let props = defineProps({
        position: {
            type: String,
        },
    });

    let className = computed(() => {
        return classNames(
            props.position === 'center' && 'Polaris-Filters-ConnectedFilterControl__CenterContainer',
            props.position === 'right' && 'Polaris-Filters-ConnectedFilterControl__RightContainer',
        );
    });
</script>
