<template>
    <aside :class="className" aria-label="Polaris Preview Theme Sidebar">
        <div class="Polaris-PreviewFrame__PanelArea">
            <a id="Polaris-PreviewFrame-SkipTarget" tabindex="-1"></a>
            <PLeftSidebarPanel
                :responsiveRightSidebar="responsiveRightSidebar"
                :openRightSidebar="openRightSidebar"
                :leftSidebarTitle="leftSidebarTitle"
            >
                <slot slot="sidebar.left.title" name="sidebar.left.title"/>
                <slot slot="sidebar.left.content" name="sidebar.left.content"/>
                <slot slot="sidebar.left.footer" name="sidebar.left.footer"/>
            </PLeftSidebarPanel>
            <PRightSidebarPanel
                v-if="responsiveRightSidebar && openRightSidebar"
                :rightSidebarTitle="rightSidebarTitle"
                :responsiveRightSidebar="responsiveRightSidebar"
                @backClick="handleBackClick"
            >
                <slot slot="sidebar.right.title" name="sidebar.right.title"/>
                <slot slot="sidebar.right.content" name="sidebar.right.content"/>
                <slot slot="sidebar.right.footer" name="sidebar.right.footer"/>
            </PRightSidebarPanel>
        </div>
    </aside>
</template>

<script>
    import { PHeading } from '../../../../components/PHeading';
    import { classNames } from '../../../../utilities/css';
    import { PRightSidebarPanel } from '../PRightSidebar/components/PRightSidebarPanel';
    import { PLeftSidebarPanel } from '../PLeftSidebar/components/PLeftSidebarPanel';

    export default {
        name: 'PLeftSidebar',
        components: {
            PHeading, PRightSidebarPanel, PLeftSidebarPanel,
        },
        props: {
            leftSidebarTitle: {
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
            rightSidebarTitle: {
                type: String,
                default: null,
            },
            openRightSidebar: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            className() {
                return classNames(
                    'Polaris-PreviewFrame__Sidebar',
                    this.previewMode === 'fullscreen' && 'Polaris-PreviewFrame__Sidebar--hide',
                );
            },
        },
        methods: {
            handleBackClick() {
                this.$emit('backClick', false);
            },
        },
    }
</script>

<style scoped>

</style>