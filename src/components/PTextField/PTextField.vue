<template>
  <div :class="labelHidden && 'Polaris-Labelled--hidden'">
    <div class="Polaris-Labelled__LabelWrapper" v-if="label || emptyLabel || $slots.hasOwnProperty('label')" :class="labelClass">
      <!-- @slot Field label -->
      <slot name="label">
        <div class="Polaris-Label">
          <label :id="`${id}Label`" :for="id" class="Polaris-Label__Text" v-html="emptyLabel?'&nbsp':label" />
        </div>
      </slot>
    </div>

    <PConnected v-if="connected">
      <template v-if="$slots.hasOwnProperty('connectedLeft')" slot="left">
        <!-- @slot An element connected to the left of the input -->
        <slot name="connectedLeft">{{ connectedLeft }}</slot>
      </template>

      <template slot="right" v-if="$slots.hasOwnProperty('connectedRight')">
        <!-- @slot An element connected to the right of the input -->
        <slot name="connectedRight">{{ connectedRight }}</slot>
      </template>

      <PInput v-bind="[$attrs, $props]" v-on="$listeners" :hasError="!!error" :id="id" @input="handleInput">
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

  /**
   * <br/>
   * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
   *  sans-serif;">A text field is an input field that merchants can type into. It has a range of options and supports
   *  several text formats including numbers.</h4>
   */
  @Component({
    components: {
        PInput, PConnected, PFieldError,
    },
  })
  export default class PTextField extends Vue {

    /**
     * Text field label
     */
    @Prop({type: String, default: null}) public label!: string;

    /**
     * Text field id
     */
    @Prop({
        type: [String, Number],
        default: `PolarisTextField${new Date().getUTCMilliseconds()}`,
    }) public id!: string | number;

    /**
     * Text field label class
     */
    @Prop({type: String, default: null}) public labelClass!: string;

    /**
     * Text field help text
     */
    @Prop({type: String, default: null}) public helpText!: string;

    /**
     * Text field connected to left
     */
    @Prop({type: String, default: null}) public connectedLeft!: string;

    /**
     * Text field connected to right
     */
    @Prop({type: String, default: null}) public connectedRight!: string;

    /**
     * Text field is connected
     * @values true | false
     */
    @Prop({type: Boolean, default: false}) public connected!: boolean;

    /**
     * Text field has error
     */
    @Prop({type: String, default: null}) public error!: string;

    /**
     * Visually hide the label
     * @values true | false
     */
    @Prop({type: Boolean, default: false}) public labelHidden!: boolean;

    /**
     * Visually hide the label
     * @values true | false
     */
    @Prop({type: Boolean, default: false}) public emptyLabel!: boolean;

    /**
     * Enable rich text editor
     * @values true | false
     */
    @Prop({type: Boolean, default: false}) public richEditor!: boolean;

    /**
     * Show a clear text button in the input
     * @values true | false
     */
    @Prop({type: Boolean, default: false}) public clearable!: boolean;

    /**
     * **For input type:- file**
     *
     * A Boolean which, if present, indicates that the user may choose more than one file
     */
    @Prop({type: Boolean, default: false}) public multiple!: boolean;

    /**
     * **For input type:- file**
     *
     * One or more unique file type specifiers describing file types to allow
     */
    @Prop({type: String, default: null}) public accept!: string;

    public handleInput(value) {
        /**
         * Get inserted data
         */
        this.$emit('input', value);
    }
  }
</script>

<style>
  .ck.ck-editor {
    position: relative;
    width: 100%;
  }
</style>