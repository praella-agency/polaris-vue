<template>
    <li :key="id" class="Polaris-OptionList-Option" tabindex="-1">
        <label v-if="allowMultiple" :class="multiSelectClassName">
            <div class="Polaris-OptionList-Option__Checkbox">
                <POptionsListCheckbox :id="id" :value="value" :checked="select" :active="active" :disabled="disabled"
                                      @change="handleEvent"/>
            </div>
            <div v-if="$slots.media()" class="Polaris-OptionList-Option__Media">
                <slot name="media"/>
            </div>
            <slot/>
        </label>
        <button v-else :id="id" type="button" :class="singleSelectClassName" @click="handleEvent"
                @focus="focused = !focused" @blur="focused = !focused">
            <div v-if="$slots.media()" class="Polaris-OptionList-Option__Media">
                <slot name="media"/>
            </div>
            <slot/>
        </button>
    </li>
</template>

<script>
    import { classNames } from '../../../../utilities/css';
    import { POptionsListCheckbox } from '../../../../components/POptionList/components/POptionsListCheckbox';

    export default {
        name: 'POptionsListOption',
        components: {
            POptionsListCheckbox,
        },
        props: {
            id: {
                type: [String, Number],
            },
            value: {
                type: String,
            },
            section: {
                type: Number,
            },
            index: {
                type: Number,
            },
            disabled: {
                type: Boolean,
            },
            active: {
                type: Boolean,
            },
            select: {
                type: Boolean,
            },
            allowMultiple: {
                type: Boolean,
            },
        },
        emits: ['selectedObject', 'click'],
        data() {
            return {
                focused: false,
            }
        },
        computed: {
            singleSelectClassName() {
                return classNames(
                    'Polaris-OptionList-Option__SingleSelectOption',
                    this.disabled && 'Polaris-OptionList-Option--disabled',
                    this.select && 'Polaris-OptionList-Option--select',
                    this.active && 'Polaris-OptionList-Option--active',
                    this.focused && 'Polaris-OptionList-Option--focused',
                );
            },
            multiSelectClassName() {
                return classNames(
                    'Polaris-OptionList-Option__Label',
                    this.disabled && 'Polaris-OptionList-Option--disabled',
                    this.active && 'Polaris-OptionList-Option--active',
                    this.select && 'Polaris-OptionList-Option--select',
                );
            }
        },
        methods: {
            handleEvent() {
                this.$emit('click', this.section, this.index);
                this.$emit('selectedObject');
            }
        }
    }
</script>
