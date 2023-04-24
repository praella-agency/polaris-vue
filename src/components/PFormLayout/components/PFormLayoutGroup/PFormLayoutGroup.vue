<template>
    <div
        role="group"
        :class="className"
        :aria-labelledBy="title ? `${id}Title` : null"
        :aria-describedby="helpText ? `${id}HelpText` : null"
    >
        <div
            v-if="title"
            :id="id"
            class="Polaris-FormLayout__Title"
        >
            {{ title }}
        </div>
        <PFormLayoutGroupItemWrapper>
            <!-- @slot The content to display inside the group layout -->
            <template v-for="(item, index) in items" :key="index">
                <PFormLayoutItem>
                    <component :is="item" />
                </PFormLayoutItem>
            </template>
        </PFormLayoutGroupItemWrapper>
        <div
            v-if="helpText || isSlot($slots.helpText)"
            :id="`${id}helpText`"
            class="Polaris-FormLayout__HelpText"
        >
            <!-- @slot Form group helpText -->
            <slot name="helpText">
                {{ helpText }}
            </slot>
        </div>
    </div>
</template>

<script setup>
    import { computed, onMounted, ref, useSlots } from 'vue';
    import { hasSlot, uuid } from '../../../../ComponentHelpers';
    import { classNames } from '../../../../utilities/css';
    import { PFormLayoutGroupItemWrapper } from '../../../../components/PFormLayout/components/PFormLayoutGroupItemWrapper';
    import { PFormLayoutItem } from '../PFormLayoutItem';

    let props = defineProps({
        /**
         * Form group Id.
         */
        id: {
            type: [String, Number],
            default: `PolarisFormLayout${uuid()}`,
        },
        /**
         * Form group title.
         */
        title: {
            type: String,
            default: null,
        },
        /**
         * Form group helpText.
         */
        helpText: {
            type: String,
            default: null,
        },
        /**
         * For very short inputs, the width of the inputs may be reduced in order to fit more fields in the row.
         */
        condensed: {
            type: Boolean,
            default: false,
        },
        /**
         * Use field groups to arrange multiple fields in a row.
         */
        grouped: {
            type: Boolean,
            default: true,
        },
    });
    let slots = useSlots();
    let items = ref([]);

    let className = computed(() => {
        return classNames(
            props.condensed && 'Polaris-FormLayout--condensed',
            !props.condensed && 'Polaris-FormLayout--grouped',
        );
    });

    let isSlot = computed(() => {
        return hasSlot;
    });

    onMounted(() => {
        items.value = slots.default ? slots.default() : [];
    });
</script>