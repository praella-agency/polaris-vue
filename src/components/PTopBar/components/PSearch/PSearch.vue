<template>
    <div>
        <div
            ref="node"
            v-if="visible"
            :class="searchDismissOverlayClass"
            @click="handleDismiss"
        />
        <div :class="className">
            <div class="Polaris-TopBar-Search__SearchContent">
                <div class="Polaris-TopBar-Search__Results">
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
        visible: {
            type: Boolean,
            default: false,
        },
        overlayVisible: {
            type: Boolean,
            default: false,
        },
    });
    const emit = defineEmits(['dismiss']);

    let className = computed(() => {
        return classNames(
            'Polaris-TopBar-Search',
            props.visible && 'Polaris-TopBar-Search--visible',
        );
    });

    let searchDismissOverlayClass = computed(() => {
        return classNames(
            'Polaris-TopBar-SearchDismissOverlay',
            props.overlayVisible && 'Polaris-TopBar-SearchDismissOverlay--visible',
        );
    });

    function handleDismiss() {
        emit('dismiss');
    }
</script>
