<template>
    <PChoice :label="label" :label-hidden="labelHidden" :help-text="helpText" :id="id" :error="error">
        <!-- @slot Content of a label -->
        <slot slot="label" name="label" />
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

<script lang="ts">
import {Component, Vue, Prop, Watch} from 'vue-property-decorator';
import {classNames, variationName} from '@/utilities/css';

import {PIcon} from '@/components/PIcon';
import {PChoice} from '@/components/PChoice';
import {MinusMinor, TickSmallMinor} from '@/assets/shopify-polaris-icons';

@Component({
    components: {
        PIcon, PChoice,
    },
})
export default class PCheckbox extends Vue {

    /**
     * ID for form input
     */
    @Prop({type: String, required: true}) public id!: string;

    /**
     * Name for form input
     */
    @Prop({type: String, default: null}) public name!: string;

    /**
     * Label for the checkbox
     */
    @Prop({type: String, default: null}) public label!: string;

    /**
     * Additional text to aide in use
     */
    @Prop({type: String, default: null}) public helpText!: string;

    /**
     * Visually hide the label
     */
    @Prop({type: Boolean, default: false}) public labelHidden!: boolean;

    /**
     * `indeterminate` shows a horizontal line in the checkbox
     */
    @Prop({type: Boolean, default: false}) public indeterminate!: boolean;

    /**
     * Checkbox is selected.
     */
    @Prop({type: Boolean, default: false}) public checked!: boolean;

    /**
     * Value for form input
     */
    @Prop({type: [String, Boolean]}) public value!: string | boolean;

    /**
     * Disable input
     */
    @Prop({type: Boolean, default: false}) public disabled!: boolean;

    /**
     * Display an error message
     */
    @Prop({type: String, default: null}) public error!: string;

    public get wrapperClassName() {
        return classNames(
            'Polaris-Checkbox',
            this.error && 'Polaris-Checkbox--error',
        );
    }

    public get inputClassName() {
        return classNames(
            'Polaris-Checkbox__Input',
            this.indeterminate && 'Polaris-Checkbox__Input--indeterminate',
        );
    }

    public get iconSource() {
        return this.indeterminate ? MinusMinor : TickSmallMinor;
    }

    public onChange(e: any) {
        const target = e.target || e.srcElement;
        /**
         * Change event.
         *
         * @property {Object} {check:true|false, value: `target value`}
         */
        this.$emit('change', {checked: target.checked, value: target.value});
    }

    public onFocus() {
        /**
         * Focus event.
         */
        this.$emit('focus');
    }

    public onBlur() {
        /**
         * Blur event.
         */
        this.$emit('blur');
    }
}
</script>
