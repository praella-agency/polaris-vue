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
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { Chrome } from 'vue-color';
    import { PTextField } from '@/components/PTextField/';
    import vClickOutside from 'v-click-outside';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">The color picker is used to let merchants select a color visually. For example, merchants use the
     *  color picker to customize the accent color of the email templates for their shop.</h4>
     */
    @Component({
        components: {
            PTextField, Chrome,
        },
        directives: {
            clickOutside: vClickOutside.directive,
        },
    })
    export default class PColorPicker extends Vue {

        /**
         * Label for the colorPicker
         */
        @Prop({type: String, default: null}) public label!: string;

        /**
         * ID for form input
         */
        @Prop({type: [ String, Number ], required: true}) public id!: string | number;

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

<style>
.vc-chrome input {
  font-family: inherit;
}
.vc-chrome {
  font-family: inherit !important;
  box-shadow: -1px 0px 20px rgba(23, 24, 24, 0.05), 0px 1px 5px rgba(0, 0, 0, 0.15) !important;
  border-radius: 0.8rem !important;
  border: none !important;
  overflow: hidden;
}
.vc-chrome-saturation-wrap {
  box-shadow: -1px 0px 20px rgba(23, 24, 24, 0.05), 0px 1px 5px rgba(0, 0, 0, 0.15) !important;
  border-radius: 0.8rem 0.8rem 0 0 !important;
  border: none !important;
}
</style>

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
