export const BaseAction = {
    id: String,
    content: String,
    accessibilityLabel: String,
    url: String,
    external: Boolean,
    onAction: Function,
}

export const Action = {
    ...BaseAction,
}

export const DisableableAction = {
    ...Action,
    disabled: Boolean
}

export const LoadableAction = {
    ...Action,
    loading: Boolean
}

export const Color = ['base', 'subdued', 'critical', 'interactive', 'warning', 'highlight', 'success', 'primary'];

export const IconSource = ['placeholder', String];

export const IconProps = {
    source: {
        type: String,
        expectedValues: IconSource,
        required: true,
    },
    color: {
        type: String,
        expectedValues: Color,
    },
    backdrop: Boolean,
    accessibilityLabel: String,
}

//UnUsed
export const HeadingTagName = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'];

export const LinkAction = {
    id: String,
    content: String,
    accessibilityLabel: String,
    url: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    external: {
        type: Boolean,
        required: true
    },
}

export const BadgeAction = {
    badge: {
        status: 'new',
        content: String,
    },
}

export const BaseCallbackAction = {
    id: String,
    content: String,
    accessibilityLabel: String,
    onAction: Function,
}

export const CallbackAction = {
    ...BaseCallbackAction
}

export const DestructableAction = {
    ...Action,
    destructive: Boolean,
}

export const IconableAction = {
    ...Action,
    icon: IconProps.source
}


export const ActionListItemDescriptor = {
    ...IconableAction,
    ...DisableableAction,
    ...BadgeAction,
    ...DestructableAction,
    accessibilityLabel: String,
    helpText: String,
    image: String,
    prefix: String,
    suffix: String,
    ellipsis: Boolean,
    active: Boolean,
    role: String,
}

export const ActionListSection = {
    title: String,
    items: {
        type: Array,
        properties: {...ActionListItemDescriptor}
    },
}

export const ActionListProps = {
    /** Collection of actions for list */
    items: {
        type: Array,
        properties: {...ActionListItemDescriptor}
    },
    /** Collection of sectioned action items */
    sections: {
        type: Array,
        properties: {...ActionListSection}
    },
    /** Defines a specific role attribute for each action in the list */
    actionRole: String,
    /** Callback when any item is clicked or keypressed */
    onActionAnyItem: ActionListItemDescriptor.onAction,
}

export const ComplexAction = {
    ...Action,
    ...DisableableAction,
    ...DestructableAction,
    ...IconableAction,
    ...LoadableAction
}

export const MenuActionDescriptor = {
    ...ComplexAction,
    index: Number,
}

export const MenuGroupDescriptor = {
    ...BadgeAction,
    title: {
        type: String,
        required: true
    },
    actions: {
        type: Array,
        properties: {...ActionListItemDescriptor}
    },
    icon: IconableAction.icon,
    details: String,
    index: Number,
}

export const ConnectedDisclosure = {
    accessibilityLabel: String,
    disabled: Boolean,
    actions: {
        type: Array,
        properties: {...ActionListItemDescriptor}
    },
}
export const Video = {
    src: {
        type: String,
        required: true
    },
    size: Number,
    type: {
        type: String,
        required: true
    },
}

export const CheckboxHandles = {
    focus: Function,
}

//UnUsed
export const Key = {
    Backspace: 8,
    Tab: 9,
    Enter: 13,
    Shift: 16,
    Ctrl: 17,
    Alt: 18,
    Pause: 19,
    CapsLock: 20,
    Escape: 27,
    Space: 32,
    PageUp: 33,
    PageDown: 34,
    End: 35,
    Home: 36,
    LeftArrow: 37,
    UpArrow: 38,
    RightArrow: 39,
    DownArrow: 40,
    Insert: 45,
    Delete: 46,
    Key0: 48,
    Key1: 49,
    Key2: 50,
    Key3: 51,
    Key4: 52,
    Key5: 53,
    Key6: 54,
    Key7: 55,
    Key8: 56,
    Key9: 57,
    KeyA: 65,
    KeyB: 66,
    KeyC: 67,
    KeyD: 68,
    KeyE: 69,
    KeyF: 70,
    KeyG: 71,
    KeyH: 72,
    KeyI: 73,
    KeyJ: 74,
    KeyK: 75,
    KeyL: 76,
    KeyM: 77,
    KeyN: 78,
    KeyO: 79,
    KeyP: 80,
    KeyQ: 81,
    KeyR: 82,
    KeyS: 83,
    KeyT: 84,
    KeyU: 85,
    KeyV: 86,
    KeyW: 87,
    KeyX: 88,
    KeyY: 89,
    KeyZ: 90,
    LeftMeta: 91,
    RightMeta: 92,
    Select: 93,
    Numpad0: 96,
    Numpad1: 97,
    Numpad2: 98,
    Numpad3: 99,
    Numpad4: 100,
    Numpad5: 101,
    Numpad6: 102,
    Numpad7: 103,
    Numpad8: 104,
    Numpad9: 105,
    Multiply: 106,
    Add: 107,
    Subtract: 109,
    Decimal: 110,
    Divide: 111,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    NumLock: 144,
    ScrollLock: 145,
    Semicolon: 186,
    Equals: 187,
    Comma: 188,
    Dash: 189,
    Period: 190,
    ForwardSlash: 191,
    GraveAccent: 192,
    OpenBracket: 219,
    BackSlash: 220,
    CloseBracket: 221,
    SingleQuote: 222,
}

/*Message Component*/

export const Status = ['success', 'attention', 'info', 'critical', 'warning', 'new'];
export const Progress = ['incomplete', 'partiallyComplete', 'complete'];
export const Size = ['small', 'medium'];

export const MessageActionProps = {
    content: {
        type: String,
        required: true,
    },
    onClick: Function,
}

export const MessageLinkProps = {
    to: {
        type: [String, Object],
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    external: Boolean,
}

export const MessageBadgeProps = {
    content: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        expectedValues: Status,
    },
}

export const BadgeProps = {
    /** The content to display inside the badge. */
    children: String,
    /** Set the color of the badge for the given status. */
    status: {
        type: String,
        expectedValues: Status
    },
    /** Render a pip showing the progress of a given task. */
    progress: {
        type: String,
        expectedValues: Progress
    },
    /**
     * Medium or small size. Use `small` only in the main navigation of an app frame.
     * @default 'medium'
     */
    size: {
        type: String,
        expectedValues: Size
    },
    /** Pass a custom accessibilityLabel */
    statusAndProgressLabelOverride: String,
}