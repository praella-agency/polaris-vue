<template>
    <div :class="className"
         :data-buttongroup-segmented="segmented"
         :data-buttongroup-full-width="fullWidth"
         :data-buttongroup-connected-top="connectedTop"
    >
        <template v-for="(item, index) in items" :key="index">
            <PButtonGroupItem>
                <component :is="item" />
            </PButtonGroupItem>
        </template>
    </div>
</template>
<script setup>
    import { computed, onMounted, ref, useSlots } from 'vue';
    import { classNames } from '../../utilities/css';
    import { ButtonGroupSpacing } from '../variables';
    import PButtonGroupItem from './components/PButtonGroupItem/PButtonGroupItem.vue';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Button group displays multiple related actions stacked or in a horizontal row to help with arrangement
     *  and spacing.</h4>
     */

    let props = defineProps({
        /**
         * Remove top left and right border radius
         */
        segmented: {
            type: Boolean,
            default: false,
        },
        /**
         * Buttons will stretch/shrink to occupy the full width
         */
        fullWidth: {
            type: Boolean,
            default: false,
        },
        /**
         * Remove top left and right border radius
         */
        connectedTop: {
            type: Boolean,
            default: false,
        },
        /**
         * Remove top left and right border radius
         */
        spacing: {
            type: [String, ButtonGroupSpacing],
            default: null,
        },
    });

    let slots = useSlots();
    let items = ref([]);

    let className = computed(() => {
        return classNames(
            'Polaris-ButtonGroup',
            props.segmented && 'Polaris-ButtonGroup--segmented',
            props.fullWidth && 'Polaris-ButtonGroup--fullWidth',
            props.connectedTop && 'Polaris-ButtonGroup--connectedTop',
            props.spacing && `Polaris-ButtonGroup--${props.spacing}`,
        );
    });

    onMounted(() => {
        items.value = slots.default ? slots.default() : [];
    })
</script>
