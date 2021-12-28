<template>
    <div :class="className" aria-label="Polaris Preview Theme Sidebar">
        <div class="Polaris-PreviewFrame__PanelArea">
            <a id="Polaris-PreviewFrame-SkipTarget" tabindex="-1"></a>
            <div class="Polaris-PreviewFrame__StaticPanel" tabindex="-1" :aria-hidden="false">
                <div class="Polaris-PreviewFrame__ChildrenWrapper">
                    <div class="Polaris-PreviewFrame__Layout
                                Polaris-PreviewFrame__layoutSpacingDefault
                                Polaris-PreviewFrame__spaceAfter
                                Polaris-PreviewFrame__spaceBefore
                                Polaris-PreviewFrame__fullHeight
                                Polaris-PreviewFrame__scrollable"
                    >
                        <div v-if="rightSidebarTitle || $slots.rightSidebarTitle" class="Polaris-PreviewFrame__NavHeader">
                            <div class="Polaris-PreviewFrame__Section Polaris-PreviewFrame__alignToNav">
                                <PHeading>
                                    <slot name="rightSidebarTitle">
                                        {{ rightSidebarTitle }}
                                    </slot>
                                </PHeading>
                            </div>
                        </div>
                        <section
                            class="Polaris-PreviewFrame__Section--header
                                    Polaris-PreviewFrame__sectionSpacingDefault
                                    Polaris-PreviewFrame__paddingBase"
                        >
                            <div class="Polaris-PreviewFrame__ChildrenWrapper--header">
                                <slot name="rightSidebarContent">
                                    <PHeading>Content</PHeading>
                                </slot>
                            </div>
                        </section>
                    </div>
                    <div
                        v-if="$slots.rightSidebarFooter"
                        class="Polaris-PreviewFrame__Layout
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
    import { classNames } from '../../../../utilities/css';

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
            previewMode: {
                type: String,
                default: 'desktop',
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