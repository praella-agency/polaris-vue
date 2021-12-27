<template>
    <main class="Polaris-PreviewFrame__MainArea" aria-label="Polaris Preview Theme Panel">
        <div class="Polaris-PreviewFrame__Preview">
            <div class="Polaris-PreviewFrame__HeaderWrapper"></div>
            <div class="Polaris-PreviewFrame__Main">
                <div :class="className">
                    <div class="Polaris-PreviewFrame__ShopFrame">
                        <slot></slot>
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
        components: {
        },
        props: {
        },
        data() {
            return {
            };
        },
        computed: {
            className() {
                return classNames(
                    'Polaris-PreviewFrame__Interior',
                );
            },
        },
        methods: {
        },
    }
</script>

<style scoped>

</style>