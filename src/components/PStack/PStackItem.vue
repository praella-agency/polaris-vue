<template>
  <div :class="className" v-bind:style="style">
    <!-- @slot StackItem content -->
    <slot/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames } from '@/utilities/css';

/**
 * <br/>
 * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
 *  sans-serif;">The stack component will treat multiple elements wrapped in a stack item component as one item. By
 *  default, each individual element is treated as one stack item. Use the fill prop on a single stack item component to
 *  make it fill the rest of the available horizontal space.</h4>
 */
@Component
export default class PStackItem extends Vue {
  /**
   * Fill the available horizontal space in the stack with the item
   * @values true | false
   */
  @Prop({type: Boolean, default: false}) public fill!: boolean;
  /**
   * Width of Item
   * @values Ex:- 100 | 100px
   */
  @Prop([ String, Number]) public width!: string;

  public get className() {
    return classNames(
      'Polaris-Stack__Item',
      this.fill && 'Polaris-Stack__Item--fill',
    );
  }

  public get style() {
    if (this.width) {
      return {width: /^\d+$/.test(this.width) ? this.width + 'px' : this.width};
    } else { return null; }
  }
}
</script>
