<template>
    <div>
        <div :class="className">
            <ul role="tablist" class="Polaris-VerticalTabs">
                <PVerticalTab
                    v-for="(tab, tabIndex) in tabs"
                    :key="`${tabIndex}-${tab.id}`"
                    v-bind="tab"
                    :selected="selected === tabIndex"
                    :active-class="activeClass"
                    @click="handleTabClick"
                />
            </ul>
            <template v-if="!navigation">
                <PVerticalTabsPanel
                    v-for="(tab, tabIndex) in tabs"
                    :key="tab.id"
                    :id="tab.id"
                    :hidden="!(selected === tabIndex)"
                >
                    <!-- @slot Slot display content in tabs -->
                    <slot v-if="selected === tabIndex"/>
                </PVerticalTabsPanel>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Prop } from 'vue-property-decorator';
    import { PVerticalTabsPanel } from '@/components/PVerticalTabs/PVerticalTabsPanel';
    import { PVerticalTab } from '@/components/PVerticalTabs/PVerticalTab';
    import { TabDescriptor } from '@/types/tabs';
    import { classNames } from '@/utilities/css';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">The Vertical Tabs component serves as a container to show groups of content, divided into tabs.
     *  Each tab label should correspond with a block of related content. Only one tab's contents are visible at any
     *  given time.</h4>
     */
    @Component({
        components: {
            PVerticalTab, PVerticalTabsPanel,
        },
    })
    export default class PVerticalTabs extends Vue {

        /**
         * Lists of tabs
         */
        @Prop({type: Array, default: () => []}) public tabs!: TabDescriptor[];

        /**
         * Selected tab ID
         */
        @Prop({type: Number, default: null}) public selected!: number;

        /**
         * Set true to enable navigation
         */
        @Prop({type: Boolean, default: false}) public navigation!: boolean;

        /**
         * Configure the active CSS class applied when the link is active
         */
        @Prop({type: String, default: 'Polaris-VerticalTabs__TabElement--selected'}) public activeClass!: string;

        public get className() {
            return classNames(
                'Polaris-VerticalTabs__Wrapper',
                this.navigation && 'Polaris-VerticalTabs__Navigation',
            );
        }

        protected handleTabClick(id: string, event: object) {
            const tab = this.tabs.find((aTab) => aTab.id === id);
            if (tab === null) {
                return;
            }

            const selectedIndex = this.tabs.indexOf(tab!);
            /**
             * Method to handle tab click
             */
            this.$emit('select', selectedIndex, event);
        }
    }
</script>

<style scoped>

</style>