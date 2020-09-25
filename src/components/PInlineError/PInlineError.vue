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

        @Prop(String) public message!: string;
        @Prop(String) public fieldID!: string;
    }
</script>
