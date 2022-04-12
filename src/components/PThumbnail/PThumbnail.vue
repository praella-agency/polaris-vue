<template>
    <span :class="className">
        <PImage v-if="!isSvg(source)" v-bind="$attrs" :source="source" :alt="alt"
                class="Polaris-Thumbnail__Image"/>
        <PIcon v-else :alt="alt" :source="source"/>
    </span>
</template>

<script>
    import { classNames, variationName } from '../../utilities/css';
    import { PImage } from '../../components/PImage';
    import { PIcon } from '../../components/PIcon';
    import StringValidator from '../../utilities/validators/StringValidator';

    const Size = ['small', 'medium', 'large'];

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Use thumbnail as a visual anchor and identifier for an object. They should be used along with text
     *  to provide context.</h4>
     */

    export default {
        name: 'PThumbnail',
        components: {
            PImage, PIcon,
        },
        props: {
            /**
             * Thumbnail Size.
             */
            size: {
                type: String,
                default: 'medium',
                ...StringValidator('size', Size)
            },

            /**
             * Image source.
             */
            source: {
                type: String,
                default: null
            },

            /**
             * Image alt.
             */
            alt: {
                type: String,
                default: null
            }
        },
        computed: {
            className() {
                return classNames(
                    'Polaris-Thumbnail',
                    this.size && `Polaris-Thumbnail--${variationName('size', this.size)}`,
                );
            }
        },
        methods: {
            isSvg(source) {
                const isSVG = new RegExp(/(<svg)([^<]*|[^>]*)/);

                return isSVG.test(source);
            }
        }
    }
</script>
