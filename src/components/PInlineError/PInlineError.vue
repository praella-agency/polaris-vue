<template>
    <div :id="`${fieldID}Error`" class="Polaris-InlineError">
        <div class="Polaris-InlineError__Icon">
            <PIcon source="AlertMinor"/>
        </div>
        {{ message }}
    </div>
</template>

<script>
    import { PIcon } from '@/components/PIcon';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Inline errors are brief, in-context messages that tell merchants something went wrong with a single
     *  or group of inputs in a form. Use inline errors to help merchants understand why a form input may not be valid
     *  and how to fix it.</h4>
     */
    export default {
        name: 'PInlineError',
        components: {
            PIcon,
        },
        props: {
            /**
             * Unique identifier of the invalid form field that the message describes
             */
            message: {
                type: String,
                default: null,
            },
            /**
             * Content briefly explaining how to resolve the invalid form field input.
             */
            fieldID: {
                type: [String, Number],
                default: null,
            },
        },
    }
</script>
