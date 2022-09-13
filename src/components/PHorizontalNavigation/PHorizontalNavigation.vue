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

<script>
    import {classNames} from '../../utilities/css';
    import {PBadge} from '../../components/PBadge';
    import {PPopover} from '../../components/PPopover';
    import {PTab} from '../../components/PTabs/components/PTab';
    import {PPanel} from '../../components/PTabs/components/PPanel';
    import {PTabMeasurer} from '../PTabs/components/PTabMeasurer';
    import {PList} from '../../components/PTabs/components/PList';
    import {PIcon} from '../../components/PIcon';

    import {getVisibleAndHiddenTabIndices} from '../PTabs/utilities';
    import PButton from "../PButton/PButton";
    import PCard from "../PCard/PCard";
    import PCardSection from "../PCard/components/PCardSection/PCardSection";
    import POptionList from "../POptionList/POptionList";
    import PImage from "../PImage/PImage";

    export default {
        name: 'PHorizontalNavigation',
        components: {
            PImage,
            POptionList,
            PCardSection,
            PCard,
            PButton,
            PTab, PPanel, PBadge, PPopover, PTabMeasurer, PList, PIcon,
        },
        props: {
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
        },
        data() {
            return {
                disclosureWidth: 0,
                tabsWidth: [],
                visibleTabs: [],
                hiddenTabs: [],
                showDisclosure: false,
                containerWidth: Infinity,
                tabToFocus: -1,
            };
        },
        computed: {
            className() {
                return classNames(
                    'Polaris-Tabs',
                    this.disclosureActivatorVisible && 'Polaris-Tabs--fillSpace',
                );
            },
            menuClassName() {
                return classNames(
                    'Polaris-HorizontalNavigation-Menu'
                );
            },
            rightMenuClassName() {
                return classNames(
                    'Polaris-HorizontalNavigation__connected-right'
                );
            },
            wrapperClassName() {
                return classNames(
                    'Polaris-Tabs__Wrapper',
                    'Polaris-HorizontalNavigation__Wrapper'
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
                    null,
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
            toggleStatusFilter() {
                this.statusFilterActive = !this.statusFilterActive;
            },
            handleMeasurement(containerWidth, disclosureWidth, hiddenTabWidths) {
                // this.tabToFocus = this.tabToFocus === -1 ? -1 : this.selected;
                this.visibleTabs = this.visibleHiddenTabs['visibleTabs'];
                this.hiddenTabs = this.visibleHiddenTabs['hiddenTabs'];
                this.disclosureWidth = disclosureWidth;
                this.containerWidth = containerWidth;
                this.tabsWidth = hiddenTabWidths;
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

                // /* tslint:disable-next-line */
                // if (target && target['classList'].contains('Polaris-Tabs__DisclosureActivator')) {
                //     return;
                // }

                // if (!event.relatedTarget) {
                //     // this.tabToFocus = this.selected;
                //     return;
                // }

                // const relatedTarget = event.relatedTarget;

                // if (
                //     relatedTarget instanceof HTMLElement &&
                //     /* tslint:disable-next-line */
                //     !relatedTarget['classList'].contains('Polaris-Tabs__Tab') &&
                //     /* tslint:disable-next-line */
                //     !relatedTarget['classList'].contains('Polaris-Tabs__Item') &&
                //     /* tslint:disable-next-line */
                //     !relatedTarget['classList'].contains('Polaris-Tabs__DisclosureActivator')
                // ) {
                //     this.tabToFocus = this.selected;
                // }
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