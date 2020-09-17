<template>
    <PChoice
            :id="id"
            :label="label"
            :labelHidden="labelHidden"
            :disabled="disabled">
    <span :class="wrapperClassName">
      <input
              v-model="computedValue"
              :id="id"
              type="checkbox"
              :checked="isChecked"
              :disabled="disabled"
              :class="inputClassName"
              :value="inputValue"
              role="checkbox"/>
      <span class="Polaris-Checkbox__Backdrop"></span>
      <span class="Polaris-Checkbox__Icon">
        <PIcon :source="iconSource"></PIcon>
      </span>
    </span>
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
        @Prop(Boolean) public labelHidden!: boolean;
        @Prop(Boolean) public indeterminate!: boolean;
        @Prop() public nativeValue!: any;
        @Prop({type: [String, Boolean]}) public value!: string | boolean;
        @Prop(Boolean) public disabled!: boolean;

        public checked = this.nativeValue;

        public get inputValue() {
            return (this.value ? this.value : this.nativeValue);
        }

        public set inputValue(value: string) {
            if (this.value) {
                this.value = value;
            } else {
                this.nativeValue = value;
            }
        }

        public get wrapperClassName() {
            return classNames(
                'Polaris-Checkbox',
            );
        }

        public get inputClassName() {
            return classNames(
                'Polaris-Checkbox__Input',
                this.indeterminate && 'Polaris-Checkbox__Input--indeterminate',
            );
        }

        public get isChecked() {
            return !this.indeterminate && Boolean(this.checked);
        }

        public get iconSource() {
            return this.indeterminate ? MinusMinor : TickSmallMinor;
        }

        public get computedValue() {
            return this.checked;
        }

        public set computedValue(value: string) {
            this.checked = value;
            this.$emit('input', value);
        }

        @Watch('value')
        public onValueChanged(value: any) {
            this.checked = value;
        }
    }
</script>
