<template>
  <div :class="className">
    <span class="Polaris-VisuallyHidden">
      <label :for="`SearchField${this['_uid']}`">
        Search
      </label>
    </span>
    <input
        :id="`SearchField${this['_uid']}`"
        class="Polaris-TopBar-SearchField__Input"
        :placeholder="placeholder"
        type="search"
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        ref="input"
        v-model="computedValue"
        @input="handleChange"
        @keydown="preventDefault"
    />
    <span class="Polaris-TopBar-SearchField__Icon">
        <PIcon source="SearchMinor"/>
    </span>
    <button
        v-if="inputValue !== ''"
        type="button"
        aria-label="Clear"
        class="Polaris-TopBar-SearchField__Clear"
        @click="handleClear"
        @blur="handleBlur"
        @focus="handleFocus"
    >
      <PIcon source="CircleCancelMinor"/>
    </button>
    <div
        :class="divClassName"
    />
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
  import { classNames } from '@/utilities/css';
  import { PIcon } from '@/components/PIcon';

  @Component({
    components: {
      PIcon,
    },
  })
  export default class PSearch extends Vue {
    /**
     * Initial value for the input
     */
    @Prop({type: String, required: true}) public value!: string;

    /**
     * Hint text to display
     */
    @Prop({type: String, default: null}) public placeholder!: string;

    /**
     * Force the focus state on the input
     */
    @Prop({type: Boolean, default: false}) public focused!: boolean;

    /**
     * Force a state where search is active but the text field component is not focused
     */
    @Prop({type: Boolean, default: false}) public active!: boolean;

    /**
     * Show a border when the search field is focused
     */
    @Prop({type: Boolean, default: false}) public showFocusBorder!: boolean;

    public forceActive = false;
    public inputValue = this.value;

    @Watch('focused')
    public onFocusedChanged(value) {
      if (!(this.$refs.input as HTMLInputElement)) {
        return;
      }

      if (this.focused) {
        (this.$refs.input as HTMLInputElement).focus();
      } else {
        (this.$refs.input as HTMLInputElement).blur();
      }
    }

    public get className() {
      return classNames(
        'Polaris-TopBar-SearchField',
        (this.focused || this.active || this.forceActive) && 'Polaris-TopBar-SearchField--focused',
      );
    }

    public get divClassName() {
      return classNames(
        'Polaris-TopBar-SearchField__Backdrop',
        this.showFocusBorder && 'Polaris-TopBar-SearchField__BackdropShowFocusBorder',
      );
    }

    public get computedValue() {
      return this.inputValue;
    }

    public set computedValue(value) {
      this.inputValue = value;
      /**
       * Handle input of search field
       */
      this.$emit('input', value);
    }

    public preventDefault(event: KeyboardEvent) {
      if (event.key === 'Enter') {
        event.preventDefault();
      }
    }

    public handleChange(event) {
      this.$emit('change', event.target.value);
    }

    public handleBlur() {
      this.forceActive = true;
      this.$emit('cancel');

      if (!(this.$refs.input as HTMLInputElement)) {
        return;
      }

      (this.$refs.input as HTMLInputElement).value = '';
      this.$emit('change');
      (this.$refs.input as HTMLInputElement).focus();
    }

    public handleFocus() {
      this.$emit('focus');
      this.forceActive = true;
    }

    public handleClear() {
      this.inputValue = '';
      this.$emit('change', '');
    }
  }
</script>
