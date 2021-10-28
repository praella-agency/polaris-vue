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
        docs: {
            inlineStories: false,
            iframeHeight: 500,
        },
    },
    argTypes: {
        Message: {
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
            description: `**Props**: Accepts a menu component that is made available as a static member of the top bar 
                component.
                \n**Slots**: Slot to customize SecondaryMenu.`,
            table: {
                category: 'Props | Slots',
                type: {
                    summary: null,
                },
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
    message?: For message object check Message object,
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
            description: `**Props**: Accepts a search field component that is made available as a <code>TextField</code> 
                static member of the top bar component.
                \n**Slots**: Slot to customize SearchField.`,
            table: {
                category: 'Props | Slots',
                type: {
                    summary: null,
                },
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
}`,
                },
            },
        },
        searchResult: {
            description: `**Props**: Accepts a search results component that is ideally composed of a card component 
                containing a list of actionable search results.
                \n**Slots**: Slot to display custom list of result.`,
            table: {
                category: 'Props | Slots',
                type: {
                    summary: null,
                },
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
            description: `**Props**: Accepts a user component that is made available as a static member of the top bar 
                component and renders as the primary menu.
                \n**Slots**: Slot to customize UserMenu.`,
            table: {
                category: 'Props | Slots',
                type: {
                    summary: null,
                },
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
    message?: For message object check Message object,
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
        contextControl: {
            table: {
                type: {
                    summary: null,
                },
            },
        },
        searchFieldChange: {
            table: {
                defaultValue: {
                    summary: '()',
                    detail: '(value)',
                },
            },
        },
        searchResultsDismiss: {
            table: {
                defaultValue: {
                    summary: 'void',
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
            slot="topBar"
            v-bind="$props"
            @searchResultsDismiss="handleSearchResultsDismiss"
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

TopBar.parameters = {
    docs: {
        source: {
            code: `
<template>
  <PFrame>
    <PTopBar
      slot="topBar"
      showNavigationToggle
      :logo='{"width":124,"topBarSource":"https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999","url":"javascript:void(0)","accessibilityLabel":"Jaded Pixel"}'
      :userMenu='{"id":"Polaris-UserMenu","actions":[{"items":[{"content":"Back to Shopify","icon":"ArrowLeftMinor"}]},{"items":[{"content":"Community forums"}]}],"name":"Dharma","detail":"Jaded Pixel","initials":"D","open":false,"message":{"title":"Shopify Production","description":"New message","action":{"content":"Action"},"link":{"to":"javascript:void(0);","content":"Link","external":true},"badge":{"content":"Badge","status":"warning"}}}'
      :secondaryMenu='{"id":"Polaris-Menu","open":false,"actions":[{"items":[{"content":"Community forums"}]}],"icon":"QuestionMarkMajor"}'
      :searchField='{"value":"","placeholder":"Search","showFocusBorder":true}'
      :searchResult='{"items":[{"content":"Shopify help center"},{"content":"Community forums"}]}'
    />
  </PFrame>
</template>`,
        },
    },
}
