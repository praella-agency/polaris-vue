<template>
    <component :is="(hasMultipleSections ? 'ul' : 'div')" :class="className">
        <PActionListSection
            v-for="(section, key) in finalSections"
            :key="key"
            :section="section"
            :hasMultipleSections="hasMultipleSections"
            @itemAction="onItemAction"
        />
    </component>
</template>

<script>
    import { classNames } from '../../utilities/css';
    import { PActionListSection } from '../../components/PActionList/components/PActionListSection';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Action lists render a list of actions or selectable options. This component is usually placed inside a
     *  <a href="https://polaris-vue.hulkapps.com/?path=/docs/overlays-popover--popover">popover</a>
     *  container to create a dropdown menu or to let merchants select from a list of options.</h4>
     */
    export default {
        name: 'PActionList',
        components: {
            PActionListSection,
        },
        props: {
            /**
             * Collection of actions for list
             */
            items: {
                type: Array,
                default: () => ([]),
            },
            /**
             * Collection of sectioned action items
             */
            sections: {
                type: Array,
                default: () => ([]),
            }
        },
        computed: {
            className() {
                return classNames(
                    'Polaris-ActionList',
                );
            },
            finalSections() {
                /* tslint:disable-next-line */
                if (typeof this.items != 'undefined' && this.items !== null && this.items.length != null
                    && this.items.length > 0) {
                    return [{items: this.items}, ...this.sections];
                }
                return this.sections;
            },
            hasMultipleSections() {
                return this.finalSections.length > 1;
            },
        },
        methods: {
            onItemAction(action) {
                /**
                 * Triggers when the item is selected/clicked
                 */
                this.$emit('item-action', action);
            },
        },
    }
</script>
