<template>
    <span :class="className">
        <span :title="tag.value" class="Polaris-Tag__TagText">{{tag.value}}</span>
        <button type="button" v-if="removable" :aria-label="`Remove ${tag.value}`" class="Polaris-Tag__Button" @click="handleRemove">
            <PIcon source="CancelSmallMinor" />
        </button>
    </span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames } from '@/utilities/css';
import { PIcon } from '@/components/PIcon/index.js';

interface TagInterface {
    value: string;
    key: string;
}

/**
 * <br/>
 * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
 *  sans-serif;">Tags represent a set of interactive, merchant-supplied keywords that help label, organize, and
 *  categorize objects. Tags can be added or removed from an object by merchants.</h4>
 */
@Component({
    components: {
        PIcon,
    },
})
export default class PTag extends Vue {
    /**
     * Tag object
     * @values { value: 'Test', key: 'test'}
     */
    @Prop({type: Object, default: () => ({})}) public tag!: TagInterface;
    /**
     * Set true if you want to make it removable
     * @values true | false
     */
    @Prop({type: Boolean, default: false}) public removable!: boolean;

    public get className() {
        return classNames(
            'Polaris-Tag',
            this.removable && `Polaris-Tag--removable`,
        );
    }

    public handleRemove() {
        /**
         * Method to remove tag
         * @property tag-key
         */
        this.$emit('remove-tag', this.tag.key);
    }
}
</script>
