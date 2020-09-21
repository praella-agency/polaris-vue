<template>
    <img :alt="alt" :src="source" :class="className" />
</template>

<script lang="ts">

    import { Component, Vue, Prop } from 'vue-property-decorator';
    import {classNames, variationName} from '@/utilities/css';

    export default class PImage extends Vue {

        @Prop(String) public source!: string;
        @Prop(String) public alt!: string;
        @Prop(String) public class!: string;

        public get className() {
            return classNames(
                this.class,
            );
        }
    }
</script>
