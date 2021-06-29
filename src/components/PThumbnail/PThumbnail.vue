<template>
    <span :class="className">
      <PImage v-bind="$attrs" :source="source" :alt="alt" class="Polaris-Thumbnail__Image" />
    </span>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import {classNames, variationName} from '@/utilities/css';
    import {PImage} from '@/components/PImage';
    type Size = 'small' | 'medium' | 'large';

    @Component({
        components: {
            PImage,
        },
    })
    export default class PThumbnail extends Vue {

        /**
         * Thumbnail Size.
         * @values small | medium | large
         */
        @Prop({type: String, default: 'medium'}) public size!: Size;

        /**
         * Image source.
         * @values URL | Path
         */
        @Prop({type: String, default: null}) public source!: string;

        /**
         * Image alt
         * @values text
         */
        @Prop({type: String, default: null}) public alt!: string;

        public get className() {
            return classNames(
                'Polaris-Thumbnail',
                this.size && `Polaris-Thumbnail--${variationName('size', this.size)}`,
            );
        }
    }
</script>
