<template>
    <div :class="labelHidden && 'Polaris-Labelled--hidden'">
        <div class="Polaris-Labelled__LabelWrapper">
            <div class="Polaris-Label">
                <label :id="`${id}Label`" :for="id" class="Polaris-Label__Text">
                    {{ label }}
                </label>
            </div>
        </div>
        <div :class="className">
            <select
                    :id="id"
                    :name="name"
                    v-model="computedValue"
                    class="Polaris-Select__Input"
                    :disabled="disabled"
                    aria-invalid="false">
                <option v-for="({value, label, disabled}) in computedOptions" :key="value" :value="value"
                        :disabled="disabled">{{ label }}
                </option>
            </select>
            <div class="Polaris-Select__Content" aria-hidden="true" :aria-disabled="disabled">
                <span v-if="inlineLabel" class="Polaris-Select__InlineLabel">{{inlineLabel}}</span>
                <span class="Polaris-Select__SelectedOption">{{ selectedOption }}</span>
                <span class="Polaris-Select__Icon">
          <PIcon :source="ArrowUpDownMinor"></PIcon>
        </span>
            </div>
            <div class="Polaris-Select__Backdrop"></div>
        </div>
        <PFieldError v-if="error" :error="error"/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Prop, Watch} from 'vue-property-decorator';
    import { ArrowUpDownMinor } from '@/assets/shopify-polaris-icons';
    import {classNames} from '@/utilities/css';
    import {PIcon} from '@/components/PIcon';
    import {PFieldError} from '@/components/PFieldError';

    interface StrictOption {
        value: string;
        label: string;
        disabled?: boolean;
        hidden?: boolean;
    }

    const PLACEHOLDER_VALUE = '';

    function getSelectedOption(
        options: StrictOption[],
        value: string,
    ): string {
        let selectedOption = options.find((option) => value === option.value);

        if (selectedOption === undefined) {
            selectedOption = options.find((option) => !option.hidden);
        }

        return selectedOption ? selectedOption.label : '';
    }

    @Component({
        components: {PIcon, PFieldError},
        mixins: [
            {
                data() {
                    return { ArrowUpDownMinor };
                },
            },
        ],
    })
    export default class PSelect extends Vue {
        @Prop({type: String, default: `PolarisSelect${new Date().getUTCMilliseconds()}`}) public id!: string;
        @Prop(String) public name!: string;
        @Prop(Boolean) public disabled!: boolean;
        @Prop(Boolean) public labelHidden!: boolean;
        @Prop(String) public label!: string;
        @Prop({type: Array, default: []}) public options!: [];
        @Prop({type: String, default: PLACEHOLDER_VALUE}) public value!: string;
        @Prop(String) public placeholder!: string;
        @Prop(String) public error!: string;
        @Prop(String) public inlineLabel!: string;

        public selected = this.value;

        public get computedOptions() {
            const options: StrictOption[] = [];
            if (this.placeholder) {
                options.push({
                    label: this.placeholder,
                    value: PLACEHOLDER_VALUE,
                    disabled: true,
                });
            }
            this.options.map((value) => {
                if (typeof value === 'object') {
                    options.push(value);
                } else {
                    options.push({label: value, value});
                }
            });

            return options;
        }

        public get computedValue() {
            return this.selected;
        }

        public set computedValue(value: string) {
            this.selected = value;
            this.$emit('change', value);
        }

        public get selectedOption() {
            return getSelectedOption(this.computedOptions, this.computedValue);
        }

        public get className() {
            return classNames(
                'Polaris-Select',
                this.disabled && 'Polaris-Select--disabled',
                this.error && 'Polaris-Select--error',
            );
        }

        @Watch('value')
        public onValueChanged(value: any) {
            this.selected = value;
        }
    }
</script>
