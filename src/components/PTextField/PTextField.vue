<template>
  <div :class="labelHidden && 'Polaris-Labelled--hidden'">
    <div class="Polaris-Labelled__LabelWrapper" v-if="label" :class="labelClass">
      <div class="Polaris-Label">
        <label :id="`${id}Label`" :for="id" class="Polaris-Label__Text">
          {{ label }}
        </label>
      </div>
    </div>

    <PConnected v-if="connected">
      <template v-if="$slots.hasOwnProperty('connectedLeft')" slot="left">
        <!-- @slot Left connected component slot -->
        <slot name="connectedLeft">{{ connectedLeft }}</slot>
      </template>

      <template slot="right" v-if="$slots.hasOwnProperty('connectedRight')">
        <!-- @slot Right connected component slot -->
        <slot name="connectedRight">{{ connectedRight }}</slot>
      </template>

      <PInput v-bind="[$attrs,$props]" v-on="$listeners" :hasError="!!error" :id="id">
        <!-- @slot Field prefix -->
        <slot name="prefix" slot="prefix"></slot>
        <!-- @slot Field suffix -->
        <slot name="suffix" slot="suffix"></slot>
      </PInput>
    </PConnected>

    <PInput v-else v-bind="[$attrs,$props]" v-on="$listeners" :hasError="!!error" :id="id">
      <slot name="prefix" slot="prefix"></slot>
      <slot name="suffix" slot="suffix"></slot>
    </PInput>
    <div class="Polaris-Labelled__HelpText" v-if="helpText">{{helpText}}</div>
    <PFieldError v-if="error" :error="error"/>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
  import PInput from './components/PInput.vue';
  import PConnected from '../PConnected/PConnected.vue';
  import {PFieldError} from '@/components/PFieldError';

  @Component({
    components: { PInput, PConnected, PFieldError },
  })
  export default class PTextField extends Vue {

    /**
     * Text field label
     */
    @Prop(String) public label!: string;

    /**
     * Text field id
     */
    @Prop({type: String, default: `PolarisTextField${new Date().getUTCMilliseconds()}`}) public id!: string;

    /**
     * Text field label class
     */
    @Prop(String) public labelClass!: string;

    /**
     * Text field help text
     */
    @Prop(String) public helpText!: string;

    /**
     * Text field connected to left
     */
    @Prop(String) public connectedLeft!: string;

    /**
     * Text field connected to right
     */
    @Prop(String) public connectedRight!: string;

    /**
     * Text field is connected
     */
    @Prop(Boolean) public connected!: boolean;

    /**
     * Text field has error
     */
    @Prop(String) public error!: string;

    /**
     * Visually hide the label
     */
    @Prop(Boolean) public labelHidden!: boolean;

    /**
     * Enable rich text editor
     */
    @Prop(Boolean) public richEditor!: boolean;
  }
</script>

<style>
  .ck.ck-editor {
    position: relative;
    width: 100%;
  }
</style>