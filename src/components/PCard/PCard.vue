<template>
    <div :class="className">
        <template
            v-if="isSlot(slots.title) || title || isSlot(slots.short_description) || shortDescription">
            <PCardHeader :actions="actions">
                <template #title>
                    <!-- @slot Title content for the card -->
                    <slot name="title" v-if="isSlot(slots.title) || title">
                        <PHeading>{{ title }}</PHeading>
                    </slot>
                </template>
                <template
                    #short_description
                    v-if="isSlot(slots.short_description) || shortDescription"
                >
                    <!-- @slot Short Description content for the card -->
                    <slot name="short_description">
                        <PCaption>{{ shortDescription }}</PCaption>
                    </slot>
                </template>
                <template #children v-if="isSlot(slots.children)">
                    <!-- @slot Inner content of the card -->
                    <slot name="children"/>
                </template>
            </PCardHeader>
        </template>

        <template v-if="isSlot(slots.default)">
            <template v-if="sectioned">
                <PCardSection>
                    <!-- @slot Body content for the card -->
                    <slot name="default"/>
                </PCardSection>
            </template>
            <template v-else>
                <!-- @slot Body content for the card -->
                <slot name="default"/>
            </template>
        </template>
        <div v-else>
            <slot/>
        </div>

        <template v-if="isSlot(slots.footer)">
            <PCardFooter>
                <!-- @slot Footer content for the card -->
                <slot name="footer"/>
            </PCardFooter>
        </template>
    </div>
</template>

<script setup>
    import { computed, useSlots } from 'vue';
    import { hasSlot } from '../../ComponentHelpers';
    import { classNames } from '../../utilities/css';
    import { PCardHeader } from '../../components/PCard/components/PCardHeader';
    import { PCardSection } from '../../components/PCard/components/PCardSection';
    import { PCardFooter } from '../../components/PCard/components/PCardFooter';
    import { PHeading } from '../../components/PHeading';
    import { PCaption } from '../../components/PCaption';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Cards are used to group similar concepts and tasks together to make Shopify easier for merchants to
     *  scan, read, and get things done.</h4>
     */

    let props = defineProps({
        /**
         * Title content for the card. **Deprecated** Actions will be removed on future releases,
         * use PCardHeader instead props.
         */
        title: {
            type: String,
            default: null,
        },
        /**
         * Card description. **Deprecated** ShortDescription will be removed on future releases,
         * use PCardHeader instead props.
         */
        shortDescription: {
            type: String,
            default: null,
        },
        /**
         * A less prominent card
         */
        subdued: {
            type: Boolean,
            default: false,
        },
        /**
         * Auto wrap content in section
         */
        sectioned: {
            type: Boolean,
            default: false,
        },
        /**
         * Actions for Header. **Deprecated** Actions will be removed on future releases,
         * use PCardHeader instead props.
         */
        actions: {
            type: [Array, String],
            default: null,
        },
    });
    let slots = useSlots();

    let className = computed(() => {
        return classNames(
            'Polaris-Card',
            props.subdued && 'Polaris-Card__Section--subdued',
        );
    });

    let isSlot = computed(() => {
        return hasSlot;
    });
</script>

