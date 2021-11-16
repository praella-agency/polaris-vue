<template>
  <div class="">
    <div class="Polaris-Labelled__LabelWrapper">
      <div class="Polaris-Label">
        <label :id="`${id}Label`" :for="id" class="Polaris-Label__Text">
          {{ label }}
        </label>
      </div>
    </div>
    <div :class="className">
      <!--
       Triggers on searchChange
       @event searchChange
       -->
      <multiselect
          :id="id"
          v-model="computedValue"
          :disabled="disabled"
          aria-invalid="false"
          :options="computedOptions"
          :track-by="valueField"
          :placeholder="placeholder"
          :searchable="searchable"
          :multiple="multiple"
          :taggable="taggable"
          :close-on-select="computedMultiple"
          :clear-on-select="false"
          :preserve-search="true"
          :label="textField"
          @tag="addTag"
          @search-change="(query) => {$emit('searchChange', query)}"
      >
        <template slot="caret">
          <div class="multiselect__select">
            <PIcon source="SelectMinor"/>
          </div>
        </template>

        <template v-slot:selection="{values, search, remove, isOpen}">
          <div class="multiselect__tags-wrap" v-show="values && values.length > 0">
            <template v-for="(option, index) of values" @mousedown.prevent>
                <PTag :tag='{"value":option[textField], "key":option[valueField]}' removable @remove-tag="remove(option)"/>
            </template>
          </div>
          <template slot="limit"></template>
        </template>
      </multiselect>
    </div>
    <div class="Polaris-Labelled__HelpText" v-if="helpText">{{helpText}}</div>
    <PFieldError v-if="error" :error="error"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { classNames } from '@/utilities/css';
import Multiselect from 'vue-multiselect';
import { PIcon } from '@/components/PIcon';
import { PTag } from '@/components/PTag';
import { PFieldError } from '@/components/PFieldError';

interface StrictOption {
  value: string;
  label: string;
  disabled?: boolean;
  $isDisabled?: boolean;
  hidden?: boolean;
}

@Component({
  components: {
      PIcon, Multiselect, PTag, PFieldError,
  },
})
export default class PMultiSelect extends Vue {
  /**
   * Disable the PMultiSelect.
   * @values true | false
   */
  @Prop({type: Boolean, default: false}) public disabled!: boolean;

  /**
   * Label for the PMultiSelect.
   */
  @Prop({type: String, default: null}) public label!: string;

  /**
   * Options of PMultiSelect.
   */
  @Prop({required: true, default: []}) public options!: any[];

  /**
   * Field name in the `options` array that should be used for the text label
   */
  @Prop({type: String, default: 'label'}) public textField!: string;

  /**
   * Field name in the `options` array that should be used for the value
   */
  @Prop({type: String, default: 'value'}) public valueField!: string;

  /**
   * Field name in the `options` array that should be used for the disabled state
   */
  @Prop({type: String, default: 'disabled'}) public disabledField!: string;

  /**
   * Value for PMultiSelect.
   */
  @Prop({default: () => ([])}) public value!: any;

  /**
   * Disable the searchable options feature.
   * @values true | false
   */
  @Prop({type: Boolean, default: true}) public searchable!: boolean;

  /**
   * Taggable provides ability to add new user-input value on multiselect.
   * @values true | false
   */
  @Prop({type: Boolean, default: false}) public taggable!: boolean;

  /**
   * Provide Placeholder.
   */
  @Prop({type: String, default: null}) public placeholder!: string;

  /**
   * Help text
   */
  @Prop({type: String, default: null}) public helpText!: string;

  /**
   * Validation error
   */
  @Prop({type: String, default: null}) public error!: string;

  /**
   * To allow multiple selections
   * @values true | false
   */
  @Prop({type: Boolean, default: true}) public multiple!: boolean;

  @Prop({type: [String, Number], default: `PolarisMultiSelect${(new Date()).getTime()}`}) public id!: string | number;

  public selected = this.value;

  public get computedOptions() {
    const options: any[] = [];
    this.options.map((value) => {
      if (typeof value === 'object') {
        if (value[this.disabledField]) {
          value.$isDisabled = value[this.disabledField];
        }
        options.push(value);
      } else {
        options.push({[this.textField]: value, [this.valueField]: value});
      }
    });
    return options;
  }

  public get computedValue() {
    return this.selected;
  }

  public set computedValue(value) {
    this.selected = value;
    /**
     * Callback when selection is changed
     * @property {event}
     */
    this.$emit('change', value);
    /**
     * Callback when input is triggered
     * @property {event}
     */
    this.$emit('input', value);
  }

  public get computedMultiple() {
    return !this.multiple;
  }

  public get className() {
    return classNames(
        'Polaris-Select',
        this.disabled && 'Polaris-Select--disabled',
        this.error && 'invalid',
    );
  }

  public addTag(newTag) {
    const tag = {
      [this.textField]: newTag,
      [this.valueField]: newTag,
    };
    if (this.multiple) {
      this.selected.push(tag);
    } else {
      this.selected = tag;
    }
    this.options.push(tag);
    this.$emit('change', this.selected);
  }

  @Watch('value')
  public onValueChanged(value: any) {
    this.selected = value;
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
