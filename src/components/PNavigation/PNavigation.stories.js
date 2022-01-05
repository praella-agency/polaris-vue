import { PNavigation } from './index';
import { PIcon } from '../PIcon';
import { PAvatar } from '../PAvatar';

export default {
    title: 'Navigation / Navigation',
    component: PNavigation,
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {
        ItemProps: {
            description: 'ItemProps to utilize in items',
            table: {
                type: {
                    summary: null,
                },
                category: 'Array | Object',
                defaultValue: {
                    summary: '[]',
                    detail: `[{
    url?: string;
    to?: string | object;
    matches?: boolean;
    exactMatch?: boolean;
    matchPaths?: string[];
    excludePaths?: string[];
    external?: boolean;
    icon?: string;
    label: string;
    disabled?: boolean;
    accessibilityLabel?: string;
    selected?: boolean;
    exactMatch?: boolean;
    new?: boolean;
    subNavigationItems?: SubNavigationItem[]; // Check SubNavigationItem array
    secondaryAction?: SecondaryAction; // Check SecondaryAction object
    
    onClick?(): void;
}]`,
                },
            },
        },
        SubNavigationItem: {
            description: 'SubNavigationItem to utilize in ItemProps',
            table: {
                type: {
                    summary: null,
                },
                category: 'Array | Object',
                defaultValue: {
                    summary: '[]',
                    detail: `[{
    url: string;
    label: string;
    disabled?: boolean;
    new?: boolean;
    
    onClick?(): void;
}]`,
                },
            },
        },
        SecondaryAction: {
            description: 'SecondaryAction to utilize in ItemProps',
            table: {
                type: {
                    summary: null,
                },
                category: 'Array | Object',
                defaultValue: {
                    summary: '{}',
                    detail: `{
    url: string;
    accessibilityLabel: string;
    icon: string;
}`,
                },
            },
        },
        items: {
            table: {
                defaultValue: {
                    summary: '[]',
                    detail: `[{
    /** Section Title */
    title?: string;
    /** Items for sections */
    items: ItemProps[]; // Check ItemProps array
    /** Rollup */
    rollup?: {
        after: number;
        view: string;
        hide: string;
        activePath: string;
    }
    /** Action */
    action?: {
        icon: string;
        accessibilityLabel: string;
        onClick(): void;
    }
    /** Separator */
    separator?: boolean;
    /** Icon */
    icon?: string;
    /** Fill */
    fill?: boolean;
}]`,
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
        contextControl: {
            table: {
                type: {
                    summary: null,
                },
            },
        },
        icon: {
            table: {
                type: {
                    summary: null,
                },
            },
        },
    },
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PNavigation, PIcon, PAvatar,
    },
    template: `
      <PNavigation
          v-bind="$props"
          location="/"
          :on-dismiss="handleDismiss"
      />`,
    methods: {
        handleDismiss() {
            alert('On Navigation Dismiss');
        },
    },
});

export const Navigation = Template.bind({});

Navigation.args = {
    logo: {
        width: 124,
        topBarSource:
            'https://cdn.shopify.com/s/files/1/1564/7647/files/hulk-apps-darken_c0448e92-587f-47a8-9473-5ea0023b5ffd.svg?v=1583731462',
        url: 'javascript:void(0)',
        accessibilityLabel: 'Jaded Pixel',
    },
    items: [
        {
            items: [
                {
                    url: '/?path=/docs/navigation-navigation--navigation',
                    label: 'Inactive item',
                    icon: 'HomeMajor',
                    onClick: () => {
                        console.log('Inactive Item')
                    }
                },
                {
                    to: '/path/to/place',
                    label: 'Item with indicator',
                    icon: 'HomeMajor',
                    subNavigationItems: [
                        {
                            url: '/path/to/place/index',
                            disabled: false,
                            new: true,
                            label: 'New item',
                        },
                    ],
                },
                {
                    label: 'New item',
                    new: true,
                    icon: 'HomeMajor',
                },
                {
                    label: 'Badged item',
                    badge: 'Old',
                    icon: 'HomeMajor',
                },
                {
                    label: 'Active with secondary action',
                    icon: 'OrdersMajor',
                    selected: true,
                    secondaryAction: {
                        accessibilityLabel: 'Add an order',
                        icon: 'CirclePlusOutlineMinor',
                    },
                },
                {
                    label: 'Active item with sub navigation',
                    icon: 'ProductsMajor',
                    selected: true,
                    subNavigationItems: [
                        {
                            disabled: false,
                            selected: true,
                            label: 'Selected sub item',
                        },
                        {
                            disabled: false,
                            label: 'Default sub item',
                        },
                        {
                            disabled: true,
                            label: 'Disabled sub item',
                        },
                    ],
                },
                {
                    label: 'Disabled item',
                    icon: 'CustomersMajor',
                    disabled: true,
                },
                {
                    label: 'Overflow item',
                    icon: 'MarketingMajor',
                },
            ],
            rollup: {
                after: 7,
                view: 'view',
                hide: 'hide',
                activePath: '/',
            },
        },
        {
            title: "These icons should have the same color",
            items: [
                {
                    label: 'Icon as svg',
                    icon: 'OnlineStoreMajor',
                },
                {
                    label: 'Icon as img',
                    icon:
                        `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.791 2.253l-.597 3.583A1 1 0 0 0 2.18 7h.893a1.5 1.5 0 0 0 1.342-.83L5 5l.585 1.17A1.5 1.5 0 0 0 6.927 7h1.146a1.5 1.5 0 0 0 1.342-.83L10 5l.585 1.17a1.5 1.5 0 0 0 1.342.83h1.146a1.5 1.5 0 0 0 1.342-.83L15 5l.585 1.17a1.5 1.5 0 0 0 1.342.83h.893a1 1 0 0 0 .986-1.164l-.597-3.583A1.5 1.5 0 0 0 16.729 1H3.271a1.5 1.5 0 0 0-1.48 1.253zM4 18.5A1.5 1.5 0 0 1 5.5 17H8v-3h4v3h2.5a1.5 1.5 0 0 1 1.5 1.5v.5H4v-.5z"/>
                            <path d="M2 9h2v4h12V9h2v4.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 13.5V9z"/>
                        </svg>`,
                },
                {
                    label: 'Other secondary action',
                    icon:
                        `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                            <path d="M2.771 14.055A8 8 0 1 1 16 8c0 2.385-1.086 4.629-2.704 5.983A7.956 7.956 0 0 1 7.991 16c-.613 0-2.022-.003-5-.01h-.928l.708-1.935zm5.973-6.757c-.554-.302-.837-.565-.837-.92 0-.446.4-.735 1.017-.735a3.62 3.62 0 0 1 1.365.302l.502-1.577S10.328 4 8.963 4C7.057 4 5.73 5.117 5.73 6.68c0 .894.618 1.565 1.442 2.05.67.382.901.658.901 1.065 0 .42-.334.762-.952.762-.915 0-1.79-.486-1.79-.486l-.54 1.577s.797.552 2.15.552c1.956 0 3.373-.986 3.373-2.76-.013-.959-.721-1.642-1.571-2.142z"/>
                        </svg>`,
                    secondaryAction: {
                        accessibilityLabel: 'View your online store',
                        icon: 'ViewMinor',
                    },
                },
            ],
            action: {
                accessibilityLabel: 'Add sales channel',
                icon: 'CirclePlusOutlineMinor',
                onClick: () => {
                },
            },
            separator: true,
        }
    ]
}
