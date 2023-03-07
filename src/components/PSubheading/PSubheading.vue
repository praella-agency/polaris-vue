<template>
    <component :is="element" :class="className">
        <!-- @slot Text to display in subheading -->
        <slot/>
    </component>
</template>

<script setup>
    import { computed } from 'vue';
    import StringValidator from '../../utilities/validators/StringValidator';
    import { SubHeadingTagName } from '../variables';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Subheadings are used for the title of any sub-sections in top-level page sections.</h4>
     */

    let props = defineProps({
        /**
         * Element for heading.
         */
        element: {
            type: String,
            default: 'h3',
            ...StringValidator('element', SubHeadingTagName)
        }
    });

    let className = computed(() => {
        return 'Polaris-Subheading';
    });
</script>
