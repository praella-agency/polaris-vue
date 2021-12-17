<template>
    <div>
        <div :class="className">
            <ul role="tablist" :class="tabsClassName">
                <PVerticalTab
                    v-for="(tab, tabIndex) in tabs"
                    :key="`${tabIndex}-${tab.id}`"
                    v-bind="tab"
                    :selected="selected === tabIndex"
                    :active-class="activeClass"
                    :tabs-position="tabsPosition"
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

<script>
    import { PVerticalTabsPanel } from '../../components/PVerticalTabs/components/PVerticalTabsPanel';
    import { PVerticalTab } from '../../components/PVerticalTabs/components/PVerticalTab';
    import { TabDescriptor } from '../../types/tabs';
    import { classNames } from '../../utilities/css';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">The Vertical Tabs component serves as a container to show groups of content, divided into tabs.
     *  Each tab label should correspond with a block of related content. Only one tab's contents are visible at any
     *  given time.</h4>
     */
    export default {
        name: 'PVerticalTabs',
        components: {
            PVerticalTab, PVerticalTabsPanel,
        },
        props: {
            /**
             * Lists of tabs
             */
            tabs: {
                type: Array,
                default: () => ([]),
            },
            /**
             * Selected tab ID
             */
            selected: {
                type: Number,
                default: null,
            },
            /**
             * Set true to enable navigation
             */
            navigation: {
                type: Boolean,
                default: false,
            },
            /**
             * Configure the active CSS class applied when the link is active
             */
            activeClass: {
                type: String,
            },
            tabsPosition: {
                type: String,
                default: 'left',
            }
        },
        computed: {
            className() {
                return classNames(
                    'Polaris-VerticalTabs__Wrapper',
                    this.navigation && 'Polaris-VerticalTabs__Navigation',
                );
            },
            tabsClassName() {
                return classNames(
                    this.tabsPosition === 'left' && 'Polaris-VerticalTabs',
                    this.tabsPosition === 'right' && 'Polaris-VerticalTabs__Right',
                );
            },
        },
        methods: {
            handleTabClick(id, event) {
                const tab = this.tabs.find((aTab) => aTab.id === id);
                if (tab === null) {
                    return;
                }

                const selectedIndex = this.tabs.indexOf(tab);
                /**
                 * Method to handle tab click
                 */
                this.$emit('select', selectedIndex, event);
            },
        },
    }
</script>

<style scoped>

</style>