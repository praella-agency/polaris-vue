import { PEmptyState } from './index.js';
import { PLink } from '../PLink';
import { PTextContainer } from '../../components/PTextContainer/index.js';

export default {
    title: 'Structure / Empty State',
    component: PEmptyState,
    argTypes: {
        default: {
            table: {
                type: {
                    summary: null,
                },
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
        primaryAction: {
            table: {
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
        secondaryAction: {
            table: {
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
        actions: {
            table: {
                type: {
                    summary: null,
                },
            },
        },
        footer: {
            table: {
                type: {
                    summary: null,
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
