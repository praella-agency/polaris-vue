const Color = 'base' | 'subdued' | 'critical' | 'interactive' | 'warning' | 'highlight' | 'success' | 'primary';

export const TabDescriptor = {
    /** A unique identifier for the tab */
    id: String,
    /** A destination to link to */
    url: String,
    /** Set to for router link */
    to: [String, Object],
    /** Content for the tab */
    content: String,
    /** A unique identifier for the panel */
    panelID: String,
    /** Visually hidden text for screen readers */
    accessibilityLabel: String,
    /** External URL */
    external: Boolean,
    /** Badge Object */
    badge: {
        content: String,
        status: String,
        progress: String,
        background: String,
        color: String,
        size: String,
    },
    /** Icon Object */
    icon: {
        source: [String, 'placeholder'],
        color: Color,
        backdrop: Boolean,
        accessibilityLabel: String,
    },
};
