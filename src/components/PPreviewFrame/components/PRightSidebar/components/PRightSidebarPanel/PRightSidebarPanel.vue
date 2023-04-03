<template>
    <div class="Polaris-PreviewFrame__StaticPanel" tabindex="-1" :aria-hidden="responsiveRightSidebar">
        <div class="Polaris-PreviewFrame__ChildrenWrapper">
            <div :class="className"
            >
                <section
                    v-if="rightSidebarTitle || isSlot($slots['sidebar.right.title'])"
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
                v-if="isSlot($slots['sidebar.right.footer'])"
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

<script setup>
    import { computed } from 'vue';
    import { hasSlot } from '../../../../../../ComponentHelpers';
    import { classNames } from "../../../../../../utilities/css";
    import { PHeading } from '../../../../../../components/PHeading';
    import { PButton } from '../../../../../../components/PButton';

    let props = defineProps({
        rightSidebarTitle: {
            type: String,
            default: null,
        },
        responsiveRightSidebar: {
            type: Boolean,
            default: false,
        },
    });
    const emit = defineEmits(['backClick']);

    let className = computed(() => {
        return classNames(
            'Polaris-PreviewFrame__Layout',
            'Polaris-PreviewFrame__layoutSpacingDefault',
            'Polaris-PreviewFrame__spaceAfter',
            !props.responsiveRightSidebar && 'Polaris-PreviewFrame__spaceBefore',
            'Polaris-PreviewFrame__fullHeight',
            'Polaris-PreviewFrame__scrollable',
        );
    });

    let sectionClassName = computed(() => {
        return classNames(
            'Polaris-PreviewFrame__Section--header',
            'Polaris-PreviewFrame__sectionSpacingDefault',
            'Polaris-PreviewFrame__paddingBase',
            props.responsiveRightSidebar && 'Polaris-PreviewFrame__Section--sticky',
        );
    });

    let rightHeaderClassName = computed(() => {
        return classNames(
            'Polaris-PreviewFrame__RightHeader',
            props.responsiveRightSidebar && 'Polaris-PreviewFrame__RightHeader--sticky',
            props.responsiveRightSidebar && 'Polaris-PreviewFrame__RightHeader--hasBack',
        );
    });

    let isSlot = computed(() => {
        return hasSlot;
    });

    function handleBackClick() {
        emit('backClick', false);
    }
</script>
