<template>
  <div :class="propsClass">
    <label class="switch" :style="label ? 'margin-right:3px' : ''">
      <input type="checkbox" :id="id" :value="value" :checked="disabled ? false : checked" :disabled="disabled"
             @change="onChange">
      <span class="slider round"></span>
    </label>
    <!--
      @slot Label
      @type String
		-->
    <slot v-if="$slots.label" name="label"/>
    <template v-else>{{ label }}</template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

/**
 * <br/>
 * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
 *  sans-serif;">The `p-toggle` component provides users the ability to choose between two distinct values. These are
 *  very similar to a switch, or on/off switch, though aesthetically different than a checkbox.</h4>
 */
@Component
export default class PToggle extends Vue {

  /**
   * Label of toggle
   * @values Any String
   */
  @Prop({type: String, default: null}) public label!: string;

  /**
   * ID of toggle
   */
  @Prop({
      type: [String, Number],
      default: `PolarisTextField${new Date().getUTCMilliseconds()}`,
  }) public id!: string | number;

  /**
   * propsClass of toggle
   * @values true, false
   */
  @Prop({type: String, default: null}) public propsClass!: string;

  /**
   * Value of toggle
   * @values Any String or boolean
   */
  @Prop({type: [String, Boolean, Number]}) public value!: string | boolean | number;

  /**
   * Set true for disable
   * @values true | false
   */
  @Prop({type: Boolean, default: false}) public disabled!: boolean;

  /**
   * Defined if toggle enabled/disabled
   * @values true | false
   */
  @Prop({type: Boolean, default: false}) public checked!: boolean;

  public onChange(e) {
    const target = e.target || e.srcElement;
    /**
     * On change event handler
     * @param e
     */
    this.$emit('change', {checked: target.checked, value: target.value});
  }
}
</script>
