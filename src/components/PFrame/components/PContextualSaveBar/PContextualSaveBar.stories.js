import { PFrame } from '../../../PFrame';
import { PContextualSaveBar } from './index';

export default {
    title: 'Forms / Contextual Save Bar',
    component: PContextualSaveBar,
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {
        discardAction: {
            table: {
                defaultValue: {
                    summary: '{}',
                    detail: `{
    /** A destination to link to */
    url?: string;
    /** Content the action displays */
    content?: string;
    /** Should a spinner be displayed */
    loading?: boolean;
    /** Should the action be disabled */
    disabled?: boolean;
    /** Callback when an action takes place */
    onAction?(): void;
    
    /** Whether to show a modal confirming the discard action */
    discardConfirmationModal?: boolean;
}`,
                },
            },
        },
        logo: {
            table: {
                defaultValue: {
                    summary: '{}',
                    detail: `{
    /** Provides a path for a logo used on a dark background */
    topBarSource?: string;
    /** Provides a path for a logo used on a light background */
    contextualSaveBarSource?: string;
    /** Destination the merchant will navigate to when clicking the logo */
    url?: string;
    /** Accessible label the logo image */
    accessibilityLabel?: string;
    /** Number of pixels wide the logo image is */
    width?: number;
}`,
                },
            },
        },
        saveAction: {
            table: {
                defaultValue: {
                    summary: '{}',
                    detail: `{
    /** A destination to link to */
    url?: string;
    /** Content the action displays */
    content?: string;
    /** Should a spinner be displayed */
    loading?: boolean;
    /** Should the action be disabled */
    disabled?: boolean;

    /** Callback when an action takes place */
    onAction?(): void;
}`,
                },
            },
        },
        contextControl: {
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
        PContextualSaveBar, PFrame,
    },
    template: `
        <PContextualSaveBar
            v-bind="args"
            :saveAction="{
              onAction: handleSaveAction,
              loading: false,
              disabled: false,
            }"
            :discardAction="{
              onAction: handleDiscardAction,
            }"
        />`,
    methods: {
        handleSaveAction() {
            console.log('add form submit logic');
        },
        handleDiscardAction() {
            console.log('add clear form logic');
        }
    }
});

export const ContextualSaveBar = Template.bind({});

ContextualSaveBar.args = {
    message: 'Unsaved changes',
    logo: {
        width: 124,
        contextualSaveBarSource:
            'https://cdn.shopify.com/s/files/1/1564/7647/files/hulk-apps-darken_c0448e92-587f-47a8-9473-5ea0023b5ffd.svg?v=1583731462',
    },
    alignContentFlush: true,
}

ContextualSaveBar.parameters = {
    docs: {
        source: {
            code: `<PContextualSaveBar message="Unsaved changes"/>`
        },
    },
};