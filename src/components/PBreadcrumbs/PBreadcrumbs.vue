<template>
    <nav role="navigation">
        <component :is="((breadcrumb?.to || breadcrumb?.url) ? PUnstyledLink : 'button')"
                   class="Polaris-Breadcrumbs__Breadcrumb"
                   :key="breadcrumb?.content"
                   :url="breadcrumb?.url"
                   :to="breadcrumb?.to"
                   :ariaLabel="breadcrumb?.accessibilityLabel"
                   @click="(breadcrumb.onAction && breadcrumb.onAction()) ? breadcrumb.onAction() : () => {}"
        >
            <span class="Polaris-Breadcrumbs__ContentWrapper">
                <span class="Polaris-Breadcrumbs__Icon">
                    <PIcon source="ChevronLeftMinor"/>
                </span>
                <span class="Polaris-Breadcrumbs__Content">
                    {{ breadcrumb?.content }}
                </span>
            </span>
        </component>
    </nav>
</template>
<script setup>
    import { onMounted, ref } from 'vue';
    import { PUnstyledLink } from '../../components/PUnstyledLink';
    import { PIcon } from '../../components/PIcon';
    import ArrayValidator from '../../utilities/validators/ArrayValidator';
    import { PBreadcrumbsProps } from '../variables';

    let props = defineProps({
        /**
         * Collection of breadcrumbs
         */
        breadcrumbs: {
            type: Array,
            default: () => ([]),
            ...ArrayValidator('breadcrumbs', PBreadcrumbsProps),
        },
    });
    const emit = defineEmits(['click']);
    let breadcrumb = ref(null);

    onMounted(() => {
        breadcrumb.value = props.breadcrumbs[props.breadcrumbs.length - 1];
    });
</script>
