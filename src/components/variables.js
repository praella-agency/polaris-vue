import {ActionListItemDescriptor} from '../types';

// PAccordionItem.vue
export const Icon = {
    icon: {
        type: [String, Object],
        properties: {
            open: {
                type: [String, Object],
                open: {
                    properties: {
                        source: String,
                        color: String,
                    },
                }
            },
            close: {
                type: [String, Object],
                close: {
                    properties: {
                        source: String,
                        color: String,
                    },
                }
            },
        },
    },
}

export const ThemeOptions = {
    header: {
        type: Object,
        properties: {
            color: String,
            background: String,
            backgroundCollapsed: String,
        },
    },
    content: {
        type: Object,
        properties: {
            color: String,
            background: String,
        },
    },
}

//PActionListSection.vue
export const SectionInterface = {
    title: String,
    items: Array,
}

// PInput.vue
export const Type = [
    'text', 'email', 'number', 'password', 'search', 'tel', 'url', 'date', 'datetime-local',
    'month', 'time', 'week', 'currency', 'file',
];

export const Align = ['left', 'right', 'center'];

// PConnectedItem.vue
export const Position = ['Left', 'Primary', 'Right'];

// PIcon.vue
export const Colors = ['base', 'subdued', 'critical', 'interactive', 'warning', 'highlight', 'success', 'primary', null, ''];

//PContextualSaveBar.vue
export const ContextualSaveBarAction = {
    /** A destination to link to */
    url: String,
    /** Content the action displays */
    content: String,
    /** Should a spinner be displayed */
    loading: Boolean,
    /** Should the action be disabled */
    disabled: Boolean,
    /** Callback when an action takes place */
    onAction: Function,
}

export const ContextualSaveBarDiscardActionProps = {
    /** Whether to show a modal confirming the discard action */
    discardConfirmationModal: Boolean,
}

//PButton.vue
export const Size = ['slim', 'medium', 'large'];

export const TextAlign = ['left', 'right', 'center', null];

export const DEFAULT_SIZE = 'medium';

export const ConnectedDisclosure = {
    /**
     * Visually hidden label for the connected disclosure button
     */
    accessibilityLabel: String,
    /**
     * Whether the disclosure is disabled
     */
    disabled: Boolean,
    /**
     * List of actions
     */
    actions: {
        type: Array,
        properties: {...ActionListItemDescriptor}
    },
};


