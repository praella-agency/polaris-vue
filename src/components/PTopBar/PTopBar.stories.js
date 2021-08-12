import PTopBar from './PTopBar.vue';
import { PSearchField } from "./components/PSearchField";
import { PUserMenu } from "./components/PUserMenu";
import { PMenu } from "./components/PMenu";
import { PIcon } from "../PIcon";
import { PActionList } from "../PActionList";
import { PVisuallyHidden } from "../PVisuallyHidden";

export default {
    title: 'Structure / Top Bar',
    component: PTopBar,
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PTopBar, PSearchField, PUserMenu, PIcon, PActionList, PMenu, PVisuallyHidden,
    },
    data() {
        return {
            isUserMenuOpen: false,
            isSecondaryMenuOpen: false,
            isSearchActive: false,
            searchValue: '',
        };
    },
    template: `
      <PTopBar
          v-bind="$props"
          :searchResultsVisible="isSearchActive"
          :onSearchResultsDismiss="handleSearchResultsDismiss"
          :onNavigationToggle="handleNavigationToggle"
      >
        <PUserMenu
            slot="userMenu"
            id="Polaris-UserMenu"
            :actions="[
                {
                  items: [{content: 'Back to Shopify', icon: 'ArrowLeftMinor'}],
                }, 
                {
                   items: [{content: 'Community forums'}],
                }
            ]"
            name="Dharma"
            detail="Jaded Pixel"
            initials="D"
            :open="isUserMenuOpen"
            :onToggle="toggleIsUserMenuOpen"
        />
        <PMenu
            id="Polaris-Menu"
            slot="secondaryMenu"
            :open="isSecondaryMenuOpen"
            :onOpen="toggleIsSecondaryMenuOpen"
            :onClose="toggleIsSecondaryMenuOpen"
            :actions="[
                {
                  items: [{content: 'Community forums'}],
                },
            ]"
        >
          <span slot="activatorContent">
            <PIcon source="QuestionMarkMajor"/>
            <PVisuallyHidden>Secondary menu</PVisuallyHidden>
          </span>
        </PMenu>
        <PSearchField
            slot="searchField"
            @change="handleSearchChange"
            :value="searchValue"
            placeholder="Search"
            showFocusBorder
        />
        <PActionList
            slot="searchResult"
            :items="[
                {
                    content: 'Shopify help center',
                },
                {
                    content: 'Community forums',
                },
            ]"
        />
      </PTopBar>`,
    methods: {
        handleSearchChange(value) {
            console.log('SearchChange', value);
            this.searchValue = value;
            this.isSearchActive = value.length > 0;
        },
        handleSearchResultsDismiss() {
            this.isSearchActive = false;
            this.searchValue = '';
        },
        handleNavigationToggle() {
            console.log('toggle navigation visibility');
        },
        toggleIsSecondaryMenuOpen() {
            this.isSecondaryMenuOpen = !this.isSecondaryMenuOpen;
        },
        toggleIsUserMenuOpen() {
            this.isUserMenuOpen = !this.isUserMenuOpen;
        },
    },
});

export const TopBar = Template.bind({});

TopBar.args = {
    showNavigationToggle: true,
    logo: {
        width: 124,
        topBarSource:
            'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999',
        url: 'javascript:void(0)',
        accessibilityLabel: 'Jaded Pixel',
    },
}
