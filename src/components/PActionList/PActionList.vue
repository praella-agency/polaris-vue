<template>
    <component :is="(hasMultipleSections ? 'div' : 'ul')" :class="className">
        <PActionListSection v-for="(section, key) in finalSections" :key="key" :section="section"
                            @itemAction="onItemAction"
                            :hasMultipleSections="hasMultipleSections" />
    </component>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames, variationName } from '@/utilities/css';
import PActionListSection from '@/components/PActionList/components/PActionListSection.vue';

@Component({
    components: {
        PActionListSection,

    },
})
export default class PActionList extends Vue {

    @Prop(Array) public items!: any[];
    @Prop({type: Array, default: () => []}) public sections!: any[];

    public get className() {
        return classNames(
            'Polaris-ActionList',
        );
    }

    public get finalSections() {

        if (this.items) {
            return [{items: this.items}, ...this.sections];
        }
        return this.sections;
    }

    public get hasMultipleSections() {

        return this.finalSections.length > 0;
    }

    public onItemAction(action) {
        this.$emit('item-action', action);
    }
}
</script>
