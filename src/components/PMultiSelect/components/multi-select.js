import { computed, nextTick, onMounted, ref, watch } from 'vue';

export function isEmpty (opt) {
  if (opt === 0) return false;
  if (Array.isArray(opt) && opt.length === 0) return true;
  return !opt;
}

function not (fun) {
  return (...params) => !fun(...params)
}

function includes (str, query) {
  /* istanbul ignore else */
  if (str === undefined) str = 'undefined'
  if (str === null) str = 'null'
  if (str === false) str = 'false'
  const text = str.toString().toLowerCase()
  return text.indexOf(query.trim()) !== -1
}

function filterOptions (options, search, label, customLabel) {
  return options.filter(option => includes(customLabel(option, label), search))
}

function stripGroups (options) {
  return options.filter(option => !option.$isLabel)
}

function flattenOptions (values, label) {
  return (options) =>
      options.reduce((prev, curr) => {
        /* istanbul ignore else */
        if (curr[values] && curr[values].length) {
          prev.push({
            $groupLabel: curr[label],
            $isLabel: true
          })
          return prev.concat(curr[values])
        }
        return prev
      }, [])
}

function filterGroups (search, label, values, groupLabel, customLabel) {
  return (groups) =>
      groups.map(group => {
        /* istanbul ignore else */
        if (!group[values]) {
          console.warn(`Options passed to vue-multiselect do not contain groups, despite the config.`)
          return []
        }
        const groupOptions = filterOptions(group[values], search, label, customLabel)

        return groupOptions.length
            ? {
              [groupLabel]: group[groupLabel],
              [values]: groupOptions
            }
            : []
      })
}

const flow = (...fns) => x => fns.reduce((v, f) => f(v), x);

