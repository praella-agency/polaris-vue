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
import { classNames, variationName } from '@/utilities/css';
import {PIcon} from '@/components/PIcon';

interface TagInterface {
    value: string;
    key: string;
}

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

    public styleClass(name?: string) {
        const finalStyleClasses = ['one', 'two', 'three', 'four', 'five', 'six'];
        return name ? finalStyleClasses[name.charCodeAt(0) % finalStyleClasses.length] : finalStyleClasses[0];
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
