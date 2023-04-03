<template>
    <main class="Polaris-PreviewFrame__MainArea" aria-label="Polaris Preview Theme Panel">
        <div class="Polaris-PreviewFrame__Preview">
            <div class="Polaris-PreviewFrame__HeaderWrapper"></div>
            <div class="Polaris-PreviewFrame__Main">
                <div :class="className">
                    <div class="Polaris-PreviewFrame__ShopFrame">
                        <div class="Polaris-PreviewFrame__Template">
                            <div class="Polaris-PreviewFrame__Template--section">
                                <slot/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
    import { computed } from 'vue';
    import { classNames } from '../../../../utilities/css';

    let props = defineProps({
        previewMode: {
            type: String,
            default: 'desktop',
        },
    });

    let className = computed(() => {
        return classNames(
            'Polaris-PreviewFrame__Interior',
            props.previewMode === 'desktop' && 'Polaris-PreviewFrame__modeDesktop',
            props.previewMode === 'mobile' && 'Polaris-PreviewFrame__modeMobile',
            props.previewMode === 'fullscreen' && 'Polaris-PreviewFrame__modeFullscreen',
        );
    });
</script>
