import {ActionListItemDescriptor} from '../types';
import {ToastProps} from "./PFrame/context";
import {useToggle} from "./PDropZone/context";

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

// PButtonGroup.vue
export const ButtonGroupSpacing = 'extraTight' | 'tight' | 'loose';

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

// PSection.vue
export const noWindowMatches = {
    media: '',
    /* tslint:disable-next-line */
    addListener: Function,
    /* tslint:disable-next-line */
    removeListener: Function,
    matches: false,
    /* tslint:disable-next-line */
    onchange: Function,
    /* tslint:disable-next-line */
    addEventListener: Function,
    /* tslint:disable-next-line */
    removeEventListener: Function,
    dispatchEvent: () => true,
};

export const Breakpoints = {
    navigationBarCollapsed: '768px',
    stackedContent: '1043px',
};

export const Rollup = {
    after: Number,
    view: String,
    hide: String,
    activePath: String,
};

// PItem.vue
export const MatchState = {
    MatchForced: 0,
    MatchUrl: 1,
    MatchPaths: 2,
    Excluded: 3,
    NoMatch: 4,
};

// PCollapsible.vue
export const Transition = {
    /** Assign a transition duration to the collapsible animation. */
    duration: String,
    /** Assign a transition timing function to the collapsible animation */
    timingFunction: String,
}

export const AnimationState = ['idle', 'measuring', 'animating'];

// PTopBar.vue
export const SearchResult = {
    items: Array,
    sections: Array,
}

// PUserMenu.vue
const Action = {
    /** Source of the icon */
    icon: String,
    /** A unique identifier for the action */
    id: String,
    /** Content the action displays */
    content: String,
    /** Visually hidden text for screen readers */
    accessibilityLabel: String,
    /** A destination to link to, rendered in the action */
    url: String,
    /** Forces url to open in a new tab */
    external: Boolean,

    /** Callback when an action takes place */
    onAction: Function,

    /** Callback when mouse enter */
    onMouseEnter: Function,

    /** Callback when element is touched */
    onTouchStart: Function,
}

export const Actions = {
    items: {
        type: Array,
        properties: {...Action},
    }
};

// PTextContainer.vue
export const TextContainerSpacing = ['tight', 'loose', null];

// PSubHeading.vue
export const SubHeadingTagName = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'];

// PDropZone.vue
export const {
    value: focused,
    setTrue: handleFocus,
    setFalse: handleBlur,
} = useToggle(false);

export const DropZoneFileType = ['file', 'image'];

// PThumbnail.vue
export const ThumbnailSize = ['small', 'medium', 'large'];

// PSettingToggle.vue
export const SettingToggleAction = {
    accessibilityLabel: String,
    destructive: Boolean,
    disabled: Boolean,
    external: Boolean,
    icon: String,
    id: [String | Number],
    loading: Boolean,
    outline: Boolean,
    url: String,
    contentStatus: String,

    onAction() {
        return 0;
    },
}

// PDatePicker.vue
const DateType = [Date, String];
const DateRange = {
    type: [String, Object],
    properties: {
        startDate: {
            type: DateType,
            nullable: true,
        },
        endDate: {
            type: DateType,
            nullable: true,
        },
    },
}

export const DateRangeInterface = {
    dateRange: DateRange,
}

export const ValueInterface = {
    value: DateRange,
}

// PTag.vue
export const TagInterface = {
    value: {
        type: [String, Number],
        required: true,
    },
    key: {
        type: [String, Number],
        required: true,
    },
};

export const TagSize = ['small', 'medium', null, ''];

// PBanner.vue
export const BannerStatus = ['success', 'info', 'warning', 'critical', null];

// PProgressBar.vue
export const ProgressBarSize = ['small', 'medium', 'large'];

// PSkeletonDisplayText.vue
export const SkeletonDisplayTextSize = ['small', 'medium', 'large', 'extraLarge'];

// PSkeletonThumbnail.vue
export const SkeletonThumbnailSize = ['small', 'medium', 'large'];

// PToast.vue
export const Positions = Object.freeze({
    TOP_RIGHT: 'top-right',
    TOP: 'top',
    TOP_LEFT: 'top-left',
    BOTTOM_RIGHT: 'bottom-right',
    BOTTOM: 'bottom',
    BOTTOM_LEFT: 'bottom-left',
});

// PVerticalTab.vue
export const VerticalTabIcon = {
    source: String | 'placeholder',
    color: 'base' | 'subdued' | 'critical' | 'interactive' | 'warning' | 'highlight' | 'success' | 'primary',
    backdrop: Boolean,
    accessibilityLabel: String,
}

export const VerticalTabBadge = {
    content: String,
    status: String,
    progress: String,
    background: String,
    color: String,
    size: String,
}

// PFilter.vue
export const ResourceNameInterface = {
    singular: {
        type: String,
        required: true,
    },
    plural: {
        type: String,
        required: true,
    },
}

export const FilterInterface = {
    /** A unique key used to identify the filter */
    key: {
        type: String,
        required: true,
    },
    /** The label for the filter */
    label: {
        type: String,
        required: true,
    },
    /** The markup for the given filter */
    filter: {
        type: String,
        required: true,
    },
    /** Whether or not the filter should have a shortcut popover displayed */
    shortcut: Boolean,
    /** Whether or not the filter is disabled */
    disabled: Boolean,
    /**
     * @default false
     * Whether or not the clear button is displayed
     */
    hideClearButton: Boolean,
}

// PList.vue
export const ListType = ['bullet', 'number'];

// PMediaCard.vue
export const MediaCardSize = ['small', 'medium'];