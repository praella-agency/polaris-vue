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
        <slot name="connectedLeft">{{ connectedLeft }}</slot>
      </template>

      <template slot="right" v-if="$slots.hasOwnProperty('connectedRight')">
        <slot name="connectedRight">{{ connectedRight }}</slot>
      </template>

      <PInput v-bind="$attrs" v-on="$listeners" :hasError="!!error" :id="id">
        <slot name="prefix" slot="prefix"></slot>
        <slot name="suffix" slot="suffix"></slot>
      </PInput>
    </PConnected>

    <PInput v-else v-bind="$attrs" v-on="$listeners" :hasError="!!error" :id="id">
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
    @Prop(String) public label!: string;
    @Prop({type: String, default: `PolarisTextField${new Date().getUTCMilliseconds()}`}) public id!: string;
    @Prop(String) public labelClass!: string;
    @Prop(String) public helpText!: string;
    @Prop(String) public connectedLeft!: string;
    @Prop(String) public connectedRight!: string;
    @Prop(String) public error!: string;
    @Prop(Boolean) public connected!: boolean;
    @Prop(Boolean) public labelHidden!: boolean;
  }
</script>
