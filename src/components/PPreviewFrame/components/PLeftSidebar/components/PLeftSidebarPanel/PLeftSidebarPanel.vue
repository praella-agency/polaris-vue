<template>
    <div :class="responsiveClassName" tabindex="-1" :aria-hidden="responsiveRightSidebar && openRightSidebar">
        <div class="Polaris-PreviewFrame__ChildrenWrapper">
            <div class="Polaris-PreviewFrame__Layout
                                Polaris-PreviewFrame__layoutSpacingDefault
                                Polaris-PreviewFrame__spaceAfter
                                Polaris-PreviewFrame__fullHeight
                                Polaris-PreviewFrame__scrollable"
            >
                <div v-if="leftSidebarTitle" class="Polaris-PreviewFrame__NavHeader">
                    <div class="Polaris-PreviewFrame__Section Polaris-PreviewFrame__alignToNav">
                        <PHeading>
                            <slot name="sidebar.left.title">
                                {{ leftSidebarTitle }}
                            </slot>
                        </PHeading>
                    </div>
                </div>
                <section
                    class="Polaris-PreviewFrame__Section--header
                                    Polaris-PreviewFrame__sectionSpacingExtraTight
                                    Polaris-PreviewFrame__paddingNone"
                >
                    <div class="Polaris-PreviewFrame__ChildrenWrapper--header">
                        <slot name="sidebar.left.content"/>
                    </div>
                </section>
            </div>
            <div
                v-if="hasSlot($slots['sidebar.left.footer'])"
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
                                <slot name="sidebar.left.footer"/>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
    import { hasSlot } from '../../../../../../ComponentHelpers';
    import { classNames } from '../../../../../../utilities/css';
    import { PHeading } from '../../../../../../components/PHeading';

    export default {
        name: 'PLeftSidebarPanel',
        components: {
            PHeading,
        },
        props: {
            leftSidebarTitle: {
                type: String,
                default: null,
            },
            responsiveRightSidebar: {
                type: Boolean,
                default: false,
            },
            openRightSidebar: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            responsiveClassName() {
                return classNames(
                    'Polaris-PreviewFrame__StaticPanel',
                    (this.responsiveRightSidebar && this.openRightSidebar) && 'Polaris-PreviewFrame__StaticPanel--suspend',
                );
            },
            hasSlot() {
                return hasSlot;
            },
        }
    }
</script>

<style scoped>

</style>