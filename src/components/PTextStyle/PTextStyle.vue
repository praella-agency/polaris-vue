<template>
    <component :is="element" :class="className">
        <!-- @slot The content that should get the intended styling -->
        <slot/>
    </component>
</template>

<script setup>
    import { computed } from 'vue';
    import { classNames, variationName } from '../../utilities/css';
    import StringValidator from '../../utilities/validators/StringValidator';
    import { Variation, VariationValue } from '../variables';

    function variationElement(variation) {
        if (['positive', 'negative', 'strong', 'subdued', 'code', null].indexOf(variation) !== -1) {
            return variation === VariationValue.Code ? 'code' : 'span';
        }
    }

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Text style enhances text with additional visual meaning. For example, using subdued text to
     *  de-emphasize it from its surrounding text.</h4>
     */

    let props = defineProps({
        /**
         * Give text additional visual meaning.
         */
        variation: {
            type: String,
            default: null,
            ...StringValidator('variation', Variation)
        },
    });

    let className = computed(() => {
        return classNames(
            props.variation && `Polaris-TextStyle--${variationName('variation', props.variation)}`,
        );
    });

    let element = computed(() => {
        return variationElement(props.variation);
    });
</script>
