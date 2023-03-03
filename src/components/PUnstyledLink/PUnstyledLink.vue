<template>
    <component
        :is="(to ? 'router-link' : 'a')"
        :href="url"
        :to="to"
        :target="target"
        :rel="rel"
        :download="download"
        v-bind="attrs"
        v-on="listeners"
    >
        <!-- @slot The content to display inside the link -->
        <slot/>
    </component>
</template>

<script setup>
    import { computed, useAttrs } from 'vue';
    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">UnstyledLink take users to another place, and usually appear within or directly following a sentence.
     *  Similar to Link.
     *  </h4>
     */
    let props = defineProps({
        /**
         * Set to for router link
         */
        to: {
            type: [String, Object],
            default: null,
        },
        /**
         * Set url for URL
         */
        url: {
            type: String,
            delay: undefined,
        },
        /**
         * Set true for open URL in new tab
         */
        external: {
            type: Boolean,
            default: false,
        },
        /**
         * Makes the browser download the url instead of opening it. Provides a hint for the downloaded filename
         * if it is a string value
         */
        download: {
            type: [Boolean, String],
            default: false,
        },
    });

    let attrs = useAttrs();

    let target = computed(() => {
        return props.external ? '_blank' : undefined;
    });

    let rel = computed(() => {
        return props.external ? '_blank' : undefined;
    });

    let listeners = computed(() => {
        return props.external ? '_blank' : undefined;
    });
</script>
