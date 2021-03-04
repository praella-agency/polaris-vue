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

    /**
     * Collection of actions for list
     */
    @Prop(Array) public items!: any[];

    /**
     * Collection of sectioned action items
     */
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

        /**
         * Triggers when the item is selected/clicked
         *
         * @property {event} action that will be called on selection
         */
        this.$emit('item-action', action);
    }
}
</script>
