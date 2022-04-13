<template>
    <p class="Polaris-Caption" :id="id">
        <!-- @slot Add content to use as a graph label or timestamp -->
        <slot/>
    </p>
</template>

<script>
    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Caption text size is smaller than the recommended size for general reading. On web, it should be
     *  used only in a graph or as a timestamp for a list item. On Android and iOS, it can also be used as help text or
     *  as other kinds of secondary text for list items.</h4>
     */
    export default {
        name: 'PCaption',
        props: {
            /**
             * Id for the element
             */
            id: {
                type: [String, Number],
                default: null
            }
        },
    }
</script>
