<template>
    <div class="Polaris-Modal-Dialog__Container" data-polaris-layer="true" data-polaris-overlay="true">
        <div>
            <div class="Polaris-Modal-Dialog" role="dialog" tabIndex="-1">
                <div :class="className">
                    <slot/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { classNames } from '../../../../utilities/css';

    let props = defineProps({
        large: {
            type: Boolean,
        },
        small: {
            type: Boolean,
        },
        limitHeight: {
            type: Boolean,
        },
    });

    let className = computed(() => {
        return classNames(
            'Polaris-Modal-Dialog__Modal',
            props.large && ' Polaris-Modal-Dialog--sizeLarge',
            props.small && 'Polaris-Modal-Dialog--sizeSmall',
            props.limitHeight && 'Polaris-Modal-Dialog--limitHeight',
        );
    });
</script>
