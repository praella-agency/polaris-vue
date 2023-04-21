<template>
    <li :key="id" class="Polaris-OptionList-Option" tabindex="-1">
        <label v-if="allowMultiple" :class="multiSelectClassName">
            <div class="Polaris-OptionList-Option__Checkbox">
                <POptionsListCheckbox :id="id" :value="value" :checked="select" :active="active" :disabled="disabled"
                                      @change="handleEvent"/>
            </div>
            <div v-if="hasSlot($slots.media)" class="Polaris-OptionList-Option__Media">
                <slot name="media"/>
            </div>
            <slot/>
        </label>
        <button v-else :id="id" type="button" :class="singleSelectClassName" @click="handleEvent"
                @focus="focused = !focused" @blur="focused = !focused">
            <div v-if="hasSlot($slots.media)" class="Polaris-OptionList-Option__Media">
                <slot name="media"/>
            </div>
            <slot/>
        </button>
    </li>
</template>

<script setup>
    import { computed, ref, useSlots } from 'vue';
    import { hasSlot } from '../../../../ComponentHelpers';
    import { classNames } from '../../../../utilities/css';
    import { POptionsListCheckbox } from '../../../../components/POptionList/components/POptionsListCheckbox';

    let props = defineProps({
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
    });

    const emit = defineEmits(['selectedObject', 'click']);
    let slots = useSlots();
    let focused = ref(false);

    let singleSelectClassName = computed(() => {
        return classNames(
            'Polaris-OptionList-Option__SingleSelectOption',
            props.disabled && 'Polaris-OptionList-Option--disabled',
            props.select && 'Polaris-OptionList-Option--select',
            props.active && 'Polaris-OptionList-Option--active',
            focused.value && 'Polaris-OptionList-Option--focused',
        );
    });

    let multiSelectClassName = computed(() => {
        return classNames(
            'Polaris-OptionList-Option__Label',
            props.disabled && 'Polaris-OptionList-Option--disabled',
            props.active && 'Polaris-OptionList-Option--active',
            props.select && 'Polaris-OptionList-Option--select',
        );
    });

    function handleEvent() {
        emit('click', props.section, props.index);
        emit('selectedObject');
    }
</script>
