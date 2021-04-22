<template>
  <div :class="propsClass">
    <label class="switch" :style="label ? 'margin-right:3px' : ''">
      <input type="checkbox" :id="id" :value="value" :checked="disabled ? false : checked" :disabled="disabled" @change="onChange">
      <span class="slider round"></span>
    </label>
    <slot v-if="$slots.label" name="label" />
    <template v-else>{{label}}</template>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
  @Component({})

  export default class PToggle extends Vue {
    @Prop(String) public label!: string;
    @Prop({type: String, default: `PolarisTextField${new Date().getUTCMilliseconds()}`}) public id!: string;
    @Prop(String) public propsClass!: string;
    @Prop({type: [String, Boolean, Number]}) public value!: string | boolean | number;
    @Prop(Boolean) public disabled!: boolean;
    @Prop(Boolean) public checked!: boolean;

    public onChange(e: any) {
      const target = e.target || e.srcElement;
      this.$emit('change', {checked: target.checked, value: target.value});
    }
  }
</script>