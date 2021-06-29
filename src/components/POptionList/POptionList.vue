<template>
    <ul class="Polaris-OptionList">
        <li v-if="optionsExist" v-for="(normalizedOption, sectionIndex) in normalizedOptions" :key="normalizedOption.title ? normalizedOption.title : `noTitle-${sectionIndex}`">
            <p v-if="normalizedOption.title" class="Polaris-OptionList__Title">{{normalizedOption.title}}</p>
            <ul :id="`${id}-${sectionIndex}`" class="Polaris-OptionList__Options">
                <POptionsListOption
                    v-if="normalizedOption.options"
                    v-for="(option, optionIndex) in normalizedOption.options"
                    :key="option.id ? option.id : `${id}-${sectionIndex}-${optionIndex}`"
                    :id="option.id ? option.id : `${id}-${sectionIndex}-${optionIndex}`"
                    :section="sectionIndex"
                    :index="optionIndex"
                    :select="selected.includes(option.value)"
                    :allowMultiple="allowMultiple"
                    @click="handleClick">
                    {{option.label}}
                </POptionsListOption>
            </ul>
        </li>
    </ul>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
import { classNames } from '@/utilities/css';
import POptionsListOption from './POptionsListOption.vue';

export interface OptionDescriptor {
    value: string;
    disabled?: boolean;
    active?: boolean;
    id?: string;
}

interface SectionDescriptor {
    options: OptionDescriptor[];
    title?: string;
}

@Component({
    components: {
        POptionsListOption,
    },
})
export default class POptionList extends Vue {

    /**
     * Add to allow multiple options.
     * @values true | false
     */
    @Prop({type: Boolean, default: false}) public allowMultiple!: boolean;

    /**
     * A unique identifier for the option list.
     */
    @Prop({type: String, default: null}) public id!: string;

    /**
     * List title.
     */
    @Prop({type: String, default: null}) public title!: string;

    /**
     * Collection of options to be listed.
     */
    @Prop({type: Array, default: () => []}) public options!: OptionDescriptor[];

    /**
     * Sections containing a header and related options.
     */
    @Prop({type: Array, default: () => []}) public sections!: SectionDescriptor[];

    /**
     * The selected options.
     */
    @Prop({type: Array, required: true, default: []}) public selected!: string[];

    public get normalizedOptions() {

        if (this.options == null) {
            return this.sections == null ? [] : [{options: [], title: this.title}, ...this.sections];
        }

        if (this.sections == null) {
            return [{title: this.title, options: this.options}];
        }

        return [{title: this.title, options: this.options}, ...this.sections];
    }

    public optionsExist = this.normalizedOptions.length > 0;

    public handleClick(sectionIndex: number, optionIndex: number) {

        const selectedValue = this.normalizedOptions[sectionIndex].options[optionIndex].value;
        const foundIndex = this.selected.indexOf(selectedValue);
        if (this.allowMultiple) {

            const newSelection =
                foundIndex === -1
                    ? [selectedValue, ...this.selected]
                    : [
                        ...this.selected.slice(0, foundIndex),
                        ...this.selected.slice(foundIndex + 1, this.selected.length),
                    ];

            this.$emit('change', newSelection);
            return;
        }
        /**
         * Method to handle click event
         * @property {Default}
         */
        this.$emit('change', [selectedValue]);
    }
}
</script>
