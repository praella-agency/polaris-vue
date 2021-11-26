<template>
    <div :class="className">
        <div v-if="title || $slots.hasOwnProperty('title')" class="Polaris-Card__SectionHeader">
            <PSubheading v-bind="$attrs">
                <slot name="title">
                    {{ title }}
                </slot>
            </PSubheading>
        </div>
        <!-- @slot Body of Card section -->
        <slot/>
    </div>
</template>

<script>
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
        },
    }
</script>
