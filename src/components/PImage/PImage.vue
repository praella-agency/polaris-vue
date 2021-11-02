<template>
    <img :alt="alt" :src="source" :class="className" />
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import {classNames, variationName} from '@/utilities/css';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Use image as a visual anchor and identifier for an object. They should be used along with text
     *  to provide context.</h4>
     */
    @Component
    export default class PImage extends Vue {

        /**
         * Image source
         */
        @Prop({type: String, default: null}) public source!: string;

        /**
         * Image alt
         */
        @Prop({type: String, default: null}) public alt!: string;

        /**
         * Image class
         */
        @Prop({type: String, default: null}) public imgClass!: string;

        public get className() {
            return classNames(
                this.imgClass,
            );
        }
    }
</script>
