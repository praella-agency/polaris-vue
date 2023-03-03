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
            @change="emit('change', $event)"/>
        <div class="Polaris-OptionList-Checkbox__Backdrop"></div>
        <div class="Polaris-OptionList-Checkbox__Icon">
            <PIcon source="TickSmallMinor"/>
        </div>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { classNames } from '../../../../utilities/css';
    import { PIcon } from '../../../../components/PIcon';

    let props = defineProps({
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
    });
    const emit = defineEmits(['change']);

    let className = computed(() => {
        return classNames(
            'Polaris-OptionList-Checkbox',
            props.active && 'Polaris-OptionList-Checkbox--active',
        );
    });
</script>
