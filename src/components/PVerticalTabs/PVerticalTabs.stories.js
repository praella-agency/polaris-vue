import { PVerticalTabs } from './index.js';
import { PCard } from '../PCard';
import { PCardHeader } from '../PCard/components/PCardHeader';
import { PCardSection } from '../PCard/components/PCardSection';
import { PStack } from '../PStack';
import { PStackItem } from '../PStack/components/PStackItem';
import { PHeading } from '../PHeading';
import { PButton } from '../PButton/index.js';
import { PFooterHelp } from '../PFooterHelp';
import { PLink } from '../PLink';
import { PPopover } from '../PPopover/index.js';
import { PActionList } from '../PActionList';

export default {
    title: 'Navigation / Vertical Tabs',
    component: PVerticalTabs,
    parameters: {
        docs: {
            inlineStories: false,
            iframeHeight: 500,
        },
    },
    argTypes: {
        selected: {
            control: {
                type: null,
            },
        },
        default: {
            table: {
                type: {
                    summary: null,
                },
            },
        },
        tabs: {
            table: {
                defaultValue: {
                    summary: '[]',
                    detail: `[{
    /** A unique identifier for the tab */
    id: string,
    /** A destination to link to */
    url?: string,
    /** Set to for router link */
    to?: string | object,
    /** Content for the tab */
    content: string,
    /** A unique identifier for the panel */
    panelID?: string,
    /** Visually hidden text for screen readers */
    accessibilityLabel?: string,
    /** External URL */
    external?: boolean,
    /** Badge Object */
    badge?: {
        content?: string,
        status?: string,
        progress?: string,
        background?: string,
        color?: string,
        size?: string,
    },
    /** Icon Object */
    icon?: {
        source?: string | 'placeholder',
        color?: Color,
        backdrop?: boolean,
        accessibilityLabel?: string,
    };
}]`,
                },
            },
        },
        select: {
            table: {
                defaultValue: {
                    summary: '()',
                    detail: '(selectedIndex, event)',
                },
            },
        },
    },
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        PCard, PCardSection, PVerticalTabs, PStack, PStackItem, PHeading, PButton, PFooterHelp, PLink, PCardHeader,
        PPopover, PActionList,
    },
    data() {
        return {
            selectedTab: 0,
            items: [
                {
                    id: 'add-product',
                    content: 'Add product',
                    icon: {
                        source: 'CircleTickMajor',
                        color: 'success',
                    },
                },
                {
                    id: 'customize-theme',
                    content: 'Customize theme',
                    icon: {
                        source: 'CircleTickMajor',
                        color: 'success',
                    },
                },
                {
                    id: 'add-domain',
                    content: 'Add domain',
                    icon: {
                        source: 'DomainsMajor',
                        color: 'success',
                    },
                },
            ],
            statusFilterActive: false,
        };
    },
    template: `
        <PCard>
            <PCardHeader
                title="Moving along nicely."
                style="margin-bottom: 20px;"
            >
                <PPopover
                    slot="children"
                    id="CardHeaderPopover"
                    :active="statusFilterActive"
                    preferredAlignment="right"
                    @close="statusFilterActive = false"
                >
                    <PButton
                        slot="activator"
                        plain
                        icon="HorizontalDotsMinor"
                        @click.stop="statusFilterActive = !statusFilterActive"
                    />
                    <PActionList 
                        slot="content"
                        :items="[
                            {
                                content: 'Dismiss',
                                icon: 'CancelSmallMinor',
                            },
                            {
                                content: 'Give feedback',
                                icon: 'ChatMajor',
                            },
                      ]"
                    />
                </PPopover>
            </PCardHeader>
            <PVerticalTabs v-bind="$props" :tabs="items" @select="selectMenu" :selected="selectedTab">
                <PStack v-if="selectedTab === 0">
                    <PStackItem width="60%">
                        <PStack vertical>
                            <PStackItem>
                                <PHeading>You've added new products</PHeading>
                            </PStackItem>
                            <PStackItem>
                                <p>Add more products or move on to another tip.</p>
                            </PStackItem>
                            <PStackItem>
                                <PButton slim primary>Add another product</PButton>
                            </PStackItem>
                            <PStackItem style="margin: 0.8rem 0 0.8rem 0;">
                                <PFooterHelp id="product" style="float: left; margin: 12rem 0 -2rem -2rem;">
                                    <PLink
                                        url="javascript:void(0);"
                                    >
                                        Learn more about products
                                    </PLink>
                                </PFooterHelp>
                            </PStackItem>
                        </PStack>
                    </PStackItem>
                    <PStackItem>
                        <img src="https://cdn.shopify.com/shopifycloud/shopify/assets/admin/home/onboarding/home-onboard-prod-complete-b2bdb8d2f037f3e8dcb82d48cd28890f64d110732716c351b1a6369a7a54ced0.svg" alt="">
                    </PStackItem>
                </PStack>
                <PStack v-if="selectedTab === 1">
                    <PStackItem width="60%">
                        <PStack vertical>
                            <PStackItem>
                                <PHeading>You've updated your theme</PHeading>
                            </PStackItem>
                            <PStackItem>
                                <p>Make changes to your theme as needed, or move on to another tip.</p>
                            </PStackItem>
                            <PStackItem>
                                <PButton slim primary>Customize theme</PButton>
                            </PStackItem>
                            <PStackItem style="margin: 0.8rem 0 0.8rem 0;">
                                <PFooterHelp id="theme" style="float: left; margin: 12rem 0 -2rem -2rem;">
                                    <PLink
                                        url="javascript:void(0);"
                                    >
                                        Learn more about themes
                                    </PLink>
                                </PFooterHelp>
                            </PStackItem>
                        </PStack>
                    </PStackItem>
                    <PStackItem>
                        <img src="https://cdn.shopify.com/shopifycloud/shopify/assets/admin/home/onboarding/home-onboard-theme-complete-d9f6c7b20c6f3df6c748cc969e52e15b2f1ce8182280552ac5fa56547814281e.svg" alt="">
                    </PStackItem>
                </PStack>
                <PStack v-if="selectedTab === 2">
                    <PStackItem width="60%">
                        <PStack vertical>
                            <PStackItem>
                                <PHeading>Strengthen your brand with a custom domain</PHeading>
                            </PStackItem>
                            <PStackItem>
                                <p>Your current domain is demo-admin.myshopify.com but you can add a custom domain to help customers find your online store.</p>
                            </PStackItem>
                            <PStackItem>
                                <PButton slim primary>Add domain</PButton>
                            </PStackItem>
                            <PStackItem style="margin: 0.8rem 0 0.8rem 0;">
                                <PFooterHelp id="domain" style="float: left; margin: 12rem 0 -2rem -2rem;">
                                    <PLink
                                        url="javascript:void(0);"
                                    >
                                        Learn more about domains
                                    </PLink>
                                </PFooterHelp>
                            </PStackItem>
                        </PStack>
                    </PStackItem>
                    <PStackItem>
                        <img src="https://cdn.shopify.com/shopifycloud/shopify/assets/admin/home/onboarding/home-onboard-domain-incomplete-b7b91c4368b4716d22343af73d5949da5c2d00678c60f839cb7e2ea06ec0b602.svg" alt=""/>
                    </PStackItem>
                </PStack>
            </PVerticalTabs>
        </PCard>`,
    methods: {
        selectMenu(menuIndex) {
            this.selectedTab = menuIndex;
        },
    },
});

