<template>
  <div>
    <div class="Polaris-Labelled__LabelWrapper" v-if="label" :class="labelClass">
      <div class="Polaris-Label">
        <label :id="`${id}Label`" :for="id" class="Polaris-Label__Text">
          {{ label }}
        </label>
      </div>
    </div>

    <PConnected v-if="connectedLeft || connectedRight">
      <template slot="left">
        <slot name="connectedLeft">{{ connectedLeft }}</slot>
      </template>

      <template slot="right">
        <slot name="connectedRight">{{ connectedRight }}</slot>
      </template>

      <PInput v-bind="$attrs"></PInput>
    </PConnected>

    <PInput v-bind="$attrs"></PInput>

  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
  import {classNames} from '@/utilities/css';
  import PInput from './components/PInput.vue';
  import PConnected from '../PConnected/PConnected.vue';

  @Component({
    components: {PInput, PConnected},
  })
  export default class PTextField extends Vue {
    @Prop(String) public label!: string;
    @Prop({type: String, default: `PolarisTextField${new Date().getUTCMilliseconds()}`}) public id!: string;
    @Prop(String) public labelClass!: string;
    @Prop(Boolean) public showInput!: boolean;
    @Prop(String) public connectedLeft!: string;
    @Prop(String) public connectedRight!: string;
  }
</script>
