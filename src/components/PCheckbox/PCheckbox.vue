<template>
    <PChoice :label="label" :label-hidden="labelHidden" :help-text="helpText" :id="id" :error="error">
        <slot slot="label" name="label" />
        <template v-if="$slots.helpText" slot="helpText">
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
        @Prop({type: String, default: `PolarisCheckBox${new Date().getUTCMilliseconds()}`}) public id!: string;
        @Prop(String) public name!: string;
        @Prop(String) public label!: string;
        @Prop(String) public helpText!: string;
        @Prop(Boolean) public labelHidden!: boolean;
        @Prop(Boolean) public indeterminate!: boolean;
        @Prop({type: Boolean, default: false}) public checked!: boolean;
        @Prop({type: [String, Boolean]}) public value!: string | boolean;
        @Prop(Boolean) public disabled!: boolean;
        @Prop(String) public error!: string;

        public get wrapperClassName() {
            return classNames(
                'Polaris-Checkbox',
                this.error && 'Polaris-Checkbox--error'
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
            this.$emit('change', {checked: target.checked, value: target.value});
        }

        public onFocus() {
            this.$emit('focus');
        }

        public onBlur() {
            this.$emit('blur');
        }
    }
</script>
