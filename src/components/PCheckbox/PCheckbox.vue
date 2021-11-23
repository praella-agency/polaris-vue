<template>
    <PChoice :label="label" :label-hidden="labelHidden" :help-text="helpText" :id="id" :error="error"
             :disabled="disabled">
        <!-- @slot Content of a label -->
        <slot slot="label" name="label"/>
        <template v-if="$slots.helpText" slot="helpText">
            <!-- @slot Body of Help text -->
            <slot name="helpText"></slot>
        </template>

        <div :class="wrapperClassName">
            <input :id="id"
                   type="checkbox"
                   :checked="checked"
                   :disabled="disabled"
                   :class="inputClassName"
                   :value="value"
                   role="checkbox"
                   :aria-describedby="helpText ? id+'HelpText' : ''"
                   @change="onChange"
                   @focus="onFocus"
                   @blur="onBlur"
            />

            <div class="Polaris-Checkbox__Backdrop"></div>
            <div class="Polaris-Checkbox__Icon">
                <PIcon :source="iconSource"></PIcon>
            </div>
        </div>

    </PChoice>
</template>

<script>
    import { classNames } from '../../utilities/css';
    import { PIcon } from '../../components/PIcon';
    import { PChoice } from '../../components/PChoice/index.js';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Checkboxes are most commonly used to give merchants a way to make a range of selections
     *  (zero, one, or multiple). They may also be used as a way to have merchants indicate they agree to specific terms and
     *  services.</h4>
     */
    export default {
        name: 'PCheckbox',
        components: {
            PIcon, PChoice,
        },
        props: {
            /**
             * ID for form input
             */
            id: {
                type: [String, Number],
                required: true,
            },
            /**
             * Name for form input
             */
            name: {
                type: String,
                default: null,
            },
            /**
             * Label for the checkbox
             */
            label: {
                type: String,
                default: null,
            },
            /**
             * Additional text to aide in use
             */
            helpText: {
                type: String,
                default: null,
            },
            /**
             * Visually hide the label
             * @values true | false
             */
            labelHidden: {
                type: Boolean,
                default: false,
            },
            /**
             * `indeterminate` shows a horizontal line in the checkbox
             * @values true | false
             */
            indeterminate: {
                type: Boolean,
                default: false,
            },
            /**
             * Checkbox is selected.
             * @values true | false
             */
            checked: {
                type: Boolean,
                default: false,
            },
            /**
             * Value for form input
             */
            value: {
                type: [String, Boolean],
            },
            /**
             * Disable input
             * @values true | false
             */
            disabled: {
                type: Boolean,
                default: false,
            },
            /**
             * Display an error message
             */
            error: {
                type: String,
                default: null,
            },
        },
        computed: {
            wrapperClassName() {
                return classNames(
                    'Polaris-Checkbox',
                    this.error && 'Polaris-Checkbox--error',
                );
            },
            inputClassName() {
                return classNames(
                    'Polaris-Checkbox__Input',
                    this.indeterminate && 'Polaris-Checkbox__Input--indeterminate',
                );
            },
            iconSource() {
                return this.indeterminate ? 'MinusMinor' : 'TickSmallMinor';
            },
        },
        methods: {
            onChange(e) {
                const target = e.target || e.srcElement;
                /**
                 * Change event.
                 *
                 * @property {Object} {check:true|false, value: `target value`}
                 */
                this.$emit('change', {checked: target.checked, value: target.value});
            },
            onFocus() {
                /**
                 * Focus event.
                 */
                this.$emit('focus');
            },
            onBlur() {
                /**
                 * Blur event.
                 */
                this.$emit('blur');
            },
        },
    }
</script>
