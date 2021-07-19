import PEmptyState from './PEmptyState';
import { PLink } from '../PLink';
import { PTextContainer } from '../PTextContainer';

export default {
    title: 'Structure / Empty State',
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
            table: {
                type: {
                    summary: 'string',
                },
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
            table: {
                type: {
                    summary: 'string',
                },
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
          <p slot="footer">
            If you don’t want to add a transfer, you can import your inventory from
            <PLink url="javascript:void(0);" monochrome>settings.</PLink>
          </p>
          <p>Track and receive your incoming inventory from suppliers.</p>
      </PEmptyState>`,
});

export const EmptyState = Template.bind({});

EmptyState.args = {
    heading: 'Manage your inventory transfers',
    image: 'https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png',
    primaryAction: {
        content: 'Add transfer',
        onAction: () => {
            alert('Transferred');
        },
    },
    secondaryAction: {
        content: 'Learn more',
        onAction: () => {
            alert('Learn more');
        },
    },
}
