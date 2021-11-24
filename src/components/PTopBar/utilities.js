export const UserMenu = {
    id: {
        type: String,
        required: true,
    },
    actions: Array,
    message: Object,
    name: String,
    detail: String,
    accessibilityLabel: String,
    initials: String,
    avatar: String,
    open: {
        type: Boolean,
        default: true,
    },

    onToggle: Function,
};

export const SecondaryMenu = {
    id: {
        type: String,
        required: true,
    },
    actions: Array,
    message: Object,
    open: {
        type: Boolean,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
    accessibilityLabel: String,

    onOpen: Function,

    onClose: Function,
};

export const SearchField = {
    value: String,
    placeholder: String,
    showFocusBorder: Boolean,
    active: Boolean,
    focused: Boolean,
}

export const SearchResult = {
    items: Array,
    sections: Array,
}
