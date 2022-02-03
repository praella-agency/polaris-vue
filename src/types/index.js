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

// export const IconSource = ['placeholder', String];

export const IconProps = {
    source: {
        type: String,
        required: true
    },
    color: {
        type: String,
        expectedValues: Color
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
        type: Object,
        properties: {
            status: {
                type: String,
                required: true,
                expectedValues: ['new']
            },
            content: {
                type: String,
                required: true
            },
        },
    }
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

// Note: Changed icon: IconProps.source type
export const IconableAction = {
    ...Action,
    icon: [String, Object],
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
    title: String,
    accessibilityLabel: String,
    actions: {
        type: Array,
        properties: ActionListItemDescriptor
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
