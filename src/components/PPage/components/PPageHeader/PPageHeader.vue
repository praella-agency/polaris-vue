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
                    <div v-if="Object.keys(primaryAction).length > 0 || $slots.hasOwnProperty('primaryAction')"
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
        <div class="Polaris-Page-Header__Row"
             v-if="$slots.hasOwnProperty('additionalNavigation') || avatar || avatarInitials">
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

<script>
    import utils from '../../../../utilities';
    import { classNames } from '../../../../utilities/css';
    import { hasGroupsWithActions } from '../../../../components/PActionMenu/utilities';
    import { PTextStyle } from '../../../../components/PTextStyle';
    import { PBreadcrumbs } from '../../../../components/PBreadcrumbs';
    import { PPagination } from '../../../../components/PPagination';
    import { PActionMenu } from '../../../../components/PActionMenu';
    import { PButton } from '../../../../components/PButton';
    import { PPageHeaderTitle } from '../../../../components/PPage/components/PPageHeaderTitle';
    import { PPopover } from '../../../../components/PPopover';
    import { PActionList } from '../../../../components/PActionList';
    import { PButtonGroup } from '../../../../components/PButtonGroup';
    import { PAvatar } from '../../../../components/PAvatar';

    export default {
        name: 'PPageHeader',
        components: {
            PBreadcrumbs, PPagination, PPageHeaderTitle, PActionMenu, PTextStyle, PButton, PPopover, PActionList,
            PButtonGroup, PAvatar,
        },
        props: {
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
        },
        data() {
            return {
                /**
                 * To Check that view collapsed or not.
                 */
                isNavigationCollapsed: {
                    rollup: false,
                },
                bulkActionsShown: false,
            };
        },
        computed: {
            headerClassNames() {
                return classNames(
                    'Polaris-Page-Header',
                    this.titleHidden && 'Polaris-Page-Header--titleHidden',
                    this.separator && 'Polaris-Page-Header--separator',
                    this.hasNavigation && 'Polaris-Page-Header--hasNavigation',
                    this.hasActionMenu && 'Polaris-Page-Header--hasActionMenu',
                    this.title && 'Polaris-Page-Header--mediumTitle',
                    this.isNavigationCollapsed.rollup && 'Polaris-Page-Header--mobileView',
                );
            },
            hasNavigation() {

                return this.breadcrumbs.length > 0 || this.$slots.additionalNavigation || this.pagination;
            },
            hasActions() {
                return this.hasActionMenu ||
                    Object.keys(this.primaryAction).length > 0 ||
                    Object.keys(this.pagination).length > 0 ||
                    this.$props.hasOwnProperty('primaryAction');
            },
            hasActionMenu() {
                return this.secondaryActions.length > 0 || hasGroupsWithActions(this.actionGroups);
            },
            hasTitle() {
                return this.title || this.subtitle || this.titleMetadata || this.thumbnail ||
                    (utils.isVue3 ? this.$slots.titleMetadata : this.$slots.hasOwnProperty('titleMetadata'));
            },
            hasAvatar() {
                return this.avatar || this.avatarInitials;
            },
        },
        methods: {
            useMediaQuery() {
                if (window.innerWidth <= 768) {
                    if (utils.isVue2) {
                        this.$set(this.isNavigationCollapsed, 'rollup', true);
                    } else {
                        this.isNavigationCollapsed['rollup'] = true;
                    }
                } else {
                    if (utils.isVue2) {
                        this.$set(this.isNavigationCollapsed, 'rollup', false);
                    } else {
                        this.isNavigationCollapsed['rollup'] = false;
                    }
                }
            },
        },
        created() {
            window.addEventListener('resize', this.useMediaQuery);
            this.useMediaQuery();
        },
        destroyed() {
            window.removeEventListener('resize', this.useMediaQuery);
        },
    }
</script>
