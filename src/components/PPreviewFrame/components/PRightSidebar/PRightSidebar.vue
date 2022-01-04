<template>
    <div :class="className" aria-label="Polaris Preview Theme Sidebar">
        <div class="Polaris-PreviewFrame__PanelArea">
            <a id="Polaris-PreviewFrame-SkipTarget" tabindex="-1"></a>
            <PRightSidebarPanel
                :rightSidebarTitle="rightSidebarTitle"
                :responsiveRightSidebar="responsiveRightSidebar"
            >
                <slot slot="sidebar.right.title" name="sidebar.right.title"/>
                <slot slot="sidebar.right.content" name="sidebar.right.content"/>
                <slot slot="sidebar.right.footer" name="sidebar.right.footer"/>
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
        data() {
            return {};
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
        methods: {},
    }
</script>

<style scoped>

</style>