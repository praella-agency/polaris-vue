<template>
    <span :class="className">
        <PImage v-if="!isSvg(source)" v-bind="$attrs" :source="source" :alt="alt"
                class="Polaris-Thumbnail__Image"/>
        <PIcon v-else :alt="alt" :source="source"/>
    </span>
</template>

<script setup>
    import { computed } from 'vue';
    import { classNames, variationName } from '../../utilities/css';
    import { PImage } from '../../components/PImage';
    import { PIcon } from '../../components/PIcon';
    import StringValidator from '../../utilities/validators/StringValidator';
    import { ThumbnailSize } from '../variables';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Use thumbnail as a visual anchor and identifier for an object. They should be used along with text
     *  to provide context.</h4>
     */

    let props = defineProps({
        /**
         * Thumbnail Size.
         */
        size: {
            type: String,
            default: 'medium',
            ...StringValidator('size', ThumbnailSize)
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
    });

    let className = computed(() =>{
        return classNames(
            'Polaris-Thumbnail',
            props.size && `Polaris-Thumbnail--${variationName('size', props.size)}`,
        );
    });

    function isSvg(source) {
        const isSVG = new RegExp(/(<svg)([^<]*|[^>]*)/);

        return isSVG.test(source);
    }
</script>
