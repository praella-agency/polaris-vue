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
    import {PIcon} from '@/components/PIcon';

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
        @Prop({type: String, default: null}) public fieldID!: string;
    }
</script>