export const VerticalTabs = Template.bind({});

VerticalTabs.parameters = {
    docs: {
        source: {
            code: `
<PCard>
    <PCardHeader
        title="Moving along nicely."
        style="margin-bottom: 20px;"
    >
        <PPopover
            slot="children"
            id="CardHeaderPopover"
            :active="statusFilterActive"
            preferredAlignment="right"
        >
            <PButton
                slot="activator"
                plain
                icon="HorizontalDotsMinor"
            />
            <PActionList 
                slot="content"
                :items="[
                    {
                        content: 'Dismiss',
                        icon: 'CancelSmallMinor',
                    },
                    {
                        content: 'Give feedback',
                        icon: 'ChatMajor',
                    },
                ]"
            />
        </PPopover>
    </PCardHeader>
    <PVerticalTabs v-bind="$props" :tabs="items" :selected="selectedTab">
        <PStack v-if="selectedTab === 0">
            <PStackItem width="60%">
                <PStack vertical>
                    <PStackItem>
                        <PHeading>You've added new products</PHeading>
                    </PStackItem>
                    <PStackItem>
                        <p>Add more products or move on to another tip.</p>
                    </PStackItem>
                    <PStackItem>
                        <PButton slim primary>Add another product</PButton>
                    </PStackItem>
                    <PStackItem style="margin: 0.8rem 0 0.8rem 0;">
                        <PFooterHelp id="product" style="float: left; margin: 12rem 0 -2rem -2rem;">
                            <PLink
                                url="javascript:void(0);"
                            >
                                Learn more about products
                            </PLink>
                        </PFooterHelp>
                    </PStackItem>
                </PStack>
            </PStackItem>
            <PStackItem>
                <img src="https://cdn.shopify.com/shopifycloud/shopify/assets/admin/home/onboarding/home-onboard-prod-complete-b2bdb8d2f037f3e8dcb82d48cd28890f64d110732716c351b1a6369a7a54ced0.svg" alt="">
            </PStackItem>
        </PStack>
        <PStack v-if="selectedTab === 1">
            <PStackItem width="60%">
                <PStack vertical>
                    <PStackItem>
                        <PHeading>You've updated your theme</PHeading>
                    </PStackItem>
                    <PStackItem>
                        <p>Make changes to your theme as needed, or move on to another tip.</p>
                    </PStackItem>
                    <PStackItem>
                        <PButton slim primary>Customize theme</PButton>
                    </PStackItem>
                    <PStackItem style="margin: 0.8rem 0 0.8rem 0;">
                        <PFooterHelp id="theme" style="float: left; margin: 12rem 0 -2rem -2rem;">
                            <PLink
                                url="javascript:void(0);"
                            >
                                Learn more about themes
                            </PLink>
                        </PFooterHelp>
                    </PStackItem>
                </PStack>
            </PStackItem>
            <PStackItem>
                <img src="https://cdn.shopify.com/shopifycloud/shopify/assets/admin/home/onboarding/home-onboard-theme-complete-d9f6c7b20c6f3df6c748cc969e52e15b2f1ce8182280552ac5fa56547814281e.svg" alt="">
            </PStackItem>
        </PStack>
        <PStack v-if="selectedTab === 2">
            <PStackItem width="60%">
                <PStack vertical>
                    <PStackItem>
                        <PHeading>Strengthen your brand with a custom domain</PHeading>
                    </PStackItem>
                    <PStackItem>
                        <p>Your current domain is demo-admin.myshopify.com but you can add a custom domain to help customers find your online store.</p>
                    </PStackItem>
                    <PStackItem>
                        <PButton slim primary>Add domain</PButton>
                    </PStackItem>
                    <PStackItem style="margin: 0.8rem 0 0.8rem 0;">
                        <PFooterHelp id="domain" style="float: left; margin: 12rem 0 -2rem -2rem;">
                            <PLink
                                url="javascript:void(0);"
                            >
                                Learn more about domains
                            </PLink>
                        </PFooterHelp>
                    </PStackItem>
                </PStack>
            </PStackItem>
            <PStackItem>
                <img src="https://cdn.shopify.com/shopifycloud/shopify/assets/admin/home/onboarding/home-onboard-domain-incomplete-b7b91c4368b4716d22343af73d5949da5c2d00678c60f839cb7e2ea06ec0b602.svg" alt=""/>
            </PStackItem>
        </PStack>
    </PVerticalTabs>
</PCard>`,
        },
    },
}
