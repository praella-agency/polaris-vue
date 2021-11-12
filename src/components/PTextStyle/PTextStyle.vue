<template>
  <component :is="element" :class="className">
    <!-- @slot The content that should get the intended styling -->
    <slot/>
  </component>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames, variationName } from '@/utilities/css';

type Variation = 'positive' | 'negative' | 'strong' | 'subdued' | 'code';

enum VariationValue {
  Positive = 'positive',
  Negative = 'negative',
  Strong = 'strong',
  Subdued = 'subdued',
  Code = 'code',
}

function variationElement(variation?: Variation) {
  return variation === VariationValue.Code ? 'code' : 'span';
}

/**
 * <br/>
 * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
 *  sans-serif;">Text style enhances text with additional visual meaning. For example, using subdued text to
 *  de-emphasize it from its surrounding text.</h4>
 */
@Component
export default class PTextStyle extends Vue {

  /**
   * Give text additional visual meaning
   * @values positive | negative | strong | subdued | code
   */
  @Prop({type: String, default: null}) public variation!: Variation;

  public get className() {
    return classNames(
        this.variation && `Polaris-TextStyle--${variationName('variation', this.variation)}`,
    );
  }

  public get element() {
    return variationElement(this.variation);
  }
}
</script>
