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

<script>
import { classNames } from '../../utilities/css';
import Multiselect from 'vue-multiselect';
import { PIcon } from '../../components/PIcon';
import { PTag } from '../../components/PTag';
import { PFieldError } from '../../components/PFieldError/index.js';

export default {
    name: 'PMultiSelect',
    components: {
        PIcon, Multiselect, PTag, PFieldError,
    },
    props: {
        /**
         * Disable the PMultiSelect.
         * @values true | false
         */
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * Label for the PMultiSelect.
         */
        label: {
            type: String,
            default: null,
        },
        /**
         * Options of PMultiSelect.
         */
        options: {
            type: Array,
            required: true,
            default: () => ([]),
        },
        /**
         * Field name in the `options` array that should be used for the text label
         */
        textField: {
            type: String,
            default: 'label',
        },
        /**
         * Field name in the `options` array that should be used for the value
         */
        valueField: {
            type: String,
            default: 'value',
        },
        /**
         * Field name in the `options` array that should be used for the disabled state
         */
        disabledField: {
            type: String,
            default: 'disabled',
        },
        /**
         * Value for PMultiSelect.
         */
        value: {
            type: [String, Object, Array, Number, Boolean],
            default: () => ([]),
        },
        /**
         * Disable the searchable options feature.
         * @values true | false
         */
        searchable: {
            type: Boolean,
            default: true,
        },
        /**
         * Taggable provides ability to add new user-input value on multiselect.
         * @values true | false
         */
        taggable: {
            type: Boolean,
            default: false,
        },
        /**
         * Provide Placeholder.
         */
        placeholder: {
            type: String,
            default: null,
        },
        /**
         * Help text
         */
        helpText: {
            type: String,
            default: null,
        },
        /**
         * Validation error
         */
        error: {
            type: String,
            default: null,
        },
        /**
         * To allow multiple selections
         * @values true | false
         */
        multiple: {
            type: Boolean,
            default: true,
        },
        /**
         * Id for the element
         */
        id: {
            type: [String, Number],
            default: `PolarisMultiSelect${(new Date()).getTime()}`,
        },
    },
    data() {
        return {
            selected: this.value,
        };
    },
    computed: {
        className() {
            return classNames(
                'Polaris-Select',
                this.disabled && 'Polaris-Select--disabled',
                this.error && 'invalid',
            );
        },
        computedOptions() {
            const options = [];
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
        },
        computedValue: {
            get() {
                return this.selected;
            },
            set(value) {
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
            },
        },
        computedMultiple() {
            return !this.multiple;
        },
    },
    methods: {
        addTag(newTag) {
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
        },
    },
    watch: {
        value(value) {
            this.selected = value;
        },
    },
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
