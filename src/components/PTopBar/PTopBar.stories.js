import PTopBar from './PTopBar.vue';
import { PSearchField } from './components/PSearchField';
import { PUserMenu } from './components/PUserMenu';
import { PMenu } from './components/PMenu';
import { PIcon } from '../PIcon';
import { PActionList } from '../PActionList';
import { PVisuallyHidden } from '../PVisuallyHidden';
import { PFrame } from '../PFrame';

export default {
    title: 'Structure / Top Bar',
    component: PTopBar,
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {
        message: {
            description: 'Message object to use in UserMenu and SecondaryMenu',
            table: {
                type: {
                    summary: null,
                },
                category: 'Object',
                defaultValue: {
                    summary: '{}',
                    detail: `{    
    title: string,
    description: string,
    action: {
        content: string,
        onClick(): void,
    },
    link: {
        to: string | object,
        content: string,
    },
    badge?: {
        content: string,
        status: BadgeProps['status'],
    },
}`,
                },
            },
        },
        logo: {
            table: {
                defaultValue: {
                    summary: '{}',
                    detail: `{
    /** Provides a path for a logo used on a dark background */
    topBarSource?: string;
    /** Provides a path for a logo used on a light background */
    contextualSaveBarSource?: string;
    /** Destination the merchant will navigate to when clicking the logo */
    url?: string;
    /** Accessible label the logo image */
    accessibilityLabel?: string;
    /** Number of pixels wide the logo image is */
    width?: number;
}`,
                },
            },
        },
        secondaryMenu: {
            table: {
                defaultValue: {
                    summary: '{}',
                    detail: `{
    /** Required for the menu */
    id: string,
    /** Collection of items for the list */
    actions?: [
        {
            items: [{
                /** Content the action displays */
                content?: string,
                /** Icon to display */
                icon?: boolean,
                /** HelpText for the element */
                helpText?: boolean,
                /** Callback when an action takes place */
                onAction?(): void,
            },],
        }
    ],
    /** Object of message for Menu */
    message?: For message object check message object,
    /** Toggle to open/close popover */
    open: boolean,
    /** Icon to display */
    icon: string,
    /** Accessibility Label for Menu */
    accessibilityLabel?: string,
    /** Method to open popover */
    onOpen(): void,
    /** Method to close popover */
    onClose(): void,
}`,
                },
            },
        },
        searchField: {
            table: {
                defaultValue: {
                    summary: '{}',
                    detail: `{
    /** Value for search field */
    value?: string;
    /** Placeholder for search field */
    placeholder?: object;
    /** Set focus border for search field */
    showFocusBorder?: boolean;
    /** Activate search result for the search field */
    active?: boolean;
    /** Focus on field */
    focused?: boolean;
    /** Change event */
    onChange(): void;
}`,
                },
            },
        },
        searchResult: {
            table: {
                defaultValue: {
                    summary: '{}',
                    detail: `{
    items?: [{
        /** Content the action displays */
        content?: string,
        /** Icon to display */
        icon?: boolean,
        /** HelpText for the element */
        helpText?: boolean,
        /** Callback when an action takes place */
        onAction?(): void,
    }],
    section?: [{
        /** Title for the section */
        title?: string,
        /** Collection of action items for the list */
        items: items,
    }],
}`,
                },
            },
        },
        userMenu: {
            table: {
                defaultValue: {
                    summary: '{}',
                    detail: `{
    /** Required for the menu */
    id: string;
    /** Collection of items for the list */
    actions?: [
        {
            items: [{
                /** Content the action displays */
                content?: string,
                /** Icon to display */
                icon?: boolean,
                /** HelpText for the element */
                helpText?: boolean,
                /** Callback when an action takes place */
                onAction?(): void,
            },],
        }
    ],
    /** Object of message for Menu */
    message?: For message object check message object,
    /** Name for the User Menu */
    name?: string;
    /** Information for User Menu */
    detail?: string;
    /** Accessibility Label for the User Menu */
    accessibilityLabel?: string;
    /** Initials for the User Menu icon */
    initials?: string;
    /** Avatar instead of Initials */
    avatar?: string;
    /** Toggle to open/close popover */
    open: boolean;
    /** Method to handle popover open/close */
    onToggle(): void;
}`,
                },
            },
        },
    },
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PTopBar, PSearchField, PUserMenu, PIcon, PActionList, PMenu, PVisuallyHidden, PFrame,
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
      <PFrame>
        <PTopBar
            slot="pTopBar"
            v-bind="$props"
            :onSearchResultsDismiss="handleSearchResultsDismiss"
            :onNavigationToggle="handleNavigationToggle"
            :userMenu="{
                id: 'Polaris-UserMenu',
                actions: [
                    {
                        items: [
                            {
                                content: 'Back to Shopify',
                                icon: 'ArrowLeftMinor'
                            }
                        ],
                    },
                    {
                        items: [
                            {
                                content: 'Community forums'
                            }
                        ],
                    }
                ],
                name: 'Dharma',
                detail: 'Jaded Pixel',
                initials: 'D',
                open: isUserMenuOpen,
                onToggle: toggleIsUserMenuOpen,
                message: {
                    title: 'Shopify Production',
                    description: 'New message',
                    action: {
                        content: 'Action',
                        onClick: handleMessageActionClick,
                    },
                    link: {
                        to: 'javascript:void(0);',
                        content: 'Link',
                        external: true,
                    },
                    badge: {
                        content: 'Badge',
                        status: 'warning',
                    },
                },
            }"
            :secondaryMenu="{
                id: 'Polaris-Menu',
                open: isSecondaryMenuOpen,
                onOpen: toggleIsSecondaryMenuOpen,
                onClose: toggleIsSecondaryMenuOpen,
                actions: [
                    {
                        items: [
                            {
                              content: 'Community forums'
                            },
                        ],
                    },
                ],
                icon: 'QuestionMarkMajor',
            }"
            :searchField="{
                value: searchValue,
                placeholder: 'Search',
                showFocusBorder: true,
            }"
            :searchResult="{
                items: [
                    {
                      content: 'Shopify help center',
                    },
                    {
                      content: 'Community forums',
                    },
                ],
            }"
        />
      </PFrame>`,
    methods: {
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
        handleMessageActionClick() {
            console.log('Message Action Clicked!');
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