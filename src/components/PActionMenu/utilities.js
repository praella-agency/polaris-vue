import {MenuActionDescriptor, MenuGroupDescriptor} from './../../types/types.js';

const MenuDescriptorWithIndex = {
    ...MenuActionDescriptor,
    ...MenuGroupDescriptor,
    index: Number,
};

export function sortAndOverrideActionOrder(actions) {
    const actionsWithOverrides = actions.filter(
        (action) => action.index !== undefined,
    );

    if (actionsWithOverrides.length === 0) {
        return actions;
    }

    const sortedActionsWithOverrides = actionsWithOverrides.sort(
        ({index: indexA}, {index: indexB}) => {
            return indexA - indexB;
        },
    );

    const actionsWithoutOverrides = actions.filter(
        (action) => action.index === undefined,
    );

    const overriddenActions = [
        ...actionsWithoutOverrides,
    ];

    sortedActionsWithOverrides.forEach((action) => {
        overriddenActions.splice(action.index, 0, action);
    });

    return overriddenActions;
}

export const ActionMenuProps = {
    actions: {
        type: Object,
        properties: MenuActionDescriptor
    },
    groups: {
        type: Object,
        properties: MenuGroupDescriptor
    },
    rollup: Boolean,
}

export function hasGroupsWithActions(groups = []) {
    return groups.length === 0
        ? false
        : groups.some((group) => {
            if(group.actions) {
                return group.actions.length > 0
            }
        });
}
