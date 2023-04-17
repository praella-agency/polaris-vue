<template>
    <div
        :tabindex="searchable ? -1 : tabindex"
        :class="{ 'multiselect--active': isOpen, 'multiselect--disabled': disabled, 'multiselect--above': isAbove }"
        @focus="activate()"
        @blur="searchable ? false : deactivate()"
        @keydown.self.down.prevent="pointerForward()"
        @keydown.self.up.prevent="pointerBackward()"
        @keypress.enter.tab.stop.self="addPointerElement($event)"
        @keyup.esc="deactivate()"
        class="multiselect"
        role="combobox"
        :aria-owns="'listbox-'+id">
        <slot name="caret" :toggle="toggle">
            <div @mousedown.prevent.stop="toggle()" class="multiselect__select"></div>
        </slot>
        <slot name="clear" :search="search"></slot>
        <div ref="tags" class="multiselect__tags">
            <slot
                name="selection"
                :search="search"
                :remove="removeElement"
                :values="visibleValues"
                :is-open="isOpen"
            >
                <div class="multiselect__tags-wrap" v-show="visibleValues.length > 0">
                    <template v-for="(option, index) of visibleValues" @mousedown.prevent>
                        <slot name="tag" :option="option" :search="search" :remove="removeElement">
                <span class="multiselect__tag" :key="index">
                  <span v-text="getOptionLabel(option)"></span>
                  <i tabindex="1" @keypress.enter.prevent="removeElement(option)"  @mousedown.prevent="removeElement(option)" class="multiselect__tag-icon"></i>
                </span>
                        </slot>
                    </template>
                </div>
                <template v-if="internalValue && internalValue.length > limit">
                    <slot name="limit">
                        <strong class="multiselect__strong" v-text="limitText(internalValue.length - limit)"/>
                    </slot>
                </template>
            </slot>
            <transition name="multiselect__loading">
                <slot name="loading">
                    <div v-show="loading" class="multiselect__spinner"/>
                </slot>
            </transition>
            <input
                ref="searchRef"
                v-if="searchable"
                :name="name"
                :id="id"
                type="text"
                autocomplete="off"
                spellcheck="false"
                :placeholder="placeholder"
                :style="inputStyle"
                :value="search"
                :disabled="disabled"
                :tabindex="tabindex"
                @input="updateSearch($event.target.value)"
                @focus.prevent="activate()"
                @blur.prevent="deactivate()"
                @keyup.esc="deactivate()"
                @keydown.down.prevent="pointerForward()"
                @keydown.up.prevent="pointerBackward()"
                @keypress.enter.prevent.stop.self="addPointerElement($event)"
                @keydown.delete.stop="removeLastElement()"
                class="multiselect__input"
                :aria-controls="'listbox-'+id"
            />
            <span
                v-if="isSingleLabelVisible"
                class="multiselect__single"
                @mousedown.prevent="toggle"
            >
          <slot name="singleLabel" :option="singleValue">
              {{ currentOptionLabel }}
          </slot>
        </span>
            <span
                v-if="isPlaceholderVisible"
                class="multiselect__placeholder"
                @mousedown.prevent="toggle"
            >
          <slot name="placeholder">
            {{ placeholder }}
          </slot>
        </span>
        </div>
        <transition name="multiselect">
            <div
                class="multiselect__content-wrapper"
                v-show="isOpen"
                @focus="activate"
                tabindex="-1"
                @mousedown.prevent
                :style="{ maxHeight: `${optimizedHeight}px` }"
                ref="listRef"
            >
                <ul class="multiselect__content" :style="contentStyle" role="listbox" :id="'listbox-'+id">
                    <slot name="beforeList"></slot>
                    <li v-if="multiple && max === internalValue.length">
              <span class="multiselect__option">
                <slot name="maxElements">Maximum of {{ max }} options selected. First remove a selected option to select another.</slot>
              </span>
                    </li>
                    <template v-if="!max || internalValue.length < max">
                        <li class="multiselect__element"
                            v-for="(option, index) of filteredOptions"
                            :key="index"
                            v-bind:id="id + '-' + index"
                            v-bind:role="!(option && (option.$isLabel || option.$isDisabled)) ? 'option' : null">
                <span
                    v-if="!(option && (option.$isLabel || option.$isDisabled))"
                    :class="optionHighlight(index, option)"
                    @click.stop="select(option)"
                    @mouseenter.self="pointerSet(index)"
                    :data-select="option && option.isTag ? tagPlaceholder : selectLabelText"
                    :data-selected="selectedLabelText"
                    :data-deselect="deselectLabelText"
                    class="multiselect__option">
                    <slot name="option" :option="option" :search="search" :index="index">
                      <span>{{ getOptionLabel(option) }}</span>
                    </slot>
                </span>
                            <span
                                v-if="option && (option.$isLabel || option.$isDisabled)"
                                :data-select="groupSelect && selectGroupLabelText"
                                :data-deselect="groupSelect && deselectGroupLabelText"
                                :class="groupHighlight(index, option)"
                                @mouseenter.self="groupSelect && pointerSet(index)"
                                @mousedown.prevent="selectGroup(option)"
                                class="multiselect__option">
                    <slot name="option" :option="option" :search="search" :index="index">
                      <span>{{ getOptionLabel(option) }}</span>
                    </slot>
                </span>
                        </li>
                    </template>
                    <li v-show="showNoResults && (filteredOptions.length === 0 && search && !loading)">
              <span class="multiselect__option">
                <slot name="noResult" :search="search">No elements found. Consider changing the search query.</slot>
              </span>
                    </li>
                    <li v-show="showNoOptions && (options.length === 0 && !search && !loading)">
              <span class="multiselect__option">
                <slot name="noOptions">List is empty.</slot>
              </span>
                    </li>
                    <slot name="afterList"></slot>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script setup>
    import { computed, getCurrentInstance, onMounted, onUpdated, ref } from 'vue';
    import useMultiSelect, { isEmpty } from './multi-select';

    let props = defineProps({
        /**
         * name attribute to match optional label element
         * @default ''
         * @type {String}
         */
        name: {
            type: String,
            default: ''
        },
        /**
         * String to show when pointing to an option
         * @default 'Press enter to select'
         * @type {String}
         */
        selectLabel: {
            type: String,
            default: 'Press enter to select'
        },
        /**
         * String to show when pointing to an option
         * @default 'Press enter to select'
         * @type {String}
         */
        selectGroupLabel: {
            type: String,
            default: 'Press enter to select group'
        },
        /**
         * String to show next to selected option
         * @default 'Selected'
         * @type {String}
         */
        selectedLabel: {
            type: String,
            default: 'Selected'
        },
        /**
         * String to show when pointing to an already selected option
         * @default 'Press enter to remove'
         * @type {String}
         */
        deselectLabel: {
            type: String,
            default: 'Press enter to remove'
        },
        /**
         * String to show when pointing to an already selected option
         * @default 'Press enter to remove'
         * @type {String}
         */
        deselectGroupLabel: {
            type: String,
            default: 'Press enter to deselect group'
        },
        /**
         * Decide whether to show pointer labels
         * @default true
         * @type {Boolean}
         */
        showLabels: {
            type: Boolean,
            default: true
        },
        /**
         * Limit the display of selected options. The rest will be hidden within the limitText string.
         * @default 99999
         * @type {Integer}
         */
        limit: {
            type: Number,
            default: 99999
        },
        /**
         * Sets maxHeight style value of the dropdown
         * @default 300
         * @type {Integer}
         */
        maxHeight: {
            type: Number,
            default: 300
        },
        /**
         * Function that process the message shown when selected
         * elements pass the defined limit.
         * @default 'and * more'
         * @param {Int} count Number of elements more than limit
         * @type {Function}
         */
        limitText: {
            type: Function,
            default: count => `and ${count} more`
        },
        /**
         * Set true to trigger the loading spinner.
         * @default False
         * @type {Boolean}
         */
        loading: {
            type: Boolean,
            default: false
        },
        /**
         * Disables the multiselect if true.
         * @default false
         * @type {Boolean}
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * Fixed opening direction
         * @default ''
         * @type {String}
         */
        openDirection: {
            type: String,
            default: ''
        },
        /**
         * Shows slot with message about empty options
         * @default true
         * @type {Boolean}
         */
        showNoOptions: {
            type: Boolean,
            default: true
        },
        showNoResults: {
            type: Boolean,
            default: true
        },
        tabindex: {
            type: Number,
            default: 0
        },
        // MultiSelectMixInsProps
        /**
         * Decide whether to filter the results based on search query.
         * Useful for async filtering, where we search through more complex data.
         * @type {Boolean}
         */
        internalSearch: {
            type: Boolean,
            default: true
        },
        /**
         * Array of available options: Objects, Strings or Integers.
         * If array of objects, visible label will default to option.label.
         * If `labal` prop is passed, label will equal option['label']
         * @type {Array}
         */
        options: {
            type: Array,
            required: true
        },
        /**
         * Equivalent to the `multiple` attribute on a `<select>` input.
         * @default false
         * @type {Boolean}
         */
        multiple: {
            type: Boolean,
            default: false
        },
        modelValue: {
            type: null,
            default () {
                return []
            }
        },
        /**
         * Key to compare objects
         * @default 'id'
         * @type {String}
         */
        trackBy: {
            type: String
        },
        /**
         * Label to look for in option Object
         * @default 'label'
         * @type {String}
         */
        label: {
            type: String
        },
        /**
         * Enable/disable search in options
         * @default true
         * @type {Boolean}
         */
        searchable: {
            type: Boolean,
            default: true
        },
        /**
         * Clear the search input after `)
         * @default true
         * @type {Boolean}
         */
        clearOnSelect: {
            type: Boolean,
            default: true
        },
        /**
         * Hide already selected options
         * @default false
         * @type {Boolean}
         */
        hideSelected: {
            type: Boolean,
            default: false
        },
        /**
         * Equivalent to the `placeholder` attribute on a `<select>` input.
         * @default 'Select option'
         * @type {String}
         */
        placeholder: {
            type: String,
            default: 'Select option'
        },
        /**
         * Allow to remove all selected values
         * @default true
         * @type {Boolean}
         */
        allowEmpty: {
            type: Boolean,
            default: true
        },
        /**
         * Reset this.internalValue, this.search after this.internalValue changes.
         * Useful if want to create a stateless dropdown.
         * @default false
         * @type {Boolean}
         */
        resetAfter: {
            type: Boolean,
            default: false
        },
        /**
         * Enable/disable closing after selecting an option
         * @default true
         * @type {Boolean}
         */
        closeOnSelect: {
            type: Boolean,
            default: true
        },
        /**
         * Function to interpolate the custom label
         * @default false
         * @type {Function}
         */
        customLabel: {
            type: Function,
            default (option, label) {
                if (isEmpty(option)) return ''
                return label ? option[label] : option
            }
        },
        /**
         * Disable / Enable tagging
         * @default false
         * @type {Boolean}
         */
        taggable: {
            type: Boolean,
            default: false
        },
        /**
         * String to show when highlighting a potential tag
         * @default 'Press enter to create a tag'
         * @type {String}
         */
        tagPlaceholder: {
            type: String,
            default: 'Press enter to create a tag'
        },
        /**
         * By default new tags will appear above the search results.
         * Changing to 'bottom' will revert this behaviour
         * and will proritize the search results
         * @default 'top'
         * @type {String}
         */
        tagPosition: {
            type: String,
            default: 'top'
        },
        /**
         * Number of allowed selected options. No limit if 0.
         * @default 0
         * @type {Number}
         */
        max: {
            type: [Number, Boolean],
            default: false
        },
        /**
         * Will be passed with all events as second param.
         * Useful for identifying events origin.
         * @default null
         * @type {String|Integer}
         */
        id: {
            default: null
        },
        /**
         * Limits the options displayed in the dropdown
         * to the first X options.
         * @default 1000
         * @type {Integer}
         */
        optionsLimit: {
            type: Number,
            default: 1000
        },
        /**
         * Name of the property containing
         * the group values
         * @default 1000
         * @type {String}
         */
        groupValues: {
            type: String
        },
        /**
         * Name of the property containing
         * the group label
         * @default 1000
         * @type {String}
         */
        groupLabel: {
            type: String
        },
        /**
         * Allow to select all group values
         * by selecting the group label
         * @default false
         * @type {Boolean}
         */
        groupSelect: {
            type: Boolean,
            default: false
        },
        /**
         * Array of keyboard keys to block
         * when selecting
         * @default 1000
         * @type {String}
         */
        blockKeys: {
            type: Array,
            default () {
                return []
            }
        },
        /**
         * Prevent from wiping up the search value
         * @default false
         * @type {Boolean}
         */
        preserveSearch: {
            type: Boolean,
            default: false
        },
        /**
         * Select 1st options if value is empty
         * @default false
         * @type {Boolean}
         */
        preselectFirst: {
            type: Boolean,
            default: false
        },
        // PointerMixInsProps
        /**
         * Enable/disable highlighting of the pointed value.
         * @type {Boolean}
         * @default true
         */
        showPointer: {
            type: Boolean,
            default: true
        },
        optionHeight: {
            type: Number,
            default: 40
        }
    });
    const emits = defineEmits(['tag', 'select', 'input', 'update:modelValue', 'remove', 'open', 'close', 'search-change']);

    let refs = {}
    let searchRef = ref(null);
    let listRef = ref(null);

    let { internalValue, isOpen, preferredOpenDirection, search, optimizedHeight, activate, deactivate, toggle, removeElement, getOptionLabel, updateSearch, filteredOptions,
        select, selectGroup, currentOptionLabel, removeLastElement, pointerForward, pointerBackward, addPointerElement, pointerSet, optionHighlight, groupHighlight
    } = useMultiSelect(props, emits, refs, getCurrentInstance());

    let singleValue = computed(() => {
        return internalValue.value[0];
    });

    let visibleValues = computed(() => {
        return props.multiple ? internalValue.value.slice(0, props.limit) : [];
    });

    let isSingleLabelVisible = computed(() => {
        return ((singleValue.value || singleValue.value === 0) && (!isOpen.value || !props.searchable) && !visibleValues.value.length);
    });

    let isPlaceholderVisible = computed(() => {
        return !internalValue.value.length && (!props.searchable || !isOpen.value);
    });

    let deselectLabelText = computed(() => {
        return props.showLabels ? props.deselectLabel : '';
    });

    let deselectGroupLabelText = computed(() => {
        return props.showLabels ? props.deselectGroupLabel : '';
    });

    let selectLabelText = computed(() => {
        return props.showLabels ? props.selectLabel : '';
    });

    let selectGroupLabelText = computed(() => {
        return props.showLabels ? props.selectGroupLabel : '';
    });

    let selectedLabelText = computed(() => {
        return props.showLabels ? props.selectedLabel : '';
    });

    let inputStyle = computed(() => {
        if (props.searchable || (props.multiple && props.modelValue && props.modelValue.length)) {
            // Hide input by setting the width to 0 allowing it to receive focus
            return isOpen.value ? { width: '100%' } : { width: '0', position: 'absolute', padding: '0' };
        }
        return '';
    });

    let contentStyle = computed(() => {
        return props.options.length ? { display: 'inline-block' } : { display: 'block' };
    });

    let isAbove = computed(() => {
        if (props.openDirection === 'above' || props.openDirection === 'top') {
            return true
        } else if (props.openDirection === 'below' || props.openDirection === 'bottom') {
            return false
        } else {
            return preferredOpenDirection.value === 'above';
        }
    });

    onMounted(() => {
        refs.search = searchRef.value;
        refs.list = listRef.value;
    });
</script>
