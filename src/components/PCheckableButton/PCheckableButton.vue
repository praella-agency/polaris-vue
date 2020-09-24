<template>
    <div :class="className" @click="handleToggleAll">
        <div class="Polaris-ResourceList-CheckableButton__Checkbox">
            <PCheckbox label="Select all 2 customers" :checked="checkedAll" :indeterminate="!checkedAll && checked" labelHidden :id="id"></PCheckbox>
        </div>
        <span class="Polaris-ResourceList-CheckableButton__Label">Showing 2 customers</span>
    </div>
</template>

<script lang="ts">

    import { Component, Vue, Prop } from 'vue-property-decorator';
    import { classNames, variationName } from '@/utilities/css';
    import { PChoice } from '@/components/PChoice';
    import { PCheckbox } from '@/components/PCheckbox';

    type Size = 'slim' | 'medium' | 'large';
    type TextAlign = 'left' | 'right' | 'center';
    type Type = 'submit' | 'reset' | 'button';
    type Any = string|string[]|number|number[];

    const DEFAULT_SIZE = 'medium';

    @Component({
        components: {
            PChoice, PCheckbox
        },
    })


    export default class PCheckableButton extends Vue {

        @Prop({type: String, default: `PCheckableButton${new Date().getUTCMilliseconds()}`}) public id!: string;
        @Prop(Boolean) public checkedAll!: boolean;
        @Prop(Boolean) public checked!: boolean;
        @Prop(Boolean) public ariaProps!: boolean;
        @Prop(String) public ariaLabel!: string;
        @Prop(Boolean) public submit!: boolean;
        @Prop(String) public type!: Type;
        @Prop(Boolean) public primary!: boolean;
        @Prop(Boolean) public outline!: boolean;
        @Prop(Boolean) public destructive!: boolean;
        @Prop(Boolean) public disabled!: boolean;
        @Prop(Boolean) public loading!: boolean;
        @Prop(Boolean) public plain!: boolean;
        @Prop(Boolean) public monochrome!: boolean;
        @Prop(Boolean) public fullWidth!: boolean;
        @Prop(String) public size!: Size;
        @Prop(String) public textAlign!: TextAlign;
        @Prop(String) public icon!: string;
        @Prop([String, Array, Number]) public value!: Any;

        public get className() {
            return classNames(
                'Polaris-ResourceList-CheckableButton',
                this.primary && 'Polaris-ResourceList-CheckableButton__CheckableButton--primary',
                this.outline && 'Polaris-ResourceList-CheckableButton__CheckableButton--outline',
                this.destructive && 'Polaris-ResourceList-CheckableButton__CheckableButton--destructive',
                this.isDisabled && 'Polaris-ResourceList-CheckableButton__CheckableButton--disabled',
                this.loading && 'Polaris-ResourceList-CheckableButton__CheckableButton--loading',
                this.plain && 'Polaris-ResourceList-CheckableButton__CheckableButton--plain',
                this.monochrome && 'Polaris-ResourceList-CheckableButton__CheckableButton--monochrome',
                this.fullWidth && 'Polaris-ResourceList-CheckableButton__CheckableButton--fullWidth',
                this.icon && this.hasNoChildren && 'Polaris-ResourceList-CheckableButton__CheckableButton--iconOnly',
                this.size && this.size !== DEFAULT_SIZE && `Polaris-ResourceList-CheckableButton__CheckableButton--${variationName('size', this.size)}`,
                this.textAlign && `Polaris-ResourceList-CheckableButton__CheckableButton--${variationName('textAlign', this.textAlign)}`,
            );
        }

        public handleToggleAll() {

            this.$emit('toggle-all',this.checkedAll)
        }

        public get isDisabled() {
            return this.disabled || this.loading;
        }

        public get hasNoChildren() {
            return (this.$slots.default || []).length === 0;
        }
    }
</script>
