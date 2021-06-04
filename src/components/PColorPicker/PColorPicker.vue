<template>
  <div class="color-picker-field" v-click-outside="hidePicker">
    <div :class="propsClass">
      <span @click="togglePicker()" class="picker " :style="'background-color:'+color"></span>
      <PTextField v-model="color" type="text" :label="label" :show-input="showInput" class="picker"
                 labelClass="mb-0"></PTextField>
    </div>
    <div class="picker-wrapper">
      <Chrome v-show="showPicker" :value="color" @input="updateColor"></Chrome>
    </div>

  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
  import {Chrome} from 'vue-color';
  import PTextField from '@/components/PTextField/PTextField.vue';
  import vClickOutside from 'v-click-outside';

  @Component({
    components: {PTextField, Chrome},
    directives: {clickOutside: vClickOutside.directive},
  })

  export default class PColorPicker extends Vue {

    /**
     * Label for the colorPicker
     */
    @Prop({type: String, default: null}) public label!: string;

    /**
     * ID for form input
     */
    @Prop({type: String, required: true}) public id!: string;

    /**
     * LabelClass for input
     */
    @Prop({type: String, default: null}) public labelClass!: string;

    /**
     * Hide/Show input
     * @values true | false
     */
    @Prop({type: Boolean, default: false}) public showInput!: boolean;

    /**
     * PropsClass for input
     */
    @Prop({type: String, default: null}) public propsClass!: string;

    /**
     * Selected color
     */
    @Prop({type: String, default: '#FFF'}) public color!: string;

    public showPicker = false;

    public updateColor(color: any) {

      /**
       * Triggers when color is changed
       *
       * @property {string} color new color hex
       */
      this.$emit('update:color', color.hex);
    }

    public togglePicker() {
      this.showPicker = !this.showPicker;
    }
    public hidePicker() {
      this.showPicker = false;
    }
  }
</script>


<style scoped>
  .color-picker-field span.picker {
    position: absolute;
    right: 10px;
    width: 30px;
    height: 20px;
    z-index: 25;
    cursor: pointer;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, .24);
    float: left;
    left: 0;
    margin: 0 10px 0 0;
  }

  .color-picker-field {
    position: relative;
  }

  .picker-wrapper {
    position: absolute;
    top: 100%;
    z-index: 111;
  }

  .picker {
    position: relative !important;
    display: inline-block;
  }
</style>
