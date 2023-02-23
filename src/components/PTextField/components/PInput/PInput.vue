<template>
    <div :class="className" v-show="showInput">
        <div class="Polaris-TextField__Prefix" :id="id+'Prefix'" v-if="showPrefix">
            {{ prefix }}
            <slot v-if="isSlot(slots.prefix)" name="prefix"/>
        </div>
        <div style="width: 100%">
            <CKEditor
                v-if="richEditor"
                :id="id"
                :editor="editor"
                :config="{}"
                @input="onInput"
                :value="computedValue"
                @update:modelValue="onInput"
                :disabled="disabled"
                :readonly="readOnly"
                :autofocus="autoFocus"
                :placeholder="placeholder"
                :autocomplete="normalizeAutoComplete(autoComplete)"
                :aria-describedby="describedBy"
                :aria-labelledby="labelledBy"
                :aria-invalid="hasError"
            />
            <textarea
                v-else-if="multiline"
                :name="name"
                :class="inputClassName"
                :id="id"
                :disabled="disabled"
                :readonly="readOnly"
                :autofocus="autoFocus"
                :value="computedValue"
                :minlength="minLength"
                :maxlength="maxLength"
                v-text="multiline?computedValue:''"
                :placeholder="computedPlaceholder"
                :autocomplete="normalizeAutoComplete(autoComplete)"
                :style="computedStyle"
                :aria-describedby="describedBy"
                :aria-labelledby="labelledBy"
                :aria-invalid="hasError"
                @input="onInput"
            />
            <input
                v-else-if="type === 'file'"
                ref="input"
                :name="name"
                :class="inputClassName"
                :id="id"
                :disabled="disabled"
                :readonly="readOnly"
                type="file"
                :multiple="multiple"
                :accept="accept"
                :aria-describedby="describedBy"
                :aria-labelledby="labelledBy"
                :aria-invalid="hasError"
                @change="onInput"
            />
            <input
                v-else
                ref="input"
                :name="name"
                :class="inputClassName"
                :id="id"
                :disabled="disabled"
                :readonly="readOnly"
                :autofocus="autoFocus"
                :value="computedValue"
                :placeholder="computedPlaceholder"
                :autocomplete="normalizeAutoComplete(autoComplete)"
                :min="min"
                :max="max"
                :step="step"
                :minlength="minLength"
                :maxlength="maxLength"
                :type="inputType"
                :aria-describedby="describedBy"
                :aria-labelledby="labelledBy"
                :aria-invalid="hasError"
                @input="onInput"
            />
            <label
                v-if="floatingLabel && (!richEditor && type !== 'file')"
                :class="floatingLabelClassName"
                :for="id"
            >
                <slot name="label">
                    {{ label }}
                </slot>
            </label>
            <div v-if="!richEditor" class="Polaris-TextField__Backdrop"></div>
        </div>
        <div class="Polaris-TextField__Suffix" :id="id+'Suffix'" v-if="showSuffix">
            {{ suffix }}
            <slot v-if="isSlot(slots.suffix)" name="suffix"></slot>
        </div>

        <div v-if="showCharacterCount"
             id="CharacterCounter"
             :class="characterCountClassName"
             :aria-label="characterCountLabel"
        >
            {{ characterCountText }}
        </div>

        <button type="button" :class="clearButtonClassName" v-if="computedValue && clearable" @click="onClear">
            <span class="Polaris-VisuallyHidden">Clear</span>
            <PIcon source="CircleCancelMinor" color="base"></PIcon>
        </button>

        <PSpinner @change="handleNumberChange" v-if="type === 'number'"></PSpinner>

        <PFieldResizer
            v-if="multiline"
            :contents="value || placeholder"
            :current-height="computedHeight"
            :minimum-lines="(typeof multiline === 'number') ? multiline : 1"
            @heightchange="handleExpandingResize"
        />
    </div>
</template>

