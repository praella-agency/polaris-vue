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
                        <!-- @slot Media to display to the left of the option content.

Access values with `slot-props` attribute.-->
                        <slot name="media" :item="option"/>
                    </template>
                    {{option.label}}
                </POptionsListOption>
            </ul>
        </li>
    </ul>
</template>

<script setup>
    import { computed, onMounted, ref } from 'vue';
    import { uuid } from '../../ComponentHelpers';
    import { POptionsListOption } from '../../components/POptionList/components/POptionsListOption';
    import ArrayValidator from '../../utilities/validators/ArrayValidator';
    import { OptionDescriptor, SectionDescriptor } from '../variables';

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

    let props = defineProps({
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
    });

    const emit = defineEmits(['change', 'click']);

    let optionsExist = ref(true);
    let selectedValue = ref(null);

    let optionListId = computed(() => {
        if (!props.id) {
            return `Polaris-OptionList-${uuid}`;
        }
        return props.id;
    });

    let normalizedOptions = computed(() => {
        if (props.options == null) {
            return props.sections == null ? [] : [{options: [], title: props.title}, ...props.sections];
        }

        if (props.sections == null) {
            return [{title: props.title, options: props.options}];
        }

        return [{title: props.title, options: props.options}, ...props.sections];
    });

    function handleClick(sectionIndex, optionIndex) {
        if (typeof sectionIndex === 'number' && typeof optionIndex === 'number') {
            const value = normalizedOptions.value[sectionIndex].options[optionIndex].value;
            const foundIndex = props.selected.indexOf(value);
            if (props.allowMultiple) {
                const newSelection =
                    foundIndex === -1
                        ? [value, ...props.selected]
                        : [
                            ...props.selected.slice(0, foundIndex),
                            ...props.selected.slice(foundIndex + 1, props.selected.length),
                        ];

                selectedValue.value = newSelection;
                emit('change', newSelection);
                return;
            }
            selectedValue.value = [value];
            /**
             *
             * Method to handle change event
             */
            emit('change', [value]);
        }
    }

    function handleSelectedObject(option) {
        /**
         * Method to handle click event. This event will provide the selected option.
         */
        emit('click', JSON.parse(JSON.stringify(selectedValue.value)), option)
    }

    onMounted(() => {
        optionsExist.value = normalizedOptions.value.length > 0;
    });
</script>
