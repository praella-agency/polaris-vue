<template>
    <component
        :is="condensed ? 'li' : 'tr'"
        :key="id"
        :class="rowClassName"
        @mouseenter="setHoverIn"
        @mouseleave="setHoverOut"
        @click="handleRowClick"
        :ref="tableRowCallbackRef"
    >
        <PIndexTableCheckbox
            v-if="selectable"
            :condensed="condensed"
            :itemId="id"
            :selected="selected"
            @interaction="handleInteraction"
        />
        <slot/>
    </component>
</template>

<script setup>
    import { computed, ref } from 'vue';
    import { classNames, variationName } from '../../../../utilities/css';
    import { PIndexTableCheckbox } from '../../../../components/PIndexTable/components/PIndexTableCheckbox';
    import StringValidator from '../../../../utilities/validators/StringValidator';

    const SelectionType = {
        All: 'all',
        Page: 'page',
        Multi: 'multi',
        Single: 'single',
    };

    let props = defineProps({
        id: {
            type: [String, Number],
            required: true,
        },
        selected: {
            type: Boolean,
            default: false,
        },
        position: {
            type: Number,
            default: 0,
        },
        subdued: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            default: null,
            ...StringValidator('status', ['success', 'subdued']),
        },
        selectable: {
            type: Boolean,
            default: true,
        },
        condensed: {
            type: Boolean,
            default: false,
        },
        selectMode: {
            type: Boolean,
            default: false,
        },
        clickable: {
            type: Boolean,
            default: true,
        },
    });
    const emit = defineEmits(['navigation', 'selectionChange']);

    let isNavigating = ref(false);
    let hovered = ref(false);
    let primaryLinkElement = ref(null);
    let tableRowRef = ref(null);

    let rowClassName = computed(() => {
        return classNames(
            'Polaris-IndexTable__TableRow',
            props.selectable && props.condensed && 'Polaris-IndexTable--condensedRow',
            props.selected && 'Polaris-IndexTable__TableRow--selected',
            props.subdued && 'Polaris-IndexTable__TableRow--subdued',
            hovered.value && 'Polaris-IndexTable__TableRow--hovered',
            props.status && 'Polaris-IndexTable--' + variationName('status', props.status),
            (!props.selectable || primaryLinkElement.value) && 'TableRow-unclickable',
        );
    });

    function setHoverIn() {
        hovered.value = true;
    }

    function setHoverOut() {
        hovered.value = false;
    }

    function handleRowClick(event) {
        if (!props.clickable) {
            emit('navigation', props.id);
            return;
        }

        if (props.selectable || primaryLinkElement.value) {
            event.preventDefault();
            event.stopPropagation();

            if (primaryLinkElement.value && !props.selectMode) {
                isNavigating.value = true;
                const ctrlKey = event.ctrlKey;
                const metaKey = event.metaKey;

                emit('navigation', props.id);

                if ((ctrlKey || metaKey) && primaryLinkElement.value instanceof HTMLAnchorElement) {
                    isNavigating.value = false;
                    window.open(primaryLinkElement.value.href, '_blank');
                    return;
                }

                primaryLinkElement.value.dispatchEvent(new MouseEvent(event.type));
            } else {
                isNavigating.value = false;
                handleInteraction(event);
            }
        }
    }

    function handleInteraction(event) {
        event.stopPropagation();

        const selectionType = event.shiftKey ? SelectionType.Multi : SelectionType.Single;

        emit('selectionChange', selectionType, !props.selected, props.id, props.position);
    }

    function tableRowCallbackRef(node) {
        tableRowRef.value = node;
        const el = node?.querySelector('[data-primary-link]');

        if (el) {
            primaryLinkElement.value = el;
        }
    }
</script>

