<template>
  <div :class="className" v-show="showInput">
    <div class="Polaris-TextField__Prefix" :id="id+'Prefix'" v-if="showPrefix">
      {{prefix}}
      <slot v-if="$slots.prefix" name="prefix"></slot>
    </div>
    <ckeditor v-if="richEditor" :id="id" :editor="editor" :config="{}"
              @input="onInput"
              v-model="computedValue"
              :disabled="disabled"
              :readonly="readOnly"
              :autofocus="autoFocus"
              :placeholder="placeholder"
              :autocomplete="normalizeAutoComplete(autoComplete)"
              :aria-describedby="describedBy"
              :aria-labelledby="labelledBy"
              :aria-invalid="hasError"
    ></ckeditor>
    <input
      v-else
      :tag="multiline?'textarea':'input'"
      ref="input"
      :is="multiline ? 'textarea' : 'input'"
      :name="name"
      :class="inputClassName"
      :id="id"
      :disabled="disabled"
      :readonly="readOnly"
      :autofocus="autoFocus"
      :value="computedValue"
      v-text="multiline?computedValue:''"
      :placeholder="placeholder"
      :autocomplete="normalizeAutoComplete(autoComplete)"
      :min="min"
      :max="max"
      :step="step"
      :minlength="minLength"
      :style="{ height: (multiline && computedHeight) ? computedHeight+'px' : null,overflow: (multiline && computedHeight) ? 'hidden' : null }"
      :maxlength="maxLength"
      :type="inputType"
      :aria-describedby="describedBy"
      :aria-labelledby="labelledBy"
      :aria-invalid="hasError"
      @input="onInput"
    />
    <div class="Polaris-TextField__Suffix" :id="id+'Suffix'" v-if="showSuffix">
      {{suffix}}
      <slot v-if="$slots.suffix" name="suffix"></slot>
    </div>
    <PSpinner @change="handleNumberChange" v-if="type === 'number'"></PSpinner>
    <!--<button type="button" class="Polaris-TextField__ClearButton" v-if="computedValue && showClearButton" @click="onClear">
      <span class="Polaris-VisuallyHidden">Clear</span>
      <PIcon source="CircleCancelMinor" color="inkLightest"></PIcon>
    </button>-->
    <div class="Polaris-TextField__Backdrop" v-if="!richEditor"></div>

    <PFieldResizer
            v-if="multiline"
            :contents="value || placeholder"
            :current-height="computedHeight"
            :minimum-lines="(typeof multiline === 'number') ? multiline : 1"
            @heightchange="handleExpandingResize"
    />
  </div>
</template>


<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
  import {classNames} from '@/utilities/css';
  import PSpinner from './PSpinner.vue';
  import PFieldResizer from '@/components/PTextField/components/PFieldResizer.vue';
  import { PIcon } from '@/components/PIcon';
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  import CKEditor from '@ckeditor/ckeditor5-vue2';

  type Type =
          | 'text'
          | 'email'
          | 'number'
          | 'password'
          | 'search'
          | 'tel'
          | 'url'
          | 'date'
          | 'datetime-local'
          | 'month'
          | 'time'
          | 'week'
          | 'currency';

  type Align =
          | 'left'
          | 'right'
          | 'center';

  @Component({
    components: { PFieldResizer, PSpinner, PIcon, ckeditor: CKEditor.component  },
  })
  export default class PInput extends Vue {
    @Prop({type: String, default: `PolarisTextField${new Date().getUTCMilliseconds()}`}) public id!: string;
    @Prop() public value!: any;
    @Prop(String) public type!: Type;
    @Prop(String) public align!: Align;
    @Prop(String) public placeholder!: string;
    @Prop(Boolean) public multiline!: boolean;
    @Prop(Boolean) public richEditor!: boolean;
    @Prop(Boolean) public disabled!: boolean;
    @Prop(Boolean) public readOnly!: boolean;
    @Prop({type: Boolean, default: true}) public showInput!: boolean;
    @Prop(Boolean) public showClearButton!: boolean;
    @Prop(String) public prefixClass!: string;
    @Prop(Boolean) public autoFocus!: boolean;
    @Prop(Boolean) public autoComplete!: boolean;
    @Prop(String) public labelClass!: string;
    @Prop(String) public inputClass!: string;
    @Prop(String) public suffix!: string;
    @Prop(String) public prefix!: string;
    @Prop(String) public name!: string;
    @Prop(Boolean) public hasError!: string;
    @Prop([String, Number]) public maxLength!: string | number;
    @Prop([String, Number]) public minLength!: string | number;
    @Prop(Number) public step!: number;
    @Prop({type: Number, default: 0}) public minHeight!: number;
    @Prop([String, Number]) public min!: number;
    @Prop([String, Number]) public max!: number;
    @Prop(String) public describedBy!: string;

    public content = this.value !== null ? this.value : '';
    public height = this.minHeight;
    public editor = ClassicEditor;

    public get inputType() {
      return this.type === 'currency' ? 'text' : this.type;
    }

    public get className() {
      return classNames(
              'Polaris-TextField',
              Boolean(this.content) && 'Polaris-TextField--hasValue',
              this.disabled && 'Polaris-TextField--disabled',
              this.readOnly && 'Polaris-TextField--readOnly',
              this.hasError && 'Polaris-TextField--error',
      );
    }

    public get inputClassName() {
      return classNames(
              'Polaris-TextField__Input',
              this.inputClass,
              this.align && `Polaris-TextField__Input Polaris-TextField__Input--align${this.textAlign}`,
      );
    }

    public get showPrefix() {
      return this.prefix || this.$slots.prefix;
    }

    public get textAlign() {
      return this.align.replace(/^_*(.)|_+(.)/g, (s, c, d) => c ? c.toUpperCase() : ' ' + d.toUpperCase());
    }

    public get showSuffix() {
      return this.suffix || this.$slots.suffix;
    }

    public get labelledBy() {
      const label = [this.id + 'Label'];
      if (this.showPrefix) {
        label.push(this.id + 'Prefix');
      }
      if (this.showSuffix) {
        label.push(this.id + 'Suffix');
      }
      return label.join(' ');
    }

    public get computedHeight() {
      return this.height;
    }

    public set computedHeight(value) {
      this.height = value;
    }

    public get computedValue() {
      return this.content;
    }

    public set computedValue(value: any) {
      this.content = value;
      this.$emit('input', value);
    }

    @Watch('value')
    public onValueChanged(value: any) {
      this.content = value;
    }

    public onInput(event: any) {
      this.$nextTick(() => {
        if (event.target) {
          this.computedValue = event.target.value;
        }
      });
    }

    public onClear(event: any) {
      this.$nextTick(() => {
        this.computedValue = undefined;
      });
    }

    public handleNumberChange(steps: number) {
      const numericValue = this.computedValue ? parseFloat(this.computedValue) : 0;
      if (isNaN(numericValue) || this.disabled) { return; }

      const min = this.min || -Infinity;
      const max = this.max || +Infinity;
      const step = this.step || 1;

      const newValue = Math.min(max, Math.max(min, numericValue + (steps * step)));
      this.$nextTick(() => {
        if (!isNaN(newValue)) {
          this.computedValue = newValue;
        }
      });
    }

    public handleExpandingResize(e) {
      this.computedHeight = (e < this.minHeight) ? this.minHeight : e;
    }

    public normalizeAutoComplete(autoComplete?: boolean | string) {
      if (autoComplete === true) {
        return 'on';
      } else if (autoComplete === false) {
        return 'off';
      } else {
        return autoComplete;
      }
    }
  }
</script>


<style scoped>

</style>
