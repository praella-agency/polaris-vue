<template>
    <aside :class="className" aria-label="Polaris Preview Theme Sidebar">
        <div class="Polaris-PreviewFrame__PanelArea">
            <a id="Polaris-PreviewFrame-SkipTarget" tabindex="-1"></a>
            <PLeftSidebarPanel
                :responsiveRightSidebar="responsiveRightSidebar"
                :openRightSidebar="openRightSidebar"
                :leftSidebarTitle="leftSidebarTitle"
            >
                <template #sidebar.left.title>
                    <slot name="sidebar.left.title"/>
                </template>
                <template #sidebar.left.content>
                    <slot name="sidebar.left.content"/>
                </template>
                <template #sidebar.left.footer>
                    <slot name="sidebar.left.footer"/>
                </template>
            </PLeftSidebarPanel>
            <PRightSidebarPanel
                v-if="responsiveRightSidebar && openRightSidebar"
                :rightSidebarTitle="rightSidebarTitle"
                :responsiveRightSidebar="responsiveRightSidebar"
                @backClick="handleBackClick"
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
        emits: ['backClick'],
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