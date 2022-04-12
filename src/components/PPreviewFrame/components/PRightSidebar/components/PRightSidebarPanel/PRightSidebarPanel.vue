<template>
    <div class="Polaris-PreviewFrame__StaticPanel" tabindex="-1" :aria-hidden="responsiveRightSidebar">
        <div class="Polaris-PreviewFrame__ChildrenWrapper">
            <div :class="className"
            >
                <section
                    v-if="rightSidebarTitle || $slots['sidebar.right.title']"
                    :class="sectionClassName"
                >
                    <div class="Polaris-PreviewFrame__ChildrenWrapper--header">
                        <div :class="rightHeaderClassName">
                            <div class="Polaris-PreviewFrame__RightTitleWrapper">
                                <div v-if="responsiveRightSidebar"
                                     class="Polaris-PreviewFrame__RightHeader--BackActionWrapper">
                                    <PButton
                                        plainAction
                                        type="button"
                                        icon="ChevronLeftMinor"
                                        @click="handleBackClick"
                                    />
                                </div>
                                <PHeading>
                                    <slot name="sidebar.right.title">
                                        {{ rightSidebarTitle }}
                                    </slot>
                                </PHeading>
                            </div>
                        </div>
                    </div>
                </section>
                <section
                    class="Polaris-PreviewFrame__Section--header
                                    Polaris-PreviewFrame__sectionSpacingDefault
                                    Polaris-PreviewFrame__paddingBase"
                >
                    <div class="Polaris-PreviewFrame__ChildrenWrapper--header">
                        <slot name="sidebar.right.content"/>
                    </div>
                </section>
            </div>
            <div
                v-if="$slots['sidebar.right.footer']"
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
                                <slot name="sidebar.right.footer"/>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
    import { classNames } from "../../../../../../utilities/css";
    import { PHeading } from '../../../../../../components/PHeading';
    import { PButton } from '../../../../../../components/PButton';

    export default {
        name: 'PRightSidebarPanel',
        components: {
            PHeading, PButton,
        },
        props: {
            rightSidebarTitle: {
                type: String,
                default: null,
            },
            responsiveRightSidebar: {
                type: Boolean,
                default: false,
            },
        },
        emits: ['backClick'],
        computed: {
            className() {
                return classNames(
                    'Polaris-PreviewFrame__Layout',
                    'Polaris-PreviewFrame__layoutSpacingDefault',
                    'Polaris-PreviewFrame__spaceAfter',
                    !this.responsiveRightSidebar && 'Polaris-PreviewFrame__spaceBefore',
                    'Polaris-PreviewFrame__fullHeight',
                    'Polaris-PreviewFrame__scrollable',
                );
            },
            sectionClassName() {
                return classNames(
                    'Polaris-PreviewFrame__Section--header',
                    'Polaris-PreviewFrame__sectionSpacingDefault',
                    'Polaris-PreviewFrame__paddingBase',
                    this.responsiveRightSidebar && 'Polaris-PreviewFrame__Section--sticky',
                );
            },
            rightHeaderClassName() {
                return classNames(
                    'Polaris-PreviewFrame__RightHeader',
                    this.responsiveRightSidebar && 'Polaris-PreviewFrame__RightHeader--sticky',
                    this.responsiveRightSidebar && 'Polaris-PreviewFrame__RightHeader--hasBack',
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