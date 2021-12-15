<template>
    <PChoice :label="label" :label-hidden="labelHidden" :help-text="helpText" :id="id">
        <!-- @slot Label content -->
        <slot slot="label" name="label"/>
        <template v-if="$slots.helpText" slot="helpText">
            <!-- @slot Help text content -->
            <slot name="helpText"></slot>
        </template>

        <div class="Polaris-RadioButton">
            <input :id="id"
                   :name="name"
                   :value="value"
                   type="radio"
                   :checked="checked"
                   :disabled="disabled"
                   class="Polaris-RadioButton__Input"
                   @change="onChange"
                   @focus="onFocus"
                   @blur="onBlur"
                   :aria-describedby="helpText ? id+'HelpText' : ''">

            <div class="Polaris-RadioButton__Backdrop"></div>
            <div class="Polaris-RadioButton__Icon"></div>
        </div>

    </PChoice>
</template>

<script>
    import { classNames } from '../../utilities/css';
    import { PChoice } from '../../components/PChoice';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Use radio buttons to present each item in a list of options where merchants must make a single
     *  selection.</h4>
     */
    export default {
        name: 'PRadioButton',
        components: {
            PChoice,
        },
        props: {
            /**
             * Id for the radio button.
             */
            id: {
                type: [String, Number],
                default: `PolarisRadioButton${new Date().getUTCMilliseconds()}`,
                required: true,
            },
            /**
             * Label for the radio button.
             */
            label: {
                type: String,
                default: null,
            },
            /**
             * Additional text to display.
             */
            helpText: {
                type: String,
                default: null,
            },
            /**
             * Name for the radio button.
             */
            name: {
                type: String,
                default: null,
            },
            /**
             * Value for the form input.
             */
            value: {
                type: [String, Boolean],
            },
            /**
             * Disable input.
             * @values true | false
             */
            disabled: {
                type: Boolean,
                default: false,
            },
            /**
             * Visually hide the label.
             * @values true | false
             */
            labelHidden: {
                type: Boolean,
                default: false,
            },
            /**
             * Selected radio button.
             * @values true | false
             */
            checked: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            className() {
                return classNames(
                    'Polaris-RadioButton',
                    this.labelHidden && 'Polaris-Choice--labelHidden',
                    this.disabled && 'Polaris-RadioButton--disabled',
                );
            },
        },
        methods: {
            onChange(e) {
                const target = e.target || e.srcElement;

                /**
                 * Callback when radio button is triggered.
                 * @param e
                 */
                this.$emit('change', {checked: target.checked, value: target.value});
            },
            onFocus() {
                /**
                 * Callback when radio button is focused.
                 */
                this.$emit('focus');
            },
            onBlur() {
                /**
                 * Callback when focus is removed.
                 */
                this.$emit('blur');
            },
        },
    }
</script>
