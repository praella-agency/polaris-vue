<template>
    <div :class="className">
        <div v-if="title || isSlot($slots.title)" class="Polaris-Card__SectionHeader">
            <slot name="title">
                <PSubheading v-bind="attrs">
                    {{ title }}
                </PSubheading>
            </slot>
        </div>
        <!-- @slot Body of Card section -->
        <slot/>
    </div>
</template>

<script setup>
    import { computed, useAttrs, useSlots} from 'vue';
    import { hasSlot } from '../../../../ComponentHelpers';
    import { classNames } from '../../../../utilities/css';
    import { PSubheading } from '../../../../components/PSubheading';

    let props = defineProps({
        /**
         * Title content for the card section
         */
        title: {
            type: String,
        },
        /**
         * Title content for the card section
         */
        subdued: {
            type: Boolean,
        },
        /**
         * Card will stretch/shrink to occupy the full width
         */
        fullWidth: {
            type: Boolean,
        },
    });
    let slots = useSlots();
    let attrs = useAttrs();

    let className = computed(() => {
        return classNames(
            'Polaris-Card__Section',
            props.subdued && 'Polaris-Card__Section--subdued',
            props.fullWidth && 'Polaris-Card__Section--fullWidth',
        );
    });

    let isSlot = computed(() => {
        return hasSlot;
    });
</script>
