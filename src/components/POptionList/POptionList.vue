<template>
    <ul class="Polaris-OptionList">
        <li
            v-if="optionsExist"
            v-for="(normalizedOption, sectionIndex) in normalizedOptions"
            :key="normalizedOption.title ? normalizedOption.title : `noTitle-${sectionIndex}`"
        >
            <p v-if="normalizedOption.title" class="Polaris-OptionList__Title">{{normalizedOption.title}}</p>
            <ul :id="`${optionListId}-${sectionIndex}`" class="Polaris-OptionList__Options">
                <POptionsListOption
                    v-if="normalizedOption.options"
                    v-for="(option, optionIndex) in normalizedOption.options"
                    :key="option.id ? option.id : `${optionListId}-${sectionIndex}-${optionIndex}`"
                    :id="option.id ? option.id : `${optionListId}-${sectionIndex}-${optionIndex}`"
                    :section="sectionIndex"
                    :index="optionIndex"
                    :select="selected.includes(option.value)"
                    :allowMultiple="allowMultiple"
                    @click="handleClick"
                    @selectedObject="handleSelectedObject(option)"
                >
                    <template v-slot:media="slotProps">
                        <!-- @slot Media to display to the left of the option content -->
                        <slot name="media" :item="option"/>
                    </template>
                    {{option.label}}
                </POptionsListOption>
            </ul>
        </li>
    </ul>
</template>

<script>
import { POptionsListOption } from '../../components/POptionList/components/POptionsListOption';
import ArrayValidator from '../../utilities/validators/ArrayValidator';

export const OptionDescriptor = {
    label: String,
    value: {
      type: [String, Number],
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
        selectedValue: null,
    }
  },
  computed: {
    optionListId() {
        if (!this.id) {
            return `Polaris-OptionList-${this['_uid']}`;
        }
        return this.id;
    },
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

          this.selectedValue = newSelection;
          this.$emit('change', newSelection);
          return;
        }
        this.selectedValue = [selectedValue];
        /**
         *
         * Method to handle change event
         */
        this.$emit('change', [selectedValue]);
      }
    },
      handleSelectedObject(option) {
          /**
           * Method to handle click event. This event will provide the selected option.
           */
          this.$emit('click', this.selectedValue, option)
      }
  },
  created() {
    this.optionsExist = this.normalizedOptions.length > 0;
  }
}
</script>
