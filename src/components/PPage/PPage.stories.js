import { PPage } from '../PPage';
import { PButton } from '../PButton';
import { PBadge } from '../PBadge';
import { PAvatar } from '../PAvatar';

export default {
    title: 'Structure / Page ',
    component: PPage,
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
          <PButton :slot="primaryAction"></PButton>
          <PBadge slot="titleMetadata" status="success">Paid</PBadge>
          <PAvatar initials="HA" slot="additionalNavigation"></PAvatar>
          Page Content
      </PPage>`,
});

export const AllHeaderElements = Template.bind({});

AllHeaderElements.args = {
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
            url: '/new-page'
        }
    ],
    primaryAction: {
        content: 'Save',
        onAction: () => {
            alert('Saved');
        },
        disabled: true,
    },
}

const Template1 = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: { PPage },
    template: `
      <PPage
          v-bind="$props"
      >Wide page content
      </PPage>`,
})

export const FullWidthPage = Template1.bind({});

FullWidthPage.args = {
    fullWidth: true,
    title:"Orders",
    primaryAction: {
        content: 'Save',
        onAction: () => {
            alert('Saved');
        },
    },
    secondaryActions: [
        {
            content: 'Duplicate',
            accessibilityLabel: 'Secondary action label',
            onAction: () => {
                alert('Duplicate Action');
            },
            icon: 'DuplicateMinor'
        },
        {
            content: 'View on your store',
            onAction: () => {
                alert('View on your store');
            },
            icon: 'DuplicateMinor'
        },
        {
            content: 'View on your store',
            url: 'https://jsfiddle.net/nm55jnjk/17/',
            external: true,
            icon: 'DuplicateMinor'
        },
    ],
    pagination:{
        hasPrevious: false,
        hasNext: true,
        onNext: () => {
            alert('Next');
        },
        onPrevious: () => {
            alert('Previous');
        }
    },
}
