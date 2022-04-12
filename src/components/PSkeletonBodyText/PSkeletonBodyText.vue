<template>
    <div class="Polaris-SkeletonBodyText__SkeletonBodyTextContainer">
        <div v-for="(line, i) in lines" :key="i" class="Polaris-SkeletonBodyText"/>
    </div>
</template>

<script>

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Skeleton body text is used to provide a low fidelity representation of content before it appears on the
     *  page, and improves load times perceived by merchants. Can be used for content in or outside of a card.</h4>
     */
    export default {
        name: 'PSkeletonBodyText',
        props: {
            /**
             * Number of line of skeleton
             */
            lines: {
                type: Number,
                default: 3
            }
        }
    }
</script>
