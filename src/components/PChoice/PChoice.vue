<template>
  <div>
    <label :class="className" :for="id" @click="$emit('click', $event)">
      <span class="Polaris-Choice__Control"><slot/></span>
      <span class="Polaris-Choice__Label">{{ label }}</span>
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
  components: { PFieldError},
})
export default class PChoice extends Vue {
  @Prop({type: String, default: `PolarisChoice${new Date().getUTCMilliseconds()}`}) public id!: string;
  @Prop(String) public label!: string;
  @Prop(Boolean) public disabled!: boolean;
  @Prop(Boolean) public labelHidden!: boolean;
  @Prop(Boolean) public vertical!: boolean;
  @Prop(String) public helpText!: string;
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
