import {ActionListItemDescriptor} from '../types';
import {ToastProps} from "./PFrame/context";

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

// PAvatar.vue
export const Status = {
    Pending: 'PENDING',
    Loaded: 'LOADED',
    Errored: 'ERRORED',
};

// PBadge.vue
export const BadgeStatus = ['success', 'info', 'attention', 'warning', 'new', 'critical', null, ''];
export const BadgeProgress = ['incomplete', 'partiallyComplete', 'complete', null, ''];
export const BadgeSize = ['small', 'medium'];

// PFrameInner.vue
export const State = {
    skipFocused: Boolean, //not required
    globalRibbonHeight: Number,
    loadingStack: Number,
    toastMessages: [ToastProps],
    showContextualSaveBar: Boolean,
}

// PUnStyledButton.vue
export const ButtonType = ['submit', 'reset', 'button'];

// PSpinner.vue
export const SpinnerColor = ['white', 'teal', 'inkLightest'];
export const SpinnerSize = ['small', 'large'];

// POptionList.vue
export const OptionDescriptor = {
    label: String,
    value: {
        type: [String, Number],
        required: true
    },
    disabled: Boolean,
    active: Boolean,
    id: String,
}

export const SectionDescriptor = {
    options: {
        type: Array,
        required: true,
        properties: OptionDescriptor
    },
    title: String,
}

// PDisplayText.vue
export const DisplayTextSize = ['small', 'medium', 'large', 'extraLarge'];
export const HeadingTagName = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'];

// PStack.vue
export const Spacing = ['extraTight', 'tight', 'loose', 'extraLoose', 'none'];
export const Alignment = ['leading', 'trailing', 'center', 'fill', 'baseline'];
export const Distribution = ['equalSpacing', 'leading', 'trailing', 'center', 'fill', 'fillEvenly'];

// PEventListener.vue
export const BaseEventProps = {
    event: {
        type: String,
        required: true
    },
    capture: Boolean,
    handler: (event) => {
        return 0;
    },
}

export const EventListenerProps = {
    ...BaseEventProps,
    passive: Boolean,
}

// PTextStyle.vue
export const Variation = ['positive', 'negative', 'strong', 'subdued', 'code'];

export const VariationValue = {
    Positive: 'positive',
    Negative: 'negative',
    Strong: 'strong',
    Subdued: 'subdued',
    Code: 'code',
}