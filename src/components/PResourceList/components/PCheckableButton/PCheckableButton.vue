<template>
    <div :class="className" @click="handleToggleAll">
        <div class="Polaris-ResourceList-CheckableButton__Checkbox">
            <PCheckbox
                label="Select all 2 customers"
                :checked="checked"
                :indeterminate="!checkedAll && checked"
                labelHidden
                :id="id"
            />
        </div>
        <span class="Polaris-ResourceList-CheckableButton__Label">
            <slot/>
        </span>
    </div>
</template>

<script setup>
    import { computed, useSlots } from 'vue';
    import { hasSlot, uuid } from '../../../../ComponentHelpers';
    import { classNames, variationName } from '../../../../utilities/css';
    import { PCheckbox } from '../../../../components/PCheckbox';
    import StringValidator from '../../../../utilities/validators/StringValidator';
    import { ButtonSize, ButtonTextAlign, ButtonType, DEFAULT_SIZE } from '../../../variables';

    let props = defineProps({
        id: {
            type: [String, Number],
            default: `PCheckableButton${uuid()}`,
        },
        checkedAll: {
            type: Boolean,
        },
        checked: {
            type: Boolean,
        },
        ariaProps: {
            type: Boolean,
        },
        ariaLabel: {
            type: String,
        },
        submit: {
            type: Boolean,
        },
        type: {
            type: String,
            ...StringValidator('type', ButtonType),
        },
        primary: {
            type: Boolean,
        },
        outline: {
            type: Boolean,
        },
        destructive: {
            type: Boolean,
        },
        disabled: {
            type: Boolean,
        },
        loading: {
            type: Boolean,
        },
        plain: {
            type: Boolean,
        },
        monochrome: {
            type: Boolean,
        },
        fullWidth: {
            type: Boolean,
        },
        size: {
            type: String,
            ...StringValidator('size', ButtonSize),
        },
        textAlign: {
            type: String,
            ...StringValidator('textAlign', ButtonTextAlign),
        },
        icon: {
            type: String,
        },
        value: {
            type: [String, Array, Number],
        },
    });
    let emit = defineEmits(['toggle-all']);
    let slots = useSlots();

    let isDisabled = computed(() => {
        return props.disabled || props.loading;
    });

    let hasNoChildren = computed(() => {
        return hasSlot(slots.default);
    });

    let className = computed(() => {
        return classNames(
            'Polaris-ResourceList-CheckableButton',
            props.checked && 'Polaris-ResourceList-CheckableButton__CheckableButton--selected Polaris-ResourceList-CheckableButton__CheckableButton--selectMode',
            props.primary && 'Polaris-ResourceList-CheckableButton__CheckableButton--primary',
            props.outline && 'Polaris-ResourceList-CheckableButton__CheckableButton--outline',
            props.destructive && 'Polaris-ResourceList-CheckableButton__CheckableButton--destructive',
            isDisabled.value && 'Polaris-ResourceList-CheckableButton__CheckableButton--disabled',
            props.loading && 'Polaris-ResourceList-CheckableButton__CheckableButton--loading',
            props.plain && 'Polaris-ResourceList-CheckableButton__CheckableButton--plain',
            props.monochrome && 'Polaris-ResourceList-CheckableButton__CheckableButton--monochrome',
            props.fullWidth && 'Polaris-ResourceList-CheckableButton__CheckableButton--fullWidth',
            props.icon && hasNoChildren.value && 'Polaris-ResourceList-CheckableButton__CheckableButton--iconOnly',
            props.size && props.size !== DEFAULT_SIZE && `Polaris-ResourceList-CheckableButton__CheckableButton--${variationName('size', props.size)}`,
            props.textAlign && `Polaris-ResourceList-CheckableButton__CheckableButton--${variationName('textAlign', props.textAlign)}`,
        );
    });

    function handleToggleAll() {
        emit('toggle-all', props.checkedAll);
    }
</script>
