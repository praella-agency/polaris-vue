<template>
  <div :class="propsClass">
    <label class="switch" :style="label ? 'margin-right:3px' : ''">
      <input type="checkbox" :id="id" :checked="disabled ? false : checked" :disabled="disabled">
      <span class="slider round"></span>
    </label>
    {{label}}
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
  @Component({})

  export default class PToggle extends Vue {
    @Prop(String) public label!: string;
    @Prop({type: String, default: `PolarisTextField${new Date().getUTCMilliseconds()}`}) public id!: string;
    @Prop(String) public propsClass!: string;
    @Prop(Boolean) public disabled!: boolean;
    @Prop(Boolean) public checked!: boolean;
  }
</script>


<style scoped>
  .switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 23px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 15px;
    width: 15px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
  }

  input:checked + .slider {
    background-color: #5563c1;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #5563c1;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(16px);
    -ms-transform: translateX(16px);
    transform: translateX(16px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
</style>
