<template>
    <span :class="className">
        <span :title="tag.value" class="Polaris-Tag__TagText">{{tag.value}}</span>
        <button
            v-if="removable"
            type="button"
            class="Polaris-Tag__Button"
            :aria-label="`Remove ${tag.value}`"
            @click="handleRemove"
        >
            <PIcon source="CancelSmallMinor"/>
        </button>
    </span>
</template>

<script setup>
    import { computed } from 'vue';
    import { classNames } from '../../utilities/css';
    import { PIcon } from '../../components/PIcon';
    import ObjectValidator from '../../utilities/validators/ObjectValidator';
    import StringValidator from "../../utilities/validators/StringValidator";
    import { TagInterface, TagSize } from '../variables';

    let props = defineProps({
        /**
         * Tag object.
         */
        tag: {
            type: Object,
            default: () => ({}),
            ...ObjectValidator('tag', TagInterface),
        },
        /**
         * Set true if you want to make it removable.
         */
        removable: {
            type: Boolean,
            default: false,
        },
        /**
         * Changes the size of the tag
         */
        size: {
            type: String,
            default: 'medium',
            ...StringValidator('size', TagSize),
        },
    });
    const emit = defineEmits(['remove-tag']);

    let className = computed(() => {
        return classNames(
            'Polaris-Tag',
            props.removable && `Polaris-Tag--removable`,
            props.size === 'small' && 'Polaris-Tag--small',
        );
    });

    function handleRemove() {
        /**
         * Method to remove tag
         */
        emit('remove-tag', props.tag.key);
    }
</script>
