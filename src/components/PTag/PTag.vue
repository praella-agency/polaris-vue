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
            <PIcon source="CancelSmallMinor" />
        </button>
    </span>
</template>

<script>
import { classNames } from '../../utilities/css';
import { PIcon } from '../../components/PIcon';
import ObjectValidator from '../../utilities/validators/ObjectValidator';
import StringValidator from "../../utilities/validators/StringValidator";

const TagInterface = {
    value: {
        type: [String, Number],
        required: true,
    },
    key: {
        type: [String, Number],
        required: true,
    },
};

const Size = ['small', 'medium', null, ''];

/**
 * <br/>
 * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
 *  sans-serif;">Tags represent a set of interactive, merchant-supplied keywords that help label, organize, and
 *  categorize objects. Tags can be added or removed from an object by merchants.</h4>
 */
export default {
    name: 'PTag',
    components: {
        PIcon,
    },
    props: {
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
            ...StringValidator('size', Size),
        },
    },
    computed: {
        className() {
            return classNames(
                'Polaris-Tag',
                this.removable && `Polaris-Tag--removable`,
                this.size === 'small' && 'Polaris-Tag--small',
            );
        },
    },
    methods: {
        handleRemove() {
            /**
             * Method to remove tag
             */
            this.$emit('remove-tag', this.tag.key);
        },
    },
}
</script>
