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


