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

<script setup>
    import { computed } from 'vue';
    import { PVerticalTabsPanel } from '../../components/PVerticalTabs/components/PVerticalTabsPanel';
    import { PVerticalTab } from '../../components/PVerticalTabs/components/PVerticalTab';
    import { classNames } from '../../utilities/css';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">The Vertical Tabs component serves as a container to show groups of content, divided into tabs.
     *  Each tab label should correspond with a block of related content. Only one tab's contents are visible at any
     *  given time.</h4>
     */
    let props = defineProps({
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
    });
    const emit = defineEmits(['select']);

    let className = computed(() => {
        return classNames(
            'Polaris-VerticalTabs__Wrapper',
            props.navigation && 'Polaris-VerticalTabs__Navigation',
        );
    });

    let tabsClassName = computed(() => {
        return classNames(
            props.tabsPosition === 'left' && 'Polaris-VerticalTabs',
            props.tabsPosition === 'right' && 'Polaris-VerticalTabs__Right',
        );
    });

    function handleTabClick(id, event) {
        const tab = props.tabs.find((aTab) => aTab.id === id);
        if (tab === null) {
            return;
        }

        const selectedIndex = props.tabs.indexOf(tab);
        /**
         * Method to handle tab click
         */
        emit('select', selectedIndex, event);
    }
</script>
