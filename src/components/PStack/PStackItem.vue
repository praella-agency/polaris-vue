<template>
  <div :class="className" v-bind:style="style">
    <!-- @slot StackItem content -->
    <slot/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames } from '@/utilities/css';

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
