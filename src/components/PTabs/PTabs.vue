<template>
    <div>
        <div :class="wrapperClassName">
            <PTabMeasurer
                :tab-to-focus="tabToFocus"
                :selected="selected"
                :tabs="tabs"
                :sibling-tab-has-focus="tabToFocus > -1"
                @handleMeasurement="handleMeasurement"
            >
                <div v-if="disclosureText" class="Polaris-Tabs__TabContainer">
                    <button
                        type="button"
                        :class="disclosureButtonClassName"
                        @click="handleDisclosureActivatorClick"
                        aria-label="More tabs"
                    >
                <span :class="disclosureButtonContentWrapperClassName">
                    <template v-if="disclosureText">
                        {{ disclosureText }}
                        <PIcon source="CaretDownMinor" color="subdued" />
                    </template>
                    <template v-else>
                        <PIcon source="HorizontalDotsMinor" color="subdued" />
                    </template>
                </span>
                    </button>
                </div>
                <button
                    v-else
                    type="button"
                    :class="disclosureButtonClassName"
                    @click="handleDisclosureActivatorClick"
                    aria-label="More tabs"
                >
              <span :class="disclosureButtonContentWrapperClassName">
                  <template v-if="disclosureText">
                      {{ disclosureText }}
                      <PIcon source="CaretDownMinor" color="subdued" />
                  </template>
                  <template v-else>
                      <PIcon source="HorizontalDotsMinor" color="subdued" />
                  </template>
              </span>
                </button>
            </PTabMeasurer>
            <ul
                role="tablist"
                :class="className"
                @focus="handleFocus"
            >
                <PTab v-for="(tab, tabIndex) in computedVisibleTabs"
                      :key="tabIndex + '-' + tab.id"
                      :id="tab.id"
                      :to="tab.to"
                      :url="tab.url"
                      :selected="selected === tabIndex"
                      :external="tab.external"
                      :active-class="activeClass"
                      :content="tab.content"
                      :badge="tab.badge"
                      @click="handleTabClick"
                />
                <li
                    :class="disclosureTabClassName"
                    role="presentation"
                >
                    <PPopover
                        id="TabsPopoverRollup"
                        :active="disclosureActivatorVisible && showDisclosure"
                        preferred-position="below"
                        @close="handleClose"
                    >
                        <template #activator>
                            <div v-if="disclosureText" class="Polaris-Tabs__TabContainer">
                                <button
                                    type="button"
                                    :class="disclosureButtonClassName"
                                    @click="handleDisclosureActivatorClick"
                                    aria-label="More tabs"
                                >
                                    <span :class="disclosureButtonContentWrapperClassName">
                                        <template v-if="disclosureText">
                                            {{ disclosureText }}
                                            <PIcon source="CaretDownMinor" color="subdued" />
                                        </template>
                                        <template v-else>
                                            <PIcon source="HorizontalDotsMinor" color="subdued" />
                                        </template>
                                    </span>
                                </button>
                            </div>
                            <button
                                v-else
                                type="button"
                                :class="disclosureButtonClassName"
                                @click="handleDisclosureActivatorClick"
                                aria-label="More tabs"
                            >
                                <span :class="disclosureButtonContentWrapperClassName">
                                    <template v-if="disclosureText">
                                        {{ disclosureText }}
                                        <PIcon source="CaretDownMinor" color="subdued" />
                                    </template>
                                    <template v-else>
                                        <PIcon source="HorizontalDotsMinor" color="subdued" />
                                    </template>
                                </span>
                            </button>
                        </template>
                        <template #content>
                            <PList
                                :focus-index="hiddenTabs.indexOf(tabToFocus)"
                                :disclosure-tabs="disclosureTabs"
                                @click="handleTabClick"
                                @keypress="handleKeyPress"
                            />
                        </template>
                    </PPopover>
                </li>
            </ul>
        </div>
        <template v-if="!navigation">
            <PPanel
                v-for="(tab, tabIndex) in tabs"
                :key="tab.id"
                :id="tab.id + '-panel'"
                :tabID="tab.id"
                :hidden="!(selected === tabIndex)"
            >
                <!-- @slot The content to display in tabs -->
                <slot v-if="selected === tabIndex"/>
            </PPanel>
        </template>
    </div>
</template>