export default function useMultiSelect(props, emit, refs, instance) {
  let search = ref('');
  let isOpen = ref(false);
  let preferredOpenDirection = ref('below');
  let optimizedHeight = ref(props.maxHeight);
  let pointer = ref(0);
  let pointerDirty = ref(false);

  let computedVModel = computed(() => {
    return props.modelValue;
  });

  let internalValue = computed(() => {
    return computedVModel.value || computedVModel.value === 0 ? Array.isArray(computedVModel.value) ? computedVModel.value : [computedVModel.value] : [];
  });

  let filteredOptions = computed(() => {
    const searchValue = search.value || '';
    const normalizedSearch = searchValue.toLowerCase().trim();

    let options = props.options.concat();
    /* istanbul ignore else */
    if (props.internalSearch) {
      options = props.groupValues ? filterAndFlat(options, normalizedSearch, props.label) : filterOptions(options, normalizedSearch, props.label, props.customLabel);
    } else {
      options = props.groupValues ? flattenOptions(props.groupValues, props.groupLabel)(options) : options;
    }

    options = props.hideSelected ? options.filter(not(isSelected)) : options

    /* istanbul ignore else */
    if (props.taggable && normalizedSearch.length && !isExistingOption(normalizedSearch)) {
      if (props.tagPosition === 'bottom') {
        options.push({ isTag: true, label: search });
      } else {
        options.unshift({ isTag: true, label: search });
      }
    }

    return options.slice(0, props.optionsLimit);
  });

  let valueKeys = computed(() => {
    if (props.trackBy) {
      return internalValue.value.map(element => element[props.trackBy]);
    } else {
      return internalValue.value;
    }
  });

  let optionKeys = computed(() => {
    const options = props.groupValues ? flatAndStrip(props.options) : props.options;
    return options.map(element => props.customLabel(element, props.label).toString().toLowerCase());
  });

  let currentOptionLabel = computed(() => {
    return props.multiple ? props.searchable ? '' : props.placeholder : internalValue.value.length ? getOptionLabel(internalValue.value[0]) : props.searchable ? '' : props.placeholder;
  });

  let pointerPosition = computed(() => {
    return pointer.value * props.optionHeight;
  });

  let visibleElements = computed(() => {
    return optimizedHeight.value / props.optionHeight;
  });

  /**
   * Returns the internalValue in a way it can be emited to the parent
   * @returns {Object||Array||String||Integer}
   */
  function getValue () {
    return props.multiple ? internalValue.value : internalValue.value.length === 0 ? null : internalValue.value[0];
  }

  /**
   * Filters and then flattens the options list
   * @param  {Array}
   * @returns {Array} returns a filtered and flat options list
   */
  function filterAndFlat (options, search, label) {
    return flow(filterGroups(search, label, props.groupValues, props.groupLabel, props.customLabel), flattenOptions(props.groupValues, props.groupLabel))(options);
  }

  /**
   * Flattens and then strips the group labels from the options list
   * @param  {Array}
   * @returns {Array} returns a flat options list without group labels
   */
  function flatAndStrip (options) {
    return flow(flattenOptions(props.groupValues, props.groupLabel), stripGroups)(options);
  }

  /**
   * Updates the search value
   * @param  {String}
   */
  function updateSearch (query) {
    search.value = query;
  }

  /**
   * Finds out if the given query is already present
   * in the available options
   * @param  {String}
   * @returns {Boolean} returns true if element is available
   */
  function isExistingOption (query) {
    return !props.options ? false : optionKeys.value.indexOf(query) > -1;
  }

  /**
   * Finds out if the given element is already present
   * in the result value
   * @param  {Object||String||Integer} option passed element to check
   * @returns {Boolean} returns true if element is selected
   */
  function isSelected (option) {
    const opt = props.trackBy ? option[props.trackBy] : option;
    return valueKeys.value.indexOf(opt) > -1;
  }

  /**
   * Finds out if the given option is disabled
   * @param  {Object||String||Integer} option passed element to check
   * @returns {Boolean} returns true if element is disabled
   */
  function isOptionDisabled (option) {
    return !!option.$isDisabled;
  }

  /**
   * Returns empty string when options is null/undefined
   * Returns tag query if option is tag.
   * Returns the customLabel() results and casts it to string.
   *
   * @param  {Object||String||Integer} Passed option
   * @returns {Object||String}
   */
  function getOptionLabel (option) {
    if (isEmpty(option)) return '';
    /* istanbul ignore else */
    if (option.isTag) return option.label;
    /* istanbul ignore else */
    if (option.$isLabel) return option.$groupLabel;

    let label = props.customLabel(option, props.label);
    /* istanbul ignore else */
    if (isEmpty(label)) return '';
    return label;
  }

  /**
   * Add the given option to the list of selected options
   * or sets the option as the selected option.
   * If option is already selected -> remove it from the results.
   *
   * @param  {Object||String||Integer} option to select/deselect
   * @param  {Boolean} block removing
   */
  function select(option, key) {
    /* istanbul ignore else */
    if (option.$isLabel && props.groupSelect) {
      selectGroup(option);
      return;
    }
    if (props.blockKeys.indexOf(key) !== -1 || props.disabled || option.$isDisabled || option.$isLabel) return;
    /* istanbul ignore else */
    if (props.max && props.multiple && internalValue.value.length === props.max) return;
    /* istanbul ignore else */
    if (key === 'Tab' && !pointerDirty.value) return;
    if (option.isTag) {
      emit('tag', option.label, props.id);
      search.value = '';
      if (props.closeOnSelect && !props.multiple) deactivate();
    } else {
      if (isSelected(option)) {
        if (key !== 'Tab') removeElement(option);
        return;
      }

      emit('select', option, props.id);

      if (props.multiple) {
        emit('input', internalValue.value.concat([option]), props.id);
        emit('update:modelValue', internalValue.value.concat([option]), props.id);
      } else {
        emit('input', option, props.id);
        emit('update:modelValue', option, props.id);
      }

      /* istanbul ignore else */
      if (props.clearOnSelect) search.value = '';
    }
    /* istanbul ignore else */
    if (props.closeOnSelect) deactivate();
  }

  /**
   * Add the given group options to the list of selected options
   * If all group optiona are already selected -> remove it from the results.
   *
   * @param  {Object||String||Integer} group to select/deselect
   */
  function selectGroup (selectedGroup) {
    const group = props.options.find(option => {
      return option[props.groupLabel] === selectedGroup.$groupLabel;
    })

    if (!group) return;

    if (wholeGroupSelected(group)) {
      emit('remove', group[props.groupValues], props.id);

      const newValue = internalValue.value.filter(
          option => group[props.groupValues].indexOf(option) === -1
      )

      emit('input', newValue, props.id);
      emit('update:modelValue', newValue, props.id);
    } else {
      const optionsToAdd = group[props.groupValues].filter(
          option => !(isOptionDisabled(option) || isSelected(option))
      )

      emit('select', optionsToAdd, props.id);
      emit('input', internalValue.value.concat(optionsToAdd), props.id);
      emit('update:modelValue', internalValue.value.concat(optionsToAdd), props.id);
    }

    if (props.closeOnSelect) deactivate();
  }

  /**
   * Helper to identify if all values in a group are selected
   *
   * @param {Object} group to validated selected values against
   */
  function wholeGroupSelected (group) {
    return group[props.groupValues].every(option => isSelected(option) || isOptionDisabled(option));
  }

  /**
   * Helper to identify if all values in a group are disabled
   *
   * @param {Object} group to check for disabled values
   */
  function wholeGroupDisabled (group) {
    return group[props.groupValues].every(isOptionDisabled);
  }

  /**
   * Removes the given option from the selected options.
   * Additionally checks this.allowEmpty prop if option can be removed when
   * it is the last selected option.
   *
   * @param  {type} option description
   * @returns {type}        description
   */
  function removeElement (option, shouldClose = true) {
    /* istanbul ignore else */
    if (props.disabled) return
    /* istanbul ignore else */
    if (option.$isDisabled) return
    /* istanbul ignore else */
    if (!props.allowEmpty && internalValue.value.length <= 1) {
      deactivate();
      return
    }

    const index = typeof option === 'object' ? valueKeys.value.indexOf(option[props.trackBy]) : valueKeys.value.indexOf(option);

    emit('remove', option, props.id)
    if (props.multiple) {
      const newValue = internalValue.value.slice(0, index).concat(internalValue.value.slice(index + 1));
      emit('input', newValue, props.id);
      emit('update:modelValue', newValue, props.id);
    } else {
      emit('input', null, props.id);
      emit('update:modelValue', null, props.id);
    }

    /* istanbul ignore else */
    if (props.closeOnSelect && shouldClose) deactivate();
  }

  /**
   * Calls this.removeElement() with the last element
   * from this.internalValue (selected element Array)
   *
   * @fires this#removeElement
   */
  function removeLastElement () {
    /* istanbul ignore else */
    if (props.blockKeys.indexOf('Delete') !== -1) return;
    /* istanbul ignore else */
    if (search.value.length === 0 && Array.isArray(internalValue.value) && internalValue.value.length) {
      removeElement(internalValue.value[internalValue.value.length - 1], false);
    }
  }

  /**
   * Opens the multiselect’s dropdown.
   * Sets this.isOpen to TRUE
   */
  function activate () {
    /* istanbul ignore else */
    if (isOpen.value || props.disabled) return

    adjustPosition();
    /* istanbul ignore else  */
    if (props.groupValues && pointer.value === 0 && filteredOptions.value.length) {
      pointer.value = 1;
    }

    isOpen.value = true;
    /* istanbul ignore else  */
    if (props.searchable) {
      if (!props.preserveSearch) search.value = ''
      nextTick().then(() => {
        refs.search && refs.search.focus()
      });
    } else {
      instance.vnode.el.focus()
    }
    emit('open', props.id);
  }

  /**
   * Closes the multiselect’s dropdown.
   * Sets this.isOpen to FALSE
   */
  function deactivate () {
    /* istanbul ignore else */
    if (!isOpen.value) return;

    isOpen.value = false;
    /* istanbul ignore else  */
    if (props.searchable) {
      refs.search && refs.search.blur();
    } else {
      instance.vnode.el.blur();
    }
    if (!props.preserveSearch) search.value = '';
    emit('close', getValue(), props.id);
  }

  /**
   * Call this.activate() or this.deactivate()
   * depending on this.isOpen value.
   *
   * @fires this#activate || this#deactivate
   * @property {Boolean} isOpen indicates if dropdown is open
   */
  function toggle () {
    isOpen.value ? deactivate() : activate();
  }

  /**
   * Updates the hasEnoughSpace variable used for
   * detecting where to expand the dropdown
   */
  function adjustPosition () {
    if (typeof window === 'undefined') return

    const spaceAbove = instance.vnode.el.getBoundingClientRect().top
    const spaceBelow = window.innerHeight - instance.vnode.el.getBoundingClientRect().bottom
    const hasEnoughSpaceBelow = spaceBelow > props.maxHeight

    if (hasEnoughSpaceBelow || spaceBelow > spaceAbove || props.openDirection === 'below' || props.openDirection === 'bottom') {
      preferredOpenDirection.value = 'below'
      optimizedHeight.value = Math.min(spaceBelow - 40, props.maxHeight)
    } else {
      preferredOpenDirection.value = 'above'
      optimizedHeight.value = Math.min(spaceAbove - 40, props.maxHeight)
    }
  }
  function optionHighlight (index, option) {
    return {
      'multiselect__option--highlight': index === pointer.value && props.showPointer,
      'multiselect__option--selected': isSelected(option)
    };
  }

  function groupHighlight (index, selectedGroup) {
    if (!props.groupSelect) {
      return [
        'multiselect__option--disabled',
        { 'multiselect__option--group': selectedGroup.$isLabel }
      ];
    }

    const group = props.options.find(option => {
      return option[props.groupLabel] === selectedGroup.$groupLabel
    });

    return group && !wholeGroupDisabled(group) ? [
      'multiselect__option--group',
      { 'multiselect__option--highlight': index === pointer.value && props.showPointer },
      { 'multiselect__option--group-selected': wholeGroupSelected(group) }
    ] : 'multiselect__option--disabled'
  }

  function addPointerElement ({ key } = 'Enter') {
    /* istanbul ignore else */
    if (filteredOptions.value.length > 0) {
      select(filteredOptions.value[pointer.value], key);
    }
    pointerReset();
  }

  function pointerForward () {
    /* istanbul ignore else */
    if (pointer.value < filteredOptions.value.length - 1) {
      pointer.value++;
      /* istanbul ignore next */
      if (refs.list.scrollTop <= pointerPosition.value - (visibleElements.value - 1) * props.optionHeight) {
        refs.list.scrollTop = pointerPosition.value - (visibleElements.value - 1) * props.optionHeight;
      }
      /* istanbul ignore else */
      if (filteredOptions.value[pointer.value] && filteredOptions.value[pointer.value].$isLabel && !props.groupSelect) pointerForward();
    }
    pointerDirty.value = true;
  }

  function pointerBackward () {
    if (pointer.value > 0) {
      pointer.value--;
      /* istanbul ignore else */
      if (refs.list.scrollTop >= pointerPosition.value) {
        refs.list.scrollTop = pointerPosition.value;
      }
      /* istanbul ignore else */
      if (filteredOptions.value[pointer.value] && filteredOptions.value[pointer.value].$isLabel && !props.groupSelect) pointerBackward();
    } else {
      /* istanbul ignore else */
      if (filteredOptions.value[pointer.value] && filteredOptions.value[0].$isLabel && !props.groupSelect) pointerForward();
    }
    pointerDirty.value = true;
  }

  function pointerReset () {
    /* istanbul ignore else */
    if (!props.closeOnSelect) return;
    pointer.value = 0;
    /* istanbul ignore else */
    if (refs.list) {
      refs.list.scrollTop = 0;
    }
  }

  function pointerAdjust () {
    /* istanbul ignore else */
    if (pointer.value >= filteredOptions.value.length - 1) {
      pointer.value = filteredOptions.value.length ? filteredOptions.value.length - 1 : 0;
    }

    if (filteredOptions.value.length > 0 && filteredOptions.value[pointer.value].$isLabel && !props.groupSelect) {
      pointerForward();
    }
  }

  function pointerSet (index) {
    pointer.value = index;
    pointerDirty.value = true;
  }

  onMounted(() => {
    /* istanbul ignore else */
    if (!props.multiple && props.max) {
      console.warn('[Vue-Multiselect warn]: Max prop should not be used when prop Multiple equals false.');
    }
    if (props.preselectFirst && !internalValue.value.length && props.options.length) {
      select(filteredOptions.value[0]);
    }
  });

  watch(() => internalValue.value, () => {
    /* istanbul ignore else */
    if (props.resetAfter && internalValue.value.length) {
      search.value = '';
      emit('input', props.multiple ? [] : null);
      emit('update:modelValue', props.multiple ? [] : null);
    }
  });

  watch(() => search.value, () => {
    emit('search-change', search.value, props.id);
  });

  watch(() => filteredOptions.value, () => {
    pointerAdjust();
  });

  watch(() => isOpen.value, () => {
    pointerDirty.value = false;
  });

  watch(() => pointer.value, () => {
    refs.search && refs.search.setAttribute('aria-activedescendant', props.id + '-' + pointer.value.toString());
  });

  return { internalValue, isOpen, preferredOpenDirection, search, optimizedHeight, activate, deactivate, toggle, removeElement,
    removeLastElement, getOptionLabel, updateSearch, filteredOptions, select, selectGroup, currentOptionLabel, pointerForward,
    pointerBackward, addPointerElement, pointerSet, optionHighlight, groupHighlight
  };
}