<template>
    <div :class="className">
        <PPageHeader
            v-if="hasHeaderContent"
            :title="title"
            :breadcrumbs="breadcrumbs"
            :primaryAction="primaryAction"
            :secondaryActions="secondaryActions"
            :actionGroups="actionGroups"
            :thumbnail="thumbnail"
            :thumbnailAlt="thumbnailAlt"
            :pagination="pagination"
            v-bind="$attrs"
            v-on="$listeners"
        >
            <!-- @slot Use some other component for primary Action -->
            <slot slot="primaryAction" name="primaryAction" />
            <!-- @slot Use some other component for title meta data -->
            <slot slot="titleMetadata" name="titleMetadata" />
            <!-- @slot Use some other component for additional navigation -->
            <slot slot="additionalNavigation" name="additionalNavigation" />
        </PPageHeader>
        <div class="Polaris-Page__Content">
            <!-- @slot The contents of the page -->
            <slot/>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
import {classNames} from '@/utilities/css';
import { PPageHeader, PPageHeaderProps } from '@/components/PPage/components/PPageHeader';
import {
    DestructableAction,
    DisableableAction, IconableAction,
    LoadableAction,
    MenuActionDescriptor,
    MenuGroupDescriptor,
} from '@/types';
import { PPaginationDescriptor } from '@/components/PPagination/index.js';

export interface PPageProps extends PPageHeaderProps {
    fullWidth?: boolean;
    narrowWidth?: boolean;
}

interface PrimaryAction
    extends DestructableAction,
        DisableableAction,
        LoadableAction,
        IconableAction {
    primary?: boolean;
}

/**
 * <br/>
 * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
 *  sans-serif;">Use to build the outer wrapper of a page, including the page title and associated actions.</h4>
 */
@Component({
    components: {
        PPageHeader,
    },
})
export default class PPage extends Vue {

    /**
     * Remove the normal max-width on the page
     * @values true | false
     */
    @Prop({type: Boolean, default: false}) public fullWidth!: boolean;

    /**
     * Decreases the maximum layout width. Intended for single-column layouts
     * @values true | false
     */
    @Prop({type: Boolean, default: false}) public narrowWidth!: boolean;

    /**
     * Page title, in large type
     */
    @Prop({type: String, default: null}) public title!: string;

    /**
     * Page thumbnail
     */
    @Prop({type: String, default: null}) public thumbnail!: string;

    /**
     * Thumbnail alt text
     */
    @Prop({type: String, default: null}) public thumbnailAlt!: string;

    /**
     * Primary page-level action
     */
    @Prop({type: Object, default: () => ({})}) public primaryAction!: PrimaryAction;

    /**
     * Collection of secondary page-level actions
     */
    @Prop({type: Array, default: () => []}) public secondaryActions!: MenuActionDescriptor[];

    /**
     * Collection of page-level groups of secondary actions
     */
    @Prop({type: Array, default: () => []}) public actionGroups!: MenuGroupDescriptor[];

    /**
     * Collection of breadcrumbs
     */
    @Prop({type: Array, default: Array}) public breadcrumbs!: [];

    /**
     * Page-level pagination
     */
    @Prop(Object) public pagination!: PPaginationDescriptor;

    public get hasHeaderContent() {
        return (this.title != null && this.title !== '') ||
            this.primaryAction != null ||
            this.thumbnail ||
            (this.secondaryActions != null && this.secondaryActions.length > 0) ||
            (this.actionGroups != null && this.actionGroups.length > 0) ||
            (this.$slots.hasOwnProperty('primaryAction')) ||
            (this.$slots.hasOwnProperty('additionalNavigation')) ||
            (this.breadcrumbs != null && this.breadcrumbs.length > 0);
    }

    public get className() {
        return classNames(
            'Polaris-Page',
            this.fullWidth && 'Polaris-Page--fullWidth',
            this.narrowWidth && 'Polaris-Page--narrowWidth',
        );
    }
}
</script>
