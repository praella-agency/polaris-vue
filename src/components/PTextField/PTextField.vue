<template>
  <div>
    <div class="Polaris-Labelled__LabelWrapper" v-if="label" :class="labelClass">
      <div class="Polaris-Label">
        <label :id="`${id}Label`" :for="id" class="Polaris-Label__Text">
          {{ label }}
        </label>
      </div>
    </div>

    <PConnected v-if="$slots.hasOwnProperty('connectedLeft') || $slots.hasOwnProperty('connectedRight')">
      <template v-if="$slots.hasOwnProperty('connectedLeft')" slot="left">
        <slot name="connectedLeft">{{ connectedLeft }}</slot>
      </template>

      <template slot="right" v-if="$slots.hasOwnProperty('connectedRight')">
        <slot name="connectedRight">{{ connectedRight }}</slot>
      </template>

      <PInput v-bind="$attrs" v-on="$listeners"></PInput>
    </PConnected>

    <PInput v-else v-bind="$attrs" v-on="$listeners"></PInput>
    <div class="Polaris-Labelled__HelpText" v-if="helpText">{{helpText}}</div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
  import PInput from './components/PInput.vue';
  import PConnected from '../PConnected/PConnected.vue';

  @Component({
    components: {PInput, PConnected},
  })
  export default class PTextField extends Vue {
    @Prop(String) public label!: string;
    @Prop({type: String, default: `PolarisTextField${new Date().getUTCMilliseconds()}`}) public id!: string;
    @Prop(String) public labelClass!: string;
    @Prop(String) public helpText!: string;
    @Prop(String) public connectedLeft!: string;
    @Prop(String) public connectedRight!: string;
  }
</script>
