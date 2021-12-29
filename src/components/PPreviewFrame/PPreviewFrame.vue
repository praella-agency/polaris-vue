<template>
    <div :class="className">
        <PHeader
            :showUndoRedo="showUndoRedo"
            :slimHeader="slimHeader"
            :showPreviewOptions="showPreviewOptions"
            :undoActions="undoActions"
            :redoActions="redoActions"
            @previewChange="handlePreviewChange"
        >
            <slot slot="header.left" name="header.left"/>
            <slot slot="header.center" name="header.center"/>
            <slot slot="header.right" name="header.right"/>
        </PHeader>
        <PLeftSidebar
            v-if="!slimHeader"
            :leftSidebarTitle="leftSidebarTitle"
            :previewMode="previewOption"
            :responsiveRightSidebar="responsiveRightSidebar"
            :rightSidebarTitle="rightSidebarTitle"
            :openRightSidebar="openRightSidebar"
            @backClick="$emit('update:openRightSidebar', false)"
        >
            <slot slot="sidebar.left.title" name="sidebar.left.title"/>
            <slot slot="sidebar.left.content" name="sidebar.left.content"/>
            <slot slot="sidebar.left.footer" name="sidebar.left.footer"/>

            <slot slot="sidebar.right.title" name="sidebar.right.title"/>
            <slot slot="sidebar.right.content" name="sidebar.right.content"/>
            <slot slot="sidebar.right.footer" name="sidebar.right.footer"/>
        </PLeftSidebar>
        <PRightSidebar
            v-if="!responsiveRightSidebar"
            :rightSidebarTitle="rightSidebarTitle"
            :responsiveRightSidebar="responsiveRightSidebar"
            :previewMode="previewOption"
        >
            <slot slot="sidebar.right.title" name="sidebar.right.title"/>
            <slot slot="sidebar.right.content" name="sidebar.right.content"/>
            <slot slot="sidebar.right.footer" name="sidebar.right.footer"/>
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
            showPreviewOptions: {
                type: Boolean,
                default: false,
            },
            showUndoRedo: {
                type: Boolean,
                default: false,
            },
            undoActions: {
                type: Object,
            },
            redoActions: {
                type: Object,
            },
            openRightSidebar: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                slimHeader: false,
                responsiveRightSidebar: false,
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
                this.$set(this, 'slimHeader', window.innerWidth <= 666);
            },
            rightSidebarMediaQuery() {
                this.$set(this, 'responsiveRightSidebar', window.innerWidth < 1614);
            },
            handlePreviewChange(option) {
                this.previewOption = option[0];
            }
        },
        created() {
            window.addEventListener('resize', this.headerMediaQuery);
            this.headerMediaQuery();
            window.addEventListener('resize', this.rightSidebarMediaQuery);
            this.rightSidebarMediaQuery();
        },
        destroyed() {
            window.removeEventListener('resize', this.headerMediaQuery);
            window.removeEventListener('resize', this.rightSidebarMediaQuery);
        },
    }
</script>

<style scoped>

</style>