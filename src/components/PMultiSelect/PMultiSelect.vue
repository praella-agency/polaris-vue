<template>
    <div :class="parentClassName">
        <div class="Polaris-Labelled__LabelWrapper">
            <div class="Polaris-Label">
                <!-- @slot Display label for an element -->
                <slot name="label">
                    <label :id="`${id}Label`" :for="id" class="Polaris-Label__Text">
                        {{ label }}
                    </label>
                </slot>
            </div>
        </div>
        <div :class="className">
            <!--
             Triggers on searchChange
             @event searchChange
             -->
            <MultiSelect
                :id="id"
                v-model="computedValue"
                v-bind="$attrs"
                :disabled="disabled"
                aria-invalid="false"
                :options="computedOptions"
                :track-by="valueField"
                :placeholder="!floatingLabel ? placeholder : null"
                :searchable="searchable"
                :multiple="multiple"
                :taggable="taggable"
                :close-on-select="computedMultiple"
                :clear-on-select="false"
                :preserve-search="true"
                :label="textField"
                @open="handleOpen"
                @close="handleClose"
                @tag="addTag"
                @search-change="(query) => {$emit('searchChange', query)}"
            >
                <template v-slot:caret>
                    <div v-if="!floatingLabel" class="multiselect__select">
                        <PIcon source="SelectMinor"/>
                    </div>
                    <div v-else class="multiselect__select">
                        <PIcon source="CaretDownMinor"/>
                    </div>
                </template>

                <template v-slot:selection="{values, search, remove, isOpen}">
                    <div class="multiselect__tags-wrap" v-show="values && values.length > 0">
                        <template v-for="(option, index) of values" @mousedown.prevent>
                            <PTag
                                :tag="{
                                    'value': option[textField],
                                    'key': option[valueField]
                                }"
                                removable
                                :size="floatingLabel ? 'small' : ''"
                                @remove-tag="remove(option)"
                            />
                        </template>
                    </div>
                    <template slot="limit"></template>
                </template>
            </MultiSelect>
        </div>
        <div class="Polaris-Labelled__HelpText" v-if="helpText">{{ helpText }}</div>
        <PFieldError v-if="error" :error="error"/>
    </div>
</template>

<script setup>
    import { computed, onMounted, ref, watch } from 'vue';
    import { uuid } from '../../ComponentHelpers';
    import { classNames } from '../../utilities/css';
    import { MultiSelect } from './components';
    import { PIcon } from '../../components/PIcon';
    import { PTag } from '../../components/PTag';
    import { PFieldError } from '../../components/PFieldError';

    let props = defineProps({
        /**
         * Disable the PMultiSelect.
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
         * Model value for PMultiSelect.
         */
        modelValue: {
            type: [String, Object, Array, Number, Boolean],
            default: () => ([]),
        },
        /**
         * Disable the searchable options feature.
         */
        searchable: {
            type: Boolean,
            default: true,
        },
        /**
         * Taggable provides ability to add new user-input value on multiselect.
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
            default: `PolarisMultiSelect${uuid()}`,
        },
        /**
         * Create beautifully simple form labels that float over your input fields
         */
        floatingLabel: {
            type: Boolean,
            default: false,
        },
        /**
         * Return object
         */
        returnObject: {
            type: Boolean,
            default: true
        }
    });
    const emit = defineEmits(['change', 'input', 'searchChange', 'update:modelValue', 'update:value']);

    let selected = ref(props.value);
    let dropdownOpen = ref(false);
    let taggableOptions = ref([]);

    let computedVModel = computed(() => {
        return props.modelValue;
    });

    let hasValue = computed(() => {
        if (props.multiple) {
            return selected.value && selected.value.length > 0;
        } else {
            return !!selected.value;
        }
    });

    let parentClassName = computed(() => {
        return classNames(
            props.floatingLabel && 'Polaris-Select-Floating-Label',
            hasValue.value && 'Polaris-Select-Has-Value',
            dropdownOpen.value && 'Polaris-Select--Active',
        );
    });

    let className = computed(() => {
        return classNames(
            'Polaris-Select',
            props.disabled && 'Polaris-Select--disabled',
            props.error && 'invalid',
        );
    });

    let computedOptions = computed(() => {
        const options = [];
        props.options.map((value) => {
            if (typeof value === 'object') {
                if (value[props.disabledField]) {
                    value.$isDisabled = value[props.disabledField];
                }
                options.push(value);
            } else {
                options.push({[props.textField]: value, [props.valueField]: value});
            }
        });
        taggableOptions.value.map((value) => {
            if (typeof value === 'object') {
                if (value[props.disabledField]) {
                    value.$isDisabled = value[props.disabledField];
                }
                options.push(value);
            } else {
                options.push({[props.textField]: value, [props.valueField]: value});
            }
        });
        return options;
    });

    let computedValue = computed({
        get() {
            return selected.value;
        },
        set(value) {
            selected.value = value;
            emitUpdateEvents();
        },
    });

    let computedMultiple = computed(() => {
        return !props.multiple;
    });

    function addTag(newTag) {
        const tag = {
            [props.textField]: newTag,
            [props.valueField]: newTag,
        };
        taggableOptions.value.push(tag);
        if (props.multiple) {
            selected.value.push(tag);
        } else {
            selected.value = tag;
        }
        emitUpdateEvents();
    }

    function handleOpen() {
        dropdownOpen.value = true;
    }

    function handleClose() {
        dropdownOpen.value = false;
    }

    function emitUpdateEvents() {
        const computedUpdatedValue = computedValue.value;
        let values = [];
        if (!props.multiple) {
            values = null;
            if(computedUpdatedValue) {
                values = computedUpdatedValue[props.valueField];
            }
        }
        if (props.multiple && Array.isArray(computedUpdatedValue) && computedUpdatedValue.length ) {
            computedUpdatedValue.forEach(item => {
                values.push(item[props.valueField] || null);
            });
        }
        /**
         * Callback when selection is changed
         */
        emit('change', props.returnObject ? computedUpdatedValue : values);
        /**
         * Callback when input is triggered
         */
        emit('input', props.returnObject ? computedUpdatedValue : values);
        /**
         * Callback when input is triggered
         * @ignore
         */
        emit('update:modelValue', props.returnObject ? computedUpdatedValue : values);
        /**
         * Callback when input is triggered
         * @ignore
         */
        emit('update:value', props.returnObject ? computedUpdatedValue : values);
    }

    onMounted(() => {
        selected.value = computedVModel.value || (props.multiple ? [] : null);
    });

    watch(() => props.value, (value) => {
        selected.value = value;
    });
</script>

