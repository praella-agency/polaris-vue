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

                        <template slot="activator">
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

                        <template
                            slot="content"
                        >
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
        <PPanel v-if="!navigation" v-for="(tab, tabIndex) in tabs" :key="tab.id" :id="tab.id + '-panel'" :tabID="tab.id" :hidden="!(selected === tabIndex)">
            <!-- @slot The content to display in tabs -->
            <slot v-if="selected === tabIndex"/>
        </PPanel>
    </div>
</template>

<script>
    import { classNames } from '../../utilities/css';
    import { PBadge } from '../../components/PBadge';
    import { PPopover } from '../../components/PPopover';
    import { PTab } from '../../components/PTabs/components/PTab';
    import { PPanel } from '../../components/PTabs/components/PPanel';
    import { PTabMeasurer } from './components/PTabMeasurer';
    import { PList } from '../../components/PTabs/components/PList';
    import { PIcon } from '../../components/PIcon';

    import { TabDescriptor } from '../../types/tabs';
    import { getVisibleAndHiddenTabIndices } from './utilities';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">Use to alternate among related views within the same context.</h4>
     */
    export default {
        name: 'PTabs',
        components: {
            PTab, PPanel, PBadge, PPopover, PTabMeasurer, PList, PIcon,
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
             * @values true | false
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
                default: 'Polaris-Tabs__Tab--selected',
            },
            /**
             * Fit tabs to container
             */
            fitted: {
                type: Boolean,
                default: false,
            },
            /**
             * Text to replace disclosures horizontal dots
             */
            disclosureText: {
                type: String,
                default: '',
            },
        },
        data() {
            return {
                disclosureWidth: 0,
                tabsWidth: [],
                visibleTabs: [],
                hiddenTabs: [],
                showDisclosure: [],
                containerWidth: Infinity,
                tabToFocus: -1,
            };
        },
        computed: {
            className() {
                return classNames(
                    'Polaris-Tabs',
                    this.fitted && 'Polaris-Tabs--fitted',
                    this.disclosureActivatorVisible && 'Polaris-Tabs--fillSpace',
                );
            },
            wrapperClassName() {
                return classNames(
                    'Polaris-Tabs__Wrapper',
                    this.navigation && 'Polaris-Tabs__Navigation',
                );
            },
            disclosureTabClassName() {
                return classNames(
                    'Polaris-Tabs__DisclosureTab',
                    this.disclosureActivatorVisible && 'Polaris-Tabs__DisclosureTab--visible',
                );
            },
            disclosureButtonClassName() {
                return classNames(
                    'Polaris-Tabs__DisclosureActivator',
                    this.disclosureText && 'Polaris-Tabs__Tab',
                );
            },
            computedVisibleTabs() {
                const visibleTabs = this.visibleTabs.sort((tabA, tabB) => tabA - tabB);
                const tabs = [];

                visibleTabs.map((tabIndex) => tabs.push(this.tabs[tabIndex]));

                return tabs;
            },
            disclosureButtonContentWrapperClassName() {
                return classNames(
                    'Polaris-Tabs__Title',
                    this.disclosureText && 'Polaris-Tabs--titleWithIcon',
                );
            },
            visibleHiddenTabs() {
                return getVisibleAndHiddenTabIndices(
                    this.tabs,
                    this.selected,
                    this.disclosureWidth,
                    this.tabsWidth,
                    this.containerWidth,
                );
            },
            disclosureActivatorVisible() {
                return this.visibleHiddenTabs['visibleTabs'].length < this.tabs.length;
            },
            disclosureTabs() {
                return this.hiddenTabs.map((tabIndex) => this.tabs[tabIndex]);
            },
        },
        methods: {
            handleMeasurement(containerWidth, disclosureWidth, hiddenTabWidths) {
                this.tabToFocus = this.tabToFocus === -1 ? -1 : this.selected;
                this.visibleTabs = this.visibleHiddenTabs['visibleTabs'];
                this.hiddenTabs = this.visibleHiddenTabs['hiddenTabs'];
                this.disclosureWidth = disclosureWidth;
                this.containerWidth = containerWidth;
                this.tabsWidth = hiddenTabWidths;
            },
            handleTabClick(id, event) {
                const tab = this.tabs.find((aTab) => aTab.id === id);
                if (tab === null) {
                    return;
                }

                const selectedIndex = this.tabs.indexOf(tab);
                /**
                 * Method to handle tab click
                 * @property {tabId, event}
                 */
                this.$emit('select', selectedIndex, event);
                this.$nextTick(() => {
                    this.visibleTabs = this.visibleHiddenTabs['visibleTabs'];
                    this.hiddenTabs = this.visibleHiddenTabs['hiddenTabs'];
                });
            },
            handleFocus(event) {
                const target = event.target;

                if (
                    /* tslint:disable-next-line */
                    (target && target['classList'].contains('Polaris-Tabs__Tab')) ||
                    /* tslint:disable-next-line */
                    (target && target['classList'].contains('Polaris-Tabs__Item'))
                ) {
                    let tabToFocus = -1;

                    this.tabs.every((tab, index) => {
                        /* tslint:disable-next-line */
                        if (tab.id === (target && target['id'])) {
                            tabToFocus = index;
                            return false;
                        }

                        return true;
                    });

                    this.tabToFocus = tabToFocus;
                    return;
                }

                /* tslint:disable-next-line */
                if (target && target['classList'].contains('Polaris-Tabs__DisclosureActivator')) {
                    return;
                }

                if (!event.relatedTarget) {
                    this.tabToFocus = this.selected;
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
                    this.tabToFocus = this.selected;
                }
            },
            handleDisclosureActivatorClick() {
                this.showDisclosure = !this.showDisclosure;
            },
            handleClose() {
                this.showDisclosure = false;
            },
            handleKeyPress(event) {
                const key = event.key;
                const tabsArrayInOrder = this.showDisclosure ? this.visibleTabs.concat(this.hiddenTabs) : [...this.visibleTabs];

                let newFocus = tabsArrayInOrder.indexOf(this.tabToFocus);

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

                this.tabToFocus = tabsArrayInOrder[newFocus];
            },
        },
    }
</script>
