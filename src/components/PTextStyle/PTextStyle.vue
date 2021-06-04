<template>
  <component :is="element" :class="className">
    <!-- @slot Text content -->
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

@Component
export default class PTextStyle extends Vue {

  /**
   * Give text additional visual meaning
   * @values positive, negative, strong, subdued, code
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
