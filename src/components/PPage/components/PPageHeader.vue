<template>
    <div :class="headerClassNames">
        <div v-if="hasNavigation" class="Polaris-Page-Header__Navigation">
            <div v-if="breadcrumbs.length > 0" class="Polaris-Page-Header__BreadcrumbWrapper">
                <PBreadcrumbs :breadcrumbs="breadcrumbs" />
            </div>
            <div v-if="$slots.additionalNavigation" class="Polaris-Page-Header__AdditionalNavigationWrapper">
                <slot name="additionalNavigation" />
            </div>
            <div v-if="pagination" class="Polaris-Page-Header__PaginationWrapper">
                <PPagination v-bind="pagination" plain />
            </div>
        </div>
        <div class="Polaris-Page-Header__MainContent">
            <div class="Polaris-Page-Header__TitleActionMenuWrapper" v-if="hasTitle || hasActionMenu">
                <div class="Polaris-Page-Header__TitleWrapper" v-if="hasTitle">
                    <PPageHeaderTitle :title="title" :subtitle="subtitle" :titleMetadata="titleMetadata">
                        <slot name="thumbnail" slot="thumbnail" />
                        <slot name="titleMetadata" slot="titleMetadata" />
                    </PPageHeaderTitle>
                </div>
                <div v-if="hasActionMenu" class="Polaris-Page-Header__ActionMenuWrapper">
                    <PActionMenu :actions="secondaryActions" :groups="actionGroups" :rollup="false" />
                </div>
            </div>
            <div v-if="primaryAction" class="Polaris-Page-Header__PrimaryActionWrapper">
                <PButton v-bind="primaryAction" :primary="primaryAction.primary === undefined ? true : primaryAction.primary" @click="primaryAction.onAction()">{{primaryAction.content}}</PButton>
            </div>
            <slot v-else name="primaryAction" />
        </div>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop} from 'vue-property-decorator';
    import {classNames} from '@/utilities/css';
    import {
        MenuGroupDescriptor,
        MenuActionDescriptor,
        DestructableAction,
        DisableableAction,
        LoadableAction,
        IconableAction,
    } from '@/types';
    import {PTextStyle} from '@/components/PTextStyle';
    import {PBreadcrumbs, PBreadcrumbsProps} from '@/components/PBreadcrumbs';
    import {PPagination, PPaginationDescriptor} from '@/components/PPagination';
    import {PActionMenu, hasGroupsWithActions} from '@/components/PActionMenu';
    import {PButton} from '@/components/PButton';
    import {PPageHeaderTitle, PPageHeaderTitleProps} from './components';

    interface PrimaryAction
        extends DestructableAction,
            DisableableAction,
            LoadableAction,
            IconableAction {
        primary?: boolean;
    }

    export interface PPageHeaderProps extends PPageHeaderTitleProps {
        titleHidden?: boolean;
        separator?: boolean;
        primaryAction?: PrimaryAction;
        pagination?: PPaginationDescriptor;
        breadcrumbs?: PBreadcrumbsProps['breadcrumbs'];
        secondaryActions?: MenuActionDescriptor[];
        actionGroups?: MenuGroupDescriptor[];
        additionalMetaData?: string;
    }

    @Component({
        components: {
            PBreadcrumbs,
            PPagination,
            PPageHeaderTitle,
            PActionMenu,
            PTextStyle,
            PButton,
        },
    })
    export default class PPageHeader extends Vue {

        @Prop(String) public title!: string;
        @Prop(String) public subtitle!: string;
        @Prop(String) public titleMetadata!: string;
        @Prop(String) public additionalMetaData!: string;
        @Prop({type: Boolean, default: false}) public titleHidden!: boolean;
        @Prop(Boolean) public separator!: boolean;
        @Prop(Object) public primaryAction!: PrimaryAction;
        @Prop(Object) public pagination!: PPaginationDescriptor;
        @Prop({type: Array, default: () => []}) public breadcrumbs!: PBreadcrumbsProps['breadcrumbs'];
        @Prop({type: Array, default: () => []}) public secondaryActions!: MenuActionDescriptor[];
        @Prop({type: Array, default: () => []}) public actionGroups!: MenuGroupDescriptor[];

        public get hasNavigation() {

            return this.breadcrumbs.length > 0 || this.$slots.additionalNavigation || this.pagination;
        }

        public get hasActionMenu() {
            return this.secondaryActions.length > 0 || new hasGroupsWithActions(this.actionGroups);
        }

        public get hasTitle() {
            return this.title || this.subtitle || this.titleMetadata || this.$slots.hasOwnProperty('thumbnail') ||
                this.$slots.hasOwnProperty('titleMetadata');
        }

        public get headerClassNames() {
            return classNames(
                'Polaris-Page-Header',
                this.titleHidden && 'Polaris-Page-Header--titleHidden',
                this.separator && 'Polaris-Page-Header--separator',
                this.hasNavigation && 'Polaris-Page-Header--hasNavigation',
                this.hasActionMenu && 'Polaris-Page-Header--hasActionMenu',
            );
        }
    }
</script>
