<template>
    <li :key="id" class="Polaris-OptionList-Option" tabIndex="-1">
        <label v-if="allowMultiple" :class="multiSelectClassName">
            <div class="Polaris-OptionList-Option__Checkbox">
                <POptionsListCheckbox :id="id" :value="value" :checked="select" :active="active" :disabled="disabled" @change="$emit('click', section, index)" />
            </div>
            <div v-if="$slots.media" class="Polaris-OptionList-Option__Media">
                <slot name="media" />
            </div>
            <slot />
        </label>
        <button v-else :id="id" type="button" :class="singleSelectClassName" @click="$emit('click', section, index)" @focus="focused = !focused" @blur="focused = !focused">
            <div v-if="$slots.media" class="Polaris-OptionList-Option__Media">
                <slot name="media" />
            </div>
            <slot />
        </button>
    </li>
</template>

<script lang="ts">
    import {Component, Vue, Prop} from 'vue-property-decorator';
    import { classNames } from '@/utilities/css';
    import POptionsListCheckbox from './POptionsListCheckbox.vue';

    @Component({
        components: {
            POptionsListCheckbox,
        },
    })
    export default class POptionsListOption extends Vue {

        @Prop(String) public id!: string;
        @Prop(String) public value!: string;
        @Prop(Number) public section!: number;
        @Prop(Number) public index!: number;
        @Prop(Boolean) public disabled!: boolean;
        @Prop(Boolean) public active!: boolean;
        @Prop(Boolean) public select!: boolean;
        @Prop(Boolean) public allowMultiple!: boolean;

        public focused = false;

        public get singleSelectClassName() {
            return classNames(
                'Polaris-OptionList-Option__SingleSelectOption',
                this.disabled && 'Polaris-OptionList-Option--disabled',
                this.select && 'Polaris-OptionList-Option--select',
                this.active && 'Polaris-OptionList-Option--active',
                this.focused && 'Polaris-OptionList-Option--focused',
            );
        }

        public get multiSelectClassName() {
            return classNames(
                'Polaris-OptionList-Option__Label',
                this.disabled && 'Polaris-OptionList-Option--disabled',
                this.active && 'Polaris-OptionList-Option--active',
            );
        }
    }
</script>
