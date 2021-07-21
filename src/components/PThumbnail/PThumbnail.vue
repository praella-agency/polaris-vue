<template>
    <span :class="className">
        <PImage v-if="!isSvg(source)" v-bind="$attrs" :source="source" :alt="alt"
                class="Polaris-Thumbnail__Image" />
        <PIcon v-else :alt="alt" :source="source"/>
    </span>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import {classNames, variationName} from '@/utilities/css';
    import {PImage} from '@/components/PImage';
    import {PIcon} from '@/components/PIcon';
    type Size = 'small' | 'medium' | 'large';

    @Component({
        components: {
            PImage, PIcon,
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

        public isSvg(source) {
          const isSVG = new RegExp(/(<svg)([^<]*|[^>]*)/);

          return isSVG.test(source);
        }
    }
</script>
