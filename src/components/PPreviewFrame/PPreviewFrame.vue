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
            <!-- @slot Add content or component to header left side -->
            <slot slot="header.left" name="header.left"/>
            <!-- @slot Add content or component to header center -->
            <slot slot="header.center" name="header.center"/>
            <!-- @slot Add content or component to header right side -->
            <slot slot="header.right" name="header.right"/>
        </PHeader>
        <PLeftSidebar
            v-if="!slimHeader"
            :leftSidebarTitle="leftSidebarTitle"
            :previewMode="previewOption"
            :responsiveRightSidebar="responsiveRightSidebar"
            :rightSidebarTitle="rightSidebarTitle"
            :openRightSidebar="openRightSidebar"
            @backClick="handleClick"
        >
            <!-- @slot Add content or component to left sidebar title -->
            <slot slot="sidebar.left.title" name="sidebar.left.title"/>
            <!-- @slot Add content or component to left sidebar content -->
            <slot slot="sidebar.left.content" name="sidebar.left.content"/>
            <!-- @slot Add content or component to left sidebar footer -->
            <slot slot="sidebar.left.footer" name="sidebar.left.footer"/>

            <!-- @slot Add content or component to right sidebar title -->
            <slot slot="sidebar.right.title" name="sidebar.right.title"/>
            <!-- @slot Add content or component to right sidebar content -->
            <slot slot="sidebar.right.content" name="sidebar.right.content"/>
            <!-- @slot Add content or component to right sidebar footer -->
            <slot slot="sidebar.right.footer" name="sidebar.right.footer"/>
        </PLeftSidebar>
        <PRightSidebar
            v-if="!responsiveRightSidebar"
            :rightSidebarTitle="rightSidebarTitle"
            :responsiveRightSidebar="responsiveRightSidebar"
            :previewMode="previewOption"
        >
            <!-- @slot Add content or component to right sidebar title -->
            <slot slot="sidebar.right.title" name="sidebar.right.title"/>
            <!-- @slot Add content or component to right sidebar content -->
            <slot slot="sidebar.right.content" name="sidebar.right.content"/>
            <!-- @slot Add content or component to right sidebar footer -->
            <slot slot="sidebar.right.footer" name="sidebar.right.footer"/>
        </PRightSidebar>
        <PPreviewPanel :previewMode="previewOption">
            <!-- @slot The content to display inside the preview frame -->
            <slot/>
        </PPreviewPanel>
    </div>
</template>

<script>
    import { classNames } from '../../utilities/css';
    import { PFrame } from '../PFrame';
    import { PHeader } from './components/PHeader';
    import { PLeftSidebar } from './components/PLeftSidebar';
    import { PRightSidebar } from './components/PRightSidebar';
    import { PPreviewPanel } from './components/PPreviewPanel';
    import { PDisplayText } from '../../components/PDisplayText';

    export default {
        name: 'PPreviewFrame',
        components: {
            PFrame, PHeader, PLeftSidebar, PRightSidebar, PPreviewPanel, PDisplayText,
        },
        props: {
            /**
             * Title for the left sidebar
             */
            leftSidebarTitle: {
                type: String,
                default: null,
            },
            /**
             * Title for the right sidebar
             */
            rightSidebarTitle: {
                type: String,
                default: null,
            },
            /**
             * Adjust frame content preview
             */
            showPreviewOptions: {
                type: Boolean,
                default: false,
            },
            /**
             * Displays Undo-Redo options for the header
             */
            showUndoRedo: {
                type: Boolean,
                default: false,
            },
            /**
             * Undo button actions
             */
            undoActions: {
                type: Object,
            },
            /**
             * Redo button actions
             */
            redoActions: {
                type: Object,
            },
            /**
             * Toggle preview of right sidebar when screen size collapsed.
             *
             * Use this prop with ".sync" to get two way binding.
             */
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
            },
            handleClick() {
                /**
                 * @ignore
                 */
                this.$emit('update:openRightSidebar', false)
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