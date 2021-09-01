<template>
  <div :class="className">
    <!-- @slot TextContainer content -->
    <slot/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames, variationName } from '@/utilities/css';

type Spacing = 'tight' | 'loose';

/**
 * <br/>
 * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
 *  sans-serif;">A text container is used to wrap text elements such as paragraphs, headings, and lists to give them
 *  vertical spacing.</h4>
 */
@Component
export default class PTextContainer extends Vue {
  /**
   * The amount of vertical spacing children will get between them.
   * @values tight | loose
   */
  @Prop({type: String, default: null}) public spacing!: Spacing;

  public get className() {
    return classNames(
      'Polaris-TextContainer',
      this.spacing && `Polaris-TextContainer--${variationName('spacing', this.spacing)}`,
    );
  }
}
</script>
