<template>
    <component :is="element" :class="className">
        <!-- @slot List item elements -->
        <slot/>
    </component>
</template>

<script setup>
    import { computed, ref } from 'vue';
    import { classNames } from '../../utilities/css';
    import StringValidator from '../../utilities/validators/StringValidator';
    import { ListType } from '../variables';


    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Lists display a set of related text-only content. Each list item begins with a bullet or a number.
     * </h4>
     */
    let props = defineProps({
        /**
         * Type of list
         */
        type: {
            type: String,
            default: 'bullet',
            ...StringValidator('type', ListType)
        }
    });
    let element = ref(props.type === 'bullet' ? 'ul' : 'ol');

    let className = computed(() => {
        return classNames(
            'Polaris-List',
            props.type && props.type === 'number' && 'Polaris-List--typeNumber',
        );
    });
</script>
