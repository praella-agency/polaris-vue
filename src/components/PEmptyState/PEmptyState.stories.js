import PEmptyState from './PEmptyState';
import { PLink } from '../PLink';
import { PTextContainer } from '../PTextContainer';

export default {
    title: ' Structure / Empty State',
    component: PEmptyState,
    argTypes: {
        default: {
            table: {
                disable: true,
            },
        },
        actions: {
            table: {
                disable: true,
            },
        },
        image: {
            control: {
                type: 'text',
            },
        },
        footer: {
            table: {
                disable: true,
            },
        },
        heading: {
            control: {
                type: 'text',
            },
        },
    },
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        PEmptyState, PLink, PTextContainer,
    },
    template: `
      <PEmptyState
          v-bind="$props"
      >
          <p>
            You can use the Files section to upload images, videos, and
            other documents. This example shows the content with a centered layout and full width.
          </p>
          <PTextContainer slot="footer" v-bind="$props">
            <p>
              If you don’t want to add a transfer, 
              you can import your inventory from
              <PLink url="https://www.hulkapps.com/" external >
                Settings
              </PLink>.
            </p>
          </PTextContainer>
      </PEmptyState>`,
});

export const EmptyState = Template.bind({});

EmptyState.args = {
    heading: 'Manage your inventory transfers',
    image: 'https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png',
    primaryAction: {
        content: 'Add transfer',
        onAction: () => {
            alert('transferred');
        },
    },
    secondaryAction: {
        content: 'Learn more',
        onAction: () => {
            alert('Learn more');
        },
    },
}
