<template>
    <div :class="className" v-show="showInput">
        <div class="Polaris-TextField__Prefix" :id="id+'Prefix'" v-if="showPrefix">
            {{ prefix }}
            <slot v-if="hasSlot($slots.prefix)" name="prefix"/>
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
            <slot v-if="hasSlot($slots.suffix)" name="suffix"></slot>
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

<script>
    import utils from '../../../../utilities';
    import { hasSlot, uuid } from '../../../../ComponentHelpers';
    import { classNames } from '../../../../utilities/css';
    import { CKEditor } from './components/CKEditor';
    import { PSpinner } from '../../../../components/PTextField/components/PSpinner';
    import { PFieldResizer } from '../../../../components/PTextField/components/PFieldResizer';
    import { PIcon } from '../../../../components/PIcon';

    import StringValidator from '../../../../utilities/validators/StringValidator';

    const Type = [
        'text', 'email', 'number', 'password', 'search', 'tel', 'url', 'date', 'datetime-local',
        'month', 'time', 'week', 'currency', 'file',
    ];

    const Align = ['left', 'right', 'center'];

    export default {
        name: 'PInput',
        components: {
            PFieldResizer, PSpinner, PIcon, CKEditor
        },
        props: {
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
        },
        emits: ['input', 'update:modelValue'],
        data() {
            return {
                content: this.computedVModel !== null ? this.computedVModel : '',
                height: this.minHeight,
                editor: CKEditor,
                characterCountLabel: this.maxLength || 'characterCountLabel',
                characterCount: this.computedVModel && this.computedVModel.length,
            };
        },
        computed: {
            computedVModel() {
              return this.modelValue;
            },
            className() {
                return classNames(
                    'Polaris-TextField',
                    Boolean(this.content) && 'Polaris-TextField--hasValue',
                    this.disabled && 'Polaris-TextField--disabled',
                    this.readOnly && 'Polaris-TextField--readOnly',
                    this.hasError && 'Polaris-TextField--error',
                );
            },
            inputClassName() {
                return classNames(
                    this.floatingLabel ? 'Polaris-FloatingLabels__Input' : 'Polaris-TextField__Input',
                    this.inputClass,
                    this.align && `Polaris-TextField__Input Polaris-TextField__Input--align${this.textAlign}`,
                    (this.floatingLabel && this.multiline) && 'Polaris-FloatingLabel__TextArea',
                    (this.floatingLabel && this.showPrefix) && 'Polaris-FloatingLabels__Input--prefix',
                    (this.floatingLabel && this.showSuffix) && 'Polaris-FloatingLabels__Input--suffix',
                    (this.showCharacterCount || this.type === 'number') && 'Polaris-FloatingLabels__Input--number',
                    (this.floatingLabel && this.hasError) && 'Polaris-FloatingLabels__Input--error',
                );
            },
            characterCountClassName() {
                return classNames(
                    'Polaris-TextField__CharacterCount',
                    this.multiline && 'Polaris-TextField__AlignFieldBottom ',
                );
            },
            clearButtonClassName() {
                return classNames(
                    'Polaris-TextField__ClearButton',
                    this.multiline && 'Polaris-TextField__AlignFieldBottom ',
                );
            },
            floatingLabelClassName() {
                return classNames(
                    'Polaris-Floating--label',
                    'Polaris-Floating--label--visible',
                    this.showPrefix && 'Polaris-Floating--label__prefix',
                    this.showSuffix && 'Polaris-Floating--label__suffix',
                );
            },
            characterCountText() {
                return !this.maxLength
                    ? this.characterCount
                    : `${this.characterCount}/${this.maxLength}`;
            },
            inputType() {
                return this.type === 'currency' ? 'text' : this.type;
            },
            showPrefix() {
                return this.prefix || hasSlot(this.$slots.prefix);
            },
            showSuffix() {
                return this.suffix || hasSlot(this.$slots.suffix);
            },
            textAlign() {
                return this.align.replace(
                    /^_*(.)|_+(.)/g, (s, c, d) => c ? c.toUpperCase() : ' ' + d.toUpperCase()
                );
            },
            labelledBy() {
                const label = [this.id + 'Label'];
                if (this.showPrefix) {
                    label.push(this.id + 'Prefix');
                }
                if (this.showSuffix) {
                    label.push(this.id + 'Suffix');
                }
                return label.join(' ');
            },
            computedHeight: {
                get() {
                    return this.height;
                },
                set(value) {
                    this.height = value;
                },
            },
            computedValue: {
                get() {
                    if (this.type === 'number') {
                        return Number(this.content);
                    }
                    return this.content;
                },
                set(value) {
                    if (this.type === 'number') {
                        this.content = Number(value);
                    } else {
                        this.content = value;
                    }
                    this.$emit('input', this.type === 'number' ? Number(value) : value);
                    this.$emit('update:modelValue', this.type === 'number' ? Number(value) : value);
                },
            },
            computedStyle() {
                return {
                    resize: (this.multiline && this.computedHeight) ? 'vertical' : null,
                    height: (this.multiline && this.computedHeight) ? this.computedHeight + 'px' : null,
                    overflow: (this.multiline && this.computedHeight) ? 'auto' : null
                };
            },
            computedPlaceholder() {
                return this.floatingLabel ? 'Enter input' : this.placeholder;
            },
            utils() {
                return utils;
            },
            hasSlot() {
                return hasSlot;
            },
        },
        methods: {
            onInput(event) {
                if (this.type === 'file') {
                    this.computedValue = event.target.files;
                    return;
                }

                if (event.target) {
                    this.computedValue = event.target.value;
                }
            },
            onClear(event) {
                this.computedValue = undefined;
            },
            handleNumberChange(steps) {
                const numericValue = this.computedValue ? parseFloat(this.computedValue) : 0;

                // Returns the length of decimal places in a number
                const dpl = (num) => (num.toString().split('.')[1] || []).length;

                if (isNaN(numericValue) || this.disabled) {
                    return;
                }

                const min = this.min || -Infinity;
                const max = this.max || +Infinity;
                const step = this.step || 1;

                // Making sure the new value has the same length of decimal places as the
                // step / value has.
                const decimalPlaces = Math.max(dpl(numericValue), dpl(step));

                const newValue = Math.min(
                    Number(max),
                    Math.max(numericValue + steps * step, Number(min))
                );

                if (!isNaN(newValue)) {
                    this.computedValue = newValue.toFixed(decimalPlaces);
                }
            },
            handleExpandingResize(e) {
                this.computedHeight = (e < this.minHeight) ? this.minHeight : e;
            },
            normalizeAutoComplete(autoComplete) {
                if (autoComplete === true) {
                    return 'on';
                } else if (autoComplete === false) {
                    return 'off';
                } else {
                    return autoComplete;
                }
            },
        },
        watch: {
            value(value, oldValue) {
                this.content = value;
                // this.normalizedValue = value;
                this.characterCount = value ? value.length : 0;
            },
            modelValue(value, oldValue) {
                this.content = value;
                // this.normalizedValue = value;
                this.characterCount = value ? value.length : 0;
            },
        },
        created() {
            this.content = this.computedVModel;
        }
    }
</script>
