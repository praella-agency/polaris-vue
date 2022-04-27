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

<script>
    import { hasSlot, uuid } from '../../../../ComponentHelpers';
    import { classNames, variationName } from '../../../../utilities/css';
    import { PChoice } from '../../../../components/PChoice';
    import { PCheckbox } from '../../../../components/PCheckbox';
    import StringValidator from '../../../../utilities/validators/StringValidator';

    const Size = ['slim', 'medium', 'large'];
    const TextAlign = ['left', 'right', 'center'];
    const Type = ['submit', 'reset', 'button'];

    const DEFAULT_SIZE = 'medium';

    export default {
        name: 'PCheckableButton',
        components: {
            PChoice, PCheckbox,
        },
        props: {
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
                ...StringValidator('type', Type),
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
                ...StringValidator('size', Size),
            },
            textAlign: {
                type: String,
                ...StringValidator('textAlign', TextAlign),
            },
            icon: {
                type: String,
            },
            value: {
                type: [String, Array, Number],
            },
        },
        emits: ['toggle-all'],
        computed: {
            className() {
                return classNames(
                    'Polaris-ResourceList-CheckableButton',
                    this.checked && 'Polaris-ResourceList-CheckableButton__CheckableButton--selected Polaris-ResourceList-CheckableButton__CheckableButton--selectMode',
                    this.primary && 'Polaris-ResourceList-CheckableButton__CheckableButton--primary',
                    this.outline && 'Polaris-ResourceList-CheckableButton__CheckableButton--outline',
                    this.destructive && 'Polaris-ResourceList-CheckableButton__CheckableButton--destructive',
                    this.isDisabled && 'Polaris-ResourceList-CheckableButton__CheckableButton--disabled',
                    this.loading && 'Polaris-ResourceList-CheckableButton__CheckableButton--loading',
                    this.plain && 'Polaris-ResourceList-CheckableButton__CheckableButton--plain',
                    this.monochrome && 'Polaris-ResourceList-CheckableButton__CheckableButton--monochrome',
                    this.fullWidth && 'Polaris-ResourceList-CheckableButton__CheckableButton--fullWidth',
                    this.icon && this.hasNoChildren && 'Polaris-ResourceList-CheckableButton__CheckableButton--iconOnly',
                    this.size && this.size !== DEFAULT_SIZE && `Polaris-ResourceList-CheckableButton__CheckableButton--${variationName('size', this.size)}`,
                    this.textAlign && `Polaris-ResourceList-CheckableButton__CheckableButton--${variationName('textAlign', this.textAlign)}`,
                );
            },
            isDisabled() {
                return this.disabled || this.loading;
            },
            hasNoChildren() {
                return hasSlot(this.$slots.default);
            },
        },
        methods: {
            handleToggleAll() {
                this.$emit('toggle-all', this.checkedAll);
            },
        },
    }
</script>
