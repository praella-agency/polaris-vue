<template>
    <div class="Polaris-FormLayout" :id="id">
        <slot />
    </div>
</template>
<script setup>
    import { h, useSlots } from 'vue';
    import { PFormLayoutItem } from '../../components/PFormLayout/components/PFormLayoutItem';
    import { PFormLayoutGroup } from '../../components/PFormLayout/components/PFormLayoutGroup';
    import { wrapNodesWithComponent } from '../../ComponentHelpers';

    let slots = useSlots();

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Use form layout to arrange fields within a form using standard spacing. By default it stacks fields
     *  vertically but also supports horizontal groups of fields.</h4>
     */
    let props = defineProps({
        /**
         * Id for the element
         */
        id: {
            type: [String, Number],
            default: 'PFormLayout',
        },
    });

    function render() {
        return h('div', null,
            wrapNodesWithComponent(
                h,
                slots.default(), PFormLayoutItem,
                [PFormLayoutGroup]
            ),
        );
    }
</script>