<script setup>
    import { computed, nextTick, ref } from 'vue';
    import { classNames } from '../../utilities/css';
    import { PPopover } from '../../components/PPopover';
    import { PTab } from '../../components/PTabs/components/PTab';
    import { PPanel } from '../../components/PTabs/components/PPanel';
    import { PTabMeasurer } from './components/PTabMeasurer';
    import { PList } from '../../components/PTabs/components/PList';
    import { PIcon } from '../../components/PIcon';

    import { getVisibleAndHiddenTabIndices } from './utilities';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Use to alternate among related views within the same context.</h4>
     */

    let props = defineProps({
        /**
         * Lists of tabs.
         */
        tabs: {
            type: Array,
            default: () => ([]),
        },
        /**
         * Selected tab ID.
         */
        selected: {
            type: Number,
            default: null,
        },
        /**
         * Set true to enable navigation.
         */
        navigation: {
            type: Boolean,
            default: false,
        },
        /**
         * Configure the active CSS class applied when the link is active.
         */
        activeClass: {
            type: String,
            default: 'Polaris-Tabs__Tab--selected',
        },
        /**
         * Fit tabs to container.
         */
        fitted: {
            type: Boolean,
            default: false,
        },
        /**
         * Text to replace disclosures horizontal dots.
         */
        disclosureText: {
            type: String,
            default: '',
        },
    });
    const emit = defineEmits(['select']);

    let disclosureWidth = ref(0);
    let tabsWidth = ref([]);
    let visibleTabs = ref([]);
    let hiddenTabs = ref([]);
    let showDisclosure = ref(false);
    let containerWidth = ref(Infinity);
    let tabToFocus = ref(-1);

    let visibleHiddenTabs = computed(() => {
        return getVisibleAndHiddenTabIndices(
            props.tabs,
            props.selected,
            disclosureWidth.value,
            tabsWidth.value,
            containerWidth.value,
        );
    });

    let disclosureActivatorVisible = computed(() => {
        return visibleHiddenTabs.value['visibleTabs'].length < props.tabs.length;
    });

    let className = computed(() => {
        return classNames(
            'Polaris-Tabs',
            props.fitted && 'Polaris-Tabs--fitted',
            disclosureActivatorVisible.value && 'Polaris-Tabs--fillSpace',
        );
    });

    let wrapperClassName = computed(() => {
        return classNames(
            'Polaris-Tabs__Wrapper',
            props.navigation && 'Polaris-Tabs__Navigation',
        );
    });

    let disclosureTabClassName = computed(() => {
        return classNames(
            'Polaris-Tabs__DisclosureTab',
            disclosureActivatorVisible.value && 'Polaris-Tabs__DisclosureTab--visible',
        );
    });

    let disclosureButtonClassName = computed(() => {
        return classNames(
            'Polaris-Tabs__DisclosureActivator',
            props.disclosureText && 'Polaris-Tabs__Tab',
        );
    });

    let computedVisibleTabs = computed(() => {
        const canVisibleTabs = visibleTabs.value.sort((tabA, tabB) => tabA - tabB);
        const tabs = [];

        canVisibleTabs.map((tabIndex) => tabs.push(props.tabs[tabIndex]));

        return tabs;
    });

    let disclosureButtonContentWrapperClassName = computed(() => {
        return classNames(
            'Polaris-Tabs__Title',
            props.disclosureText && 'Polaris-Tabs--titleWithIcon',
        );
    });

    let disclosureTabs = computed(() => {
        return hiddenTabs.value.map((tabIndex) => props.tabs[tabIndex]);
    });

    function handleMeasurement(containerWidthValue, disclosureWidthValue, hiddenTabWidthValue) {
        tabToFocus.value = tabToFocus.value === -1 ? -1 : props.selected;
        visibleTabs.value = visibleHiddenTabs.value['visibleTabs'];
        hiddenTabs.value = visibleHiddenTabs.value['hiddenTabs'];
        disclosureWidth.value = disclosureWidthValue;
        containerWidth.value = containerWidthValue;
        tabsWidth.value = hiddenTabWidthValue;
    }

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
        nextTick().then(() => {
            visibleTabs.value = visibleHiddenTabs.value['visibleTabs'];
            hiddenTabs.value = visibleHiddenTabs.value['hiddenTabs'];
        });
    }

    function handleFocus(event) {
        const target = event.target;

        if (
            /* tslint:disable-next-line */
            (target && target['classList'].contains('Polaris-Tabs__Tab')) ||
            /* tslint:disable-next-line */
            (target && target['classList'].contains('Polaris-Tabs__Item'))
        ) {
            let tabToFocus = -1;

            props.tabs.every((tab, index) => {
                /* tslint:disable-next-line */
                if (tab.id === (target && target['id'])) {
                    tabToFocus = index;
                    return false;
                }

                return true;
            });

            tabToFocus.value = tabToFocus;
            return;
        }

        /* tslint:disable-next-line */
        if (target && target['classList'].contains('Polaris-Tabs__DisclosureActivator')) {
            return;
        }

        if (!event.relatedTarget) {
            tabToFocus.value = props.selected;
            return;
        }

        const relatedTarget = event.relatedTarget;

        if (
            relatedTarget instanceof HTMLElement &&
            /* tslint:disable-next-line */
            !relatedTarget['classList'].contains('Polaris-Tabs__Tab') &&
            /* tslint:disable-next-line */
            !relatedTarget['classList'].contains('Polaris-Tabs__Item') &&
            /* tslint:disable-next-line */
            !relatedTarget['classList'].contains('Polaris-Tabs__DisclosureActivator')
        ) {
            tabToFocus.value = props.selected;
        }
    }

    function handleDisclosureActivatorClick() {
        showDisclosure.value = !showDisclosure.value;
    }

    function handleClose() {
        showDisclosure.value = false;
    }

    function handleKeyPress(event) {
        const key = event.key;
        const tabsArrayInOrder = showDisclosure.value ? visibleTabs.value.concat(hiddenTabs.value) : [...visibleTabs.value];

        let newFocus = tabsArrayInOrder.indexOf(tabToFocus.value);

        if (key === 'ArrowRight') {
            newFocus += 1;

            if (newFocus === tabsArrayInOrder.length) {
                newFocus = 0;
            }
        }

        if (key === 'ArrowLeft') {
            if (newFocus === -1 || newFocus === 0) {
                newFocus = tabsArrayInOrder.length - 1;
            } else {
                newFocus = -1;
            }
        }

        tabToFocus.value = tabsArrayInOrder[newFocus];
    }
</script>
