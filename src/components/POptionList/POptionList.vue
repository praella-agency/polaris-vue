<template>
    <ul class="Polaris-OptionList">
        <li v-if="optionsExist" v-for="(normalizedOption, sectionIndex) in normalizedOptions" :key="normalizedOption.title ? normalizedOption.title : `noTitle-${sectionIndex}`">
            <p v-if="normalizedOption.title" class="Polaris-OptionList__Title">{{normalizedOption.title}}</p>
            <ul :id="`${id}-${sectionIndex}`" class="Polaris-OptionList__Options">
                <POptionsListOption
                    v-if="normalizedOption.options"
                    v-for="(option, optionIndex) in normalizedOption.options"
                    :key="option.id ? option.id : `${id}-${sectionIndex}-${optionIndex}`"
                    :id="option.id ? option.id : `${id}-${sectionIndex}-${optionIndex}`"
                    :section="sectionIndex"
                    :index="optionIndex"
                    :select="selected.includes(option.value)"
                    :allowMultiple="allowMultiple"
                    @click="handleClick">
                    {{option.label}}
                </POptionsListOption>
            </ul>
        </li>
    </ul>
</template>

<script>
import { POptionsListOption } from './../../components/POptionList/components/POptionsListOption/index.js';
import ArrayValidator from "./../../utilities/validators/ArrayValidator";

export const OptionDescriptor = {
    label: String,
    value: {
      type: String,
      required: true
    },
    disabled: Boolean,
    active: Boolean,
    id: String,
}

const SectionDescriptor = {
  options: {
    type: Array,
    required: true,
    properties: OptionDescriptor
  },
  title: String,
}

/**
 * <br/>
 * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
 *  sans-serif;">The option list component lets you create a list of grouped items that merchants can pick from.
 *  This can include single selection or multiple selection of options. Option list usually appears in a popover,
 *  and sometimes in a modal or a sidebar. Option lists are styled differently than
 *  <a href="https://polaris-vue.hulkapps.com/?path=/docs/forms-choice-list--choice-list">choice lists</a>
 *  and should not be used within a form,
 *  but as a standalone menu.</h4>
 */

export default {
  name: 'POptionList',
  components: {
    POptionsListOption,
  },
  props: {
    /**
     * Add to allow multiple options.
     * @values true | false
     */
    allowMultiple: {
      type: Boolean,
      default: false,
    },

    /**
     * A unique identifier for the option list.
     */
    id: {
      type: [String, Number],
      default: null,
    },

    /**
     * List title.
     */
    title: {
      type: String,
      default: null,
    },

    /**
     * Collection of options to be listed.
     */
    options: {
      type: Array,
      default: () => ([]),
      ...ArrayValidator('options', OptionDescriptor)
    },

    /**
     * Sections containing a header and related options.
     */
    sections: {
      type: Array,
      default: () => ([]),
      ...ArrayValidator('sections', SectionDescriptor)
    },

    /**
     * The selected options.
     */
    selected: {
      type: Array,
      default: () => ([]),
      required: true,
    },
  },
  data() {
    return {
      optionsExist: true,
    }
  },
  computed: {
    normalizedOptions() {

      if (this.options == null) {
        return this.sections == null ? [] : [{options: [], title: this.title}, ...this.sections];
      }

      if (this.sections == null) {
        return [{title: this.title, options: this.options}];
      }

      return [{title: this.title, options: this.options}, ...this.sections];
    }
  },
  methods: {
    handleClick(sectionIndex, optionIndex) {
      if(typeof sectionIndex === 'number' && typeof optionIndex === 'number') {
        const selectedValue = this.normalizedOptions[sectionIndex].options[optionIndex].value;
        const foundIndex = this.selected.indexOf(selectedValue);
        if (this.allowMultiple) {
          const newSelection =
              foundIndex === -1
                  ? [selectedValue, ...this.selected]
                  : [
                    ...this.selected.slice(0, foundIndex),
                    ...this.selected.slice(foundIndex + 1, this.selected.length),
                  ];

          this.$emit('change', newSelection);
          return;
        }
        /**
         * Method to handle click event
         * @property {Default}
         */
        this.$emit('change', [selectedValue]);
      }
    }
  },
  created() {
    this.optionsExist = this.normalizedOptions.length > 0
  }
}
</script>
