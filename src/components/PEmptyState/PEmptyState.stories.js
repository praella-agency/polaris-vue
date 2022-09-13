import { PEmptyState } from './index';
import { PLink } from '../PLink';
import { PTextContainer } from '../PTextContainer';

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
            control: {
                type: null,
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
            control: {
                type: null,
            },
        },
        footer: {
            table: {
                type: {
                    summary: null,
                },
            },
            control: {
                type: null,
            },
        },
    },
}

const Template = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PEmptyState, PLink, PTextContainer,
    },
    template: `
        <PEmptyState
            v-bind="args"
        >
            <template #footer>
                If you don’t want to add a transfer, you can import your inventory from
                <PLink url="javascript:void(0);" monochrome>settings.</PLink>
            </template>
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

EmptyState.parameters = {
    docs: {
        source: {
            code: `
<PEmptyState>
    <template>
        If you don’t want to add a transfer, you can import your inventory from
        <PLink>settings</PLink>
    </template>
    <p>Track and receive your incoming inventory from suppliers.</p>
</PEmptyState>`
        },
    },
};