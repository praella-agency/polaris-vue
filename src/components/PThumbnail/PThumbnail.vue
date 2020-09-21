<template>
    <span :class="className">
      <PImage :alt="alt" :source="source" class="Polaris-Thumbnail__Image" />
    </span>
</template>

<script lang="ts">

    import { Component, Vue, Prop } from 'vue-property-decorator';
    import {classNames, variationName} from '@/utilities/css';
    import { PImage } from '@/components/PImage';

    type Size = 'small' | 'medium' | 'large';

    @Component({
        components: {
            PImage,
        },
    })

    export default class PThumbnail extends Vue {

        @Prop(String) public source!: string;
        @Prop(String) public alt!: string;
        @Prop({type: String, default: 'medium'}) public size!: Size;


        public get className() {
            return classNames(
                'Polaris-Thumbnail',
                this.size && `Polaris-Thumbnail--${variationName('size', this.size)}`,
            );
        }
    }
</script>
