<template>
    <img :alt="alt" :src="source" :class="className" />
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import {classNames, variationName} from '@/utilities/css';

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
