<template>
    <div class="Polaris-PreviewFrame__Sidebar Polaris-PreviewFrame__Sidebar--secondary-second" aria-label="Polaris Preview Theme Sidebar">
        <div class="Polaris-PreviewFrame__PanelArea">
            <a id="Polaris-PreviewFrame-SkipTarget" tabindex="-1"></a>
            <div class="Polaris-PreviewFrame__StaticPanel" tabindex="-1" :aria-hidden="false">
                <div class="Polaris-PreviewFrame__ChildrenWrapper">
                    <div class="Polaris-PreviewFrame__Layout
                                Polaris-PreviewFrame__layoutSpacingDefault
                                Polaris-PreviewFrame__spaceAfter
                                Polaris-PreviewFrame__fullHeight
                                Polaris-PreviewFrame__scrollable"
                    >
                        <div v-if="rightSidebarTitle" class="Polaris-PreviewFrame__NavHeader">
                            <div class="Polaris-PreviewFrame__Section Polaris-PreviewFrame__alignToNav">
                                <PHeading>
                                    <slot name="rightSidebarTitle">
                                        {{ rightSidebarTitle }}
                                    </slot>
                                </PHeading>
                            </div>
                        </div>
                        <!-- Section_1ozsc_41 -->
                        <section
                            class="Polaris-PreviewFrame__Section--header
                                    Polaris-PreviewFrame__sectionSpacingExtraTight
                                    Polaris-PreviewFrame__paddingNone"
                        >
                            <div class="Polaris-PreviewFrame__ChildrenWrapper--header">
                                <slot name="rightSidebarContent">
                                    <PHeading>Content</PHeading>
                                </slot>
                            </div>
                        </section>
                    </div>
                    <div class="Polaris-PreviewFrame__Layout
                                    Polaris-PreviewFrame__layoutSpacingDefault
                                    Polaris-PreviewFrame__sticky"
                    >
                        <section class="Polaris-PreviewFrame__Section--header
                                            Polaris-PreviewFrame__sectionSpacingDefault
                                            Polaris-PreviewFrame__paddingNone">
                            <div class="Polaris-PreviewFrame__ChildrenWrapper--header">
                                <div class="Polaris-PreviewFrame__Footer">
                                    <div class="Polaris-PreviewFrame__Footer--childrenWrapper">
                                        <slot name="rightSidebarFooter">
                                            <PHeading>Footer</PHeading>
                                        </slot>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { PHeading } from '../../../../components/PHeading';

    export default {
        name: 'PRightSidebar',
        components: {
            PHeading,
        },
        props: {
            rightSidebarTitle: {
                type: String,
                default: null,
            },
        },
        data() {
            return {};
        },
        computed: {
            className() {
            },
        },
        methods: {},
    }
</script>

<style scoped>

</style>