<template>
    <img :alt="alt" :src="source" :class="className"/>
</template>

<script setup>
    import { computed } from 'vue';
    import { classNames } from '../../utilities/css';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Use image as a visual anchor and identifier for an object. They should be used along with text
     *  to provide context.</h4>
     */
    let props = defineProps({
        /**
         * Image source
         */
        source: {
            type: String,
            default: null
        },

        /**
         * Image alt
         */
        alt: {
            type: String,
            default: null
        },

        /**
         * Image class
         */
        imgClass: {
            type: String,
            default: null
        }
    });

    let className = computed(() => {
        return classNames(props.imgClass);
    });
</script>
