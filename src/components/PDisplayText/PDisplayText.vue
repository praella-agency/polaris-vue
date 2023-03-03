<template>
    <span v-if="element === 'span'">
        <slot/>
    </span>
    <component v-else :is="element" :class="className">
        <!-- @slot Content to display -->
        <slot/>
    </component>
</template>

<script setup>
    import { computed } from 'vue';
    import { classNames, variationName } from '../../utilities/css';
    import StringValidator from '../../utilities/validators/StringValidator';
    import { DisplayTextSize, HeadingTagName } from '../variables'

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Display styles make a bold visual statement. Use them to create impact when the main goal is visual
     *  storytelling. For example, use display text to convince or reassure merchants such as in marketing content or to
     *  capture attention during onboarding.</h4>
     */

    let props = defineProps({
        /**
         * Size of the text
         */
        size: {
            type: String,
            default: 'medium',
            ...StringValidator('size', DisplayTextSize)
        },

        /**
         * Element of text
         */
        element: {
            type: String,
            default: 'p',
            ...StringValidator('element', HeadingTagName)
        },
    });

    let className = computed(() => {
        return classNames(
            'Polaris-DisplayText',
            props.size && `Polaris-DisplayText--${variationName('size', props.size)}`,
        );
    });
</script>
