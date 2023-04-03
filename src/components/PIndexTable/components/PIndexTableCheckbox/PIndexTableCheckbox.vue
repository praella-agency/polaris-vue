<template>
    <component
        :is="condensed ? 'transition' : 'td'"
        :class="!condensed ? checkboxClassName : ''"
        :ref="!condensed ? 'checkboxNode' : ''">
        <div
            class="Polaris-IndexTable-Checkbox__TableCellContentContainer"
        >
            <div
                :class="wrapperClassName"
                @click="handleClick"
                @change="stopPropagation"
            >
                <PCheckbox
                    :id="itemId"
                    :label="`Select ${resourceName.singular}`"
                    labelHidden
                    :checked="selected"
                />
            </div>
        </div>
    </component>
</template>

<script setup>
    import { computed, onMounted, ref, watch } from 'vue';
    import { classNames } from '../../../../utilities/css';
    import { PCheckbox } from '../../../../components/PCheckbox';
    import ObjectValidator from '../../../../utilities/validators/ObjectValidator';

    let props = defineProps({
        condensed: {
            type: Boolean,
            default: false,
        },
        itemId: {
            type: [String, Number],
            default: null,
        },
        resourceName: {
            type: Object,
            default: () => ({}),
            ...ObjectValidator('resourceName', {
                plural: {
                    type: String,
                    required: true,
                },
                singular: {
                    type: String,
                    required: true,
                },
            }),
        },
        selected: {
            type: Boolean,
            default: false,
        },
    });
    const emit = defineEmits(['interaction']);
    let checkboxNode = ref(null);

    let checkboxClassName = computed(() => {
        return classNames(
            'Polaris-IndexTable__TableCell',
            'Polaris-IndexTable__TableCell--first',
        );
    });

    let wrapperClassName = computed(() => {
        return classNames(
            'Polaris-IndexTable-Checkbox__Wrapper',
            props.condensed ? 'Polaris-IndexTable-Checkbox--condensed' : 'Polaris-IndexTable-Checkbox--expanded',
        );
    });

    function handleResize() {
        if (!checkboxNode) {
            return;
        }

        const {width} = checkboxNode.getBoundingClientRect();
        checkboxNode.style.setProperty('--p-checkbox-offset', `${width}px`);
    }

    function stopPropagation(event) {
        event.stopPropagation();
        event.preventDefault();
    }

    function handleClick(event) {
        if (event.target.tagName === 'INPUT') {
            emit('interaction', event);
        }
    }

    onMounted(() => {
        checkboxNode = checkboxNode.value;
    });

    watch(() => checkboxNode, (value) => {
        if (!value) {
            return;
        }

        window.addEventListener('resize', handleResize);

        return window.removeEventListener('resize', handleResize);
    });

    watch(() => handleResize, () => {
        handleResize();
    });
</script>
