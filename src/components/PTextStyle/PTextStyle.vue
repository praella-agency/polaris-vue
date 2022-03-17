<template>
  <component :is="element" :class="className">
    <!-- @slot The content that should get the intended styling -->
    <slot/>
  </component>
</template>

<script>
import { classNames, variationName } from '../../utilities/css';
import StringValidator from '../../utilities/validators/StringValidator';

const Variation = ['positive', 'negative', 'strong', 'subdued', 'code'];

const VariationValue = {
  Positive: 'positive',
  Negative: 'negative',
  Strong: 'strong',
  Subdued: 'subdued',
  Code: 'code',
}

function variationElement(variation) {
  if(['positive', 'negative', 'strong', 'subdued', 'code', null].indexOf(variation) !== -1) {
    return variation === VariationValue.Code ? 'code' : 'span';
  }
}

/**
 * <br/>
 * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
 *  sans-serif;">Text style enhances text with additional visual meaning. For example, using subdued text to
 *  de-emphasize it from its surrounding text.</h4>
 */
export default {
  name: 'PTextStyle',
  props: {
    /**
     * Give text additional visual meaning.
     */
    variation: {
      type: String,
      default: null,
      ...StringValidator('variation', Variation)
    },
  },
  computed: {
    className() {
      return classNames(
          this.variation && `Polaris-TextStyle--${variationName('variation', this.variation)}`,
      );
    },
    element() {
      return variationElement(this.variation);
    }
  },
}
</script>
