<template>
    <div class="Polaris-TopBar">
        <button
            v-if="showNavigationToggle"
            type="button"
            :class="iconClassName"
            @click="onNavigationToggle"
            @focus="focused = true"
            @blur="focused = false"
            aria-label="Toggle menu"
        >
            <PIcon source="MobileHamburgerMajor"/>
        </button>
        <div v-if="hasSlot($slots.contextControl)" testID="ContextControl"
             class="Polaris-TopBar__ContextControl">
            <!-- @slot Accepts a component that is used to help users switch between different contexts -->
            <slot name="contextControl"/>
        </div>
        <div v-else-if="Object.keys(logo).length > 0" :class="className">
            <PUnstyledLink
                :url="logo.url"
                class="Polaris-TopBar__LogoLink"
                :style="width"
            >
                <PImage
                    :source="logo.topBarSource"
                    :alt="logo.accessibilityLabel"
                    class="Polaris-TopBar__Logo"
                    :style="width"
                />
            </PUnstyledLink>
        </div>
        <div class="Polaris-TopBar__Contents">
            <div
                v-if="hasSlot($slots.searchField) || Object.keys(searchField).length > 0"
                class="Polaris-TopBar__SearchField"
            >
                <!-- @slot Customize SearchField -->
                <slot name="searchField">
                    <PSearchField
                        v-model="searchFieldValue"
                        :placeholder="searchField.placeholder"
                        :showFocusBorder="searchField.showFocusBorder"
                        :focused="searchField.focused"
                        :active="searchField.active"
                        @change="handleSearchFieldChange"
                    />
                </slot>
                <PSearch
                    :visible="(searchFieldValue.length > 0) && searchResultsVisible"
                    @dismiss="handleSearchResultsDismiss"
                    :overlayVisible="searchResultsOverlayVisible"
                >
                    <!-- @slot Display custom list of result -->
                    <slot name="searchResult">
                        <PActionList
                            :items="searchResult.items"
                            :sections="searchResult.sections"
                        />
                    </slot>
                </PSearch>
            </div>
            <div
                v-if="hasSlot($slots.secondaryMenu) || Object.keys(secondaryMenu).length > 0"
                class="Polaris-TopBar__SecondaryMenu"
            >
                <!-- @slot Customize SecondaryMenu -->
                <slot name="secondaryMenu">
                    <PMenu
                        v-if="Object.keys(secondaryMenu).length > 0"
                        v-bind="secondaryMenu"
                    >
                        <template #activatorContent>
                            <!-- @slot Customize icon -->
                            <slot name="activatorContent"/>
                        </template>
                    </PMenu>
                </slot>
            </div>
            <!-- @slot Customize UserMenu -->
            <slot name="userMenu">
                <PUserMenu
                    v-if="Object.keys(userMenu).length > 0"
                    v-bind="userMenu"
                />
            </slot>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed, useSlots } from 'vue';
    import { hasSlot } from '../../ComponentHelpers';
    import { classNames } from '../../utilities/css';
    import { ThemeLogo, getWidth } from '../../types/logo';
    import { PIcon } from '../../components/PIcon';
    import { PUnstyledLink } from '../../components/PUnstyledLink';
    import { PImage } from '../../components/PImage';
    import { PActionList } from '../../components/PActionList';
    import { PSearch } from '../../components/PTopBar/components/PSearch';
    import { PUserMenu } from '../../components/PTopBar/components/PUserMenu';
    import { PMenu } from '../../components/PTopBar/components/PMenu';
    import { PSearchField } from '../../components/PTopBar/components/PSearchField';
    import ObjectValidator from '../../utilities/validators/ObjectValidator';
    import { SearchResult } from '../variables';

    /**
     * <br/>
     * <h4 style="font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue,
     *  sans-serif;">The collapsible component is used to put long sections of information under a block that merchants
     *  can expand or collapse.</h4>
     */

    let props = defineProps({
        /**
         * Toggles whether or not a navigation component has been provided. Controls the presence of the mobile nav
         * toggle button
         */
        showNavigationToggle: {
            type: Boolean,
        },
        /**
         * A boolean property indicating whether search results are currently visible
         */
        searchResultsVisible: {
            type: Boolean,
            default: true,
        },
        /**
         * A callback function that handles hiding and showing mobile navigation
         */
        onNavigationToggle: {
            type: Function,
            default: null,
        },
        /**
         * Whether or not the search results overlay has a visible backdrop
         */
        searchResultsOverlayVisible: {
            type: Boolean,
            default: false,
        },
        /**
         * Customize logo
         */
        logo: {
            type: Object,
            default: () => ({}),
            ...ObjectValidator('logo', ThemeLogo),
        },
        /**
         * Accepts a user component that is made available as a static member of the top bar component and renders as
         * the primary menu
         */
        userMenu: {
            type: Object,
            default: () => ({}),
        },
        /**
         * Accepts a menu component that is made available as a static member of the top bar component
         */
        secondaryMenu: {
            type: Object,
            default: () => ({}),
        },
        /**
         * Accepts a search field component that is made available as a `TextField` static member of the top bar component
         */
        searchField: {
            type: Object,
            default: () => ({}),
        },
        /**
         * Accepts a search results component that is ideally composed of a card component containing a list of actionable
         * search results
         */
        searchResult: {
            type: Object,
            default: () => ({}),
            ...ObjectValidator('searchResult', SearchResult),
        },
    });

    let emit = defineEmits(['searchFieldChange', 'searchResultsDismiss']);
    let slots = useSlots();
    let focused = ref(false);
    let searchFieldValue = ref(Object.keys(props.searchField).length > 0 ? props.searchField.value : '');

    let className = computed(() => {
        return classNames(
            'Polaris-TopBar__LogoContainer',
            /* tslint:disable-next-line */
            (props.showNavigationToggle || hasSlot(slots.searchField)) ? 'Polaris-TopBar__LogoDisplayControl' : 'Polaris-TopBar__LogoDisplayContainer',
        );
    });

    let iconClassName = computed(() => {
        return classNames(
            'Polaris-TopBar__NavigationIcon',
            focused.value && 'Polaris-TopBar__NavigationIcon Polaris-TopBar--focused',
        );
    });

    let width = computed(() => {
        return {
            width: getWidth(props.logo, 104),
        };
    });

    let isSlot = computed(() => {
        return hasSlot;
    });

    function handleSearchFieldChange(value) {
        /**
         * A callback function that handles the search field value
         */
        emit('searchFieldChange', value);
    }

    function handleSearchResultsDismiss() {
        /**
         * A callback function that handles the dismissal of search results
         */
        emit('searchResultsDismiss');
    }
</script>
