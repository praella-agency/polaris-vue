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
                    :multiple="true"
                    :taggable="taggable"
                    :close-on-select="false"
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
import {ArrowUpDownMinor} from '@/assets/shopify-polaris-icons';
import Multiselect from 'vue-multiselect';
import {classNames} from '@/utilities/css';

import {PIcon} from '@/components/PIcon';

interface StrictOption {
    value: string;
    label: string;
    disabled?: boolean;
    hidden?: boolean;
}

@Component({
    components: {PIcon, Multiselect},
    mixins: [
        {
            data() {
                return {ArrowUpDownMinor};
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
    @Prop({default: () => []}) public value!: any [];

    /**
     * Disable the searchable options feature.
     * @values true | false
     */
    @Prop({type: Boolean, default: true}) public searchable!: boolean;

    /**
     * Taggable feature for PMultiSelect.
     * @values true | false
     */
    @Prop({type: Boolean, default: false}) public taggable!: boolean;

    /**
     * Provide Placeholder.
     */
    @Prop({type: String, default: null}) public placeholder!: string;

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
         * Change event
         * @property {event}
         */
        this.$emit('change', value);
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
        this.selected.push(tag);
        this.options.push(tag);
    }

    @Watch('value')
    public onValueChanged(value: any) {
        this.selected = value;
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss">
    .multiselect, .multiselect__input, .multiselect__single {
        font-size: unset;
    }

    .multiselect {
        min-height: 36px;

        .multiselect__input {
            min-height: 36px;
            background: unset;
            margin-bottom: 0;
            padding: 0;
        }

        &.multiselect--active .multiselect__select {
            transform: none;
        }

        .multiselect__select {
            height: 36px;
            width: 32px;
            padding: 4px 5px;
            right: 2px;

            svg {
                margin: 4px 0;
                width: 20px;
                fill: #637381;
            }
        }

        .multiselect__single {
            padding: 0;
            margin: 0;
            line-height: 34px;
            background: unset;
        }

        .multiselect__tags {
            min-height: 36px;
            padding: 0px 40px 0 8px;
            border: 1px solid #c4cdd5;
            box-shadow: 0 0 0 1px transparent, 0 1px 0 0 rgba(22, 29, 37, 0.05);
            border-radius: 3px;
            background: linear-gradient(180deg, #fff, #f9fafb);
        }

        .multiselect__placeholder {
            color: #3b4b5b;
            display: inline-block;
            line-height: 36px;
            vertical-align: top;
            margin-bottom: 0;
            padding-top: 0;
        }

        .multiselect__option--highlight {
            background: #007B5C;
        }

        .multiselect__option--highlight:after {
            background: #007B5C;
        }

        .multiselect__content-wrapper {
            border: 1px solid #c4cdd5;
            box-shadow: 0 0 0 1px transparent, 0 1px 0 0 rgba(22, 29, 37, 0.05);
            border-radius: 3px;
            background: linear-gradient(180deg, #fff, #f9fafb);
        }

        .multiselect__tag {
            border-radius: 3px;
            background: linear-gradient(180deg, #006e52, #007B5C);
            margin: 6px 5px 6px 0;
        }

        .multiselect__tags-wrap {
            display: block;
            height: 34px;
        }

        .multiselect__tag-icon:after {
            color: #FFF;
            font-size: 13px;
        }

        .multiselect__tag-icon:focus, .multiselect__tag-icon:hover {
            background: unset;
            outline: none;
        }

        .multiselect__select:before {
            display: none;
        }
    }
</style>