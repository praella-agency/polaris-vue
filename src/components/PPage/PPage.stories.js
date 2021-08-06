import { PPage } from '../PPage';
import { PButton } from '../PButton';
import { PBadge } from '../PBadge';
import { PAvatar } from '../PAvatar';

export default {
    title: 'Structure / Page ',
    component: PPage,
    argTypes: {
        default: {
            table: {
                disable: true,
            },
        },
        primaryAction: {
            type: {
                name: 'json',
            },
            table: {
                category: ['props', 'slots'],
                defaultValue: {
                    summary: '{}',
                    detail: `{
    /** Content the action displays */
    content?: string,
    /** Callback when an action takes place */
    onAction?(): void,
}`,
                },
            },
        },
        actionGroups: {
            type: {
                name: 'json',
            },
            table: {
                defaultValue: {
                    summary: '[]',
                    detail: `[{
    /** Title for the action */  
    title: string,
    /** Actions for the action groups */
    actions: [{
        id?: string,
        content?: string,
        accessibilityLabel?: string,
        url?: string,
        external?: boolean,
        onAction?(): void,
    }],
    icon?: string,
    details?: string,
    index?: number,
}]`,
                }
            }
        },
        pagination: {
            table: {
                defaultValue: {
                    summary: '{}',
                    detail: `{
    nextURL?: string,
    previousURL?: string,
    hasNext?: boolean,
    hasPrevious?: boolean,
    accessibilityLabel?: string,
    onNext?(): void,
    onPrevious?(): void,
}`
                },
            },
        },
        separator: {
            type: {
                name: 'boolean',
            },
            description: 'Separator for page',
        },
        subtitle: {
            type: {
                name: 'string',
            },
            description: 'Page subtitle, in regular type',
        },
        breadcrumbs: {
            table: {
                defaultValue: {
                    summary: '[]',
                    detail: `[{
    content?: any,
    url?: any,
    to?: any,
    accessibilityLabel?: string,
    onAction?(): void,
}]`
                },
            },
        },
        secondaryActions: {
            table: {
                defaultValue: {
                    summary: '[]',
                    detail: `[{
    /** Content the action displays */
    content?: string,
    /** Accessibility Label */
    accessibilityLabel?: string,
    /** Icon support */
    icon?: string,
    /** Disable element */
    disabled?: boolean,
    /** Callback when an action takes place */
    onAction?(): void,                   
}]`,
                },
            },
        },
    },
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PPage, PButton, PBadge, PAvatar
    },
    template: `
      <PPage
          v-bind="$props"
      >
          <PBadge slot="titleMetadata" status="success">Paid</PBadge>
          <PAvatar initials="HA" slot="additionalNavigation"></PAvatar>
          Page Content
      </PPage>`,
});

export const Page = Template.bind({});

Page.args = {
    separator: true,
    secondaryActions: [
        {
            content: 'Duplicate',
            accessibilityLabel: 'Secondary action label',
            onAction: () => {
                alert('Duplicate Action');
            },
        },
        {
            content: 'View on your store',
            onAction: () => {
                alert('View on your store');
        },
        },
    ],
    actionGroups: [
        {
            title: 'Promote',
            accessibilityLabel: 'Action group label',
            actions: [
                {
                    content: 'Share on Facebook',
                    accessibilityLabel: 'Individual action label',
                    onAction: () => {
                        alert('Share on facebook')
                    },
                },
            ],
        },
    ],
    pagination: {
        hasPrevious: true,
        hasNext: true,
        onNext: () => {
            alert('Next');
        },
        onPrevious: () => {
            alert('Previous')
        },
    },
    thumbnail: "https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg",
    title: "3/4 inch Leather pet collar",
    subtitle: "Perfect for any pet",
    breadcrumbs: [
        {
            content: 'Products',
            to: '/new-page',
            ariaLabel: 'Hello',
            onAction: () => {
                console.log('Action 1 handled');
            },
        }
    ],
}
