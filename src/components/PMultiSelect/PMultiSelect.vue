<template>
    <div class="">
        <div class="Polaris-Labelled__LabelWrapper">
            <div class="Polaris-Label">
                <label :id="`${id}Label`" :for="id" class="Polaris-Label__Text">
                    {{ label }}
                </label>
            </div>
        </div>
        <div :class="className">
            <multiselect
                    :id="id"
                    v-model="computedValue"
                    :disabled="disabled"
                    aria-invalid="false"
                    :options="computedOptions"
                    track-by="value"
                    :placeholder="placeholder"
                    :searchable="searchable"
                    :multiple="multiple"
                    :taggable="taggable"
                    :close-on-select="computedMultiple"
                    :clear-on-select="false"
                    :preserve-search="true"
                    :label="textField"
                    @tag="addTag"
            >
                <template slot="caret">
                    <div class="multiselect__select">
                       <PIcon source="SelectMinor" />
                    </div>
                </template>
            </multiselect>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Prop, Watch} from 'vue-property-decorator';
import Multiselect from 'vue-multiselect';
import {classNames} from '@/utilities/css';

import {PIcon} from '@/components/PIcon';

interface StrictOption {
    value: string;
    label: string;
    disabled?: boolean;
    $isDisabled?: boolean;
    hidden?: boolean;
}

@Component({
    components: {PIcon, Multiselect},
})

export default class PMultiSelect extends Vue {
    /**
     * Disable the PMultiSelect.
     * @values true | false
     */
    @Prop({type: Boolean, default: false}) public disabled!: boolean;

    /**
     * Label for the PMultiSelect.
     */
    @Prop({type: String, default: null}) public label!: string;

    /**
     * Options of PMultiSelect.
     */
    @Prop({required: true, default: []}) public options!: StrictOption[];

    /**
     * Field name in the `options` array that should be used for the text label
     */
    @Prop({type: String, default: null}) public textField!: string;

    /**
     * Field name in the `options` array that should be used for the value
     */
    @Prop({type: String, default: null}) public valueField!: string;

    /**
     * Field name in the `options` array that should be used for the disabled state
     */
    @Prop({type: String, default: null}) public disabledField!: string;

    /**
     * Field name in the `options` array that should be used for the hidden state
     */
    @Prop({type: String, default: null}) public hiddenField!: string;

    /**
     * Value for PMultiSelect.
     */
    @Prop({default: () => ([])}) public value!: any;

    /**
     * Disable the searchable options feature.
     * @values true | false
     */
    @Prop({type: Boolean, default: true}) public searchable!: boolean;

    /**
     * Taggable provides ability to add new user-input value on multiselect.
     * @values true | false
     */
    @Prop({type: Boolean, default: false}) public taggable!: boolean;

    /**
     * Provide Placeholder.
     */
    @Prop({type: String, default: null}) public placeholder!: string;

    /**
     * To allow multiple selections
     * @values true | false
     */
    @Prop({type: Boolean, default: true}) public multiple!: boolean;

    public id = `PolarisMultiSelect${new Date().getUTCMilliseconds()}`;
    public selected = this.value;

    public get computedOptions() {
        const options: StrictOption[] = [];
        // if (this.placeholder) {
        //     options.push({
        //         label: this.placeholder,
        //         value: '',
        //         disabled: true,
        //         $isDisabled: true,
        //     });
        // }
        this.options.map((value) => {
            console.log(value);
            if (typeof value === 'object') {
                if (value.disabled) {
                    value.$isDisabled = value.disabled;
                }
                options.push(value);
            } else {
                options.push({
                    label: value,
                    value
                });
            }
        });
        return options;
    }

    public get computedValue() {
        console.log('1');
        return this.selected;
    }

    public set computedValue(value) {
        console.log('2 '+JSON.stringify(value));
        this.selected = value;
        /**
         * Callback when selection is changed
         * @property {event}
         */
        this.$emit('change', value);
    }

    public get computedMultiple() {
        return !this.multiple;
    }

    public get className() {
        return classNames(
            'Polaris-Select',
            this.disabled && 'Polaris-Select--disabled',
        );
    }

    public addTag(newTag) {
        const tag = {
            label: newTag,
            value: newTag,
        };
        if (this.multiple) {
          this.selected.push(tag);
        } else {
          this.selected = tag;
        }
        // this.options.push(tag);
        this.$emit('change', this.selected);
    }

    @Watch('value')
    public onValueChanged(value: any) {
        this.selected = value;
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
