import { PPageActions } from './index';

export default {
    title: 'Structure / Page Actions',
    component: PPageActions,
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {
        primaryAction: {
            table: {
                defaultValue: {
                    summary: '{}',
                    detail: `{
    /** Visually hidden text for screen readers */
    accessibilityLabel?: string,
    /** Content the action displays */
    content?: string,
    /** Whether or not the action is disabled */
    disabled?: boolean,
    /** Forces url to open in a new tab */
    external?: boolean,
    /** A unique identifier for the action */
    id?: string,
    /** A destination to link to, rendered in the action */
    url?: string,
    /** Icon support */
    icon?: string,
    /** Spinner for the element */
    loading?: boolean,
    /** Callback when an action takes place */
    onAction()?: void,
}`,
                },
            },
        },
        secondaryAction: {
            table: {
                defaultValue: {
                    summary: '{}',
                    detail: `{
    /** Visually hidden text for screen readers */
    accessibilityLabel?: string,
    /** Content the action displays */
    content?: string,
    /** Whether or not the action is disabled */
    disabled?: boolean,
    /** Forces url to open in a new tab */
    external?: boolean,
    /** A unique identifier for the action */
    id?: string,
    /** A destination to link to, rendered in the action */
    url?: string,
    /** Destructive action */
    destructive?: boolean,
    /** Icon support */
    icon?: string,
    /** Spinner for the element */
    loading?: boolean,
    /** Callback when an action takes place */
    onAction()?: void,
}`,
                },
            },
        },
        secondaryActions: {
            table: {
                defaultValue: {
                    summary: '[]',
                    detail: `[{
    /** stringVisually hidden text for screen readers */
    accessibilityLabel?: string,
    /** stringContent the action displays */
    content?: string,
    /** booleanWhether or not the action is disabled */
    disabled?: boolean,
    /** booleanForces url to open in a new tab */
    external?: boolean,
    /** stringA unique identifier for the action */
    id?: string,
    /** stringA destination to link to, rendered in the action */
    url?: string,
    /** Destructive action */
    destructive?: boolean,
    /** Icon support */
    icon?: string,
    /** Spinner for the element */
    loading?: boolean,
    /** voidCallback when an action takes place */
    onAction()?: void,
}]`,
                },
            },
        },
    },
}

const Template = (args) => ({
    setup() {
        return {args};
    },
    components: {
        PPageActions,
    },
    template: `
        <PPageActions
            v-bind="args"
        />`,
});

export const PageActions = Template.bind({});

PageActions.args = {
    primaryAction: {
        content: 'Save',
        onAction: () => {
            alert('Saved');
        },
    },
    secondaryAction: {
        content: 'Add',
        onAction: () => {
            alert('Added');
        },
    },
    secondaryActions: [
        {
            content: 'Delete',
            destructive: true,
            onAction: () => {
                alert('Deleted')
            }
        },
    ],
}

PageActions.parameters = {
    docs: {
        source: {
            code: `<PPageActions/>`
        },
    },
};