<script setup>
    import { ref, computed, watch, useSlots } from 'vue';
    import { Type } from '../../../variables'
    import { hasSlot, uuid } from '../../../../ComponentHelpers';
    import { classNames } from '../../../../utilities/css';
    import { CKEditor } from './components/CKEditor';
    import { PSpinner } from '../../../../components/PTextField/components/PSpinner';
    import { PFieldResizer } from '../../../../components/PTextField/components/PFieldResizer';
    import { PIcon } from '../../../../components/PIcon';

    import StringValidator from '../../../../utilities/validators/StringValidator';

    let props = defineProps({
        id: {
            type: [String, Number],
            default: `PolarisTextField${uuid()}`,
        },
        value: {
            type: [String, Number, Object, Array, Boolean, FileList],
            default: null,
        },
        modelValue: {
            type: [String, Number, Object, Array, Boolean, FileList],
            default: null,
        },
        type: {
            type: String,
            ...StringValidator('type', Type),
        },
        align: {
            type: String,
        },
        placeholder: {
            type: String,
        },
        multiline: {
            type: [Boolean, Number],
        },
        richEditor: {
            type: Boolean,
        },
        disabled: {
            type: Boolean,
        },
        readOnly: {
            type: Boolean,
        },
        showInput: {
            type: Boolean,
            default: true,
        },
        clearable: {
            type: Boolean,
        },
        showCharacterCount: {
            type: Boolean,
        },
        prefixClass: {
            type: String,
        },
        autoFocus: {
            type: Boolean,
        },
        autoComplete: {
            type: Boolean,
        },
        labelClass: {
            type: String,
        },
        inputClass: {
            type: String,
        },
        suffix: {
            type: String,
        },
        prefix: {
            type: String,
        },
        name: {
            type: String,
        },
        hasError: {
            type: Boolean,
        },
        maxLength: {
            type: [String, Number],
        },
        minLength: {
            type: [String, Number],
        },
        step: {
            type: Number,
        },
        minHeight: {
            type: Number,
            default: 0,
        },
        min: {
            type: [String, Number],
        },
        max: {
            type: [String, Number]
        },
        describedBy: {
            type: String,
        },
        multiple: {
            type: Boolean,
        },
        accept: {
            type: String,
        },
        label: {
            type: String,
        },
        floatingLabel: {
            type: Boolean,
        },
    });

    const emit = defineEmits(['input', 'update:modelValue']);
    const slots = useSlots();
    let content = computedVModel !== null ? ref(computedVModel) : ref('');
    let height = props.minHeight;
    const editor = CKEditor;
    const characterCountLabel = props.maxLength || 'characterCountLabel';
    let characterCount = computedVModel && computedVModel.value.length;

    let computedVModel = computed(() => {
        return props.modelValue;
    });

    const className = computed(() => {
        return classNames(
            'Polaris-TextField',
            Boolean(content) && 'Polaris-TextField--hasValue',
            props.disabled && 'Polaris-TextField--disabled',
            props.readOnly && 'Polaris-TextField--readOnly',
            props.hasError && 'Polaris-TextField--error',
        );
    });

    const inputClassName = computed(() => {
        return classNames(
            props.floatingLabel ? 'Polaris-FloatingLabels__Input' : 'Polaris-TextField__Input',
            props.inputClass,
            props.align && `Polaris-TextField__Input Polaris-TextField__Input--align${textAlign}`,
            (props.floatingLabel && props.multiline) && 'Polaris-FloatingLabel__TextArea',
            (props.floatingLabel && showPrefix) && 'Polaris-FloatingLabels__Input--prefix',
            (props.floatingLabel && showSuffix) && 'Polaris-FloatingLabels__Input--suffix',
            (props.showCharacterCount || props.type === 'number') && 'Polaris-FloatingLabels__Input--number',
            (props.floatingLabel && props.hasError) && 'Polaris-FloatingLabels__Input--error',
        );
    });

    const characterCountClassName = computed(() => {
        return classNames(
            'Polaris-TextField__CharacterCount',
            props.multiline && 'Polaris-TextField__AlignFieldBottom ',
        );
    });

    const clearButtonClassName = computed(() => {
        return classNames(
            'Polaris-TextField__ClearButton',
            props.multiline && 'Polaris-TextField__AlignFieldBottom ',
        );
    });

    const floatingLabelClassName = computed(() => {
        return classNames(
            'Polaris-Floating--label',
            'Polaris-Floating--label--visible',
            showPrefix && 'Polaris-Floating--label__prefix',
            showSuffix && 'Polaris-Floating--label__suffix',
        );
    });

    const characterCountText = computed(() => {
        return !props.maxLength ? characterCount : `${characterCount}/${props.maxLength}`;
    });

    const inputType = computed(() => {
        return props.type === 'currency' ? 'text' : props.type;
    });

    const showPrefix = computed(() => {
        return props.prefix || hasSlot(slots.prefix);
    });

    const showSuffix = computed(() => {
        return props.suffix || hasSlot(slots.suffix);
    });

    const textAlign = computed(() => {
        return props.align.replace(/^_*(.)|_+(.)/g, (s, c, d) => c ? c.toUpperCase() : ' ' + d.toUpperCase());
    });

    const labelledBy = computed(() => {
        const label = [props.id + 'Label'];
        if (showPrefix) {
            label.push(props.id + 'Prefix');
        }
        if (showSuffix) {
            label.push(props.id + 'Suffix');
        }
        return label.join(' ');
    });

    let computedHeight = computed({
        get() {
            return height;
        },
        set(value) {
            height = value;
        }
    });

    let computedValue = computed({
        get() {
            if (props.type === 'number') {
                return Number(content);
            }
            return content;
        },
        set(value) {
            if (props.type === 'number') {
                content = Number(value);
            } else {
                content = value;
            }
            emit('input', props.type === 'number' ? Number(value) : value);
            emit('update:modelValue', props.type === 'number' ? Number(value) : value);
        }
    });

    const computedStyle = computed(() => {
        return {
            resize: (props.multiline && computedHeight) ? 'vertical' : null,
            height: (props.multiline && computedHeight) ? `${computedHeight}px` : null,
            overflow: (props.multiline && computedHeight) ? 'auto' : null
        };
    });

    const computedPlaceholder = computed(() => {
        return props.floatingLabel ? 'Enter input' : props.placeholder;
    });

    const isSlot = computed(() => {
        return hasSlot;
    });

    function onInput(event) {
        if (props.type === 'file') {
            computedValue = event.target.files;
            return;
        }

        if (event.target) {
            computedValue = event.target.value;
        }
    }

    function onClear() {
        computedValue = undefined;
    }

    function handleNumberChange(steps) {
        const numericValue = computedValue ? parseFloat(computedValue) : 0;

        // Returns the length of decimal places in a number
        const dpl = (num) => (num.toString().split('.')[1] || []).length;

        if (isNaN(numericValue) || props.disabled) {
            return;
        }

        const min = props.min || -Infinity;
        const max = props.max || +Infinity;
        const step = props.step || 1;

        // Making sure the new value has the same length of decimal places as the
        // step / value has.
        const decimalPlaces = Math.max(dpl(numericValue), dpl(step));

        const newValue = Math.min(
            Number(max),
            Math.max(numericValue + steps * step, Number(min))
        );

        if (!isNaN(newValue)) {
            computedValue = newValue.toFixed(decimalPlaces);
        }
    }

    function handleExpandingResize(e) {
        computedHeight = (e < props.minHeight) ? props.minHeight : e;
    }

    function normalizeAutoComplete(autoComplete) {
        if (autoComplete === true) {
            return 'on';
        } else if (autoComplete === false) {
            return 'off';
        } else {
            return autoComplete;
        }
    }

    const value = watch(() => props.value, (newValue) => {
        content = newValue;
        characterCount = newValue ? newValue.length : 0;
    });

    const modelValue = watch(() => props.modelValue, (newValue) => {
        content = newValue;
        characterCount = newValue ? newValue.length : 0;
    });
</script>
