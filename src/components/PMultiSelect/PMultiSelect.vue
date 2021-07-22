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
                    label="label"
                    @tag="addTag"
            >
                <template slot="caret">
                    <div class="multiselect__select">
                        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 8l-3-3-3 3h6zm-.1 4L10 14.9 7.1 12h5.8z" fill-rule="evenodd"/>
                        </svg>
                    </div>
                </template>
            </multiselect>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Prop, Watch} from 'vue-property-decorator';
import {SelectMinor} from '@/assets/shopify-polaris-icons/index';
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
    mixins: [
        {
            data() {
                return {SelectMinor};
            },
        },
    ],
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
        if (this.placeholder) {
            options.push({
                label: this.placeholder,
                value: '',
                disabled: true,
            });
        }
        this.options.map((value) => {
            if (typeof value === 'object') {
                if (value.disabled) { value.$isDisabled = value.disabled; }
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

    public set computedValue(value) {
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
        this.options.push(tag);
        this.$emit('change', this.selected);
    }

    @Watch('value')
    public onValueChanged(value: any) {
        this.selected = value;
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
