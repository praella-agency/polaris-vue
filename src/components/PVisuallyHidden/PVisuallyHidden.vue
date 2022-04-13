<template>
    <span class="Polaris-VisuallyHidden" :id="id">
        <!-- @slot The content to be hidden visually -->
        <slot/>
    </span>
</template>

<script>
    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Use when an element needs to be available to assistive technology (for example, a screen reader) but
     *  otherwise hidden.</h4>
     */
    export default {
        name: 'PVisuallyHidden',
        props: {
            /**
             * Id for the element
             */
            id: {
                type: [String, Number],
                default: null
            }
        }
    }
</script>

<style scoped>

</style>