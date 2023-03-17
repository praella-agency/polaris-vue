<template>
    <div :class="headerClassNames">
        <div class="Polaris-Page-Header__Row">
            <div v-if="breadcrumbs.length > 0" class="Polaris-Page-Header__BreadcrumbWrapper">
                <PBreadcrumbs :breadcrumbs="breadcrumbs"/>
            </div>
            <div class="Polaris-Page-Header__TitleWrapper" v-if="hasTitle">
                <PPageHeaderTitle
                    :title="title"
                    :subtitle="subtitle"
                    :titleMetadata="titleMetadata"
                    :alt="thumbnailAlt"
                    :source="thumbnail"
                >
                    <template #titleMetadata>
                        <slot name="titleMetadata"/>
                    </template>
                </PPageHeaderTitle>
            </div>
            <div class="Polaris-Page-Header__RightAlign">
                <div class="Polaris-Page-Header__Actions" v-if="hasActions">
                    <PActionMenu :groups="actionGroups" :actions="secondaryActions" v-if="hasActionMenu"
                                 :rollup="isNavigationCollapsed.rollup"/>
                    <div v-if="Object.keys(primaryAction).length > 0 || isSlot(slots.primaryAction)"
                         class="Polaris-Page-Header__PrimaryActionWrapper">
                        <slot name="primaryAction">
                            <PButton
                                v-if="Object.keys(primaryAction).length"
                                v-bind="primaryAction"
                                :primary="primaryAction.primary === undefined ? true : primaryAction.primary"
                                @click="primaryAction.onAction()"
                            >
                                {{ primaryAction.content }}
                            </PButton>
                        </slot>
                    </div>
                    <div
                        class="Polaris-Page-Header__PaginationWrapper"
                        v-if="Object.keys(pagination).length > 0 && !isNavigationCollapsed.rollup">
                        <nav aria-label="Pagination">
                            <PPagination v-bind="pagination"/>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        <div class="Polaris-Page-Header__Row" v-if="isSlot(slots.additionalNavigation) || avatar || avatarInitials">
            <div class="Polaris-Page-Header__LeftAlign"></div>
            <div class="Polaris-Page-Header__RightAlign">
                <div class="Polaris-Page-Header__AdditionalNavigationWrapper">
                    <div v-if="avatarInitials || avatar">
                        <PAvatar :source="avatar" :initials="avatarInitials"/>
                    </div>
                    <slot name="additionalNavigation"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { computed, onMounted, onUnmounted, ref, useSlots } from 'vue';
    import { hasSlot } from '../../../../ComponentHelpers';
    import { classNames } from '../../../../utilities/css';
    import { hasGroupsWithActions } from '../../../PActionMenu/utilities';
    import { PBreadcrumbs } from '../../../../components/PBreadcrumbs';
    import { PPagination } from '../../../../components/PPagination';
    import { PActionMenu } from '../../../../components/PActionMenu';
    import { PButton } from '../../../../components/PButton';
    import { PPageHeaderTitle } from '../../../../components/PPage/components/PPageHeaderTitle';
    import { PAvatar } from '../../../../components/PAvatar';

    let props = defineProps({
        title: {
            type: String,
        },
        subtitle: {
            type: String,
        },
        thumbnail: {
            type: String,
        },
        thumbnailAlt: {
            type: String,
        },
        titleMetadata: {
            type: String,
        },
        avatar: {
            type: String,
        },
        avatarInitials: {
            type: String,
        },
        additionalMetaData: {
            type: String,
        },
        titleHidden: {
            type: Boolean,
            default: false,
        },
        separator: {
            type: Boolean,
        },
        primaryAction: {
            type: Object,
            default: () => ({}),
        },
        pagination: {
            type: Object,
            default: () => ({}),
        },
        breadcrumbs: {
            type: Array,
            default: () => ([]),
        },
        secondaryActions: {
            type: Array,
            default: () => ([]),
        },
        actionGroups: {
            type: Array,
            default: () => ([]),
        },
    });

    let slots = useSlots();
    /**
     * To Check that view collapsed or not.
     */
    let isNavigationCollapsed = ref({
        rollup: false,
    });

    let hasNavigation = computed(() => {
        return props.breadcrumbs.length > 0 || hasSlot(slots.additionalNavigation) || props.pagination;
    });

    let hasActionMenu = computed(() => {
        return props.secondaryActions.length > 0 || hasGroupsWithActions(props.actionGroups);
    });

    let headerClassNames = computed(() => {
        return classNames(
            'Polaris-Page-Header',
            props.titleHidden && 'Polaris-Page-Header--titleHidden',
            props.separator && 'Polaris-Page-Header--separator',
            hasNavigation.value && 'Polaris-Page-Header--hasNavigation',
            hasActionMenu.value && 'Polaris-Page-Header--hasActionMenu',
            props.title && 'Polaris-Page-Header--mediumTitle',
            isNavigationCollapsed.value.rollup && 'Polaris-Page-Header--mobileView',
        );
    });

    let hasActions = computed(() => {
        return hasActionMenu.value || Object.keys(props.primaryAction).length > 0 || Object.keys(props.pagination).length > 0 || Object.prototype.hasOwnProperty.call(props, 'primaryAction');
    });

    let hasTitle = computed(() => {
        return props.title || props.subtitle || props.titleMetadata || props.thumbnail || hasSlot(slots.titleMetadata);
    });

    let isSlot = computed(() => {
        return hasSlot;
    });

    function useMediaQuery() {
        isNavigationCollapsed.value['rollup'] = window.innerWidth <= 768;
    }

    onMounted(() => {
        window.addEventListener('resize', useMediaQuery);
        useMediaQuery();
    });

    onUnmounted(() => {
        window.removeEventListener('resize', useMediaQuery);
    });
</script>
