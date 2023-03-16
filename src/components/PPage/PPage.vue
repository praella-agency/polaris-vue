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
            v-bind="attrs"
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

<script setup>
import {computed, useAttrs, useSlots} from 'vue';
    import { hasSlot } from '../../ComponentHelpers';
    import { classNames } from '../../utilities/css';
    import { PPageHeader } from '../../components/PPage/components/PPageHeader';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Use to build the outer wrapper of a page, including the page title and associated actions.</h4>
     */

    let props = defineProps({
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
    });
    let slots = useSlots();
    let attrs = useAttrs();

    let className = computed(() => {
        return classNames(
            'Polaris-Page',
            props.fullWidth && 'Polaris-Page--fullWidth',
            props.narrowWidth && 'Polaris-Page--narrowWidth',
        );
    });

    let hasHeaderContent = computed(() => {
        return (props.title != null && props.title !== '') ||
            props.primaryAction != null ||
            props.thumbnail ||
            (props.secondaryActions != null && props.secondaryActions.length > 0) ||
            (props.actionGroups != null && props.actionGroups.length > 0) ||
            (hasSlot(slots.primaryAction)) ||
            (hasSlot(slots.additionalNavigation)) ||
            (props.breadcrumbs != null && props.breadcrumbs.length > 0);
    });

    let listeners = computed(() => {
        return {};
    });
</script>
