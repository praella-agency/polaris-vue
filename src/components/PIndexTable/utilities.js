import { Action, ActionListSection, BadgeAction, DisableableAction, MenuGroupDescriptor } from '../../types';

export const IndexTableHeading = {
    title: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
    new: Boolean,
    hidden: Boolean,
};

export const BulkAction = {
    ...DisableableAction,
    ...BadgeAction,
};
const BulkActionListSection = {
    ...ActionListSection,
};

export const BulkActionsProps = {
    /** Visually hidden text for screen readers */
    accessibilityLabel: String,
    /** Whether to render the small screen BulkActions or not */
    smallScreen: Boolean,
    /** Label for the bulk actions */
    label: String,
    /** State of the bulk actions checkbox */
    selected: [Boolean, String],
    /** List is in a selectable state */
    selectMode: Boolean,
    /** Actions that will be given more prominence */
    promotedActions: {
        type: Array,
        properties: {
            ...BulkAction,
            ...MenuGroupDescriptor,
        },
    },
    /** List of actions */
    actions: {
        type: Array,
        properties: {
            ...BulkAction,
            ...BulkActionListSection,
        },
    },
    /** Text to select all across pages */
    paginatedSelectAllText: String,
    /** Action for selecting all across pages */
    paginatedSelectAllAction: {
        type: Object,
        properties: Action,
    },
    /** Disables bulk actions */
    disabled: Boolean,
    /** Callback when the select all checkbox is clicked */
    onToggleAll: Function,
    /** Callback when selectable state of list is changed */
    onSelectModeToggle: Function,
    /** Callback when more actions button is toggled */
    onMoreActionPopoverToggle: Function,
};
