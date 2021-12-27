<template>
    <div :class="className">
        <PHeader :slimHeader="slimHeader">
            <slot slot="leftTopBar" name="leftTopBar"/>
            <slot slot="centerTopBar" name="centerTopBar"/>
            <slot slot="rightTopBar" name="rightTopBar"/>
            <slot slot="rightCorner" name="rightCorner"/>
        </PHeader>
        <PLeftSidebar
            v-if="!slimHeader"
            :leftSidebarTitle="leftSidebarTitle"
        >
            <slot slot="leftSidebarTitle" name="leftSidebarTitle"/>
            <slot slot="leftSidebarContent" name="leftSidebarContent"/>
            <slot slot="leftSidebarFooter" name="leftSidebarFooter"/>
        </PLeftSidebar>
        <PRightSidebar
            v-if="!slimHeader"
            :rightSidebarTitle="rightSidebarTitle"
        >
            <slot slot="rightSidebarTitle" name="rightSidebarTitle"/>
            <slot slot="rightSidebarContent" name="rightSidebarContent"/>
            <slot slot="rightSidebarFooter" name="rightSidebarFooter"/>
        </PRightSidebar>
        <PPreviewPanel>
            <PDisplayText>Main content</PDisplayText>
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
        },
        data() {
            return {
                slimHeader: false,
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