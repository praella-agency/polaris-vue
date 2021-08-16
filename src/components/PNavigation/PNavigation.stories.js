import PNavigation from './PNavigation';
import PSection from './components/PSection/PSection';

export default {
    title: 'Navigation / Navigation',
    component: PNavigation,
}

const Template = (args, argTypes) => ({
    props: Object.keys(argTypes),
    components: {
        PNavigation, PSection,
    },
    template: `
      <PNavigation>
        <PSection
            :items="[
      {
        url: '/path/to/place',
        label: 'Inactive item',
        icon: 'HomeMajor',
      },
      {
        url: '/path/to/place',
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
        url: '/path/to/place',
        label: 'New item',
        new: true,
        icon: 'HomeMajor',
      },
      {
        url: '/path/to/place',
        label: 'Badged item',
        badge: 'Old',
        icon: 'HomeMajor',
      },
      {
        url: '/path/to/place',
        label: 'Active with secondary action',
        icon: 'OrdersMajor',
        selected: true,
        secondaryAction: {
          url: '/admin/orders/add',
          accessibilityLabel: 'Add an order',
          icon: 'CirclePlusOutlineMinor',
        },
      },
      {
        url: '/admin/products',
        label: 'Active item with sub navigation',
        icon: 'ProductsMajor',
        selected: true,
        subNavigationItems: [
          {
            url: '/admin/products',
            disabled: false,
            selected: true,
            label: 'Selected sub item',
          },
          {
            url: '/admin/products/transfers',
            disabled: false,
            label: 'Default sub item',
          },
          {
            url: '/admin/products/inventory',
            disabled: true,
            label: 'Disabled sub item',
          },
        ],
      },
      {
        url: '/path/to/place',
        label: 'Disabled item',
        icon: 'CustomersMajor',
        disabled: true,
      },
      {
        url: '/path/to/place',
        label: 'Overflow item',
        icon: 'MarketingMajor',
      },
    ]"
            :rollup="{
      after: 7,
      view: 'view',
      hide: 'hide',
      activePath: '/',
    }"
        />
      </PNavigation>
    `,
});

export const Navigation = Template.bind({});
