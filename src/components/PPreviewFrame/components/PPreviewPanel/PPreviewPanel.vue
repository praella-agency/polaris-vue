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

<script>
    import { classNames } from '../../../../utilities/css';

    export default {
        name: 'PPreviewPanel',
        props: {
            previewMode: {
                type: String,
                default: 'desktop',
            },
        },
        computed: {
            className() {
                return classNames(
                    'Polaris-PreviewFrame__Interior',
                    this.previewMode === 'desktop' && 'Polaris-PreviewFrame__modeDesktop',
                    this.previewMode === 'mobile' && 'Polaris-PreviewFrame__modeMobile',
                    this.previewMode === 'fullscreen' && 'Polaris-PreviewFrame__modeFullscreen',
                );
            },
        },
    }
</script>

<style scoped>

</style>