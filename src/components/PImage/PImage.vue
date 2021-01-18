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
        @Prop(String) public source!: string;

        /**
         * Image alt
         */
        @Prop(String) public alt!: string;

        /**
         * Image class
         */
        @Prop(String) public imgClass!: string;

        public get className() {
            return classNames(
                this.imgClass,
            );
        }
    }
</script>
