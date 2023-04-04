<template>
    <component :is="(hasMultipleSections ? 'ul' : 'div')" :class="className">
        <PActionListSection
            v-for="(section, key) in finalSections"
            :key="key"
            :section="section"
            :hasMultipleSections="hasMultipleSections"
            @itemAction="onItemAction"
        >
            <template v-slot:media="slotProps">
                <!-- @slot Customize the icon part of navigation. This slot provides values.

Access values with `slot-props` attribute. -->
                <slot name="media" :item="slotProps ? slotProps.item : {}"/>
            </template>
        </PActionListSection>
    </component>
</template>

<script setup>
    import { computed } from 'vue';
    import { classNames } from '../../utilities/css';
    import { PActionListSection } from '../../components/PActionList/components/PActionListSection';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Action lists render a list of actions or selectable options. This component is usually placed inside a
     *  <a href="https://polaris-vue.hulkapps.com/?path=/docs/overlays-popover--popover">popover</a>
     *  container to create a dropdown menu or to let merchants select from a list of options.</h4>
     */

    let props = defineProps({
        /**
         * Collection of actions for list
         */
        items: {
            type: Array,
            default: () => ([]),
        },
        /**
         * Collection of sectioned action items
         */
        sections: {
            type: Array,
            default: () => ([]),
        }
    });

    const emit = defineEmits(['item-action']);

    let className = computed(() => {
        return classNames(
            'Polaris-ActionList',
        );
    });

    let finalSections = computed(() => {
        /* tslint:disable-next-line */
        if (typeof props.items != 'undefined' && props.items !== null && props.items.length != null && props.items.length > 0) {
            return [{items: props.items}, ...props.sections];
        }
        return props.sections;
    });

    let hasMultipleSections = computed(() => {
        return finalSections.value.length >= 1;
    });

    function onItemAction(action) {
        /**
         * Triggers when the item is selected/clicked
         */
        emit('item-action', action);
    }
</script>
