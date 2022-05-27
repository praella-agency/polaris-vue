<template>
    <div :class="className" aria-label="Polaris Preview Theme Sidebar">
        <div class="Polaris-PreviewFrame__PanelArea">
            <a id="Polaris-PreviewFrame-SkipTarget" tabindex="-1"></a>
            <PRightSidebarPanel
                :rightSidebarTitle="rightSidebarTitle"
                :responsiveRightSidebar="responsiveRightSidebar"
            >
                <template #sidebar.right.title>
                    <slot name="sidebar.right.title"/>
                </template>
                <template #sidebar.right.content>
                    <slot name="sidebar.right.content"/>
                </template>
                <template #sidebar.right.footer>
                    <slot name="sidebar.right.footer"/>
                </template>
            </PRightSidebarPanel>
        </div>
    </div>
</template>

<script>
    import { classNames } from '../../../../utilities/css';
    import { PRightSidebarPanel } from './components/PRightSidebarPanel';

    export default {
        name: 'PRightSidebar',
        components: {
            PRightSidebarPanel,
        },
        props: {
            rightSidebarTitle: {
                type: String,
                default: null,
            },
            previewMode: {
                type: String,
                default: 'desktop',
            },
            responsiveRightSidebar: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            className() {
                return classNames(
                    'Polaris-PreviewFrame__Sidebar',
                    'Polaris-PreviewFrame__Sidebar--secondary-second',
                    this.previewMode === 'fullscreen' && 'Polaris-PreviewFrame__Sidebar--hide',
                );
            },
        },
    }
</script>
