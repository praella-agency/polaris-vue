<template>
    <div :class="wrapperClassName">
        <div :class="menuClassName">
            <PTabMeasurer
                    :tab-to-focus="tabToFocus"
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
                      :external="tab.external"
                      :active-class="activeClass"
                      :content="tab.content"
                      :badge="tab.badge"
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
                                    @keypress="handleKeyPress"
                            />
                        </template>
                    </PPopover>
                </li>
            </ul>
        </div>
        <div :class="rightMenuClassName">
            <!-- @slot Right menu action items -->
            <slot name="rightMenu"/>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed } from 'vue';
    import {classNames} from '../../utilities/css';
    import {PPopover} from '../../components/PPopover';
    import {PTab} from '../../components/PTabs/components/PTab';
    import {PTabMeasurer} from '../PTabs/components/PTabMeasurer';
    import {PList} from '../../components/PTabs/components/PList';
    import {PIcon} from '../../components/PIcon';
    import {getVisibleAndHiddenTabIndices} from '../PTabs/utilities';

    let props = defineProps({
        /**
         * Lists of tabs.
         */
        tabs: {
            type: Array,
            default: () => ([]),
        },
        /**
         * Configure the active CSS class applied when the link is active.
         */
        activeClass: {
            type: String,
            default: 'Polaris-Tabs__Tab--selected',
        },
        /**
         * Text to replace disclosures horizontal dots.
         */
        disclosureText: {
            type: String,
            default: '',
        }
    });

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
            null,
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
            disclosureActivatorVisible.value && 'Polaris-Tabs--fillSpace',
        );
    });

    let menuClassName = computed(() => {
        return classNames(
            'Polaris-HorizontalNavigation-Menu'
        );
    });

    let rightMenuClassName = computed(() => {
        return classNames(
            'Polaris-HorizontalNavigation__connected-right'
        );
    });

    let wrapperClassName = computed(() => {
        return classNames(
            'Polaris-Tabs__Wrapper',
            'Polaris-HorizontalNavigation__Wrapper'
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
        const sortedVisibleTabs = visibleTabs.value.sort((tabA, tabB) => tabA - tabB);
        const tabs = [];

        sortedVisibleTabs.map((tabIndex) => tabs.push(props.tabs[tabIndex]));
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

    function handleMeasurement(containerWidthValue, disclosureWidthValue, hiddenTabWidthsValue) {
        visibleTabs.value = visibleHiddenTabs.value['visibleTabs'];
        hiddenTabs = visibleHiddenTabs.value['hiddenTabs'];
        disclosureWidth.value = disclosureWidthValue;
        containerWidth.value = containerWidthValue;
        tabsWidth.value = hiddenTabWidthsValue;
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