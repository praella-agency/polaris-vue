<template>
    <component
        :is="(to ? 'router-link' : 'a')"
        :href="url"
        :to="to"
        :target="target"
        :rel="rel"
        :download="download"
        v-bind="$attrs"
        v-on="listeners"
    >
        <!-- @slot The content to display inside the link -->
        <slot/>
    </component>
</template>

<script>
    import { defineComponent, computed } from 'vue';
    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">UnstyledLink take users to another place, and usually appear within or directly following a sentence.
     *  Similar to Link.
     *  </h4>
     */
    export default defineComponent({
        name: 'PUnstyledLink',
        props: {
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
        },
        setup(props) {
            const target = computed(() => {
                return props.external ? '_blank' : undefined;
            });

            const rel = computed(() => {
                return props.external ? '_blank' : undefined;
            });

            const listeners = computed(() => {
                return props.external ? '_blank' : undefined;
            });

            return { target, rel, listeners };
        }
    })
</script>
