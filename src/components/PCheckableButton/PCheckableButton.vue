<template>
    <div
        :class="className"
        @click="$emit('toggleAll')"
    >
        <div
            class="Polaris-CheckableButton__Checkbox"
        >
            <PCheckbox
                :id="isUuid"
                :label="accessibilityLabel"
                labelHidden
                :checked="selected"
                :disabled="disabled"
                :indeterminate="indeterminate"
                @change="$emit('toggleAll')"
                ref="checkBoxRef"
            />
        </div>
        <span class="Polaris-CheckableButton__Label">
            {{ label }}
        </span>
    </div>
</template>

<script setup>
    import { computed, ref, watch } from 'vue';
    import { uuid } from '../../ComponentHelpers';
    import { classNames } from '../../utilities/css';
    import { PCheckbox } from '../../components/PCheckbox';

    let props = defineProps({
        accessibilityLabel: {
            type: String,
            default: null,
        },
        label: {
            type: String,
            default: null,
        },
        selected: {
            type: [Boolean, String, 'indeterminate'],
            default: false,
        },
        selectMode: {
            type: Boolean,
            default: false,
        },
        smallScreen: {
            type: Boolean,
            default: false,
        },
        plain: {
            type: Boolean,
            default: false,
        },
        measuring: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        indeterminate: {
            type: Boolean,
            default: false,
        },
    });

    let currentKey = ref('bulkLg');

    let className = computed(() => {
        if (props.plain) {
            return classNames(
                'Polaris-CheckableButton',
                'Polaris-CheckableButton__CheckableButton--plain',
            );
        } else {
            return classNames(
                'Polaris-CheckableButton',
                props.selectMode && 'Polaris-CheckableButton__CheckableButton--selectMode',
                props.selected && 'Polaris-CheckableButton__CheckableButton--selected',
                props.measuring && 'Polaris-CheckableButton__CheckableButton--measuring',
            );
        }
    });

    let isUuid = computed(() => {
        return uuid();
    });

    watch(() => props.plain, (value) => {
        if (value) {
            currentKey.value = 'plain';
        }
    });

    watch(() => props.smallScreen, (value) => {
        if (value === true) {
            currentKey.value = 'bulkSm';
        }
    });
</script>
