<template>
    <component :is="(hasMultipleSections ? 'ul' : 'div')" :class="className">
        <PActionListSection v-for="(section, key) in finalSections" :key="key" :section="section"
                            @itemAction="onItemAction"
                            :hasMultipleSections="hasMultipleSections" />
    </component>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { classNames} from '@/utilities/css';
import { PActionListSection } from '@/components/PActionList/components/PActionListSection';

/**
 * <br/>
 * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
 *  sans-serif;">Action lists render a list of actions or selectable options. This component is usually placed inside a
 *  <a href="https://polaris-vue.hulkapps.com/?path=/docs/overlays-popover--popover">popover</a>
 *  container to create a dropdown menu or to let merchants select from a list of options.</h4>
 */
@Component({
    components: {
        PActionListSection,
    },
})
export default class PActionList extends Vue {

    /**
     * Collection of actions for list
     */
    @Prop({type: Array, default: () => ([])}) public items!: any[];

    /**
     * Collection of sectioned action items
     */
    @Prop({type: Array, default: () => ([])}) public sections!: any[];

    public get className() {
        return classNames(
            'Polaris-ActionList',
        );
    }

    public get finalSections() {

        /* tslint:disable-next-line */
        if (typeof this.items != 'undefined' && this.items !== null && this.items.length != null
            && this.items.length > 0) {
            return [{items: this.items}, ...this.sections];
        }
        return this.sections;
    }

    public get hasMultipleSections() {

        return this.finalSections.length > 1;
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
