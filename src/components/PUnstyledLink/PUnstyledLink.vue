<template>
    <component
        :is="(to ? 'router-link' : 'a')"
        :href="url"
        :to="to"
        :target="target"
        :rel="rel"
        v-bind="$attrs"
        v-on="$listeners"
    >
        <!-- @slot The content to display inside the link -->
        <slot/>
    </component>
</template>

<script>
    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">UnstyledLink take users to another place, and usually appear within or directly following a sentence.
     *  Similar to Link.
     *  </h4>
     */
    export default {
        name: 'PUnstyledLink',
        props: {
            /**
             * Set to for router link
             */
            to: {
                type: String | Object,
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
        },
        computed: {
            target() {
                return this.external ? '_blank' : undefined;
            },
            rel() {
                return this.external ? 'noopener noreferrer' : undefined;
            },
        },
    }
</script>
