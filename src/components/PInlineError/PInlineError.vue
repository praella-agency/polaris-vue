<template>
    <div :id="`${fieldID}Error`" class="Polaris-InlineError">
        <div class="Polaris-InlineError__Icon">
            <PIcon source="AlertMinor"/>
        </div>
        {{message}}
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { PIcon } from './../../components/PIcon/index.js';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Inline errors are brief, in-context messages that tell merchants something went wrong with a single
     *  or group of inputs in a form. Use inline errors to help merchants understand why a form input may not be valid
     *  and how to fix it.</h4>
     */
    @Component({
        components: {
            PIcon,
        },
    })
    export default class PInlineError extends Vue {

        /**
         * Unique identifier of the invalid form field that the message describes
         */
        @Prop({type: String, default: null}) public message!: string;

        /**
         * Content briefly explaining how to resolve the invalid form field input.
         */
        @Prop({type: [String, Number], default: null}) public fieldID!: string | number;
    }
</script>
