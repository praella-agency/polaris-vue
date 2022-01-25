<template>
    <div :class="className" v-show="showInput">
        <div class="Polaris-TextField__Prefix" :id="id+'Prefix'" v-if="showPrefix">
            {{ prefix }}
            <slot v-if="$slots.prefix" name="prefix"/>
        </div>
        <quill-editor
            v-if="richEditor"
            :id="id"
            class="editor"
            ref="myTextEditor"
            v-model="computedValue"
            :options="editorConfig"
            @input="onInput"
            :disabled="disabled"
            :readonly="readOnly"
            :autofocus="autoFocus"
            :placeholder="computedPlaceholder"
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
        <div class="Polaris-TextField__Suffix" :id="id+'Suffix'" v-if="showSuffix">
            {{ suffix }}
            <slot v-if="$slots.suffix" name="suffix"></slot>
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
        <div v-if="!richEditor" class="Polaris-TextField__Backdrop"></div>

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
    import { classNames } from '../../../../utilities/css';
    import { PSpinner } from '../../../../components/PTextField/components/PSpinner';
    import { PFieldResizer } from '../../../../components/PTextField/components/PFieldResizer';
    import { PIcon } from '../../../../components/PIcon';
    import { quillEditor } from 'vue-quill-editor';
    import StringValidator from '../../../../utilities/validators/StringValidator';

    const Type = [
        'text', 'email', 'number', 'password', 'search', 'tel', 'url', 'date', 'datetime-local',
        'month', 'time', 'week', 'currency', 'file',
    ];

    const Align = ['left', 'right', 'center'];

    export default {
        name: 'PInput',
        components: {
            PFieldResizer, PSpinner, PIcon, quillEditor,
        },
        props: {
            id: {
                type: [String, Number],
                default: `PolarisTextField${new Date().getUTCMilliseconds()}`,
            },
            value: {
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
        data() {
            return {
                content: this.value !== null ? this.value : '',
                height: this.minHeight,
                editorConfig: {
                    modules: {
                        toolbar: [
                            [{header: [1, 2, 3, 4, 5, 6, false]}],

                            ['bold', 'italic', 'underline', 'strike', 'link'],
                            [{align: []}],
                            ['blockquote', 'code-block'],
                            [{list: 'ordered'}, {list: 'bullet'}],
                            [{indent: '-1'}, {indent: '+1'}],
                            ['image', 'video'],
                        ],
                        syntax: {
                            highlight: text => text,
                        },
                    },
                },
                characterCountLabel: this.maxLength || 'characterCountLabel',
                characterCount: this.value && this.value.length,
            };
        },
        computed: {
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
                return this.prefix || this.$slots.prefix;
            },
            showSuffix() {
                return this.suffix || this.$slots.suffix;
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
                    if (this.type === 'number')
                        return Number(this.content);
                    return this.content;
                },
                set(value) {
                    if (this.type === 'number')
                        this.content = Number(value);
                    else
                        this.content = value;

                    this.$emit('input', this.type === 'number' ?  Number(value) : value);
                },
            },
            computedStyle() {
                return {
                    height: (this.multiline && this.computedHeight) ? this.computedHeight + 'px' : null,
                    overflow: (this.multiline && this.computedHeight) ? 'hidden' : null
                };
            },
            computedPlaceholder() {
                return this.floatingLabel ? 'Enter input' : this.placeholder;
            }
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
                    Math.max(numericValue + steps * step,Number(min))
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
        },
    }
</script>

<style>
    .ql-container.ql-snow {
        background: #FFF;
    }

    .ql-toolbar.ql-snow {
        background: #fafafa;
        padding: 5px;
    }

    .quill-editor.editor {
        width: 100%;
    }

    .ql-snow .ql-picker {
        font-weight: normal;
    }

    .ql-toolbar.ql-snow > .ql-formats:not(:first-child):before {
        content: "";
        height: calc(100% + 4px);
        width: 1px;
        background: #c4c4c4;
        position: absolute;
        display: block;
        top: -2px;
        left: -10px;
    }

    .ql-toolbar.ql-snow .ql-formats {
        position: relative;
        margin-right: 10px;
        margin-left: 10px;
    }
</style>
