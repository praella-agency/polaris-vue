<template>
    <span :class="className">
        <span :title="tag.value" class="Polaris-Tag__TagText">{{tag.value}}</span>
        <button type="button" v-if="removable" :aria-label="`Remove ${tag.value}`" class="Polaris-Tag__Button" @click="handleRemove">
            <PIcon source="CancelSmallMinor"> </PIcon>
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
     * Tag object - Can be { value: 'Test', key: 'test'}
     */
    @Prop(Object) public tag!: TagInterface;
    /**
     * Set true if you want to make it removable
     */
    @Prop(Boolean) public removable!: boolean;

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

        this.$emit('remove-tag', this.tag.key);
    }
}
</script>
