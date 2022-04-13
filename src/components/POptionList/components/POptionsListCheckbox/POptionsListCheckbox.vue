<template>
    <div :class="className">
        <input
            :id="id"
            :name="name"
            :value="value"
            type="checkbox"
            :checked="checked"
            :disabled="disabled"
            class="Polaris-OptionList-Checkbox__Input"
            @change="$emit('change', $event)"/>
        <div class="Polaris-OptionList-Checkbox__Backdrop"></div>
        <div class="Polaris-OptionList-Checkbox__Icon">
            <PIcon source="TickSmallMinor"/>
        </div>
    </div>
</template>

<script>
    import { classNames } from '../../../../utilities/css';
    import { PIcon } from '../../../../components/PIcon';

    export default {
        name: 'POptionsListCheckbox',
        components: {
            PIcon,
        },
        props: {
            id: {
                type: [String, Number],
            },
            value: {
                type: String,
            },
            name: {
                type: String,
            },
            active: {
                type: Boolean,
            },
            disabled: {
                type: Boolean,
            },
            checked: {
                type: Boolean,
            },
        },
        emits: ['change'],
        computed: {
            className() {
                return classNames(
                    'Polaris-OptionList-Checkbox',
                    this.active && 'Polaris-OptionList-Checkbox--active',
                );
            }
        },
    }
</script>
