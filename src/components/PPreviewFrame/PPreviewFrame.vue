<template>
    <div :class="className">
        <PHeader
            :showRevertButtons="showRevertButtons"
            :slimHeader="slimHeader"
            @previewChange="handlePreviewChange"
        >
            <slot slot="topBar.left" name="topBar.left"/>
            <slot slot="topBar.center" name="topBar.center"/>
            <slot slot="topBar.right" name="topBar.right"/>
        </PHeader>
        <PLeftSidebar
            v-if="!slimHeader"
            :leftSidebarTitle="leftSidebarTitle"
            :previewMode="previewOption"
        >
            <slot slot="sidebar.leftTitle" name="sidebar.leftTitle"/>
            <slot slot="sidebar.content" name="sidebar.content"/>
            <slot slot="sidebar.footer" name="sidebar.footer"/>
        </PLeftSidebar>
        <PRightSidebar
            v-if="!slimHeader"
            :rightSidebarTitle="rightSidebarTitle"
            :previewMode="previewOption"
        >
            <slot slot="rightSidebarTitle" name="rightSidebarTitle"/>
            <slot slot="rightSidebarContent" name="rightSidebarContent"/>
            <slot slot="rightSidebarFooter" name="rightSidebarFooter"/>
        </PRightSidebar>
        <PPreviewPanel :previewMode="previewOption">
            <slot/>
        </PPreviewPanel>
    </div>
</template>

<script>
    import { classNames } from '../../utilities/css';
    import { PHeader } from './components/PHeader';
    import { PLeftSidebar } from './components/PLeftSidebar';
    import { PRightSidebar } from './components/PRightSidebar';
    import { PPreviewPanel } from './components/PPreviewPanel';
    import { PDisplayText } from '../../components/PDisplayText';

    export default {
        name: 'PPreviewFrame',
        components: {
            PHeader, PLeftSidebar, PRightSidebar, PPreviewPanel, PDisplayText,
        },
        props: {
            leftSidebarTitle: {
                type: String,
                default: null,
            },
            rightSidebarTitle: {
                type: String,
                default: null,
            },
            showRevertButtons: {
                type: Boolean,
                default: false,
            },

        },
        data() {
            return {
                slimHeader: false,
                previewOption: null,
            };
        },
        computed: {
            className() {
                return classNames(
                    'Polaris-PreviewFrame',
                    this.slimHeader && 'Polaris-PreviewFrame__slimHeader'
                );
            },
        },
        methods: {
            headerMediaQuery() {
                this.slimHeader = window.innerWidth <= 666;
            },
            handlePreviewChange(option) {
                this.previewOption = option[0];
            }
        },
        created() {
            window.addEventListener('resize', this.headerMediaQuery);
            this.headerMediaQuery();
        },
        destroyed() {
            window.removeEventListener('resize', this.headerMediaQuery);
        },
    }
</script>

<style scoped>

</style>