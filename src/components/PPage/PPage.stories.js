import { PPage } from '../PPage';
import { PButton } from '../PButton';
import { PBadge } from '../PBadge';
import { PAvatar } from '../PAvatar';

export default {
    title: 'Structure / Page ',
    component: PPage,
    argTypes: {
        additionalNavigation: {
            table: {
                disable: true,
            },
        },
        default: {
            table: {
                disable: true,
            },
        },
        primaryAction: {
            type: {
                name: 'json',
            },
        },
        titleMetadata: {
            table: {
                disable: true,
            },
        },
        actionGroups: {
            type: {
                name: 'json',
            },
            description: 'Collection of page-level groups of secondary actions',
        },
        pagination: {
            type: {
                name: 'json',
            },
            description: 'Page-level pagination',
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
            icon: ''
        },
        {
            content: 'View on your store',
            onAction: () => {
                alert('View on your store');
            },
            icon: ''
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
