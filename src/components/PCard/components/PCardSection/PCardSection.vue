<template>
    <div :class="className">
        <div v-if="title || hasSlot($slots.title)" class="Polaris-Card__SectionHeader">
            <slot name="title">
                <PSubheading v-bind="$attrs">
                    {{ title }}
                </PSubheading>
            </slot>
        </div>
        <!-- @slot Body of Card section -->
        <slot/>
    </div>
</template>

<script>
    import { hasSlot } from '../../../../ComponentHelpers';
    import { classNames } from '../../../../utilities/css';
    import { PSubheading } from '../../../../components/PSubheading';

    export default {
        name: 'PCardSection',
        components: {
            PSubheading,
        },
        props: {
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
        },
        computed: {
            className() {
                return classNames(
                    'Polaris-Card__Section',
                    this.subdued && 'Polaris-Card__Section--subdued',
                    this.fullWidth && 'Polaris-Card__Section--fullWidth',
                );
            },
            hasSlot() {
                return hasSlot;
            },
        },
    }
</script>
