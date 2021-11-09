<template>
  <div>
    <!--
      Triggered on click
      @event click
    -->
    <label :class="className" :for="id" @click="$emit('click', $event)">
      <span class="Polaris-Choice__Control">
      <!-- @slot Title for choice control -->
        <slot/>
      </span>
      <span class="Polaris-Choice__Label">
        <slot v-if="$slots.label" name="label" />
        <template v-else>{{ label }}</template>
      </span>
    </label>
    <div v-if="typeof error === 'string' || helpText || $slots.helpText"
         class="Polaris-Choice__Descriptions">
      <PFieldError v-if="typeof error === 'string'" :error="error"/>
      <div v-if="helpText || $slots.helpText"
           class="Polaris-Choice__HelpText"
           :id="id+'HelpText'">
        <slot name="helpText">{{ helpText }}</slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames, variationName } from '@/utilities/css';
import {PFieldError} from '@/components/PFieldError';

@Component({
  components: { PFieldError },
})
export default class PChoice extends Vue {

  /**
   * ID for form input
   */
  @Prop({type: [String, Number], required: true}) public id!: string | number;

  /**
   * Label for the checkbox
   */
  @Prop(String) public label!: string;

  /**
   * Disable input
   */
  @Prop(Boolean) public disabled!: boolean;

  /**
   * Visually hide the label
   */
  @Prop(Boolean) public labelHidden!: boolean;

  /**
   * Additional text to aide in use
   */
  @Prop(String) public helpText!: string;

  /**
   * Display an error message
   */
  @Prop({type: [String, Boolean]}) public error!: string | boolean;

  public get className() {
    return classNames(
      'Polaris-Choice',
      this.labelHidden && 'Polaris-Choice--labelHidden',
      this.disabled && 'Polaris-Choice--disabled',
    );
  }
}
</script>
