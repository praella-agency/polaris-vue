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
            v-on="listeners"
        >
            <!-- @slot Use some other component for primary Action -->
            <template #primaryAction>
                <slot name="primaryAction"/>
            </template>
            <!-- @slot Use some other component for title meta data -->
            <template #titleMetadata>
                <slot name="titleMetadata"/>
            </template>
            <!-- @slot Use some other component for additional navigation -->
            <template #additionalNavigation>
                <slot name="additionalNavigation"/>
            </template>
        </PPageHeader>
        <div class="Polaris-Page__Content">
            <!-- @slot The contents of the page -->
            <slot/>
        </div>
    </div>
</template>

<script>
    import utils from '../../utilities';
    import { hasSlot } from '../../ComponentHelpers';
    import { classNames } from '../../utilities/css';
    import { PPageHeader } from '../../components/PPage/components/PPageHeader';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Use to build the outer wrapper of a page, including the page title and associated actions.</h4>
     */
    export default {
        name: 'PPage',
        components: {
            PPageHeader,
        },
        props: {
            /**
             * Remove the normal max-width on the page
             */
            fullWidth: {
                type: Boolean,
                default: false,
            },
            /**
             * Decreases the maximum layout width. Intended for single-column layouts
             */
            narrowWidth: {
                type: Boolean,
                default: false,
            },
            /**
             * Page title, in large type
             */
            title: {
                type: String,
                default: null,
            },
            /**
             * Page thumbnail
             */
            thumbnail: {
                type: String,
                default: null,
            },
            /**
             * Thumbnail alt text
             */
            thumbnailAlt: {
                type: String,
                default: null,
            },
            /**
             * Primary page-level action
             */
            primaryAction: {
                type: Object,
                default: () => ({}),
            },
            /**
             * Collection of secondary page-level actions
             */
            secondaryActions: {
                type: Array,
                default: () => ([]),
            },
            /**
             * Collection of page-level groups of secondary actions
             */
            actionGroups: {
                type: Array,
                default: () => ([]),
            },
            /**
             * Collection of breadcrumbs
             */
            breadcrumbs: {
                type: Array,
                default: () => ([]),
            },
            /**
             * Page-level pagination
             */
            pagination: {
                type: Object,
                default: () => ({}),
            },
        },
        computed: {
            className() {
                return classNames(
                    'Polaris-Page',
                    this.fullWidth && 'Polaris-Page--fullWidth',
                    this.narrowWidth && 'Polaris-Page--narrowWidth',
                );
            },
            hasHeaderContent() {
                return (this.title != null && this.title !== '') ||
                    this.primaryAction != null ||
                    this.thumbnail ||
                    (this.secondaryActions != null && this.secondaryActions.length > 0) ||
                    (this.actionGroups != null && this.actionGroups.length > 0) ||
                    (hasSlot(this.$slots.primaryAction)) ||
                    (hasSlot(this.$slots.additionalNavigation)) ||
                    (this.breadcrumbs != null && this.breadcrumbs.length > 0);
            },
            listeners() {
                if (utils.isVue2) {
                    return this.$listeners;
                }
                return {};
            },
            hasSlot() {
                return hasSlot;
            },
        },
    }
</script>
