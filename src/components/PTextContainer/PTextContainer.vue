<template>
  <div :class="className">
    <!-- @slot The content to render in the text container. -->
    <slot/>
  </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { classNames, variationName } from '../../utilities/css';
    import StringValidator from '../../utilities/validators/StringValidator';
    import { TextContainerSpacing } from '../variables';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">A text container is used to wrap text elements such as paragraphs, headings, and lists to give them
     *  vertical spacing.</h4>
     */
    let props = defineProps({
        /**
         * The amount of vertical spacing children will get between them.
         */
        spacing: {
            type: String,
            default: null,
            ...StringValidator('spacing', TextContainerSpacing)
        }
    });

    let className = computed(() => {
        return classNames(
            'Polaris-TextContainer',
            props.spacing && `Polaris-TextContainer--${variationName('spacing', props.spacing)}`,
        );
    });
</script>
