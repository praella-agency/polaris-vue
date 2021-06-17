import { PPage } from '../PPage';
import { PButton } from '../PButton';
import { PBadge } from '../PBadge';
import { PAvatar } from '../PAvatar';

export default {
    title: 'Example/PPage',
    component: PPage,
}

const Template = (args, {argTypes}) => ({
    props: Object.keys(argTypes),
    components: {
        PPage, PButton, PBadge, PAvatar
    },
    data() {
      return {
          primaryAction: {
              content: 'Save',
              onAction: this.triggerPrimaryAction,
          },
      };
    },
    template: `
      <PPage
          v-bind="$props"
      >
          <PButton slot="primaryAction">Test</PButton>
          <PBadge slot="titleMetadata" status="success">Paid</PBadge>
          <PAvatar initials="HA" slot="additionalNavigation"></PAvatar>
          Page Content
      </PPage>`,
    methods: {
        triggerPrimaryAction() {
            alert(`Saved`);
        },
    }
});

export const Default = Template.bind({});

Default.args = {
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
    breadcrumbs: "[{content: 'Products', url: '/new-page'}]"
}
