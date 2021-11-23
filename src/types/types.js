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