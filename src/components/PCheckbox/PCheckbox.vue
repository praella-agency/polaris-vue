<template>
    <PChoice
        :label="label"
        :label-hidden="labelHidden"
        :help-text="helpText"
        :id="id"
        :error="error"
        :disabled="disabled"
    >
        <template #label>
            <!-- @slot Content of a label -->
            <slot name="label"/>
        </template>

        <template #helpText>
            <!-- @slot Body of Help text -->
            <slot name="helpText"/>
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

<script setup>
    import { computed } from 'vue';
    import { classNames } from '../../utilities/css';
    import { PIcon } from '../../components/PIcon';
    import { PChoice } from '../../components/PChoice';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Checkboxes are most commonly used to give merchants a way to make a range of selections
     *  (zero, one, or multiple). They may also be used as a way to have merchants indicate they agree to specific terms and
     *  services.</h4>
     */
    let props = defineProps({
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
         */
        labelHidden: {
            type: Boolean,
            default: false,
        },
        /**
         * `indeterminate` shows a horizontal line in the checkbox
         */
        indeterminate: {
            type: Boolean,
            default: false,
        },
        /**
         * Checkbox is selected.
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
    });

    const emit = defineEmits(['change', 'focus', 'blur']);

    let wrapperClassName = computed(() => {
        return classNames(
            'Polaris-Checkbox',
            props.error && 'Polaris-Checkbox--error',
        );
    });

    let inputClassName = computed(() => {
        return classNames(
            'Polaris-Checkbox__Input',
            props.indeterminate && 'Polaris-Checkbox__Input--indeterminate',
        );
    });

    let iconSource = computed(() => {
        return props.indeterminate ? 'MinusMinor' : 'TickSmallMinor';
    });

    function onChange(e) {
        const target = e.target || e.srcElement;
        /**
         * Change event
         */
        emit('change', {checked: target.checked, value: target.value});
    }

    function onFocus() {
        /**
         * Focus event.
         */
        emit('focus');
    }

    function onBlur() {
        /**
         * Blur event.
         */
        emit('blur');
    }
</script>
